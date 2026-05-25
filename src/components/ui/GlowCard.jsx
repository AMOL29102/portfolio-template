import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function GlowCard({
  children,
  className = '',
  glowColor,
  hoverable = true,
}) {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current || !hoverable) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const accentColor = glowColor || 'var(--accent, #7C3AED)';

  return (
    <motion.div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={hoverable ? { y: -3, scale: 1.005 } : {}}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '16px',
        transition: 'all 0.5s',
        background: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
      }}
    >
      {/* Cursor-following glow */}
      {hoverable && isHovered && (
        <div
          style={{
            position: 'absolute',
            pointerEvents: 'none',
            zIndex: 0,
            transition: 'opacity 0.3s',
            left: mousePos.x - 120,
            top: mousePos.y - 120,
            width: 240,
            height: 240,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${accentColor}18 0%, transparent 70%)`,
          }}
        />
      )}

      {/* Border glow on hover */}
      {hoverable && isHovered && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 0,
            borderRadius: '16px',
            boxShadow: `inset 0 0 0 1px ${accentColor}25, 0 0 20px ${accentColor}08`,
          }}
        />
      )}

      {/* Card content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          padding: '24px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}
