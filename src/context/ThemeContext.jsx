import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ThemeContext = createContext();

const ACCENT_PRESETS = {
  violet: { accent: '#7C3AED', light: '#A78BFA', dark: '#5B21B6', glow: 'rgba(124, 58, 237, 0.4)' },
  cyan:   { accent: '#06B6D4', light: '#67E8F9', dark: '#0891B2', glow: 'rgba(6, 182, 212, 0.4)' },
  amber:  { accent: '#F59E0B', light: '#FCD34D', dark: '#D97706', glow: 'rgba(245, 158, 11, 0.4)' },
  rose:   { accent: '#F43F5E', light: '#FB7185', dark: '#E11D48', glow: 'rgba(244, 63, 94, 0.4)' },
  emerald:{ accent: '#10B981', light: '#6EE7B7', dark: '#059669', glow: 'rgba(16, 185, 129, 0.4)' },
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('portfolio-theme') || 'dark';
    }
    return 'dark';
  });

  const [accentName, setAccentName] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('portfolio-accent') || 'violet';
    }
    return 'violet';
  });

  // Resolve effective theme (system → media query)
  const getEffectiveTheme = useCallback(() => {
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return theme;
  }, [theme]);

  // Apply theme class to html
  useEffect(() => {
    const effective = getEffectiveTheme();
    const root = document.documentElement;

    root.classList.remove('light', 'dark');
    root.classList.add(effective);
    localStorage.setItem('portfolio-theme', theme);

    // Listen for system preference changes
    if (theme === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = () => {
        root.classList.remove('light', 'dark');
        root.classList.add(mq.matches ? 'dark' : 'light');
      };
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    }
  }, [theme, getEffectiveTheme]);

  // Apply accent colors as CSS custom properties
  useEffect(() => {
    const preset = ACCENT_PRESETS[accentName] || ACCENT_PRESETS.violet;
    const root = document.documentElement;

    root.style.setProperty('--accent', preset.accent);
    root.style.setProperty('--accent-light', preset.light);
    root.style.setProperty('--accent-dark', preset.dark);
    root.style.setProperty('--accent-glow', preset.glow);
    localStorage.setItem('portfolio-accent', accentName);
  }, [accentName]);

  const value = {
    theme,
    setTheme,
    accentName,
    setAccentName,
    accentPresets: ACCENT_PRESETS,
    effectiveTheme: getEffectiveTheme(),
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}

export { ACCENT_PRESETS };
