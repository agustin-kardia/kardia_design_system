import React, { useState } from 'react';

// ─── Data ────────────────────────────────────────────────────────────────────

const COLOR_GROUPS = [
  {
    name: 'Brand',
    tokens: [
      { name: 'primary',   var: '--color-brand-primary',   value: '#eb282c', dark: null },
      { name: 'dark',      var: '--color-brand-dark',      value: '#c50004', dark: null },
      { name: 'secondary', var: '--color-brand-secondary', value: '#a6ff00', dark: null },
    ],
  },
  {
    name: 'Interaction',
    tokens: [
      { name: 'primary-enabled',  var: '--color-interaction-primary-enabled',  value: '#eb282c', dark: null },
      { name: 'primary-hover',    var: '--color-interaction-primary-hover',    value: '#c50004', dark: null },
      { name: 'primary-pressed',  var: '--color-interaction-primary-pressed',  value: '#b80004', dark: null },
      { name: 'primary-disabled', var: '--color-interaction-primary-disabled', value: '#dbdbdb', dark: '#6b6b6b' },
    ],
  },
  {
    name: 'Feedback',
    tokens: [
      { name: 'branded',       var: '--color-feedback-branded',       value: '#eb282c', dark: null },
      { name: 'branded-light', var: '--color-feedback-branded-light', value: '#ffbabc', dark: null },
      { name: 'branded-alpha', var: '--color-feedback-branded-alpha', value: 'rgba(235,40,44,0.25)', dark: null },
      { name: 'error',         var: '--color-feedback-error',         value: '#ec0043', dark: null },
      { name: 'error-light',   var: '--color-feedback-error-light',   value: '#ffdae4', dark: null },
      { name: 'error-alpha',   var: '--color-feedback-error-alpha',   value: 'rgba(236,0,67,0.25)', dark: null },
      { name: 'warning',       var: '--color-feedback-warning',       value: '#ff8420', dark: null },
      { name: 'warning-light', var: '--color-feedback-warning-light', value: '#ffe0c7', dark: null },
      { name: 'warning-alpha', var: '--color-feedback-warning-alpha', value: 'rgba(255,132,32,0.25)', dark: null },
      { name: 'success',       var: '--color-feedback-success',       value: '#00c26e', dark: null },
      { name: 'success-light', var: '--color-feedback-success-light', value: '#bff0db', dark: null },
      { name: 'success-alpha', var: '--color-feedback-success-alpha', value: 'rgba(0,194,110,0.25)', dark: null },
      { name: 'info',          var: '--color-feedback-info',          value: '#0098df', dark: null },
      { name: 'info-light',    var: '--color-feedback-info-light',    value: '#bfe5f7', dark: null },
      { name: 'info-alpha',    var: '--color-feedback-info-alpha',    value: 'rgba(0,152,223,0.25)', dark: null },
      { name: 'neutral',       var: '--color-feedback-neutral',       value: '#dbdbdb', dark: null },
      { name: 'neutral-light', var: '--color-feedback-neutral-light', value: '#f4f4f4', dark: null },
    ],
  },
  {
    name: 'Base',
    tokens: [
      { name: 'flat',          var: '--color-base-flat',          value: '#ffffff', dark: '#000000' },
      { name: 'lowest',        var: '--color-base-lowest',        value: '#f9f9f9', dark: '#2a2a2a' },
      { name: 'low',           var: '--color-base-low',           value: '#f4f4f4', dark: '#6b6b6b' },
      { name: 'normal',        var: '--color-base-normal',        value: '#dbdbdb', dark: null },
      { name: 'high',          var: '--color-base-high',          value: '#6b6b6b', dark: '#f4f4f4' },
      { name: 'highest',       var: '--color-base-highest',       value: '#2a2a2a', dark: '#f9f9f9' },
      { name: 'overlay',       var: '--color-base-overlay',       value: 'rgba(22,22,22,0.5)', dark: null },
      { name: 'branded',       var: '--color-base-branded',       value: '#eb282c', dark: null },
      { name: 'branded-light', var: '--color-base-branded-light', value: '#fcdfe0', dark: '#ffbabc' },
    ],
  },
  {
    name: 'Text',
    tokens: [
      { name: 'primary',     var: '--color-text-primary',     value: '#161616', dark: '#ffffff' },
      { name: 'secondary',   var: '--color-text-secondary',   value: '#677374', dark: '#a6b3b5' },
      { name: 'disabled',    var: '--color-text-disabled',    value: '#a6b3b5', dark: '#677374' },
      { name: 'inverted',    var: '--color-text-inverted',    value: '#ffffff',  dark: '#161616' },
      { name: 'branded',     var: '--color-text-branded',     value: '#eb282c', dark: null },
      { name: 'contained',   var: '--color-text-contained',   value: '#ffffff',  dark: null },
      { name: 'error',       var: '--color-text-error',       value: '#d00025', dark: null },
      { name: 'warning',     var: '--color-text-warning',     value: '#e94e00', dark: null },
      { name: 'success',     var: '--color-text-success',     value: '#008337', dark: null },
      { name: 'information', var: '--color-text-information', value: '#0075bb', dark: null },
    ],
  },
  {
    name: 'Border',
    tokens: [
      { name: 'high',     var: '--color-border-high',     value: '#ebebeb', dark: '#6b6b6b' },
      { name: 'normal',   var: '--color-border-normal',   value: '#f4f4f4', dark: '#2a2a2a' },
      { name: 'inverted', var: '--color-border-inverted', value: '#161616', dark: '#f4f4f4' },
    ],
  },
];

