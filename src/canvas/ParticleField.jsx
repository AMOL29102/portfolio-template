import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 2200;

export default function ParticleField({ mouse, accentColor = '#7C3AED' }) {
  const points = useRef();
  const smallPoints = useRef();

  const { positions, speeds, offsets, sizes } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const speeds = new Float32Array(PARTICLE_COUNT);
    const offsets = new Float32Array(PARTICLE_COUNT);
    const sizes = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Spread particles wider/deeper for more immersive field
      positions[i * 3] = (Math.random() - 0.5) * 38;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 38;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      speeds[i] = 0.15 + Math.random() * 0.45;
      offsets[i] = Math.random() * Math.PI * 2;
      sizes[i] = 0.5 + Math.random() * 1.5;
    }

    return { positions, speeds, offsets, sizes };
  }, []);

  // Secondary sparse layer for depth
  const { positions: bgPositions } = useMemo(() => {
    const count = 400;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 2] = -10 + (Math.random() - 0.5) * 10;
    }
    return { positions };
  }, []);

  useFrame((state) => {
    if (!points.current) return;
    const time = state.clock.getElapsedTime();
    const posAttr = points.current.geometry.attributes.position;
    const arr = posAttr.array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      arr[i3 + 1] += Math.sin(time * speeds[i] + offsets[i]) * 0.004;
      arr[i3] += Math.cos(time * speeds[i] * 0.6 + offsets[i]) * 0.003;

      // Mouse influence
      const mx = (mouse?.x || 0) * 0.25;
      const my = (mouse?.y || 0) * 0.25;
      arr[i3] += mx * 0.0012;
      arr[i3 + 1] += my * 0.0012;

      // Wrap boundaries
      if (arr[i3] > 19) arr[i3] = -19;
      if (arr[i3] < -19) arr[i3] = 19;
      if (arr[i3 + 1] > 19) arr[i3 + 1] = -19;
      if (arr[i3 + 1] < -19) arr[i3 + 1] = 19;
    }
    posAttr.needsUpdate = true;

    // Slow rotate the background layer
    if (smallPoints.current) {
      smallPoints.current.rotation.z = time * 0.008;
    }
  });

  const particleTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.3, 'rgba(255,255,255,0.6)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(canvas);
  }, []);

  return (
    <group>
      {/* Main particle field */}
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={PARTICLE_COUNT} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          size={0.07}
          map={particleTexture}
          transparent
          opacity={0.65}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          color="#a78bfa"
          sizeAttenuation
        />
      </points>

      {/* Background sparse layer — larger, dimmer stars */}
      <points ref={smallPoints}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={400} array={bgPositions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          transparent
          opacity={0.2}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          color="#ffffff"
          sizeAttenuation
        />
      </points>
    </group>
  );
}
