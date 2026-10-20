import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(1500 * 3);
    for (let i = 0; i < arr.length; i++) arr[i] = (Math.random() - 0.5) * 30;
    return arr;
  }, []);
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += Math.min(delta, 0.05) * 0.03;
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, state.pointer.y * 0.2, 0.05);
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#5cbdb9" transparent opacity={0.7} />
    </points>
  );
}

function Globe() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += Math.min(delta, 0.05) * 0.15;
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, 2 + state.pointer.x * 0.6, 0.04);
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, state.pointer.y * 0.4, 0.04);
  });
  return (
    <group ref={ref} position={[2, 0, 0]}>
      <Float speed={1.5} floatIntensity={1.2}>
        <Sphere args={[1.8, 64, 64]}>
          <MeshDistortMaterial color="#1a4a6e" distort={0.35} speed={1.6} roughness={0.2} metalness={0.6} />
        </Sphere>
        <mesh>
          <icosahedronGeometry args={[2.3, 2]} />
          <meshBasicMaterial color="#5cbdb9" wireframe transparent opacity={0.25} />
        </mesh>
      </Float>
    </group>
  );
}

export function OceanScene() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 7], fov: 55 }} dpr={[1, 2]}>
        <color attach="background" args={["#0c2340"]} />
        <fog attach="fog" args={["#0c2340", 8, 22]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={2} color="#5cbdb9" />
        <pointLight position={[-5, -3, 2]} intensity={30} color="#2d8a9e" />
        <Globe />
        <Particles />
      </Canvas>
    </div>
  );
}
