import { Component, Suspense, useEffect, useRef, useState, type ReactNode } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useReducedMotion } from 'motion/react';
import { Group, MathUtils } from 'three';
import { ByteModel } from './ByteScene';
import { ByteFallback } from './ByteCharacter';
import type { ByteState } from '../game/types';

type Position = { x: number; z: number; direction: number };
type Terrain = { size: number; start: [number, number]; goal: [number, number]; obstacles: [number, number][] };
type Props = { world: Position; level: Terrain; state: ByteState; active: boolean; onSettled?: (world: Position) => void };

function MapFallback({ world, level, state, active, onSettled }: Props) {
  useEffect(() => { onSettled?.(world); }, [world, onSettled]);
  return <div className="adventure-map" style={{ gridTemplateColumns: `repeat(${level.size}, 1fr)` }} aria-hidden="true">
    {Array.from({ length: level.size * level.size }, (_, i) => {
      const x = i % level.size, z = Math.floor(i / level.size);
      const robot = world.x === x && world.z === z;
      const goal = level.goal[0] === x && level.goal[1] === z;
      const obstacle = level.obstacles.some(([ox, oz]) => ox === x && oz === z);
      return <div key={i} className={`adventure-tile ${goal ? 'portal' : ''} ${obstacle ? 'obstacle' : ''}`}>
        {robot ? <><ByteFallback state={state} active={active} /><span className="map-facing">{['↑', '→', '↓', '←'][world.direction]}</span></> : goal ? <span>◎</span> : obstacle ? <span>▧</span> : null}
      </div>;
    })}
  </div>;
}

class WorldBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

export function MovingByte({ world, state, active, reduced, onSettled }: { world: Position; state: ByteState; active: boolean; reduced: boolean; onSettled?: (world: Position) => void }) {
  const robot = useRef<Group>(null);
  const acknowledged = useRef<Position | null>(null);
  const from = useRef({ x: world.x, z: world.z, angle: Math.PI - world.direction * Math.PI / 2 });
  const age = useRef(0);
  const initial = useRef(world);
  useEffect(() => {
    if (!robot.current) return;
    from.current = { x: robot.current.position.x, z: robot.current.position.z, angle: robot.current.rotation.y };
    age.current = 0;
  }, [world.x, world.z, world.direction]);
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

function TerrainScene({ world, level, state, active, reduced, onSettled }: Props & { reduced: boolean }) {
  return <>
    <ambientLight intensity={2} />
    <directionalLight position={[2, 8, 5]} intensity={3} color="#f2e8ff" />
    <pointLight position={[level.goal[0], 2, level.goal[1]]} intensity={5} color="#a855f7" />
    {Array.from({ length: level.size * level.size }, (_, i) => {
      const x = i % level.size, z = Math.floor(i / level.size);
      return <mesh key={i} position={[x, -0.12, z]}>
        <boxGeometry args={[0.92, 0.18, 0.92]} />
        <meshStandardMaterial color={(x + z) % 2 ? '#45216c' : '#32154f'} metalness={0.25} roughness={0.55} />
      </mesh>;
    })}
    {level.obstacles.map(([x, z]) => <mesh key={`${x}-${z}`} position={[x, 0.3, z]}>
      <boxGeometry args={[0.7, 0.7, 0.7]} />
      <meshStandardMaterial color="#81579c" emissive="#6b218a" emissiveIntensity={0.3} wireframe={false} />
    </mesh>)}
    <mesh position={[level.goal[0], 0.5, level.goal[1]]} rotation={[-Math.PI / 8, 0, 0]}>
      <torusGeometry args={[0.43, 0.055, 8, 32]} />
      <meshStandardMaterial color="#d8b4fe" emissive="#a855f7" emissiveIntensity={3} />
    </mesh>
    <MovingByte onSettled={onSettled} world={world} state={state} active={active} reduced={reduced} />
  </>;
}

export default function AdventureWorld(props: Props) {
  const [webgl, setWebgl] = useState(false), [visible, setVisible] = useState(!document.hidden);
  const reduced = !!useReducedMotion();
  useEffect(() => {
    try {
      const gl = document.createElement('canvas').getContext('webgl2');
      setWebgl(!!gl);
      gl?.getExtension('WEBGL_lose_context')?.loseContext();
    } catch { setWebgl(false); }
    const visibility = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', visibility);
    return () => document.removeEventListener('visibilitychange', visibility);
  }, []);
  const active = props.active && visible;
  const fallback = <MapFallback {...props} active={active && !reduced} />;
  const center = (props.level.size - 1) / 2;
  return <div className="adventure-world" role="img" aria-label={`Cenário: BYTE na coluna ${props.world.x + 1}, linha ${props.world.z + 1}, olhando para ${['cima', 'direita', 'baixo', 'esquerda'][props.world.direction]}. Portal na coluna ${props.level.goal[0] + 1}, linha ${props.level.goal[1] + 1}. Obstáculos: ${props.level.obstacles.map(([x,z]) => `coluna ${x+1}, linha ${z+1}`).join('; ') || 'nenhum'}.`}>
    {webgl ? <WorldBoundary fallback={fallback}><Suspense fallback={fallback}>
      <Canvas key={props.level.size} camera={{ position: [center + 4, props.level.size * 1.5, center + 5], fov: 43 }} onCreated={({ camera }) => camera.lookAt(center, 0, center)} dpr={[1, 1.25]} gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }} frameloop={active && !reduced ? 'always' : 'demand'}>
        <TerrainScene {...props} active={active} reduced={reduced} />
        <ContextGuard onFailure={() => setWebgl(false)} />
      </Canvas>
    </Suspense></WorldBoundary> : fallback}
    <span className="adventure-map-caption" aria-hidden="true">◎ PORTAL · ▧ OBSTÁCULO</span>
  </div>;
}
