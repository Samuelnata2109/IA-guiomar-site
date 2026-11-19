import { Component, lazy, Suspense, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { useReducedMotion } from 'motion/react';
import { ByteFallback } from './ByteCharacter';
import type { ByteState } from '../game/types';

import { AmbientMotionContext } from '../../../components/animations/AmbientMotion';
import { supportsWebGL2 } from '../../../components/ui/webgl';
const AdventureWorldScene = lazy(() => import('./AdventureWorldScene'));

export type Position = { x: number; z: number; direction: number };
type Terrain = { size: number; start: [number, number]; goal: [number, number]; obstacles: [number, number][] };
export type WorldProps = { world: Position; level: Terrain; state: ByteState; active: boolean; onSettled?: (world: Position) => void };

function MapFallback({ world, level, state, active, onSettled }: WorldProps) {
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

export default function AdventureWorld(props: WorldProps) {
  const [webgl, setWebgl] = useState<boolean | null>(null), [visible, setVisible] = useState(!document.hidden);
  const reduced = !!useReducedMotion();
  useEffect(() => {
    if (webgl === null && props.active) setWebgl(supportsWebGL2());
  }, [props.active, webgl]);
  useEffect(() => {
    const visibility = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', visibility);
    return () => document.removeEventListener('visibilitychange', visibility);
  }, []);
  const paused = useContext(AmbientMotionContext);
  const active = props.active && visible && !paused;
  const onFailure = useCallback(() => setWebgl(false), []);
  const fallback = <MapFallback {...props} active={active && !reduced} />;
  const loading = <MapFallback {...props} active={false} onSettled={undefined} />;
  return <div className="adventure-world" role="img" aria-label={`Cenário: BYTE na coluna ${props.world.x + 1}, linha ${props.world.z + 1}, olhando para ${['cima', 'direita', 'baixo', 'esquerda'][props.world.direction]}. Portal na coluna ${props.level.goal[0] + 1}, linha ${props.level.goal[1] + 1}. Obstáculos: ${props.level.obstacles.map(([x,z]) => `coluna ${x+1}, linha ${z+1}`).join('; ') || 'nenhum'}.`}>
    {webgl ? (
      <WorldBoundary fallback={fallback}>
        <Suspense fallback={loading}>
          <AdventureWorldScene {...props} active={active} reduced={reduced} onFailure={onFailure} />
        </Suspense>
      </WorldBoundary>
    ) : webgl === null && props.active ? loading : fallback}
    <span className="adventure-map-caption" aria-hidden="true">◎ PORTAL · ▧ OBSTÁCULO</span>
  </div>;
}
