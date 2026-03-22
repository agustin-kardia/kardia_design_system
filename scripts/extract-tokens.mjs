/**
 * Figma → DTCG token extraction script.
 *
 * TWO MODES:
 *
 *   Default (plugin export) — reads a JSON file that you export from Figma
 *   using the free "Export/Import Variables" plugin:
 *     1. In Figma → Plugins → search "Export/Import Variables" → Run
 *     2. Export All → save as  tokens/figma-variables.json
 *     3. npm run tokens:extract
 *
 *   --api  flag — calls the Figma REST API directly.
 *   Requires Enterprise plan (file_variables:read scope).
 *     npm run tokens:extract -- --api
 *
 * Text styles are always fetched from the REST API
 * (works with file_content:read scope on any plan).
 *
 * Usage:  npm run tokens:extract
 */

import 'dotenv/config';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const FIGMA_TOKEN = process.env.FIGMA_TOKEN;
const FILE_KEY = 'FCCHNyBsztcnSEYYLkPkdZ';
const API_BASE = 'https://api.figma.com/v1';

const PLUGIN_EXPORT_PATH = resolve(ROOT, 'tokens', 'figma-variables.json');
const OUTPUT_PATH = resolve(ROOT, 'tokens', 'tokens.json');

const USE_API = process.argv.includes('--api');
const EXCLUDED_COLLECTIONS = /figma\s*utilit/i;

// ─── Figma REST API ─────────────────────────────────────

async function figmaGet(endpoint) {
  if (!FIGMA_TOKEN) {
    throw new Error('FIGMA_TOKEN not set. Copy .env.example → .env and add your token.');
  }
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: { 'X-FIGMA-TOKEN': FIGMA_TOKEN },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Figma API ${res.status} ${res.statusText}: ${body}`);
  }
  return res.json();
}

// ─── Color helpers ──────────────────────────────────────

function clamp(v) {
  return Math.max(0, Math.min(1, v));
}

function rgbaToHex(r, g, b, a = 1) {
  const to255 = (v) => Math.round(clamp(v) * 255);
  const hex = (v) => to255(v).toString(16).padStart(2, '0');
  const base = `#${hex(r)}${hex(g)}${hex(b)}`;
  return a < 1 ? `${base}${hex(a)}` : base;
}

/** Normalise any colour-like value to #hex */
function normaliseColor(val) {
  if (typeof val === 'string') return val.startsWith('#') ? val : `#${val}`;
  if (typeof val === 'object' && 'r' in val) return rgbaToHex(val.r, val.g, val.b, val.a);
  return String(val);
}

// ─── Categorisation ─────────────────────────────────────

function categorise(type, name) {
  const lower = name.toLowerCase();
  if (type === 'COLOR' || type === 'color') return 'color';
  if (type === 'FLOAT' || type === 'number') {
    if (lower.includes('spacing')) return 'spacing';
    if (lower.includes('radius')) return 'border-radius';
    if (lower.includes('border') && lower.includes('width')) return 'border-width';
    if (lower.includes('shadow')) return 'shadow';
    if (lower.includes('duration')) return 'motion';
    if (lower.includes('easing')) return 'motion';
    if (lower.includes('opacity')) return 'opacity';
    return 'number';
  }
  if (type === 'STRING' || type === 'string') {
    if (lower.includes('font')) return 'typography';
    return 'string';
  }
  return 'other';
}

function dtcgType(category) {
  const map = {
    color: 'color',
    spacing: 'dimension',
    'border-radius': 'dimension',
    'border-width': 'dimension',
    shadow: 'shadow',
    motion: 'duration',
    typography: 'typography',
    opacity: 'number',
    number: 'number',
  };
  return map[category] ?? undefined;
}

// ─── Path helpers ───────────────────────────────────────

