import React, { Suspense, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight, ExternalLink, Download } from 'lucide-react';
import AnimatedText from '../ui/AnimatedText';
import MagneticButton from '../ui/MagneticButton';
import HeroScene from '../../canvas/HeroScene';
import { personalInfo } from '../../data/portfolio';

// Brand SVGs
const GithubLogo = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedinLogo = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const LeetcodeLogo = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.398.702-1.864l4.332-4.363c.467-.467 1.111-.662 1.824-.662s1.357.195 1.823.662l2.697 2.607c.514.515 1.359.473 1.9-.086.538-.557.554-1.427.035-1.968l-2.83-2.735c-1.026-1.025-2.52-1.554-4.148-1.554s-3.122.529-4.148 1.554l-4.332 4.363C1.529 11.233 1 12.35 1 13.569s.529 2.336 1.529 3.336l4.332 4.363c1.026 1.025 2.52 1.554 4.148 1.554s3.122-.529 4.148-1.554l2.83-2.735c.519-.541.503-1.411-.035-1.968-.541-.559-1.386-.601-1.9-.086zM23.811 13.01H15.02c-.758 0-1.373.57-1.373 1.277 0 .706.615 1.276 1.373 1.276h8.791c.758 0 1.373-.57 1.373-1.276 0-.707-.615-1.277-1.373-1.277z" />
  </svg>
);

export default function Hero({ mouse, scrollProgress }) {
  const [showResumeModal, setShowResumeModal] = useState(false);

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* 3D Background */}
      <Suspense fallback={null}>
        <HeroScene mouse={mouse} scrollProgress={scrollProgress} />
      </Suspense>

      {/* Gradient Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          background: `
            radial-gradient(ellipse at 50% 50%, transparent 15%, var(--color-bg-primary) 72%),
            linear-gradient(180deg, transparent 45%, var(--color-bg-primary) 100%)
          `,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          padding: '0 24px',
          maxWidth: '860px',
          margin: '0 auto',
        }}
      >
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass"
          style={{
            padding: '6px 18px',
            borderRadius: '9999px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#10B981',
              display: 'inline-block',
              animation: 'pulse 2s infinite',
            }}
          />
          <span style={{ fontSize: '11px', fontWeight: 500, color: 'var(--color-text-secondary)' }}>
            Available for work
          </span>
        </motion.div>

        {/* Name (Photo Removed) */}
        <h1
          style={{
            fontSize: 'clamp(3rem, 8vw, 5.5rem)',
            fontWeight: 700,
            lineHeight: 1.0,
            letterSpacing: '-0.03em',
            fontFamily: 'Space Grotesk, system-ui, sans-serif',
            marginTop: '20px',
          }}
        >
          <AnimatedText text={personalInfo.name} delay={0.4} staggerDelay={0.05} mode="character" />
        </h1>

        {/* Role + Location */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          style={{ fontSize: '16px', color: 'var(--color-text-secondary)' }}
        >
          <span className="text-gradient-accent" style={{ fontWeight: 600 }}>{personalInfo.role}</span>
          <span style={{ margin: '0 10px', opacity: 0.4 }}>·</span>
          <span>{personalInfo.location}</span>
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0 }}
          style={{
            fontSize: '15px',
            maxWidth: '500px',
            lineHeight: 1.7,
            color: 'var(--color-text-muted)',
          }}
        >
          {personalInfo.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2 }}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '16px',
            marginTop: '8px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <MagneticButton href="#experience">
            <span>View My Work</span>
            <ArrowRight size={16} />
          </MagneticButton>

          <button
            onClick={() => setShowResumeModal(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              borderRadius: '9999px',
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--color-text-secondary)',
              border: '1px solid var(--color-border)',
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(10px)',
              textDecoration: 'none',
              transition: 'all 0.3s',
              cursor: 'pointer',
            }}
            onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
            onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'}
          >
            <Download size={14} />
            Resume
          </button>

          <a
            href="#contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              borderRadius: '9999px',
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--color-text-secondary)',
              border: '1px solid var(--color-border)',
              textDecoration: 'none',
              transition: 'all 0.3s',
              background: 'transparent',
              whiteSpace: 'nowrap',
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'var(--glass-heavy-bg)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <ExternalLink size={14} />
            Get In Touch
          </a>
        </motion.div>

        {/* Social Links Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '4px' }}
        >
          {[
            { label: 'GitHub', href: personalInfo.social.github, Logo: GithubLogo },
            { label: 'LinkedIn', href: personalInfo.social.linkedin, Logo: LinkedinLogo },
            { label: 'LeetCode', href: personalInfo.social.leetcode, Logo: LeetcodeLogo },
          ].map(({ label, href, Logo }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              title={label}
              className="glass"
              style={{
                padding: '10px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-text-muted)',
                transition: 'all 0.2s',
              }}
              onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent)'}
              onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'}
            >
              <Logo />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        style={{
          position: 'absolute',
          bottom: '28px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          zIndex: 10,
        }}
      >
        <span style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, color: 'var(--color-text-muted)' }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} style={{ color: 'var(--accent)' }} />
        </motion.div>
      </motion.div>

      {/* Resume Modal */}
      {showResumeModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(8px)',
          }}
          onClick={() => setShowResumeModal(false)}
        >
          <div
            style={{
              width: '90%',
              height: '90%',
              background: 'var(--color-bg-primary)',
              borderRadius: '16px',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              border: '1px solid var(--color-border)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowResumeModal(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '24px',
                background: 'var(--accent)',
                color: '#fff',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '9999px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                zIndex: 10,
                boxShadow: '0 4px 12px var(--accent-glow)',
              }}
            >
              Close
            </button>
            <iframe
              src="/resume.pdf"
              style={{ width: '100%', height: '100%', border: 'none' }}
              title="Resume Preview"
            />
          </div>
        </div>
      )}
    </section>
  );
}
