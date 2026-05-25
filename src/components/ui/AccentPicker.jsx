import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Check } from 'lucide-react';
import { useTheme, ACCENT_PRESETS } from '../../context/ThemeContext';

const accentOptions = [
  { key: 'violet', label: 'Violet' },
  { key: 'cyan', label: 'Cyan' },
  { key: 'amber', label: 'Amber' },
  { key: 'rose', label: 'Rose' },
  { key: 'emerald', label: 'Emerald' },
];

export default function AccentPicker() {
  const { accentName, setAccentName } = useTheme();
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

  const currentPreset = ACCENT_PRESETS[accentName] || ACCENT_PRESETS.violet;

  return (
    <div style={{ position: 'relative' }} ref={dropdownRef}>
      <button
        id="accent-picker-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change accent color"
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
        <Palette size={18} />
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
              borderRadius: '16px',
              zIndex: 100,
              padding: '16px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
              minWidth: '180px',
            }}
          >
            <p style={{
              fontSize: '11px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              marginBottom: '12px',
              color: 'var(--color-text-muted)',
            }}>
              Accent Color
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {accentOptions.map(({ key, label }) => {
                const preset = ACCENT_PRESETS[key];
                const isActive = accentName === key;
                return (
                  <button
                    key={key}
                    id={`accent-option-${key}`}
                    onClick={() => { setAccentName(key); setIsOpen(false); }}
                    title={label}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: preset.accent,
                      border: isActive ? `3px solid var(--color-text-primary)` : '3px solid transparent',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      transform: isActive ? 'scale(1.15)' : 'scale(1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: isActive ? `0 0 14px ${preset.glow}` : 'none',
                    }}
                  >
                    {isActive && <Check size={16} color="#fff" strokeWidth={3} />}
                  </button>
                );
              })}
            </div>
            <div style={{ marginTop: '12px', borderTop: '1px solid var(--color-border)', paddingTop: '10px' }}>
              <p style={{ fontSize: '12px', fontWeight: 500, color: 'var(--color-text-secondary)' }}>
                Current: <span style={{ color: currentPreset.accent, fontWeight: 700 }}>
                  {accentName.charAt(0).toUpperCase() + accentName.slice(1)}
                </span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
