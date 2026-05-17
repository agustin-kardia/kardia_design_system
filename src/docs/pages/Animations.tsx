import React, { useState } from 'react';
import { useTheme } from '../ThemeContext';

// ─── Injected keyframes ───────────────────────────────────────────────────────

const KEYFRAMES = `
@keyframes demo-overlay-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes demo-dialog-in {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes demo-impact-scale {
  0%   { transform: scale(1); }
  30%  { transform: scale(1.065); }
  60%  { transform: scale(0.97); }
  100% { transform: scale(1); }
}
@keyframes demo-impact-flash {
  0%   { opacity: 0; }
  15%  { opacity: 0.4; }
  100% { opacity: 0; }
}
@keyframes demo-milestone-travel {
  0%   { opacity: 0; transform: translateY(0)   scale(0.7); }
  20%  { opacity: 1; transform: translateY(-14px) scale(1.1); }
  65%  { opacity: 1; transform: translateY(-32px) scale(1); }
  100% { opacity: 0; transform: translateY(-52px) scale(0.85); }
}
@keyframes demo-shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position:  200% 0; }
}
@keyframes demo-easing-bar {
  from { width: 0%; }
  to   { width: 100%; }
}
`;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function PlayButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-opacity hover:opacity-80"
      style={{ background: 'var(--color-base-low)', color: 'var(--color-text-secondary)' }}
    >
      ▶ Play
    </button>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-base font-semibold mb-4 pb-2"
      style={{ color: 'var(--color-text-primary)', borderBottom: '1px solid var(--color-border-high)' }}
    >
      {children}
    </h2>
  );
}

