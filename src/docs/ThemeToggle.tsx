import React from 'react';
import { useTheme } from './ThemeContext';

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggle}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={[
        'relative inline-flex items-center gap-2 px-2 py-1.5 rounded-full text-xs font-semibold transition-colors border select-none',
        isDark
          ? 'bg-[#2a2a2a] border-[#6b6b6b] text-[#f4f4f4] hover:bg-[#3a3a3a]'
          : 'bg-[#f4f4f4] border-[#ebebeb] text-[#161616] hover:bg-[#ebebeb]',
      ].join(' ')}
    >
      {/* Track */}
      <span
        className={[
          'relative inline-flex items-center w-8 h-4 rounded-full transition-colors shrink-0',
          isDark ? 'bg-[#eb282c]' : 'bg-[#dbdbdb]',
        ].join(' ')}
      >
        <span
          className={[
            'absolute size-3 rounded-full bg-white shadow transition-transform',
            isDark ? 'translate-x-4' : 'translate-x-0.5',
          ].join(' ')}
        />
      </span>
      <span className="w-8 text-center">{isDark ? 'Dark' : 'Light'}</span>
    </button>
  );
}
