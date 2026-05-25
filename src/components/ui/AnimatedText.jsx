import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedText({
  text,
  className = '',
  delay = 0,
  staggerDelay = 0.04,
  mode = 'word', // 'word' | 'character'
  once = true,
}) {
  const items = mode === 'character' ? text.split('') : text.split(' ');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-50px' }}
      className={className}
      style={{ display: 'inline' }}
    >
      {items.map((item, i) => (
        <motion.span
          key={i}
          variants={itemVariants}
          style={{ display: 'inline-block' }}
        >
          {item}{mode === 'word' ? '\u00A0' : ''}
        </motion.span>
      ))}
    </motion.span>
  );
}