function buildTokenPath(name, category) {
  const segments = name.split('/').map((s) => s.trim());
  return segments
    .filter((s) => s.toLowerCase() !== category.toLowerCase())
    .map((s) => {
      const prefix = `${category}-`;
      if (s.toLowerCase().startsWith(prefix)) return s.slice(prefix.length);
      const suffixes = [`-${category}`, `-${category}s`];
      for (const sfx of suffixes) {
        if (s.toLowerCase().endsWith(sfx)) return s.slice(0, -sfx.length);
      }
      return s;
    })
    .filter((s) => s.length > 0);
}

function setNested(obj, path, value) {
  let cur = obj;
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i];
    if (!(key in cur) || typeof cur[key] !== 'object' || cur[key].$value !== undefined) {
      cur[key] = {};
    }
    cur = cur[key];
  }
  cur[path[path.length - 1]] = value;
}

function countTokens(obj) {
  let n = 0;
  for (const v of Object.values(obj)) {
    if (v && typeof v === 'object' && '$value' in v) n++;
    else if (v && typeof v === 'object') n += countTokens(v);
  }
  return n;
}

// ─── REST API value processing ──────────────────────────

function processApiValue(raw, resolvedType, idToPath) {
  if (raw === undefined || raw === null) return null;
  if (raw.type === 'VARIABLE_ALIAS') {
    const refPath = idToPath[raw.id];
    return refPath ? `{${refPath}}` : null;
  }
  if (resolvedType === 'COLOR' && typeof raw === 'object' && 'r' in raw) {
    return rgbaToHex(raw.r, raw.g, raw.b, raw.a);
  }
  if (resolvedType === 'FLOAT') {
    return typeof raw === 'number' ? raw : parseFloat(raw);
  }
  return raw;
}

// ═══════════════════════════════════════════════════════
//  Mode A  —  Plugin export file
// ═══════════════════════════════════════════════════════

function loadPluginExport() {
  if (!existsSync(PLUGIN_EXPORT_PATH)) {
    console.error(
      [
        '❌  Plugin export file not found.',
        '',
        '   To export your variables from Figma:',
        '   1. In Figma → Plugins → search "Export/Import Variables"',
        '   2. Run the plugin → Export All',
        '   3. Save the JSON file as:',
        `      tokens/figma-variables.json`,
        '',
        '   Then re-run:  npm run tokens:extract',
      ].join('\n'),
    );
    process.exit(1);
  }

  console.log('📂  Reading plugin export: tokens/figma-variables.json');
  const raw = JSON.parse(readFileSync(PLUGIN_EXPORT_PATH, 'utf-8'));

  // The plugin may output several formats. We handle the most common ones:
  //
  //  Format A — array of collections:
  //    [{ name, modes: [{ name, variables: [{ name, type, value }] }] }]
  //
  //  Format B — flat object { "collection/variable": value }
  //
  //  Format C — { collections: [...] }  (wrapper around Format A)

  const collections = Array.isArray(raw)
    ? raw
    : raw.collections
      ? raw.collections
      : null;

  if (collections) return parseCollections(collections);
  if (typeof raw === 'object' && !Array.isArray(raw)) return parseFlatObject(raw);

  throw new Error('Unrecognised plugin export format. See the README for supported formats.');
}

