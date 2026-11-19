import type { CSSProperties, ReactNode } from "react";
import { bins, obstacle, type Position, type Sample } from "../game/training";

export type Arena = {
  robot: Position;
  heading: number;
  barrier: boolean;
  destinations: boolean;
  object?: { sample: Sample; position: Position };
  cargo?: Sample;
};

export const coordinate = (value: number) => value * .65;
export const sampleColor = (sample: Sample) => sample.shape === "esfera" ? "#9dc9ee" : "#427fb8";

function point({ x, z }: Position): CSSProperties {
  return { left: `${50 + x * 18}%`, top: `${43 + z * 19}%` };
}

export function FallbackArena({ arena, children }: { arena: Arena; children: ReactNode }) {
  return (
    <div className="lab-map" aria-hidden="true">
      {arena.barrier && <span className="lab-map-barrier" style={point(obstacle)} />}
      {arena.destinations && Object.entries(bins).map(([category, position]) => (
        <span key={category} className="lab-map-bin" style={point(position)}>{category}</span>
      ))}
      {arena.object && <span className={`lab-map-sample lab-map-${arena.object.sample.shape}`}
        style={{ ...point(arena.object.position), background: sampleColor(arena.object.sample) }} />}
      <div className="lab-map-robot" style={point(arena.robot)}>
        {children}
        <span className="lab-map-direction" style={{ rotate: `${-arena.heading}rad` }}>↓</span>
        {arena.cargo && <span className={`lab-map-cargo lab-map-${arena.cargo.shape}`}
          style={{ background: sampleColor(arena.cargo) }} />}
      </div>
    </div>
  );
}

export function SampleMesh({ sample, position }: { sample: Sample; position: [number, number, number] }) {
  const size = .24 + sample.size * .075;
  return (
    <mesh position={position}>
      {sample.shape === "esfera" ? <sphereGeometry args={[size / 2, 12, 8]} /> : <boxGeometry args={[size, size, size]} />}
      <meshStandardMaterial color={sampleColor(sample)} metalness={.45} roughness={.35} />
    </mesh>
  );
}

export function ArenaMeshes({ arena }: { arena: Arena }) {
  return (
    <>
      {arena.barrier && <mesh position={[coordinate(obstacle.x), -.53, coordinate(obstacle.z)]}>
        <boxGeometry args={[.46, .52, .39]} />
        <meshStandardMaterial color="#bbcde1" metalness={.32} />
      </mesh>}
      {arena.destinations && Object.entries(bins).map(([kind, position]) => (
        <mesh key={kind} position={[coordinate(position.x), -.77, coordinate(position.z)]}>
          {kind === "peça" ? <boxGeometry args={[.75, .06, .72]} /> : <cylinderGeometry args={[.38, .38, .06, 12]} />}
          <meshStandardMaterial color={kind === "peça" ? "#427fb8" : "#9dc9ee"} />
        </mesh>
      ))}
      {arena.object && <SampleMesh sample={arena.object.sample}
        position={[coordinate(arena.object.position.x), -.55, coordinate(arena.object.position.z)]} />}
    </>
  );
}
