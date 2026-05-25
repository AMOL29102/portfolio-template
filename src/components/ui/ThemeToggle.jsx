import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const themes = [
  { key: 'dark', label: 'Dark', icon: Moon },
  { key: 'light', label: 'Light', icon: Sun },
  { key: 'system', label: 'System', icon: Monitor },
];

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const currentTheme = themes.find(t => t.key === theme) || themes[0];
  const CurrentIcon = currentTheme.icon;

  return (
    <div style={{ position: 'relative' }} ref={dropdownRef}>
      <button
        id="theme-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle theme"
        style={{
          padding: '8px',
          borderRadius: '10px',
          background: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
          backdropFilter: 'blur(20px)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s',
          color: 'var(--color-text-secondary)',
        }}
      >
        <CurrentIcon size={18} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            style={{
              position: 'absolute',
              right: 0,
              top: 'calc(100% + 8px)',
              background: 'var(--glass-heavy-bg)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              border: '1px solid var(--glass-heavy-border)',
              borderRadius: '14px',
              overflow: 'hidden',
              zIndex: 100,
              minWidth: '160px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
            }}
          >
            {themes.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                id={`theme-option-${key}`}
                onClick={() => { setTheme(key); setIsOpen(false); }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '11px 16px',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  background: theme === key ? 'rgba(124,58,237,0.12)' : 'transparent',
                  color: theme === key ? 'var(--accent)' : 'var(--color-text-primary)',
                  border: 'none',
                  transition: 'background 0.15s',
                  textAlign: 'left',
                }}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