function parseCollections(collections) {
  const tokens = {};

  console.log('\n┌─────────────────────────────────────────');
  console.log('│  Collections & modes');
  console.log('├─────────────────────────────────────────');

  for (const col of collections) {
    const skip = EXCLUDED_COLLECTIONS.test(col.name);
    const modeNames = (col.modes || []).map((m) => m.name || m.modeName || 'Default');
    console.log(`│  ${skip ? '🚫' : '✅'}  "${col.name}"  —  modes: [${modeNames.join(', ')}]`);
    if (skip) continue;

    const modes = col.modes || [];
    const lightMode = modes.find((m) => /light|default/i.test(m.name || m.modeName || '')) || modes[0];
    const darkMode = modes.find((m) => /dark/i.test(m.name || m.modeName || ''));

    const vars = lightMode?.variables || lightMode?.variableValues || [];

    for (const v of vars) {
      const varName = v.name || v.variableName || '';
      const varType = v.type || v.resolvedType || guessType(v.value);
      const category = categorise(varType, varName);
      const segments = buildTokenPath(varName, category);
      const dtcgPath = [category, ...segments];

      let lightValue = v.value;
      if (varType === 'COLOR' || varType === 'color') lightValue = normaliseColor(lightValue);
      if (typeof v.isAlias === 'boolean' && v.isAlias && v.aliasPath) {
        lightValue = `{${v.aliasPath}}`;
      }

      const def = { $value: lightValue, $type: dtcgType(category) };
      if (v.description) def.$description = v.description;

      // Dark mode
      if (darkMode) {
        const darkVars = darkMode.variables || darkMode.variableValues || [];
        const darkVar = darkVars.find((dv) => (dv.name || dv.variableName) === varName);
        if (darkVar) {
          let darkVal = darkVar.value;
          if (varType === 'COLOR' || varType === 'color') darkVal = normaliseColor(darkVal);
          if (typeof darkVar.isAlias === 'boolean' && darkVar.isAlias && darkVar.aliasPath) {
            darkVal = `{${darkVar.aliasPath}}`;
          }
          if (JSON.stringify(darkVal) !== JSON.stringify(lightValue)) {
            def.$extensions = { mode: { dark: darkVal } };
          }
        }
      }

      setNested(tokens, dtcgPath, def);
    }
  }

  console.log('└─────────────────────────────────────────\n');
  return tokens;
}

function parseFlatObject(obj) {
  const tokens = {};
  for (const [key, value] of Object.entries(obj)) {
    if (EXCLUDED_COLLECTIONS.test(key)) continue;
    const guessed = guessType(value);
    const category = categorise(guessed, key);
    const segments = buildTokenPath(key, category);
    const dtcgPath = [category, ...segments];
    const val = guessed === 'COLOR' ? normaliseColor(value) : value;
    setNested(tokens, dtcgPath, { $value: val, $type: dtcgType(category) });
  }
  return tokens;
}

