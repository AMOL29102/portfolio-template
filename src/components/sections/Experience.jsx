import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, CheckCircle2, ExternalLink } from 'lucide-react';
import SectionWrapper from '../layout/SectionWrapper';
import AnimatedText from '../ui/AnimatedText';
import { experience, projects } from '../../data/portfolio';

// Reusing same SVG components for projects if needed
const GithubLogo = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function Experience() {
  return (
    <SectionWrapper id="experience">
      {/* Redesigned Section Heading */}
      <motion.div {...fadeUp(0)} style={{ marginBottom: '60px', borderBottom: '1px solid var(--color-border)', paddingBottom: '24px' }}>
        <h2 style={{
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          fontWeight: 700,
          lineHeight: 1.1,
          fontFamily: 'Space Grotesk, system-ui, sans-serif',
          display: 'flex',
          alignItems: 'baseline',
          gap: '16px'
        }}>
          <span style={{ fontSize: '1.2rem', fontWeight: 500, color: 'var(--accent)', letterSpacing: '0.1em' }}>03.</span>
          <AnimatedText text="Work Experience" staggerDelay={0.03} />
        </h2>
      </motion.div>

      {/* Experience Timeline - Glowing Cards with Connection Line */}
      <div style={{ position: 'relative', paddingLeft: '40px', marginBottom: '80px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
        {/* Timeline Line */}
        <div style={{ position: 'absolute', left: '0px', top: '0', bottom: '0', width: '2px', background: 'linear-gradient(to bottom, var(--accent) 0%, var(--accent-glow) 50%, transparent 100%)', opacity: 0.5 }} />

        {experience.map((entry, index) => (
          <motion.div
            key={entry.company}
            {...fadeUp(index * 0.1)}
            style={{ position: 'relative' }}
          >
            {/* Timeline Dot */}
            <div style={{
              position: 'absolute',
              left: '-39px',
              top: '40px',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: 'var(--color-bg-primary)',
              border: '3px solid var(--accent)',
              boxShadow: '0 0 12px var(--accent-glow)',
              zIndex: 2,
              transform: 'translate(-50%, -50%)'
            }} />

            <div
              className="glass"
              style={{
                padding: '40px',
                borderRadius: '16px',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid var(--color-border)',
                transition: 'all 0.3s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px) scale(1.01)';
                e.currentTarget.style.boxShadow = '0 15px 40px var(--accent-glow)';
                e.currentTarget.style.borderColor = 'var(--accent)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'var(--color-border)';
              }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <h3 style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'Space Grotesk, system-ui, sans-serif', color: 'var(--color-text-primary)', marginBottom: '8px' }}>
                    {entry.title} <span style={{ color: 'var(--accent)' }}>@ {entry.company}</span>
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: 'var(--color-text-muted)' }}>
                      <Calendar size={14} /> {entry.period}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: 'var(--color-text-muted)' }}>
                      <MapPin size={14} /> {entry.location}
                    </span>
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'var(--color-text-secondary)', marginBottom: '20px' }}>
                {entry.description}
              </p>

              {entry.bullets && (
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', margin: '0 0 24px 0', padding: '0', listStyle: 'none' }}>
                  {entry.bullets.map((b, i) => (
                    <li key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                      <CheckCircle2 size={16} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }} />
                      {b}
                    </li>
                  ))}
                </ul>
              )}

              {/* Tech Stack Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {entry.tags.map((tag) => (
                  <span key={tag} style={{
                    fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em',
                    padding: '6px 14px', borderRadius: '6px',
                    background: 'var(--glass-heavy-bg)', color: 'var(--color-text-primary)'
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Featured Projects Heading */}
      <motion.div {...fadeUp(0)} style={{ marginBottom: '50px', borderBottom: '1px solid var(--color-border)', paddingBottom: '24px' }}>
        <h2 style={{
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          fontWeight: 700,
          lineHeight: 1.1,
          fontFamily: 'Space Grotesk, system-ui, sans-serif',
          display: 'flex',
          alignItems: 'baseline',
          gap: '16px'
        }}>
          <span style={{ fontSize: '1.2rem', fontWeight: 500, color: 'var(--accent)', letterSpacing: '0.1em' }}>04.</span>
          <AnimatedText text="Featured Projects" staggerDelay={0.03} />
        </h2>
      </motion.div>

      {/* Projects Grid - Larger cards, more emphasis on tech stack */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
        {projects.map((project, index) => (
          <motion.div
            key={index}
            {...fadeUp(index * 0.1)}
            className="glass"
            style={{
              borderRadius: '16px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              transition: 'transform 0.3s ease',
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            {/* Project Image - Replace 'image: null' in portfolio.js with '/images/your-image.png' */}
            <div style={{
              width: '100%', aspectRatio: '16/9',
              background: project.image ? `url(${project.image}) center/cover` : 'var(--color-bg-tertiary)',
              borderBottom: '1px solid var(--color-border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              {!project.image && (
                <span style={{ color: 'var(--color-text-muted)', fontSize: '13px' }}>Image PlaceHolder</span>
              )}
            </div>

            <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '22px', fontWeight: 700, fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                  {project.title}
                </h3>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {project.source && (
                    <a href={project.source} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-text-secondary)', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}>
                      <GithubLogo />
                    </a>
                  )}
                  {project.demo && project.demo !== '#' && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-text-secondary)', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}>
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>
              <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>
                {project.subtitle}
              </p>
              <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--color-text-secondary)', marginBottom: '24px', flex: 1 }}>
                {project.description}
              </p>

              {/* Tech Stack */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {project.tags.map((tag) => (
                  <span key={tag} style={{
                    fontSize: '11px', fontWeight: 500, padding: '4px 10px',
                    borderRadius: '4px', border: '1px solid var(--color-border)',
                    color: 'var(--color-text-muted)',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
