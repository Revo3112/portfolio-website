"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// Minimalist floating geometric shapes
function FloatingCube({ position, color, speed }: { position: [number, number, number], color: string, speed: number }) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x += speed * 0.01;
      mesh.current.rotation.y += speed * 0.02;
      mesh.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * speed) * 0.2;
    }
  });

  return (
    <mesh ref={mesh} position={position}>
      <boxGeometry args={[0.3, 0.3, 0.3]} />
      <meshBasicMaterial color={color} transparent opacity={0.1} wireframe />
    </mesh>
  );
}

function FloatingSphere({ position, color, speed }: { position: [number, number, number], color: string, speed: number }) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x += speed * 0.015;
      mesh.current.rotation.z += speed * 0.01;
      mesh.current.position.x = position[0] + Math.cos(state.clock.getElapsedTime() * speed) * 0.3;
    }
  });

  return (
    <mesh ref={mesh} position={position}>
      <sphereGeometry args={[0.2, 16, 16]} />
      <meshBasicMaterial color={color} transparent opacity={0.08} wireframe />
    </mesh>
  );
}

// Elegant particle system
function StarField() {
  const ref = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 2000; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 20;
      temp.push(x, y, z);
    }
    return new Float32Array(temp);
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 20;
      ref.current.rotation.y -= delta / 30;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 6]}>
      <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#8b5cf6"
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

// Subtle background gradient mesh
function BackgroundGradient() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  return (
    <mesh ref={mesh} position={[0, 0, -5]} scale={[15, 15, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <meshBasicMaterial
        color="#1a1a2e"
        transparent
        opacity={0.3}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.3} />

        {/* Background gradient */}
        <BackgroundGradient />

        {/* Elegant star field */}
        <StarField />

        {/* Floating geometric shapes - minimal and spaced out */}
        <FloatingCube position={[-4, 2, -2]} color="#8b5cf6" speed={0.5} />
        <FloatingCube position={[3, -1, -3]} color="#06b6d4" speed={0.7} />
        <FloatingCube position={[-2, -3, -1]} color="#a78bfa" speed={0.6} />

        <FloatingSphere position={[4, 3, -4]} color="#22d3ee" speed={0.4} />
        <FloatingSphere position={[-3, 1, -2]} color="#8b5cf6" speed={0.8} />
        <FloatingSphere position={[1, -2, -3]} color="#06b6d4" speed={0.5} />

        {/* Additional subtle elements */}
        <FloatingCube position={[5, -4, -5]} color="#7c3aed" speed={0.3} />
        <FloatingSphere position={[-5, 2, -4]} color="#0891b2" speed={0.6} />
      </Canvas>
    </div>
  );
}