function guessType(value) {
  if (typeof value === 'string' && /^#|^rgb/i.test(value)) return 'COLOR';
  if (typeof value === 'number') return 'FLOAT';
  if (typeof value === 'object' && 'r' in value) return 'COLOR';
  return 'STRING';
}

// ═══════════════════════════════════════════════════════
//  Mode B  —  REST API (Enterprise only)
// ═══════════════════════════════════════════════════════

async function loadFromApi() {
  console.log('📡  Fetching variables from Figma REST API…');
  const { meta } = await figmaGet(`/files/${FILE_KEY}/variables/local`);
  const { variableCollections, variables } = meta;

  console.log('\n┌─────────────────────────────────────────');
  console.log('│  Collections & modes');
  console.log('├─────────────────────────────────────────');
  for (const col of Object.values(variableCollections)) {
    const skip = EXCLUDED_COLLECTIONS.test(col.name);
    const modes = col.modes.map((m) => m.name).join(', ');
    const count = col.variableIds.length;
    console.log(`│  ${skip ? '🚫' : '✅'}  "${col.name}"  —  ${count} vars  —  modes: [${modes}]`);
  }
  console.log('└─────────────────────────────────────────\n');

  const varInfo = {};
  const idToPath = {};
  for (const [id, v] of Object.entries(variables)) {
    const col = variableCollections[v.variableCollectionId];
    if (!col || EXCLUDED_COLLECTIONS.test(col.name)) continue;
    const category = categorise(v.resolvedType, v.name);
    const segments = buildTokenPath(v.name, category);
    const dtcgPath = [category, ...segments];
    varInfo[id] = { ...v, category, dtcgPath, collection: col };
    idToPath[id] = dtcgPath.join('.');
  }

  const tokens = {};
  for (const [id, info] of Object.entries(varInfo)) {
    const { collection, dtcgPath, resolvedType, valuesByMode, description, category } = info;
    const defaultModeId = collection.defaultModeId;
    const darkMode = collection.modes.find((m) => /dark/i.test(m.name));
    const lightVal = processApiValue(valuesByMode[defaultModeId], resolvedType, idToPath);
    if (lightVal === null) continue;
    const def = { $value: lightVal, $type: dtcgType(category) };
    if (description) def.$description = description;
    if (darkMode) {
      const darkVal = processApiValue(valuesByMode[darkMode.modeId], resolvedType, idToPath);
      if (darkVal !== null && JSON.stringify(darkVal) !== JSON.stringify(lightVal)) {
        def.$extensions = { mode: { dark: darkVal } };
      }
    }
    setNested(tokens, dtcgPath, def);
  }
  return tokens;
}

// ═══════════════════════════════════════════════════════
//  Text styles — works on any plan
// ═══════════════════════════════════════════════════════

async function fetchTextStyles(tokens) {
  if (!FIGMA_TOKEN) {
    console.log('⏭️   Skipping text styles (no FIGMA_TOKEN)');
    return;
  }
  console.log('📡  Fetching text styles…');
  try {
    const { meta } = await figmaGet(`/files/${FILE_KEY}/styles`);
    const allStyles = Array.isArray(meta.styles) ? meta.styles : Object.values(meta.styles ?? {});
    const textStyles = allStyles.filter((s) => s.style_type === 'TEXT');

    if (textStyles.length === 0) {
      console.log('   No text styles found');
      return;
    }
    console.log(`   Found ${textStyles.length} text style(s)`);

    for (let i = 0; i < textStyles.length; i += 50) {
      const batch = textStyles.slice(i, i + 50);
      const ids = batch.map((s) => s.node_id).join(',');
      const { nodes } = await figmaGet(`/files/${FILE_KEY}/nodes?ids=${ids}`);

      for (const style of batch) {
        const node = nodes?.[style.node_id]?.document;
        if (!node?.style) continue;
        const s = node.style;
        const pathParts = style.name.split('/').map((p) => p.trim());

        const lineHeight =
          s.lineHeightUnit === 'FONT_SIZE_%'
            ? Math.round((s.lineHeightPercentFontSize / 100) * 100) / 100
            : s.lineHeightUnit === 'PIXELS'
              ? s.lineHeightPx
              : 'auto';

        const letterSpacing =
          typeof s.letterSpacing === 'object' ? s.letterSpacing.value : s.letterSpacing || 0;

        setNested(tokens, ['typography', ...pathParts], {
          $value: {
            fontFamily: s.fontFamily,
            fontSize: s.fontSize,
            fontWeight: s.fontWeight,
            lineHeight,
            letterSpacing,
          },
          $type: 'typography',
          ...(style.description ? { $description: style.description } : {}),
        });
      }
    }
  } catch (err) {
    console.warn('⚠️   Could not fetch text styles:', err.message);
  }
}

// ═══════════════════════════════════════════════════════
//  Main
// ═══════════════════════════════════════════════════════

async function main() {
  console.log(USE_API ? '🔑  Mode: REST API (Enterprise)\n' : '📦  Mode: Plugin export file\n');

  // 1. Load variables
  const tokens = USE_API ? await loadFromApi() : loadPluginExport();

  // 2. Fetch text styles (works on any plan)
  await fetchTextStyles(tokens);

  // 3. Scaffold empty placeholder categories
  if (!tokens.shadow) tokens.shadow = { $description: 'Shadow tokens — add values in Figma' };
  if (!tokens.motion) tokens.motion = { $description: 'Motion tokens — add values in Figma' };

  // 4. Write output
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, JSON.stringify(tokens, null, 2) + '\n');

  const total = countTokens(tokens);
  console.log(`\n✅  ${total} tokens written → tokens/tokens.json`);
  console.log('   Next step: npm run tokens:build');
}

main().catch((err) => {
  console.error('❌  Extraction failed:', err.message);
  process.exit(1);
});
