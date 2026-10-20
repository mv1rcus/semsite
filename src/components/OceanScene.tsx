import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, Line, useGLTF, useTexture } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import earthAsset from "@/assets/earth.asset.json";
import satelliteAsset from "@/assets/satellite.asset.json";

type Palette = { background: string; star: string; sunlight: string; atmosphere: string; connection: string; orbit: string };

function Earth({ palette, reduced }: { palette: Palette; reduced: boolean }) {
  const globe = useRef<THREE.Group>(null);
  const texture = useTexture(earthAsset.url, (map) => { map.colorSpace = THREE.SRGBColorSpace; map.anisotropy = 4; });
  useFrame((_, delta) => {
    if (globe.current && !reduced) globe.current.rotation.y += Math.min(delta, 0.05) * 0.035;
  });
  return (
    <group rotation={[0.88, 0, -0.25]}>
      <group ref={globe} rotation-y={2.1} name="rotating-earth">
        <mesh>
          <sphereGeometry args={[2.15, 64, 48]} />
          <meshStandardMaterial map={texture} roughness={0.84} metalness={0.05} />
        </mesh>
      </group>
      <mesh scale={1.015}>
        <sphereGeometry args={[2.15, 64, 48]} />
        <meshBasicMaterial color={palette.atmosphere} transparent opacity={0.13} side={THREE.BackSide} depthWrite={false} />
      </mesh>
    </group>
  );
}

function Satellite({ palette }: { palette: Palette }) {
  const { scene } = useGLTF(satelliteAsset.url);
  const model = useMemo(() => {
    const clone = scene.clone(true);
    const bounds = new THREE.Box3().setFromObject(clone);
    const size = bounds.getSize(new THREE.Vector3());
    const center = bounds.getCenter(new THREE.Vector3());
    const scale = 0.38 / Math.max(size.x, size.y, size.z, 0.01);
    clone.position.copy(center).multiplyScalar(-scale);
    clone.scale.setScalar(scale);
    return clone;
  }, [scene]);
  return (
    <group rotation={[0.4, 0, -0.6]}>
      <primitive object={model} />
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 0.29, 0, 0]}>
          <mesh><boxGeometry args={[0.28, 0.2, 0.025]} /><meshStandardMaterial color={palette.orbit} metalness={0.65} roughness={0.32} /></mesh>
          {[-0.08, 0, 0.08].map((x) => <mesh key={x} position={[x, 0, 0.014]}><boxGeometry args={[0.008, 0.19, 0.002]} /><meshBasicMaterial color={palette.star} /></mesh>)}
        </group>
      ))}
    </group>
  );
}

function Orbit({ index, palette, reduced }: { index: number; palette: Palette; reduced: boolean }) {
  const rotation = useRef<THREE.Group>(null);
  const radius = 2.85 + index * 0.16;
  const points = useMemo(() => Array.from({ length: 129 }, (_, i) => {
    const angle = i / 128 * Math.PI * 2;
    return new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
  }), [radius]);
  useFrame((_, delta) => {
    if (rotation.current && !reduced) rotation.current.rotation.z += Math.min(delta, 0.05) * (0.065 + index * 0.012);
  });
  return (
    <group rotation={[0.4 + index * 0.3, index * 0.3, index * 0.65]}>
      <Line points={points} color={palette.connection} transparent opacity={0.25} lineWidth={0.7} />
      <group ref={rotation} rotation-z={index * 1.7 + 0.4} name={`orbiting-satellite-${index}`}>
        <Line points={[[2.17, 0, 0], [radius, 0, 0]]} color={palette.connection} transparent opacity={0.65} lineWidth={1} dashed dashSize={0.06} gapSize={0.04} />
        <mesh position={[2.17, 0, 0]}><sphereGeometry args={[0.034, 8, 8]} /><meshBasicMaterial color={palette.connection} /></mesh>
        <group position={[radius, 0, 0]}><Satellite palette={palette} /></group>
      </group>
    </group>
  );
}

function SpaceScene({ palette, reduced }: { palette: Palette; reduced: boolean }) {
  const { viewport } = useThree();
  const scale = Math.min(viewport.width / 7.7, viewport.height / 8.5, 1.15);
  const stars = useMemo(() => {
    const positions = new Float32Array(600 * 3);
    for (let i = 0; i < 600; i++) {
      positions[i * 3] = Math.sin(i * 127.1) * 18;
      positions[i * 3 + 1] = Math.sin(i * 311.7) * 18;
      positions[i * 3 + 2] = -3 - (i % 9);
    }
    return positions;
  }, []);
  return (
    <>
      <color attach="background" args={[palette.background]} />
      <ambientLight intensity={0.65} />
      <directionalLight position={[-4, 6, 8]} intensity={2.4} color={palette.sunlight} />
      <Environment resolution={64}>
        <Lightformer position={[0, 5, 3]} scale={[8, 8, 1]} intensity={0.8} color={palette.star} />
        <Lightformer position={[-5, 0, 2]} rotation-y={Math.PI / 2} scale={[6, 6, 1]} intensity={0.5} color={palette.atmosphere} />
      </Environment>
      <points>
        <bufferGeometry><bufferAttribute attach="attributes-position" args={[stars, 3]} /></bufferGeometry>
        <pointsMaterial color={palette.star} size={0.018} transparent opacity={0.65} sizeAttenuation />
      </points>
      <group scale={scale} position={[0, -viewport.height * 0.17, 0]}>
        <Suspense fallback={null}>
          <Earth palette={palette} reduced={reduced} />
          {[0, 1, 2, 3].map((index) => <Orbit key={index} index={index} palette={palette} reduced={reduced} />)}
        </Suspense>
      </group>
    </>
  );
}

export function OceanScene() {
  const [palette, setPalette] = useState<Palette | null>(null);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const css = getComputedStyle(document.documentElement);
    const token = (name: string) => css.getPropertyValue(`--space-${name}`).trim();
    setPalette({ background: token("background"), star: token("star"), sunlight: token("sunlight"), atmosphere: token("atmosphere"), connection: token("connection"), orbit: token("orbit") });
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(media.matches);
    const update = () => setReduced(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  if (!palette) return null;
  return (
    <div className="earth-background pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }} dpr={[1, 1.5]} gl={{ antialias: true }}>
        <SpaceScene palette={palette} reduced={reduced} />
      </Canvas>
      <div className="earth-shade absolute inset-0" />
    </div>
  );
}