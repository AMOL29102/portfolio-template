import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial } from '@react-three/drei';

function GlassShape({ geometry, position, rotationSpeed = 0.3, floatSpeed = 2, scale = 1, color = '#c4b5fd' }) {
  const mesh = useRef();

  useFrame((state, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.x += delta * rotationSpeed * 0.5;
    mesh.current.rotation.y += delta * rotationSpeed;
  });

  return (
    <Float speed={floatSpeed} rotationIntensity={0.5} floatIntensity={1.0}>
      <mesh ref={mesh} position={position} scale={scale}>
        {geometry}
        <MeshTransmissionMaterial
          backside
          samples={6}
          thickness={0.5}
          chromaticAberration={0.08}
          anisotropy={0.15}
          distortion={0.2}
          distortionScale={0.4}
          temporalDistortion={0.06}
          clearcoat={1}
          clearcoatRoughness={0.05}
          transmission={0.95}
          color={color}
          roughness={0.04}
        />
      </mesh>
    </Float>
  );
}

export default function FloatingGeometry({ scrollProgress = 0, mouse = { x: 0, y: 0 } }) {
  const group = useRef();

  useFrame(() => {
    if (!group.current) return;
    // Scroll-driven rotation
    group.current.rotation.y = scrollProgress * Math.PI * 0.6;
    group.current.rotation.x = scrollProgress * Math.PI * 0.18;
    // Subtle mouse parallax
    group.current.position.x += ((mouse.x * 0.5) - group.current.position.x) * 0.04;
    group.current.position.y += ((-mouse.y * 0.3) - group.current.position.y) * 0.04;
  });

  return (
    <group ref={group}>
      {/* Primary — large icosahedron, front-center */}
      <GlassShape
        geometry={<icosahedronGeometry args={[1.5, 0]} />}
        position={[0, 0.3, 0]}
        rotationSpeed={0.22}
        floatSpeed={1.3}
        scale={1}
        color="#c4b5fd"
      />

      {/* Secondary — torus knot, upper-right */}
      <GlassShape
        geometry={<torusKnotGeometry args={[0.65, 0.22, 96, 16, 2, 3]} />}
        position={[3.8, 2, -2]}
        rotationSpeed={0.38}
        floatSpeed={1.8}
        scale={0.85}
        color="#93c5fd"
      />

      {/* Tertiary — octahedron, lower-left */}
      <GlassShape
        geometry={<octahedronGeometry args={[0.85, 0]} />}
        position={[-3.4, -1.6, -1.8]}
        rotationSpeed={0.32}
        floatSpeed={2.2}
        scale={0.75}
        color="#6ee7b7"
      />

      {/* Sphere — right lower */}
      <GlassShape
        geometry={<sphereGeometry args={[0.6, 32, 32]} />}
        position={[2.8, -2.2, -2.5]}
        rotationSpeed={0.28}
        floatSpeed={2.8}
        scale={0.65}
        color="#fca5a5"
      />

      {/* Cone — left upper */}
      <GlassShape
        geometry={<coneGeometry args={[0.55, 1.2, 6]} />}
        position={[-2.6, 2.2, -3]}
        rotationSpeed={0.45}
        floatSpeed={3.2}
        scale={0.6}
        color="#fde68a"
      />

      {/* Small dodecahedron — far back */}
      <GlassShape
        geometry={<dodecahedronGeometry args={[0.5, 0]} />}
        position={[0.8, -3, -4]}
        rotationSpeed={0.52}
        floatSpeed={3.5}
        scale={0.5}
        color="#d8b4fe"
      />
    </group>
  );
}
