/**
 * Style Dictionary v4 configuration.
 *
 * Reads tokens/tokens.json (DTCG format) and outputs:
 *   - dist/flutter/app_tokens.dart   (Dart class with static const fields)
 *   - dist/css/variables.css          (:root + [data-theme='dark'])
 *   - dist/js/tokens.ts              (typed nested object)
 *
 * Run:  npm run tokens:build   →   node sd.config.js
 */

import StyleDictionary from 'style-dictionary';

const GENERATED_HEADER = '// GENERATED — do not edit by hand';

// ─── Shared helpers ─────────────────────────────────────

function kebab(path) {
  return path.join('-').toLowerCase().replace(/\s+/g, '-');
}

function camelCase(segments) {
  const parts = segments
    .flatMap((s) => s.split(/[-_\s]+/).filter(Boolean))
    .map((p) => p.replace(/[^\w]/g, ''))
    .filter(Boolean);

  return parts
    .map((p, i) => {
      if (i === 0) return p.charAt(0).toLowerCase() + p.slice(1);
      return p.charAt(0).toUpperCase() + p.slice(1);
    })
    .join('');
}

function sanitizeCssName(name) {
  return name
    .replace(/[^\w-]/g, '')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

/** Shorthand — SD v4 + DTCG stores resolved values in token.$value. */
function val(token) {
  return token.$value;
}

/** Check whether the original $value is a {reference}. */
function isReference(token) {
  const orig = token.original?.$value;
  return typeof orig === 'string' && orig.includes('{');
}

/** Resolve a dark-mode extension value that might be a {reference}. */
function resolveDarkValue(raw, dictionary) {
  if (typeof raw !== 'string' || !raw.includes('{')) return raw;
  const refPath = raw.replace(/[{}]/g, '');
  const found = dictionary.allTokens.find((t) => t.path.join('.') === refPath);
  return found ? val(found) : raw;
}

// ─── Flutter helpers ────────────────────────────────────

function hexToFlutterColor(hex) {
  let h = String(hex).replace('#', '');
  if (h.length === 6) return `Color(0xFF${h.toUpperCase()})`;
  if (h.length === 8) {
    // RRGGBBAA → AARRGGBB
    return `Color(0x${h.slice(6, 8).toUpperCase()}${h.slice(0, 6).toUpperCase()})`;
  }
  return 'Color(0xFF000000)';
}

// ═══════════════════════════════════════════════════════
//  Custom format: Flutter / app_tokens.dart
// ═══════════════════════════════════════════════════════

function formatFlutter({ dictionary }) {
  const lines = [
    GENERATED_HEADER,
    "import 'dart:ui';",
    "import 'package:flutter/material.dart';",
    '',
    'class AppTokens {',
    '  AppTokens._();',
    '',
  ];

  const groups = {};
  for (const token of dictionary.allTokens) {
    const cat = token.path[0];
    (groups[cat] ??= []).push(token);
  }

  for (const [category, tokens] of Object.entries(groups)) {
    lines.push(`  // ── ${category} ${'─'.repeat(Math.max(0, 40 - category.length))}`);

    for (const token of tokens) {
      const name = camelCase(token.path);
      if (!name) continue;

      const type = token.$type;
      const v = val(token);
      const ext = token.$extensions ?? token.original?.$extensions;
      const darkRaw = ext?.mode?.dark;

      if (type === 'color') {
        const hex = typeof v === 'string' ? v : '#000000';
        lines.push(`  static const Color ${name} = ${hexToFlutterColor(hex)};`);

        if (darkRaw) {
          const darkHex = resolveDarkValue(darkRaw, dictionary);
          lines.push(`  static const Color ${name}Dark = ${hexToFlutterColor(darkHex)};`);
        }
      } else if (type === 'typography' && typeof v === 'object') {
        const weight = `FontWeight.w${v.fontWeight || 400}`;
        lines.push(`  static const TextStyle ${name} = TextStyle(`);
        lines.push(`    fontFamily: '${v.fontFamily}',`);
        lines.push(`    fontSize: ${v.fontSize},`);
        lines.push(`    fontWeight: ${weight},`);
        if (v.lineHeight != null && v.lineHeight !== 'auto') {
          lines.push(`    height: ${v.lineHeight},`);
        }
        if (v.letterSpacing) {
          lines.push(`    letterSpacing: ${v.letterSpacing},`);
        }
        lines.push(`  );`);
      } else if (type === 'dimension') {
        lines.push(`  static const double ${name} = ${v};`);
      } else if (typeof v === 'number') {
        lines.push(`  static const double ${name} = ${v};`);
      } else if (typeof v === 'string') {
        lines.push(`  static const String ${name} = '${v}';`);
      }
    }

    lines.push('');
  }

  lines.push('}');
  lines.push('');
  return lines.join('\n');
}

// ═══════════════════════════════════════════════════════
//  Custom format: CSS / variables.css
// ═══════════════════════════════════════════════════════

function formatCSS({ dictionary }) {
  const rootLines = [];
  const darkLines = [];

  for (const token of dictionary.allTokens) {
    const varName = sanitizeCssName(kebab(token.path));
    if (!varName) continue;
    const type = token.$type;
    const v = val(token);

    // Typography expands into individual sub-properties
    if (type === 'typography' && typeof v === 'object') {
      rootLines.push(`  --${varName}-font-family: '${v.fontFamily}';`);
      rootLines.push(`  --${varName}-font-size: ${v.fontSize}px;`);
      rootLines.push(`  --${varName}-font-weight: ${v.fontWeight};`);
      if (v.lineHeight != null && v.lineHeight !== 'auto') {
        rootLines.push(`  --${varName}-line-height: ${v.lineHeight};`);
      }
      if (v.letterSpacing) {
        rootLines.push(`  --${varName}-letter-spacing: ${v.letterSpacing}px;`);
      }
      continue;
    }

    const formatted = type === 'dimension' ? `${v}px` : v;
    rootLines.push(`  --${varName}: ${formatted};`);

    // Dark-mode override
    const ext = token.$extensions ?? token.original?.$extensions;
    const darkRaw = ext?.mode?.dark;
    if (darkRaw != null) {
      let darkResolved = resolveDarkValue(darkRaw, dictionary);
      if (type === 'dimension' && typeof darkResolved === 'number') {
        darkResolved = `${darkResolved}px`;
      }
      darkLines.push(`  --${varName}: ${darkResolved};`);
    }
  }

  let output = `/* GENERATED — do not edit by hand */\n\n`;
  output += `:root {\n${rootLines.join('\n')}\n}\n`;
  if (darkLines.length) {
    output += `\n[data-theme='dark'] {\n${darkLines.join('\n')}\n}\n`;
  }
  return output;
}

// ═══════════════════════════════════════════════════════
//  Custom format: TypeScript / tokens.ts
// ═══════════════════════════════════════════════════════

function formatTypeScript({ dictionary }) {
  const nested = {};

  for (const token of dictionary.allTokens) {
    let cur = nested;
    for (let i = 0; i < token.path.length - 1; i++) {
      const key = token.path[i];
      if (!(key in cur)) cur[key] = {};
      cur = cur[key];
    }

    const leaf = token.path.at(-1);
    const v = val(token);

    if (token.$type === 'color' && isReference(token)) {
      const varName = sanitizeCssName(kebab(token.path));
      cur[leaf] = `var(--${varName})`;
    } else if (token.$type === 'typography' && typeof v === 'object') {
      cur[leaf] = { ...v };
    } else {
      cur[leaf] = v;
    }
  }

  const json = JSON.stringify(nested, null, 2);

  return [
    GENERATED_HEADER,
    '',
    `export const tokens = ${json} as const;`,
    '',
    'export type Tokens = typeof tokens;',
    'export default tokens;',
    '',
  ].join('\n');
}

// ═══════════════════════════════════════════════════════
//  Build
// ═══════════════════════════════════════════════════════

const sd = new StyleDictionary({
  source: ['tokens/**/*.json'],
  usesDtcg: true,
  log: { verbosity: 'silent' },
  platforms: {
    flutter: {
      buildPath: 'dist/flutter/',
      files: [{ destination: 'app_tokens.dart', format: 'flutter/tokens' }],
    },
    css: {
      buildPath: 'dist/css/',
      files: [{ destination: 'variables.css', format: 'css/tokens' }],
    },
    ts: {
      buildPath: 'dist/js/',
      files: [{ destination: 'tokens.ts', format: 'ts/tokens' }],
    },
  },
  hooks: {
    formats: {
      'flutter/tokens': formatFlutter,
      'css/tokens': formatCSS,
      'ts/tokens': formatTypeScript,
    },
  },
});

await sd.buildAllPlatforms();
console.log('✅  All platform tokens built.');
