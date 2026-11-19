import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { Group, MathUtils } from 'three';
import { ByteModel } from './ByteScene';
import type { ByteState } from '../game/types';
import type { Position, WorldProps } from './AdventureWorld';

export function MovingByte({ world, state, active, reduced, onSettled }: { world: Position; state: ByteState; active: boolean; reduced: boolean; onSettled?: (world: Position) => void }) {
  const robot = useRef<Group>(null);
  const invalidate = useThree(s => s.invalidate);
  const acknowledged = useRef<Position | null>(null);
  const from = useRef({ x: world.x, z: world.z, angle: Math.PI - world.direction * Math.PI / 2 });
  const age = useRef(0);
  const initial = useRef(world);
  useEffect(() => {
    if (!robot.current) return;
    from.current = { x: robot.current.position.x, z: robot.current.position.z, angle: robot.current.rotation.y };
    age.current = 0;
    invalidate();
  }, [world, invalidate]);
  useFrame((_, delta) => {
    if (!robot.current) return;
    age.current += delta;
    const t = reduced || !active ? 1 : Math.min(1, age.current / 0.22);
    const eased = 1 - Math.pow(1 - t, 3);
    robot.current.position.x = MathUtils.lerp(from.current.x, world.x, eased);
    robot.current.position.z = MathUtils.lerp(from.current.z, world.z, eased);
    const target = Math.PI - world.direction * Math.PI / 2;
    const difference = Math.atan2(Math.sin(target - from.current.angle), Math.cos(target - from.current.angle));
    robot.current.rotation.y = from.current.angle + difference * eased;
    if(t === 1 && acknowledged.current !== world) { acknowledged.current = world; onSettled?.(world); }
  });
  return <group ref={robot} position={[initial.current.x, 0.33, initial.current.z]} rotation={[0, Math.PI - initial.current.direction * Math.PI / 2, 0]} scale={0.5}>
    <ByteModel state={state} active={active && !reduced} />
  </group>;
}

function ContextGuard({ onFailure }: { onFailure: () => void }) {
  const canvas = useThree(s => s.gl.domElement);
  useEffect(() => {
    const lost = (event: Event) => { event.preventDefault(); onFailure(); };
    canvas.addEventListener('webglcontextlost', lost);
    return () => canvas.removeEventListener('webglcontextlost', lost);
  }, [canvas, onFailure]);
  return null;
}

function TerrainScene({ world, level, state, active, reduced, onSettled }: WorldProps & { reduced: boolean }) {
  return <>
    <ambientLight intensity={2} />
    <directionalLight position={[2, 8, 5]} intensity={3} color="#e8f2ff" />
    <pointLight position={[level.goal[0], 2, level.goal[1]]} intensity={5} color="#5599f7" />
    {Array.from({ length: level.size * level.size }, (_, i) => {
      const x = i % level.size, z = Math.floor(i / level.size);
      return <mesh key={i} position={[x, -0.12, z]}>
        <boxGeometry args={[0.92, 0.18, 0.92]} />
        <meshStandardMaterial color={(x + z) % 2 ? '#21406c' : '#152d4f'} metalness={0.25} roughness={0.55} />
      </mesh>;
    })}
    {level.obstacles.map(([x, z]) => <mesh key={`${x}-${z}`} position={[x, 0.3, z]}>
      <boxGeometry args={[0.7, 0.7, 0.7]} />
      <meshStandardMaterial color="#57749c" emissive="#214d8a" emissiveIntensity={0.3} wireframe={false} />
    </mesh>)}
    <mesh position={[level.goal[0], 0.5, level.goal[1]]} rotation={[-Math.PI / 8, 0, 0]}>
      <torusGeometry args={[0.43, 0.055, 8, 32]} />
      <meshStandardMaterial color="#b4d3fe" emissive="#5599f7" emissiveIntensity={3} />
    </mesh>
    <MovingByte onSettled={onSettled} world={world} state={state} active={active} reduced={reduced} />
  </>;
}

export default function AdventureWorldScene({ onFailure, reduced, ...props }: WorldProps & {
  onFailure: () => void;
  reduced: boolean;
}) {
  const { level, active } = props;
  const center = (level.size - 1) / 2;
  return (
    <Canvas
      key={level.size}
      camera={{ position: [center + 4, level.size * 1.5, center + 5], fov: 43 }}
      onCreated={({ camera }) => camera.lookAt(center, 0, center)}
      dpr={[1, 1.25]}
      gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
      frameloop={active && !reduced ? 'always' : 'demand'}
    >
      <TerrainScene {...props} reduced={reduced} />
      <ContextGuard onFailure={onFailure} />
    </Canvas>
  );
}
