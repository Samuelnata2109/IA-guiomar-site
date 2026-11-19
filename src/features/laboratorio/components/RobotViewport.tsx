import { Component, lazy, Suspense, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";
import type { RobotFeedback, RobotState } from "../game/robotExecution";
import type { Arena } from "./TrainingArena";
import RobotFallback from "./RobotFallback";
import RobotParticles from "./RobotParticles";
import { FallbackArena } from "./TrainingArena";
const RobotScene = lazy(() => import("./RobotScene"));

class SceneBoundary extends Component<{ children: ReactNode; fallback: ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure(); }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

export default function RobotViewport({ robot, paused, label, arena, ...feedback }: {
  robot: RobotState;
  paused: boolean;
  label: string;
  arena?: Arena;
} & Omit<RobotFeedback, "animate">) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(!document.hidden);
  const [inView, setInView] = useState(false);
  const [webgl, setWebgl] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    try {
      const context = document.createElement("canvas").getContext("webgl2");
      setWebgl(!!context);
      context?.getExtension("WEBGL_lose_context")?.loseContext();
    } catch {
      setWebgl(false);
    }
    let frame = 0;
    const measure = () => {
      frame = 0;
      const bounds = ref.current?.getBoundingClientRect();
      setInView(!!bounds && bounds.height > 0 && bounds.bottom >= -150 && bounds.top <= window.innerHeight + 150);
    };
    const scheduleMeasure = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    const visibility = () => {
      setVisible(!document.hidden);
      scheduleMeasure();
    };
    measure();
    window.addEventListener("scroll", scheduleMeasure, { passive: true });
    window.addEventListener("resize", scheduleMeasure);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleMeasure);
      window.removeEventListener("resize", scheduleMeasure);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);

  const fail = useCallback(() => setWebgl(false), []);
  const animate = !paused && !reduced && inView && visible;
  const props = { ...robot, ...feedback, animate };

  function renderFallback(loading: boolean) {
    const fallback = <RobotFallback {...props} position={arena ? 0 : props.position}
      animate={!loading && animate}
      onApplied={loading ? () => {} : props.onApplied}
      onCelebrated={loading ? () => {} : props.onCelebrated} />;
    return arena ? <FallbackArena arena={arena}>{fallback}</FallbackArena> : fallback;
  }

  return (
    <div className="robot-stage" ref={ref} role="img" aria-label={label}>
      {webgl && inView && visible ? (
        <SceneBoundary fallback={renderFallback(true)} onFailure={fail}>
          <Suspense fallback={renderFallback(true)}>
            <RobotScene {...props} arena={arena} onFailure={fail} />
          </Suspense>
        </SceneBoundary>
      ) : renderFallback(false)}
      {feedback.phase === "running" && animate && <RobotParticles executionId={feedback.executionId} />}
    </div>
  );
}
