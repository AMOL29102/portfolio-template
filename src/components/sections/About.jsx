import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Sparkles, BookOpen, Star, ExternalLink } from 'lucide-react';
import SectionWrapper from '../layout/SectionWrapper';
import AnimatedText from '../ui/AnimatedText';
import { personalInfo, stats, education, quickFacts } from '../../data/portfolio';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function About() {
  return (
    <SectionWrapper id="about">
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
          <span style={{ fontSize: '1.2rem', fontWeight: 500, color: 'var(--accent)', letterSpacing: '0.1em' }}>01.</span>
          <AnimatedText text="About Me" staggerDelay={0.03} />
        </h2>
        <p style={{ fontSize: '18px', color: 'var(--color-text-secondary)', marginTop: '12px', maxWidth: '600px' }}>
          Crafting digital experiences with code, creativity, and a touch of warmth.
        </p>
      </motion.div>

      {/* Split Pane Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', marginBottom: '40px' }}>
        
        {/* Left Pane: Bio */}
        <motion.div {...fadeUp(0.1)} className="glass-heavy" style={{ padding: '40px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Sparkles size={24} style={{ color: 'var(--accent)' }} />
            <h3 style={{ fontSize: '22px', fontWeight: 600, fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
              My Journey
            </h3>
          </div>
          <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'var(--color-text-secondary)' }}>
            {personalInfo.bio}
          </p>
          <div style={{ 
            marginTop: 'auto', 
            padding: '20px', 
            borderRadius: '12px', 
            background: 'var(--glass-bg)', 
            borderLeft: '4px solid var(--accent)'
          }}>
            <p style={{ fontSize: '14px', color: 'var(--color-text-primary)', fontWeight: 500, lineHeight: 1.6 }}>
              <strong>Research:</strong> Co-authored IEEE ICBDS paper on "Blockchain-based Authentication for Genuine Goods"
            </p>
          </div>
        </motion.div>

        {/* Right Pane: Stack of Facts & Education */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {/* Education */}
          <motion.div {...fadeUp(0.2)} className="glass" style={{ padding: '30px', borderRadius: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <BookOpen size={20} style={{ color: 'var(--accent)' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 600, fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                Education
              </h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {education.map((edu, i) => (
                <div key={i} style={{ borderBottom: i === 0 ? '1px solid var(--color-border)' : 'none', paddingBottom: i === 0 ? '20px' : '0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                    <div>
                      <p style={{ fontSize: '16px', fontWeight: 700, fontFamily: 'Space Grotesk, system-ui, sans-serif', color: 'var(--color-text-primary)' }}>
                        {edu.institution}
                      </p>
                      <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                        {edu.degree}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        {edu.period}
                      </p>
                      {edu.gpa && (
                        <p style={{ fontSize: '13px', marginTop: '4px', fontWeight: 700, color: 'var(--accent)' }}>
                          GPA: {edu.gpa}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Facts */}
          <motion.div {...fadeUp(0.3)} className="glass" style={{ padding: '30px', borderRadius: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <Star size={20} style={{ color: 'var(--accent)' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 600, fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                Beyond Code
              </h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {quickFacts.map((fact, i) => (
                <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '20px' }}>{fact.icon}</span>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '4px' }}>
                      {fact.label}
                    </p>
                    <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>
                      {fact.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {stats.map((stat, i) => (
          <motion.div key={stat.label} {...fadeUp(0.4 + i * 0.1)} className="glass" style={{
            padding: '30px', 
            borderRadius: '16px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            <span
              className="text-gradient-accent"
              style={{ fontSize: '42px', fontWeight: 700, fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
            >
              {stat.value}
            </span>
            <span style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600, color: 'var(--color-text-muted)' }}>
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