const SPACING_TOKENS = [
  { name: 'none',    var: '--spacing-none',    value: 0  },
  { name: 'tiny',    var: '--spacing-tiny',    value: 2  },
  { name: 'xsmall',  var: '--spacing-xsmall',  value: 4  },
  { name: 'small',   var: '--spacing-small',   value: 8  },
  { name: 'medium',  var: '--spacing-medium',  value: 12 },
  { name: 'large',   var: '--spacing-large',   value: 16 },
  { name: 'xlarge',  var: '--spacing-xlarge',  value: 20 },
  { name: '2xlarge', var: '--spacing-2xlarge', value: 24 },
  { name: '3xlarge', var: '--spacing-3xlarge', value: 32 },
  { name: '4xlarge', var: '--spacing-4xlarge', value: 36 },
  { name: '5xlarge', var: '--spacing-5xlarge', value: 40 },
  { name: '6xlarge', var: '--spacing-6xlarge', value: 48 },
  { name: '7xlarge', var: '--spacing-7xlarge', value: 56 },
  { name: '8xlarge', var: '--spacing-8xlarge', value: 64 },
];

const RADIUS_TOKENS = [
  { name: 'tiny',    var: '--border-radius-tiny',    value: 2   },
  { name: 'small',   var: '--border-radius-small',   value: 4   },
  { name: 'medium',  var: '--border-radius-medium',  value: 6   },
  { name: 'large',   var: '--border-radius-large',   value: 8   },
  { name: 'xlarge',  var: '--border-radius-xlarge',  value: 12  },
  { name: '2xlarge', var: '--border-radius-2xlarge', value: 16  },
  { name: '3xlarge', var: '--border-radius-3xlarge', value: 20  },
  { name: '4xlarge', var: '--border-radius-4xlarge', value: 24  },
  { name: 'action',  var: '--border-radius-action',  value: 200 },
];

const BORDER_WIDTH_TOKENS = [
  { name: 'thin',   var: '--border-width-thin',   value: 1   },
  { name: 'small',  var: '--border-width-small',  value: 1.5 },
  { name: 'medium', var: '--border-width-medium', value: 2   },
  { name: 'thick',  var: '--border-width-thick',  value: 4   },
];

