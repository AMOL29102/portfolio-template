import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function MagneticButton({
  children,
  className = '',
  onClick,
  href,
  as = 'button',
  magneticStrength = 0.3,
  ...props
}) {
  const btnRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setPosition({
      x: (e.clientX - centerX) * magneticStrength,
      y: (e.clientY - centerY) * magneticStrength,
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const Tag = href ? 'a' : as;
  const tagProps = href ? { href, target: href.startsWith('http') ? '_blank' : undefined, rel: href.startsWith('http') ? 'noopener noreferrer' : undefined } : { onClick };

  return (
    <motion.div
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 350, damping: 15, mass: 0.2 }}
      className="inline-block"
    >
      <Tag
        className={`
          relative inline-flex items-center justify-center gap-2
          rounded-full
          font-bold text-[13px] uppercase tracking-wider
          transition-all duration-300
          cursor-pointer overflow-hidden
          ${className}
        `}
        style={{
          padding: '16px 40px',
          background: 'linear-gradient(135deg, var(--accent), var(--accent-dark))',
          color: '#ffffff',
          boxShadow: '0 8px 30px var(--accent-glow)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
        {...tagProps}
        {...props}
      >
        {children}
      </Tag>
    </motion.div>
  );
}
