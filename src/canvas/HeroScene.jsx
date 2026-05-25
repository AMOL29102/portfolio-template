import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Preload } from '@react-three/drei';
import ParticleField from './ParticleField';
import FloatingGeometry from './FloatingGeometry';

export default function HeroScene({ mouse, scrollProgress = 0 }) {
  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.3} />
          <directionalLight position={[10, 10, 5]} intensity={0.8} color="#f0f0ff" />
          <pointLight position={[-5, -5, 5]} intensity={0.4} color="#7c3aed" />
          <pointLight position={[5, 3, -3]} intensity={0.3} color="#a78bfa" />

          {/* Environment for reflections */}
          <Environment preset="city" />

          {/* Particle system */}
          <ParticleField mouse={mouse} />

          {/* Floating glass shapes */}
          <FloatingGeometry scrollProgress={scrollProgress} />

          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
