"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// PERFORMANCE OPTIMIZED: Single useFrame for all animations
function OptimizedScene() {
  const cubeRefs = useRef<THREE.Mesh[]>([]);
  const sphereRefs = useRef<THREE.Mesh[]>([]);
  const pointsRef = useRef<THREE.Points>(null);
  const gradientRef = useRef<THREE.Mesh>(null);

  // Single consolidated animation loop - eliminates 4+ separate useFrame calls
  useFrame((state, delta) => {
    const elapsed = state.clock.getElapsedTime();

    // Animate all cubes
    cubeRefs.current.forEach((cube, index) => {
      if (cube) {
        const speed = 0.5 + (index * 0.2);
        cube.rotation.x += speed * 0.01;
        cube.rotation.y += speed * 0.02;
        cube.position.y += Math.sin(elapsed * speed + index) * 0.001;
      }
    });

    // Animate all spheres
    sphereRefs.current.forEach((sphere, index) => {
      if (sphere) {
        const speed = 0.4 + (index * 0.15);
        sphere.rotation.x += speed * 0.015;
        sphere.rotation.z += speed * 0.01;
        sphere.position.x += Math.cos(elapsed * speed + index) * 0.001;
      }
    });

    // Animate particles
    if (pointsRef.current) {
      pointsRef.current.rotation.x -= delta / 25;
      pointsRef.current.rotation.y -= delta / 35;
    }

    // Animate gradient background
    if (gradientRef.current) {
      gradientRef.current.rotation.z = Math.sin(elapsed * 0.08) * 0.05;
    }
  });

  // Optimized particles - reduced count for better performance
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 1200; i++) { // Reduced from 2000 to 1200
      const x = (Math.random() - 0.5) * 16;
      const y = (Math.random() - 0.5) * 16;
      const z = (Math.random() - 0.5) * 16;
      temp.push(x, y, z);
    }
    return new Float32Array(temp);
  }, []);

  // Cube positions and colors
  const cubeData = useMemo(() => [
    { position: [-4, 2, -2], color: "#8b5cf6" },
    { position: [3, -1, -3], color: "#06b6d4" },
    { position: [-2, -3, -1], color: "#a78bfa" },
    { position: [5, -4, -5], color: "#7c3aed" }
  ], []);

  // Sphere positions and colors
  const sphereData = useMemo(() => [
    { position: [4, 3, -4], color: "#22d3ee" },
    { position: [-3, 1, -2], color: "#8b5cf6" },
    { position: [1, -2, -3], color: "#06b6d4" },
    { position: [-5, 2, -4], color: "#0891b2" }
  ], []);

  return (
    <>
      {/* Background Gradient */}
      <mesh ref={gradientRef} position={[0, 0, -5]} scale={[15, 15, 1]}>
        <planeGeometry args={[1, 1, 20, 20]} />
        <meshBasicMaterial
          color="#1a1a2e"
          transparent
          opacity={0.25}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Optimized Particle System */}
      <group rotation={[0, 0, Math.PI / 6]}>
        <Points ref={pointsRef} positions={particles} stride={3} frustumCulled={false}>
          <PointMaterial
            transparent
            color="#8b5cf6"
            size={0.012}
            sizeAttenuation={true}
            depthWrite={false}
          />
        </Points>
      </group>

      {/* Floating Cubes */}
      {cubeData.map((cube, index) => (
        <mesh
          key={`cube-${index}`}
          ref={(ref) => {
            if (ref) cubeRefs.current[index] = ref;
          }}
          position={cube.position as [number, number, number]}
        >
          <boxGeometry args={[0.25, 0.25, 0.25]} />
          <meshBasicMaterial
            color={cube.color}
            transparent
            opacity={0.08}
            wireframe
          />
        </mesh>
      ))}

      {/* Floating Spheres */}
      {sphereData.map((sphere, index) => (
        <mesh
          key={`sphere-${index}`}
          ref={(ref) => {
            if (ref) sphereRefs.current[index] = ref;
          }}
          position={sphere.position as [number, number, number]}
        >
          <sphereGeometry args={[0.18, 12, 12]} />
          <meshBasicMaterial
            color={sphere.color}
            transparent
            opacity={0.06}
            wireframe
          />
        </mesh>
      ))}
    </>
  );
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 55 }}
        dpr={[1, 2]} // Limit pixel ratio for performance
        performance={{ min: 0.5 }} // Performance throttling
      >
        <ambientLight intensity={0.2} />
        <OptimizedScene />
      </Canvas>
    </div>
  );
}