const TYPE_SCALE = [
  { name: 'h1',        sizes: [44], weights: [700] },
  { name: 'h2',        sizes: [36], weights: [700] },
  { name: 'h3',        sizes: [28], weights: [700, 600, 500] },
  { name: 'h4',        sizes: [24], weights: [700, 600, 500] },
  { name: 'h5',        sizes: [20], weights: [700, 600, 500] },
  { name: 'paragraph', sizes: [16], weights: [700, 600, 500, 400] },
  { name: 'secondary', sizes: [14], weights: [700, 600, 500, 400] },
  { name: 'caption',   sizes: [12], weights: [700, 600, 500, 400] },
  { name: 'tag',       sizes: [10], weights: [700, 600, 500, 400] },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────


function CopyBadge({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
      className="text-[9px] font-mono transition-colors truncate max-w-[140px] text-left"
      style={{ color: 'var(--color-text-secondary)' }}
      title={text}
    >
      {copied ? '✓ copied' : text}
    </button>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-14">
      <h2 className="text-xl font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>{title}</h2>
      <div className="h-px mb-6" style={{ background: 'var(--color-border-high)' }} />
      {children}
    </section>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function TokensPage() {
  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-10 pt-16 sm:pt-12 pb-8 sm:pb-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>Tokens</h1>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          All values are compiled from <code className="px-1.5 py-0.5 rounded text-xs" style={{ background: 'var(--color-base-low)' }}>tokens/tokens.json</code> via Style Dictionary.
          Click any CSS variable name to copy it.
        </p>
      </div>

      {/* ── Colors ── */}
      <Section id="colors" title="Colors">
        {COLOR_GROUPS.map(group => (
          <div key={group.name} className="mb-8">
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--color-text-secondary)' }}>{group.name}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {group.tokens.map(token => (
                <div key={token.name} className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--color-border-high)' }}>
                  {/* Live swatch — uses the actual CSS var so it flips in dark mode */}
                  <div
                    className="h-14 w-full"
                    style={{ background: `var(${token.var})` }}
                  />
                  <div className="px-3 py-2" style={{ background: 'var(--color-base-flat)' }}>
                    <p className="text-xs font-semibold mb-0.5" style={{ color: 'var(--color-text-primary)' }}>{token.name}</p>
                    <CopyBadge text={token.var} />
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-[9px] font-mono" style={{ color: 'var(--color-text-disabled)' }}>{token.value}</p>
                      {token.dark && (
                        <span className="text-[8px] px-1 py-0.5 rounded" style={{ background: 'var(--color-base-highest)', color: 'var(--color-text-inverted)' }}>dark</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Section>

      {/* ── Typography ── */}
      <Section id="typography" title="Typography">
        <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)' }}>
          Typeface: <strong style={{ color: 'var(--color-text-primary)' }}>Archivo</strong> — all weights 400–700. Line height 1.25 for headings, 1.5 for body.
        </p>
        <div className="space-y-1">
          {TYPE_SCALE.map(style => (
            <div key={style.name}>
              {style.weights.map(weight => (
                <div
                  key={weight}
                  className="flex items-baseline gap-4 py-3"
                  style={{ borderBottom: '1px solid var(--color-border-high)' }}
                >
                  <div className="w-28 shrink-0">
                    <p className="text-xs font-mono" style={{ color: 'var(--color-text-disabled)' }}>{style.name}/{weight}</p>
                    <p className="text-[10px]" style={{ color: 'var(--color-border-normal)' }}>{style.sizes[0]}px</p>
                  </div>
                  <p
                    className="truncate flex-1"
                    style={{ fontSize: style.sizes[0], fontWeight: weight, lineHeight: style.sizes[0] >= 20 ? 1.25 : 1.5, color: 'var(--color-text-primary)' }}
                  >
                    The quick brown fox
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Section>

      {/* ── Spacing ── */}
      <Section id="spacing" title="Spacing">
        <div className="space-y-2">
          {SPACING_TOKENS.map(token => (
            <div key={token.name} className="flex items-center gap-4">
              <div className="w-20 shrink-0 text-right">
                <p className="text-xs font-mono" style={{ color: 'var(--color-text-secondary)' }}>{token.name}</p>
                <p className="text-[10px]" style={{ color: 'var(--color-text-disabled)' }}>{token.value}px</p>
              </div>
              <div className="flex-1 flex items-center gap-2">
                <div
                  className="bg-[#eb282c] rounded-sm h-4 shrink-0"
                  style={{ width: Math.max(token.value, 2) }}
                />
                <CopyBadge text={token.var} />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Border Radius ── */}
      <Section id="border-radius" title="Border Radius">
        <div className="flex flex-wrap gap-6">
          {RADIUS_TOKENS.map(token => (
            <div key={token.name} className="flex flex-col items-center gap-2">
              <div
                className="size-16"
                style={{ background: 'var(--color-base-lowest)', border: '2px solid #eb282c', borderRadius: Math.min(token.value, 32) }}
              />
              <div className="text-center">
                <p className="text-xs font-semibold" style={{ color: 'var(--color-text-primary)' }}>{token.name}</p>
                <p className="text-[10px]" style={{ color: 'var(--color-text-secondary)' }}>{token.value}px</p>
                <CopyBadge text={token.var} />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Border Width ── */}
      <Section id="border-width" title="Border Width">
        <div className="flex gap-8">
          {BORDER_WIDTH_TOKENS.map(token => (
            <div key={token.name} className="flex flex-col items-center gap-3">
              <div
                className="w-16 h-10 rounded-md"
                style={{ borderWidth: token.value, borderStyle: 'solid', borderColor: 'var(--color-text-primary)' }}
              />
              <div className="text-center">
                <p className="text-xs font-semibold" style={{ color: 'var(--color-text-primary)' }}>{token.name}</p>
                <p className="text-[10px]" style={{ color: 'var(--color-text-secondary)' }}>{token.value}px</p>
                <CopyBadge text={token.var} />
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
