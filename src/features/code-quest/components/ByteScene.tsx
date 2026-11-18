import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Group, MathUtils } from "three";
import type { ByteState } from "../game/types";
export function ByteModel({ state, active }: { state: ByteState; active: boolean }) {
  const body = useRef<Group>(null),
    head = useRef<Group>(null),
    eyes = useRef<Group>(null);
  const phase = useRef({ state, age: 0 });
  useFrame(({ clock }, delta) => {
    if (!body.current || !head.current || !eyes.current) return;
    if (phase.current.state !== state) {
      phase.current = { state, age: 0 };
    }
    phase.current.age += Math.min(delta, 0.05);
    const age = phase.current.age;
    if (!active) {
      body.current.position.y = 0;
      body.current.rotation.set(0, 0, 0);
      head.current.rotation.z = state === "error" ? 0.18 : 0;
      eyes.current.scale.y = 1;
      return;
    }
    const celebrate = state === "celebration" && age < 3;
    const bounce =
      state === "success" && age < 0.7
        ? Math.sin((age / 0.7) * Math.PI) * 0.22
        : celebrate
          ? Math.abs(Math.sin(age * 5)) * 0.18
          : Math.sin(clock.elapsedTime * 1.5) * 0.045;
    body.current.position.y = bounce;
    body.current.rotation.y = celebrate
      ? Math.sin(age * 3) * 0.22
      : state === "moving" && age < 0.8
        ? Math.sin(age * 8) * 0.1
        : Math.sin(clock.elapsedTime * 0.5) * 0.06;
    head.current.rotation.z = MathUtils.damp(
      head.current.rotation.z,
      state === "error" ? 0.22 : 0,
      8,
      delta,
    );
    eyes.current.scale.y = clock.elapsedTime % 4.5 > 4.35 ? 0.18 : 1;
  });
  const bright = state === "success" || state === "celebration";
  return (
    <group ref={body} position={[0, 0, 0]}>
      <group ref={head} position={[0, 0.65, 0]}>
        <mesh scale={[1.05, 0.78, 0.7]}>
          <sphereGeometry args={[0.65, 24, 18]} />
          <meshStandardMaterial
            color="#f1eaf9"
            metalness={0.3}
            roughness={0.26}
          />
        </mesh>
        <mesh position={[0, 0.01, 0.39]} scale={[0.83, 0.48, 0.19]}>
          <sphereGeometry args={[0.6, 24, 16]} />
          <meshStandardMaterial color="#211032" roughness={0.3} />
        </mesh>
        <group ref={eyes} position={[0, 0.02, 0.5]}>
          {[-0.2, 0.2].map((x) => (
            <mesh key={x} position={[x, 0, 0]}>
              <capsuleGeometry args={[0.045, 0.12, 5, 10]} />
              <meshStandardMaterial
                color="#c084fc"
                emissive="#a855f7"
                emissiveIntensity={bright ? 4 : 1.5}
              />
            </mesh>
          ))}
        </group>
        <mesh position={[0, 0.65, 0]}>
          <capsuleGeometry args={[0.025, 0.22, 4, 8]} />
          <meshStandardMaterial color="#9333ea" />
        </mesh>
        <mesh position={[0, 0.79, 0]}>
          <sphereGeometry args={[0.065, 12, 12]} />
          <meshStandardMaterial
            color="#c084fc"
            emissive="#a855f7"
            emissiveIntensity={1.6}
          />
        </mesh>
      </group>
      <mesh scale={[0.8, 1, 0.7]}>
        <capsuleGeometry args={[0.35, 0.18, 6, 16]} />
        <meshStandardMaterial color="#e5d8f5" metalness={0.3} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.05, 0.26]}>
        <torusGeometry args={[0.12, 0.025, 6, 20]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#7c3aed"
          emissiveIntensity={bright ? 3 : 1}
        />
      </mesh>
      {[-1, 1].map((side) => (
        <group key={side}>
          <mesh
            position={[side * 0.48, 0.05, 0]}
            rotation={[0, 0, side * (bright ? -0.65 : 0.25)]}
          >
            <capsuleGeometry args={[0.09, 0.23, 5, 12]} />
            <meshStandardMaterial
              color="#9333ea"
              metalness={0.3}
              roughness={0.3}
            />
          </mesh>
          <mesh position={[side * 0.22, -0.45, 0.04]} scale={[1, 0.7, 1.3]}>
            <sphereGeometry args={[0.17, 16, 12]} />
            <meshStandardMaterial color="#7c3aed" />
          </mesh>
        </group>
      ))}
    </group>
  );
}
function ContextGuard({ onFailure }: { onFailure: () => void }) {
  const canvas = useThree((s) => s.gl.domElement);
  useEffect(() => {
    canvas.addEventListener("webglcontextlost", onFailure);
    return () => canvas.removeEventListener("webglcontextlost", onFailure);
  }, [canvas, onFailure]);
  return null;
}
export default function ByteScene({
  state,
  active,
  onFailure,
}: {
  state: ByteState;
  active: boolean;
  onFailure: () => void;
}) {
  return (
    <Canvas
      camera={{ position: [1.2, 1.1, 4.3], fov: 34 }}
      dpr={[1, 1.25]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      frameloop={active ? "always" : "demand"}
    >
      <ambientLight intensity={1.8} />
      <directionalLight position={[2, 4, 3]} intensity={3} color="#f1dfff" />
      <pointLight position={[-2, 1, 1]} intensity={9} color="#9333ea" />
      <ByteModel state={state} active={active} />
      <ContextGuard onFailure={onFailure} />
    </Canvas>
  );
}
