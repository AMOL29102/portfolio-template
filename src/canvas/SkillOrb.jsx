import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function Orb({ color = '#7c3aed', hovered = false }) {
  const meshRef = useRef();
  const wireRef = useRef();

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.5;
    meshRef.current.rotation.y += delta * 0.7;
    if (wireRef.current) {
      wireRef.current.rotation.x += delta * 0.5;
      wireRef.current.rotation.y += delta * 0.7;
    }

    // Hover scale
    const targetScale = hovered ? 1.2 : 1;
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.1
    );
  });

  return (
    <Float speed={3} rotationIntensity={0.3} floatIntensity={0.5}>
      <group>
        {/* Solid core */}
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[0.5, 1]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 0.5 : 0.2}
            roughness={0.3}
            metalness={0.7}
            transparent
            opacity={0.8}
          />
        </mesh>
        {/* Wireframe overlay */}
        <mesh ref={wireRef}>
          <icosahedronGeometry args={[0.6, 1]} />
          <meshBasicMaterial
            color={color}
            wireframe
            transparent
            opacity={hovered ? 0.4 : 0.15}
          />
        </mesh>
      </group>
    </Float>
  );
}

export default function SkillOrb({ color, hovered = false }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 2.5], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[2, 2, 2]} intensity={0.8} color={color} />
      <Orb color={color} hovered={hovered} />
    </Canvas>
  );
}
