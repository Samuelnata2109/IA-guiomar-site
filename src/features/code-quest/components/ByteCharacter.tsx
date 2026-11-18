import {
  Component,
  lazy,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useReducedMotion } from "motion/react";
import { AmbientMotionContext } from "../../../components/animations/AmbientMotion";
import type { ByteState } from "../game/types";
const ByteScene = lazy(() => import("./ByteScene"));
export function ByteFallback({
  state = "idle",
  active = true,
}: {
  state?: ByteState;
  active?: boolean;
}) {
  return (
    <div
      className={`byte-fallback byte-${state} ${active ? "" : "byte-paused"}`}
      aria-hidden="true"
    >
      <div className="byte-antenna" />
      <div className="byte-head">
        <span className="byte-face">
          <i />
          <i />
        </span>
      </div>
      <div className="byte-body">
        <i />
      </div>
      <span className="byte-arm left" />
      <span className="byte-arm right" />
      <span className="byte-foot left" />
      <span className="byte-foot right" />
    </div>
  );
}
class ByteBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
export default function ByteCharacter({
  state,
  active,
}: {
  state: ByteState;
  active: boolean;
}) {
  const [webgl, setWebgl] = useState(false),
    [visible, setVisible] = useState(!document.hidden);
  const reduced = useReducedMotion();
  const paused = useContext(AmbientMotionContext);
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2");
      setWebgl(!!gl);
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
    } catch {
      setWebgl(false);
    }
    const visibility = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", visibility);
    return () => document.removeEventListener("visibilitychange", visibility);
  }, []);
  const onFailure = useCallback(() => setWebgl(false), []);
  const moving = active && visible && !reduced && !paused;
  const fallback = <ByteFallback state={state} active={moving} />;
  return (
    <div
      className="byte-character"
      role="img"
      aria-label={`BYTE, robô parceiro. Estado: ${{ idle: "pronto", moving: "em movimento", error: "tentando entender", success: "comemorando", celebration: "vitória" }[state]}`}
    >
      {webgl ? (
        <ByteBoundary fallback={fallback}>
          <Suspense fallback={fallback}>
            <ByteScene state={state} active={moving} onFailure={onFailure} />
          </Suspense>
        </ByteBoundary>
      ) : (
        fallback
      )}
    </div>
  );
}
