import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Group, MathUtils } from "three";
import type { RobotState, RobotFeedback } from "../game/robotExecution";
import { ArenaMeshes, coordinate, SampleMesh, type Arena } from "./TrainingArena";
type Props = RobotState & RobotFeedback & { onFailure: () => void; arena?: Arena };

export function Robot({
  led,
  color,
  position,
  spin,
  animate,
  phase,
  executionId,
  onApplied,
  onCelebrated,
  arena,
}: Props) {
  const root = useRef<Group>(null);
  const pose = useRef<Group>(null);
  const head = useRef<Group>(null);
  const eyes = useRef<Group>(null);
  const arms = useRef<Group>(null);
  const motion = useRef({ key: "", age: 0, applied: -1, celebrated: -1 });
  const x = coordinate(arena?.robot.x ?? position);
  const z = coordinate(arena?.robot.z ?? 0);
  const rotation = arena?.heading ?? spin * Math.PI * 2;
  const cargo = arena?.cargo;
  useEffect(() => {
    if (animate || !root.current) return;
    root.current.position.set(x, 0, z);
    root.current.rotation.set(0, rotation, 0);
    pose.current?.position.set(0, 0, 0);
    pose.current?.rotation.set(0, 0, 0);
    head.current?.rotation.set(0, 0, 0);
    eyes.current?.scale.set(1, 1, 1);
    arms.current?.rotation.set(0, 0, 0);
    if (phase === "running") onApplied(executionId);
    if (phase === "success") onCelebrated(executionId);
  }, [animate, phase, executionId, x, z, rotation, onApplied, onCelebrated]);
  useFrame(({ clock, pointer }, rawDelta) => {
    if (
      !animate ||
      !root.current ||
      !head.current ||
      !pose.current ||
      !eyes.current ||
      !arms.current
    )
      return;
    const delta = Math.min(rawDelta, 0.05);
    const key = `${phase}:${executionId}`;
    if (motion.current.key !== key) {
      motion.current.key = key;
      motion.current.age = 0;
    }
    motion.current.age += delta;
    const age = motion.current.age;
    const t = clock.elapsedTime;
    const running = phase === "running";
    const success = phase === "success";
    const hover = phase === "hover";
    const error = phase === "error";
    const targetX = x;
    // Cursor motion is separate from command rotation so settling can be measured exactly.
    const targetRotation = rotation;
    root.current.position.x = MathUtils.damp(
      root.current.position.x,
      targetX,
      arena ? 14 : 7,
      delta,
    );
    root.current.position.z = MathUtils.damp(root.current.position.z, z, 14, delta);
    root.current.rotation.y = MathUtils.damp(
      root.current.rotation.y,
      targetRotation,
      arena ? 14 : 7,
      delta,
    );
    const reaction = running
      ? Math.sin(Math.min(age / 0.48, 1) * Math.PI) * -0.09
      : 0;
    const jump = success ? Math.sin(Math.min(age / 0.7, 1) * Math.PI) * 0.3 : 0;
    pose.current.position.y =
      reaction + jump + (running || success ? 0 : Math.sin(t * 1.6) * 0.065);
    pose.current.rotation.z = MathUtils.damp(
      pose.current.rotation.z,
      running ? Math.sin(age * 12) * 0.035 : 0,
      8,
      delta,
    );
    pose.current.rotation.y = MathUtils.damp(
      pose.current.rotation.y,
      running || success ? 0 : pointer.x * 0.1,
      5,
      delta,
    );
    head.current.rotation.y = MathUtils.damp(
      head.current.rotation.y,
      hover
        ? -0.5
        : running
          ? Math.sin(age * 8) * 0.12
          : error
            ? -0.16
            : Math.sin(t * 0.65) * 0.08,
      7,
      delta,
    );
    head.current.rotation.z = MathUtils.damp(
      head.current.rotation.z,
      error ? 0.25 : hover ? -0.08 : 0,
      7,
      delta,
    );
    head.current.rotation.x = MathUtils.damp(
      head.current.rotation.x,
      hover ? 0.12 : running ? 0.1 : 0,
      7,
      delta,
    );
    const blinkTime = t % 4.8;
    eyes.current.scale.y =
      !running && !success && blinkTime > 4.6
        ? 0.12 + 0.88 * Math.abs((blinkTime - 4.7) / 0.1)
        : 1;
    arms.current.rotation.z = success
      ? Math.sin(Math.min(age / 0.7, 1) * Math.PI) * 0.15
      : running
        ? Math.sin(age * 10) * 0.04
        : 0;
    const settled =
      Math.abs(root.current.position.x - targetX) < 0.003 &&
      Math.abs(root.current.position.z - z) < 0.003 &&
      Math.abs(root.current.rotation.y - targetRotation) < 0.006;
    if (
      running &&
      age >= (arena ? 0.34 : 0.48) &&
      settled &&
      motion.current.applied !== executionId
    ) {
      motion.current.applied = executionId;
      onApplied(executionId);
    }
    if (success && age >= 0.7 && motion.current.celebrated !== executionId) {
      motion.current.celebrated = executionId;
      onCelebrated(executionId);
    }
  });
  const glowing = led || phase === "success";
  return (
    <group ref={root}>
      <group ref={pose}>
        {/* Existing meshes and materials, regrouped around the existing head pivot. */}
        <group ref={head} position={[0, 0.7, 0]}>
          <mesh>
            <boxGeometry args={[1.4, 1.05, 0.85]} />
            <meshStandardMaterial
              color="#b1c2da"
              metalness={0.75}
              roughness={0.26}
            />
          </mesh>
          <mesh position={[0, 0.02, 0.44]}>
            <boxGeometry args={[1.18, 0.7, 0.05]} />
            <meshStandardMaterial
              color="#0c1522"
              metalness={0.3}
              roughness={0.3}
            />
          </mesh>
          <group position={[0, 0.06, 0.49]}>
            <group ref={eyes}>
              {[-0.3, 0.3].map((x) => (
                <mesh key={x} position={[x, 0, 0]}>
                  <capsuleGeometry args={[0.065, 0.16, 6, 12]} />
                  <meshStandardMaterial
                    color={glowing ? color : "#344154"}
                    emissive={color}
                    emissiveIntensity={phase === "success" ? 5 : led ? 3 : 0}
                  />
                </mesh>
              ))}
            </group>
          </group>
          <mesh position={[0, 0.68, 0]}>
            <cylinderGeometry args={[0.025, 0.025, 0.35, 8]} />
            <meshStandardMaterial color="#8b9aae" metalness={0.8} />
          </mesh>
          <mesh position={[0, 0.87, 0]}>
            <sphereGeometry args={[0.075, 16, 16]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={glowing ? 3 : 0.2}
            />
          </mesh>
        </group>
        <mesh>
          <boxGeometry args={[0.8, 0.6, 0.65]} />
          <meshStandardMaterial
            color="#334764"
            metalness={0.7}
            roughness={0.25}
          />
        </mesh>
        {cargo && <SampleMesh sample={cargo} position={[0, -.25, .55]} />}
        <group ref={arms}>
          {[-0.59, 0.59].map((x) => (
            <mesh key={x} position={[x, 0.02, 0]} rotation={[0, 0, x * 0.3]}>
              <capsuleGeometry args={[0.13, 0.35, 6, 12]} />
              <meshStandardMaterial
                color="#97a6bc"
                metalness={0.8}
                roughness={0.3}
              />
            </mesh>
          ))}
        </group>
        {[-0.27, 0.27].map((x) => (
          <mesh key={x} position={[x, -0.55, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.21, 0.21, 0.25, 24]} />
            <meshStandardMaterial color="#16202f" roughness={0.5} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
function ContextMonitor({ onFailure }: { onFailure: () => void }) {
  const canvas = useThree((state) => state.gl.domElement);
  useEffect(() => {
    const handler = () => onFailure();
    canvas.addEventListener("webglcontextlost", handler);
    return () => canvas.removeEventListener("webglcontextlost", handler);
  }, [canvas, onFailure]);
  return null;
}
export default function RobotScene(props: Props) {
  return (
    <Canvas
      camera={props.arena ? { position: [3.4, 4.1, 6.3], fov: 40 } : { position: [2.8, 1.8, 5.7], fov: 35 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      frameloop={props.animate ? "always" : "demand"}
    >
      <ambientLight intensity={1.3} />
      <directionalLight position={[3, 5, 4]} intensity={3} color="#cae0ff" />
      <pointLight position={[-3, 2, 1]} intensity={15} color="#337fea" />
      <pointLight position={[2, 0, 2]} intensity={8} color={props.color} />
      {props.arena && <ArenaMeshes arena={props.arena} />}
      <Robot {...props} />
      <ContextMonitor onFailure={props.onFailure} />
      <gridHelper
        args={[12, 24, "#395275", "#1b2635"]}
        position={[0, -0.8, 0]}
      />
    </Canvas>
  );
}
