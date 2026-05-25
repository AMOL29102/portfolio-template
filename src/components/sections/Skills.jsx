import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '../layout/SectionWrapper';
import AnimatedText from '../ui/AnimatedText';
import { skills } from '../../data/portfolio';

const categoryColors = {
  'Frontend': '#d97743',
  'Backend': '#b65a2d',
  'Database': '#e89565',
  'Language': '#c2a370',
  'Automation': '#a67b5b',
  '3D / WebGL': '#8c421e',
  'Cloud': '#d4a373',
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function Skills() {
  // Group skills by category
  const groupedSkills = useMemo(() => {
    return skills.reduce((acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    }, {});
  }, []);

  return (
    <SectionWrapper id="skills">
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
          <span style={{ fontSize: '1.2rem', fontWeight: 500, color: 'var(--accent)', letterSpacing: '0.1em' }}>02.</span>
          <AnimatedText text="Technical Arsenal" staggerDelay={0.03} />
        </h2>
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '40px',
      }}>
        {Object.entries(groupedSkills).map(([category, items], index) => {
          const catColor = categoryColors[category] || 'var(--accent)';
          return (
            <motion.div
              key={category}
              {...fadeUp(index * 0.1)}
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              <h3 style={{ 
                fontSize: '14px', 
                fontWeight: 600, 
                textTransform: 'uppercase', 
                letterSpacing: '0.1em',
                color: catColor,
                borderBottom: `1px solid ${catColor}40`,
                paddingBottom: '8px',
                fontFamily: 'Space Grotesk, system-ui, sans-serif'
              }}>
                {category}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {items.map((skill, i) => (
                  <div key={skill.name} className="glass" style={{ 
                    padding: '16px 20px', 
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px'
                  }}>
                    <span style={{ fontSize: '24px' }}>{skill.icon}</span>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                        {skill.name}
                      </p>
                      <div style={{ height: '2px', background: 'var(--color-border)', marginTop: '8px', borderRadius: '2px', overflow: 'hidden' }}>
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 + (i * 0.1), ease: "easeOut" }}
                          style={{ height: '100%', background: catColor }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
