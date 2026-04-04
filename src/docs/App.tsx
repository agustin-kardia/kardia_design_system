import React, { useState } from 'react';
import TokensPage from './pages/Tokens';
import ComponentsPage from './pages/Components';
import { useTheme } from './ThemeContext';
import { ThemeToggle } from './ThemeToggle';
import { KardiaIsotipo } from '../assets/logos/KardiaIsotipo';
import { Icon } from '../components/Icon/Icon';

type Page = 'overview' | 'tokens' | 'components';

const NAV: { id: Page; label: string; icon: string }[] = [
  { id: 'overview', label: 'Overview', icon: 'home' },
  { id: 'tokens', label: 'Tokens', icon: 'deployed_code' },
  { id: 'components', label: 'Components', icon: 'dashboard' },
];

export default function App() {
  const [page, setPage] = useState<Page>('overview');
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  function navigate(p: Page) {
    setPage(p);
    setMenuOpen(false);
  }

  const sidebarContent = (
    <>
      {/* Logo */}
      <div
        className="px-5 py-5"
        style={{ borderBottom: `1px solid ${isDark ? 'var(--color-border-normal)' : '#f4f4f4'}` }}
      >
        <div className="flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5">
            <div className="size-6 rounded-md bg-[#eb282c] flex items-center justify-center shrink-0 p-1">
              <KardiaIsotipo color="#111112" width="100%" height="100%" />
            </div>
            <div>
              <p className="font-bold text-sm" style={{ color: 'var(--color-text-primary)' }}>Kardia DS</p>
              <p className="text-[10px]" style={{ color: 'var(--color-text-secondary)' }}>v0.1.0</p>
            </div>
          </div>
          {/* Close button — mobile only */}
          <button
            className="flex items-center justify-center rounded-lg p-1 hamburger-only"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            <Icon name="close" size={20} weight={300} variant="rounded" fill={0} />
          </button>
        </div>
      </div>

      {/* Nav */}
      <nav className="p-3 flex flex-col gap-0.5 flex-1">
        {NAV.map(item => (
          <button
            key={item.id}
            onClick={() => navigate(item.id)}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2.5 transition-colors"
            style={
              page === item.id
                ? { background: isDark ? 'rgba(235,40,44,0.15)' : '#fcdfe0', color: '#eb282c' }
                : { color: 'var(--color-text-secondary)' }
            }
            onMouseEnter={e => {
              if (page !== item.id) {
                (e.currentTarget as HTMLElement).style.background = isDark ? 'var(--color-base-low)' : '#f9f9f9';
                (e.currentTarget as HTMLElement).style.color = 'var(--color-text-primary)';
              }
            }}
            onMouseLeave={e => {
              if (page !== item.id) {
                (e.currentTarget as HTMLElement).style.background = 'transparent';
                (e.currentTarget as HTMLElement).style.color = 'var(--color-text-secondary)';
              }
            }}
          >
            <Icon name={item.icon} size={20} weight={300} variant="rounded" fill={0} />
            {item.label}
          </button>
        ))}
      </nav>

      {/* Theme toggle + footer */}
      <div
        className="px-4 py-4 flex flex-col gap-3"
        style={{ borderTop: `1px solid ${isDark ? 'var(--color-border-normal)' : '#f4f4f4'}` }}
      >
        <ThemeToggle />
        <p className="text-[10px] leading-relaxed" style={{ color: 'var(--color-text-disabled)' }}>
          Source of truth: Figma — Kardia Customer App
        </p>
      </div>
    </>
  );

  return (
    <>
      <style>{`
        @media (max-width: 760px) {
          .sidebar-desktop { display: none !important; }
          .hamburger-btn { display: flex !important; }
          .mobile-drawer {
            position: fixed; inset: 0; z-index: 50;
          }
          .mobile-drawer-backdrop {
            position: absolute; inset: 0;
            background: rgba(0,0,0,0.5);
          }
          .mobile-drawer-panel {
            position: absolute; top: 0; left: 0; bottom: 0;
            width: 224px;
            display: flex; flex-direction: column;
            overflow: hidden;
          }
        }
        @media (min-width: 761px) {
          .hamburger-btn { display: none !important; }
          .mobile-drawer { display: none !important; }
          .hamburger-only { display: none !important; }
        }
      `}</style>

      <div
        className="flex h-screen overflow-hidden"
        style={{
          background: isDark ? 'var(--color-base-flat)' : '#ffffff',
          color: isDark ? 'var(--color-text-primary)' : '#161616',
        }}
      >
        {/* Sidebar — desktop */}
        <aside
          className="sidebar-desktop w-56 shrink-0 flex flex-col h-screen transition-colors"
          style={{
            borderRight: `1px solid ${isDark ? 'var(--color-border-normal)' : '#f4f4f4'}`,
            background: isDark ? 'var(--color-base-lowest)' : '#ffffff',
          }}
        >
          {sidebarContent}
        </aside>

        {/* Hamburger button — mobile only */}
        <button
          className="hamburger-btn fixed top-4 left-4 z-40 items-center justify-center rounded-lg p-2"
          style={{
            background: isDark ? 'var(--color-base-lowest)' : '#ffffff',
            border: `1px solid ${isDark ? 'var(--color-border-normal)' : '#f4f4f4'}`,
            color: 'var(--color-text-primary)',
          }}
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <Icon name="menu" size={20} weight={300} variant="rounded" fill={0} />
        </button>

        {/* Mobile drawer */}
        {menuOpen && (
          <div className="mobile-drawer">
            <div className="mobile-drawer-backdrop" onClick={() => setMenuOpen(false)} />
            <div
              className="mobile-drawer-panel"
              style={{
                background: isDark ? 'var(--color-base-lowest)' : '#ffffff',
                borderRight: `1px solid ${isDark ? 'var(--color-border-normal)' : '#f4f4f4'}`,
              }}
            >
              {sidebarContent}
            </div>
          </div>
        )}

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          {page === 'overview' && <OverviewPage onNavigate={navigate} />}
          {page === 'tokens' && <TokensPage />}
          {page === 'components' && <ComponentsPage />}
        </main>
      </div>
    </>
  );
}

function OverviewPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="max-w-3xl mx-auto px-10 py-12">
      {/* Hero */}
      <div className="mb-12">
        <div
          className="inline-flex items-center gap-2 text-[#eb282c] text-xs font-semibold px-3 py-1 rounded-full mb-4"
          style={{ background: isDark ? 'rgba(235,40,44,0.15)' : '#fcdfe0' }}
        >
          <span className="size-1.5 rounded-full bg-[#eb282c] inline-block" />
          Design System
        </div>
        <h1 className="text-4xl font-bold mb-4 leading-tight" style={{ color: 'var(--color-text-primary)' }}>
          Kardia Design System
        </h1>
        <p className="text-lg leading-relaxed max-w-xl" style={{ color: 'var(--color-text-secondary)' }}>
          A single source of truth for tokens and UI components across all Kardia platforms — web, mobile, and Flutter.
          Tokens are defined once in DTCG format and compiled to CSS, TypeScript, and Dart.
        </p>
      </div>

      {/* Quick cards */}
      <div className="grid grid-cols-3 gap-4 mb-12">
        {[
          { label: 'Design Tokens', count: '60+', desc: 'Colors, spacing, radius, typography', page: 'tokens' as Page },
          { label: 'Components', count: '11', desc: 'React components, all typed', page: 'components' as Page },
          { label: 'Platforms', count: '3', desc: 'Web CSS · TypeScript · Flutter', page: null },
        ].map(card => (
          <button
            key={card.label}
            onClick={() => card.page && onNavigate(card.page)}
            className={[
              'text-left p-4 rounded-xl transition-colors',
              card.page ? 'cursor-pointer' : 'cursor-default',
            ].join(' ')}
            style={{ border: `1px solid var(--color-border-high)` }}
          >
            <p className="text-2xl font-bold text-[#eb282c] mb-1">{card.count}</p>
            <p className="text-sm font-semibold mb-1" style={{ color: 'var(--color-text-primary)' }}>{card.label}</p>
            <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{card.desc}</p>
          </button>
        ))}
      </div>

      {/* Stack */}
      <Section title="Tech Stack">
        <div className="grid grid-cols-2 gap-3">
          {[
            { name: 'Style Dictionary v4', role: 'Token compilation → CSS, TS, Dart', tag: 'build' },
            { name: 'React 19 + TypeScript', role: 'Component library', tag: 'components' },
            { name: 'Tailwind CSS', role: 'Component styling via CSS vars', tag: 'styling' },
            { name: 'Vite', role: 'Library build + dev docs', tag: 'build' },
            { name: 'Figma', role: 'Design source of truth', tag: 'design' },
          ].map(s => (
            <div key={s.name} className="flex items-start gap-3 p-3 rounded-lg" style={{ background: 'var(--color-base-lowest)' }}>
              <span className="shrink-0 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider" style={{ background: 'var(--color-base-normal)', color: 'var(--color-text-secondary)' }}>
                {s.tag}
              </span>
              <div>
                <p className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>{s.name}</p>
                <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{s.role}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Quick start */}
      <Section title="Quick Start">
        <div className="space-y-3">
          {[
            { step: '1', title: 'Build tokens', code: 'npm run tokens:build' },
            { step: '2', title: 'Import CSS variables globally', code: "import 'design-tokens/dist/css/variables.css'" },
            { step: '3', title: 'Use components', code: "import { Button, Alert, Tag } from 'design-tokens'" },
          ].map(s => (
            <div key={s.step} className="flex gap-4 items-start">
              <span className="shrink-0 size-6 rounded-full bg-[#eb282c] text-white text-xs font-bold flex items-center justify-center mt-0.5">
                {s.step}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium mb-1" style={{ color: 'var(--color-text-primary)' }}>{s.title}</p>
                <code className="block text-xs px-3 py-2 rounded-lg font-mono whitespace-nowrap overflow-x-auto" style={{ background: 'var(--color-base-low)', color: 'var(--color-text-primary)' }}>
                  {s.code}
                </code>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Architecture */}
      <Section title="How It Works">
        <div className="flex items-center gap-2 flex-wrap">
          {['tokens/tokens.json', '→', 'Style Dictionary', '→', 'dist/css/variables.css', '→', 'React Components', '→', 'Your App'].map((item, i) => (
            item === '→'
              ? <span key={i} className="font-bold" style={{ color: 'var(--color-text-disabled)' }}>→</span>
              : <span key={i} className="px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: 'var(--color-base-lowest)', border: `1px solid var(--color-border-high)`, color: 'var(--color-text-primary)' }}>{item}</span>
          ))}
        </div>
        <p className="text-sm mt-4 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
          All token values live in <code className="px-1 py-0.5 rounded text-xs" style={{ background: 'var(--color-base-low)' }}>tokens/tokens.json</code> in DTCG format.
          Run <code className="px-1 py-0.5 rounded text-xs" style={{ background: 'var(--color-base-low)' }}>npm run tokens:build</code> to regenerate all platform outputs.
          Dark mode variants are defined inline using the <code className="px-1 py-0.5 rounded text-xs" style={{ background: 'var(--color-base-low)' }}>$extensions.mode.dark</code> field.
        </p>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="text-base font-semibold mb-4 pb-2" style={{ color: 'var(--color-text-primary)', borderBottom: '1px solid var(--color-border-high)' }}>{title}</h2>
      {children}
    </div>
  );
}
