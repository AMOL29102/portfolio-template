import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navLinks } from '../../data/portfolio';
import ThemeToggle from '../ui/ThemeToggle';
import AccentPicker from '../ui/AccentPicker';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 768) setIsMobileOpen(false);
    };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  return (
    <>
      <motion.header
        className={isScrolled ? 'glass-heavy' : ''}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: 'all 0.5s',
          background: isScrolled ? undefined : 'transparent',
          boxShadow: isScrolled ? '0 4px 30px rgba(0,0,0,0.1)' : 'none',
        }}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          style={{
            maxWidth: '1120px',
            margin: '0 auto',
            padding: '0 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '64px',
          }}
        >
          {/* Logo */}
          <a
            href="#"
            id="nav-logo"
            className="text-gradient-accent"
            style={{
              fontSize: '20px',
              fontWeight: 700,
              letterSpacing: '-0.01em',
              fontFamily: 'var(--font-heading)',
              textDecoration: 'none',
            }}
          >
            AP
          </a>

          {/* Desktop Nav */}
          <nav
            id="desktop-nav"
            style={{ display: 'flex', alignItems: 'center', gap: '28px' }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--color-text-secondary)',
                  textDecoration: 'none',
                  transition: 'color 0.3s',
                }}
                onMouseEnter={(e) => e.target.style.color = 'var(--accent)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--color-text-secondary)'}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ThemeToggle />
            <AccentPicker />
            <a
              href="#contact"
              id="nav-cta"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                marginLeft: '8px',
                padding: '8px 18px',
                borderRadius: '9999px',
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: '#fff',
                background: 'var(--accent)',
                textDecoration: 'none',
                transition: 'all 0.3s',
              }}
            >
              Hire Me
            </a>

            {/* Mobile Hamburger */}
            <button
              id="mobile-menu-btn"
              className="glass"
              style={{
                display: 'none',
                padding: '8px',
                borderRadius: '8px',
                marginLeft: '4px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Toggle menu"
            >
              {isMobileOpen ? (
                <X size={18} style={{ color: 'var(--color-text-primary)' }} />
              ) : (
                <Menu size={18} style={{ color: 'var(--color-text-primary)' }} />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ position: 'fixed', inset: 0, zIndex: 40 }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(4px)',
              }}
              onClick={() => setIsMobileOpen(false)}
            />

            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="glass-heavy"
              id="mobile-nav"
              style={{
                position: 'absolute',
                right: 0,
                top: 0,
                bottom: 0,
                width: '70%',
                maxWidth: '320px',
                display: 'flex',
                flexDirection: 'column',
                padding: '80px 24px 24px',
              }}
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.04 }}
                  style={{
                    fontSize: '18px',
                    fontWeight: 600,
                    padding: '14px 0',
                    borderBottom: '1px solid var(--color-border)',
                    color: 'var(--color-text-primary)',
                    fontFamily: 'var(--font-heading)',
                    textDecoration: 'none',
                    transition: 'color 0.3s',
                  }}
                >
                  {link.label}
                </motion.a>
              ))}

              <a
                href="#contact"
                onClick={() => setIsMobileOpen(false)}
                style={{
                  marginTop: '24px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '14px 20px',
                  borderRadius: '9999px',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#fff',
                  background: 'var(--accent)',
                  textDecoration: 'none',
                }}
              >
                Get In Touch
              </a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
