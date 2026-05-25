import React from 'react';
import { motion } from 'framer-motion';

export default function SectionWrapper({ children, id, className = '', delay = 0 }) {
  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.75,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ width: '100%', position: 'relative', paddingTop: '100px', paddingBottom: '100px' }}
    >
      <div
        style={{
          maxWidth: '1120px',
          margin: '0 auto',
          paddingLeft: '32px',
          paddingRight: '32px',
        }}
      >
        {children}
      </div>
    </motion.section>
  );
}