function Pill({ label, mono }: { label: string; mono?: boolean }) {
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded text-[11px] ${mono ? 'font-mono' : 'font-medium'}`}
      style={{ background: 'var(--color-base-low)', color: 'var(--color-text-secondary)' }}
    >
      {label}
    </span>
  );
}

// ─── Demo: UI Transitions (modal entrance) ────────────────────────────────────

function UITransitionDemo() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [key, setKey] = useState(0);
  const [playing, setPlaying] = useState(false);

  function play() {
    setPlaying(false);
    requestAnimationFrame(() => {
      setKey(k => k + 1);
      setPlaying(true);
    });
  }

  return (
    <div
      className="rounded-xl p-5 flex flex-col gap-4"
      style={{ border: '1px solid var(--color-border-high)', background: 'var(--color-base-lowest)' }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold mb-1" style={{ color: 'var(--color-text-primary)' }}>
            UI Transitions
          </p>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
            Modal overlay + dialog slide-up. Triggered by user actions.
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            <Pill label="200ms ease-out" mono />
            <Pill label="250ms spring (0.16,1,0.3,1)" mono />
          </div>
        </div>
        <PlayButton onClick={play} />
      </div>

      {/* Preview */}
      <div
        className="relative rounded-lg overflow-hidden flex items-center justify-center"
        style={{ height: 140, background: isDark ? 'var(--color-base-flat)' : '#161616' }}
      >
        {playing && (
          <div
            key={key}
            style={{
              position: 'absolute', inset: 0,
              background: 'rgba(0,0,0,0.45)',
              animation: 'demo-overlay-in 200ms ease-out forwards',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: 200, padding: '16px 20px',
                borderRadius: 12,
                background: isDark ? 'var(--color-base-lowest)' : '#ffffff',
                animation: 'demo-dialog-in 250ms cubic-bezier(0.16,1,0.3,1) forwards',
              }}
            >
              <div className="h-3 rounded mb-2" style={{ width: '60%', background: 'var(--color-base-normal)' }} />
              <div className="h-2 rounded mb-1" style={{ background: 'var(--color-base-low)' }} />
              <div className="h-2 rounded" style={{ width: '80%', background: 'var(--color-base-low)' }} />
            </div>
          </div>
        )}
        {!playing && (
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>Press Play to preview</p>
        )}
      </div>
    </div>
  );
}

// ─── Demo: Live-data reactions (impact) ───────────────────────────────────────

function LiveDataDemo() {
  const [key, setKey] = useState(0);
  const [playing, setPlaying] = useState(false);

  function play() {
    setPlaying(false);
    requestAnimationFrame(() => {
      setKey(k => k + 1);
      setPlaying(true);
      setTimeout(() => setPlaying(false), 500);
    });
  }

  return (
    <div
      className="rounded-xl p-5 flex flex-col gap-4"
      style={{ border: '1px solid var(--color-border-high)', background: 'var(--color-base-lowest)' }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold mb-1" style={{ color: 'var(--color-text-primary)' }}>
            Live-data Reactions
          </p>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
            Zone-change impact: scale bounce + white flash. Triggered by sensor data.
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            <Pill label="450ms overshoot (0.34,1.56,0.64,1)" mono />
            <Pill label="450ms ease-out (flash)" mono />
          </div>
        </div>
        <PlayButton onClick={play} />
      </div>

      {/* Preview */}
      <div
        className="rounded-lg flex items-center justify-center"
        style={{ height: 140, background: '#161616' }}
      >
        <div
          key={key}
          style={{
            position: 'relative', width: 96, height: 96, borderRadius: 12, overflow: 'hidden',
            background: 'linear-gradient(135deg, #00c26e22, #00c26e44)',
            border: '1px solid #00c26e55',
            animation: playing ? 'demo-impact-scale 450ms cubic-bezier(0.34,1.56,0.64,1) forwards' : 'none',
          }}
        >
          {/* flash overlay */}
          <div
            style={{
              position: 'absolute', inset: 0, borderRadius: 12,
              background: 'white',
              animation: playing ? 'demo-impact-flash 450ms ease-out forwards' : 'none',
            }}
          />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: '#00c26e' }}>LOW → MED</span>
            <span style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>74%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Demo: Milestone celebrations ─────────────────────────────────────────────

function MilestoneDemo() {
  const [milestoneKey, setMilestoneKey] = useState(0);
  const [shimmerKey, setShimmerKey] = useState(0);
  const [milestoneActive, setMilestoneActive] = useState(false);

  function playMilestone() {
    setMilestoneActive(false);
    requestAnimationFrame(() => {
      setMilestoneKey(k => k + 1);
      setMilestoneActive(true);
      setTimeout(() => setMilestoneActive(false), 1300);
    });
  }

  function playShimmer() {
    setShimmerKey(k => k + 1);
  }

  return (
    <div
      className="rounded-xl p-5 flex flex-col gap-4"
      style={{ border: '1px solid var(--color-border-high)', background: 'var(--color-base-lowest)' }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold mb-1" style={{ color: 'var(--color-text-primary)' }}>
            Milestone Celebrations
          </p>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
            One-shot travel animations and looping shimmer. Most expressive category.
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            <Pill label="1.2s ease-out (travel)" mono />
            <Pill label="2s ease-in-out loop (shimmer)" mono />
          </div>
        </div>
        <div className="flex gap-2">
          <PlayButton onClick={playMilestone} />
          <button
            onClick={playShimmer}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-opacity hover:opacity-80"
            style={{ background: 'var(--color-base-low)', color: 'var(--color-text-secondary)' }}
          >
            ↻ Shimmer
          </button>
        </div>
      </div>

      {/* Preview */}
      <div
        className="rounded-lg flex items-center justify-center gap-8"
        style={{ height: 140, background: '#161616' }}
      >
        {/* Milestone travel */}
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>Kardia milestone</p>
          <div style={{ position: 'relative', height: 60, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, background: 'var(--color-base-lowest)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-primary)' }}>20</span>
            </div>
            {milestoneActive && (
              <div
                key={milestoneKey}
                style={{
                  position: 'absolute', bottom: 44, left: '50%', transform: 'translateX(-50%)',
                  fontSize: 20, fontWeight: 800, color: '#eb282c', whiteSpace: 'nowrap',
                  animation: 'demo-milestone-travel 1.2s ease-out forwards',
                }}
              >
                +20
              </div>
            )}
          </div>
        </div>

        {/* Shimmer */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>Pre-workout shimmer</p>
          <div
            key={shimmerKey}
            style={{
              width: 96, height: 40, borderRadius: 8,
              background: 'linear-gradient(115deg, #ffffff08 25%, #ffffff22 50%, #ffffff08 75%)',
              backgroundSize: '200% 100%',
              border: '1px solid rgba(255,255,255,0.1)',
              animation: 'demo-shimmer 2s ease-in-out infinite',
            }}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Duration tiers ───────────────────────────────────────────────────────────

const TIERS = [
  { name: 'micro',    value: 150,  use: 'Hover states, opacity flickers' },
  { name: 'short',    value: 200,  use: 'Overlay fade-in' },
  { name: 'moderate', value: 250,  use: 'Modal dialog slide-up, card enter' },
  { name: 'emphasis', value: 450,  use: 'Zone-change impact (scale + flash)' },
  { name: 'long',     value: 1200, use: 'Milestone travel animations' },
  { name: 'loop',     value: 2000, use: 'Shimmer / looping glows' },
];

function DurationTiers() {
  const max = TIERS[TIERS.length - 1].value;
  return (
    <div className="flex flex-col gap-2">
      {TIERS.map(t => (
        <div key={t.name} className="flex items-center gap-3">
          <span className="text-xs font-mono w-20 shrink-0 text-right" style={{ color: 'var(--color-text-secondary)' }}>
            {t.value}ms
          </span>
          <div className="flex-1 flex items-center gap-3">
            <div
              className="h-1.5 rounded-full"
              style={{
                width: `${(t.value / max) * 100}%`,
                background: 'var(--color-brand-primary)',
                opacity: 0.25 + (t.value / max) * 0.75,
              }}
            />
            <span className="text-xs font-semibold shrink-0" style={{ color: 'var(--color-text-primary)' }}>
              {t.name}
            </span>
            <span className="text-xs hidden sm:block" style={{ color: 'var(--color-text-secondary)' }}>
              — {t.use}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Easing curves ────────────────────────────────────────────────────────────

const EASINGS = [
  { name: 'ease-out',                         value: 'ease-out',                                     use: 'Standard fades & exits' },
  { name: 'spring',                            value: 'cubic-bezier(0.16, 1, 0.3, 1)',                use: 'UI elements entering (modal dialog)' },
  { name: 'overshoot spring',                  value: 'cubic-bezier(0.34, 1.56, 0.64, 1)',            use: 'Data-driven reactions (impact scale)' },
  { name: 'ease-in-out',                       value: 'ease-in-out',                                  use: 'Symmetric loops (shimmer)' },
];

function EasingRow({ name, value, use }: { name: string; value: string; use: string }) {
  const [key, setKey] = useState(0);

  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 rounded-lg"
      style={{ background: 'var(--color-base-lowest)', border: '1px solid var(--color-border-high)' }}
    >
      <div style={{ minWidth: 160 }}>
        <p className="text-xs font-semibold mb-0.5" style={{ color: 'var(--color-text-primary)' }}>{name}</p>
        <code className="text-[10px] font-mono" style={{ color: 'var(--color-text-secondary)' }}>{value}</code>
      </div>

      {/* Animated bar */}
      <div
        className="flex-1 rounded overflow-hidden cursor-pointer"
        style={{ height: 6, background: 'var(--color-base-low)' }}
        title="Click to replay"
        onClick={() => setKey(k => k + 1)}
      >
        <div
          key={key}
          style={{
            height: '100%',
            background: 'var(--color-brand-primary)',
            animation: `demo-easing-bar 800ms ${value} forwards`,
          }}
        />
      </div>

      <p className="text-xs sm:w-52 shrink-0" style={{ color: 'var(--color-text-secondary)' }}>{use}</p>
    </div>
  );
}

// ─── Rules ────────────────────────────────────────────────────────────────────

const RULES = [
  { icon: '✓', text: 'Only animate transform and opacity — never layout properties (width, top, left). They stay on the GPU and avoid reflow.' },
  { icon: '✓', text: 'Use forwards fill on one-shot animations so the end state holds.' },
  { icon: '✓', text: 'Namespace @keyframes names (modal-dialog-in, not slide-up) to avoid collisions.' },
  { icon: '✓', text: 'DS components wrap animations in @media (prefers-reduced-motion: no-preference).' },
  { icon: '✗', text: 'Never loop an animation directly on a metric value — only on overlay/highlight elements.' },
  { icon: '✗', text: 'Never put workout-specific animations (impact, milestones) in the DS — they live in App.css and are applied via className prop.' },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AnimationsPage() {
  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-10 pt-16 sm:pt-12 pb-12">
      <style>{KEYFRAMES}</style>

      {/* Header */}
      <div className="mb-10">
        <div
          className="inline-flex items-center gap-2 text-[#eb282c] text-xs font-semibold px-3 py-1 rounded-full mb-4"
          style={{ background: 'rgba(235,40,44,0.12)' }}
        >
          <span className="size-1.5 rounded-full bg-[#eb282c] inline-block" />
          Motion
        </div>
        <h1 className="text-3xl font-bold mb-3 leading-tight" style={{ color: 'var(--color-text-primary)' }}>
          Animation Guidelines
        </h1>
        <p className="text-base leading-relaxed max-w-xl" style={{ color: 'var(--color-text-secondary)' }}>
          Kardia is a live, high-intensity workout display. Animations must feel purposeful and immediate — never decorative noise that distracts from real-time data.
        </p>
      </div>

      {/* Three categories */}
      <div className="mb-10">
        <SectionTitle>Three Categories</SectionTitle>
        <div className="flex flex-col gap-4">
          <UITransitionDemo />
          <LiveDataDemo />
          <MilestoneDemo />
        </div>
      </div>

      {/* Duration tiers */}
      <div className="mb-10">
        <SectionTitle>Duration Tiers</SectionTitle>
        <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
          Use these tiers — don't introduce new arbitrary values.
        </p>
        <DurationTiers />
      </div>

      {/* Easing curves */}
      <div className="mb-10">
        <SectionTitle>Easing Curves</SectionTitle>
        <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
          Click any bar to replay it.
        </p>
        <div className="flex flex-col gap-2">
          {EASINGS.map(e => (
            <EasingRow key={e.name} {...e} />
          ))}
        </div>
      </div>

      {/* Where animations live */}
      <div className="mb-10">
        <SectionTitle>Where Animations Live</SectionTitle>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            {
              label: 'Design System',
              file: 'Modal.module.css · WorkoutCard.module.css',
              desc: 'Component-intrinsic entrance and exit animations. Defined here, apply everywhere automatically.',
              examples: ['modal-overlay-in', 'modal-dialog-in'],
            },
            {
              label: 'Consuming App',
              file: 'App.css in kardia_facility_app',
              desc: 'Event-driven, workout-context overlays. Applied via className prop on DS components.',
              examples: ['participant-card-impact', 'preworkout-ready-content', 'kardia-milestone'],
            },
          ].map(loc => (
            <div
              key={loc.label}
              className="rounded-xl p-4"
              style={{ border: '1px solid var(--color-border-high)', background: 'var(--color-base-lowest)' }}
            >
              <p className="text-sm font-semibold mb-1" style={{ color: 'var(--color-text-primary)' }}>{loc.label}</p>
              <code className="text-[10px] font-mono block mb-2" style={{ color: 'var(--color-text-secondary)' }}>{loc.file}</code>
              <p className="text-xs mb-3 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{loc.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {loc.examples.map(ex => (
                  <code key={ex} className="text-[10px] font-mono px-2 py-0.5 rounded" style={{ background: 'var(--color-base-low)', color: 'var(--color-text-primary)' }}>{ex}</code>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rules */}
      <div className="mb-10">
        <SectionTitle>Rules</SectionTitle>
        <div className="flex flex-col gap-2">
          {RULES.map((r, i) => (
            <div key={i} className="flex gap-3 text-sm">
              <span
                className="shrink-0 font-bold"
                style={{ color: r.icon === '✓' ? 'var(--color-text-success)' : 'var(--color-text-error)' }}
              >
                {r.icon}
              </span>
              <span style={{ color: 'var(--color-text-secondary)' }}>{r.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
