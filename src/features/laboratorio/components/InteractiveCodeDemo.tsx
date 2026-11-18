import RobotFallback from "./RobotFallback";
import RobotParticles from "./RobotParticles";
import {
  executeRobotCommand,
  initialRobot,
  type RobotPhase,
} from "../game/robotExecution";
import {
  Component,
  lazy,
  Suspense,
  useEffect,
  useCallback,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useReducedMotion } from "motion/react";
import {
  Play,
  RotateCcw,
  Check,
  Terminal,
  Lightbulb,
  Palette,
  MoveRight,
  Orbit,
  AlertCircle,
} from "lucide-react";
import { SectionReveal, Eyebrow } from "../../../components/animations/Shared";
const RobotScene = lazy(() => import("./RobotScene"));
const commands = [
  {
    label: "Acender LED",
    code: "robo.led.ligar();",
    icon: Lightbulb,
    explanation: "Um comando pode transformar código em luz.",
  },
  {
    label: "Mudar cor",
    code: 'interface.cor = "violeta";',
    icon: Palette,
    explanation: "Variáveis ajudam a transformar a aparência de uma interface.",
  },
  {
    label: "Mover robô",
    code: "robo.mover(1);",
    icon: MoveRight,
    explanation: "Instruções de movimento alteram a posição do robô.",
  },
  {
    label: "Animar",
    code: "robo.girar(360);",
    icon: Orbit,
    explanation: "Uma sequência de mudanças cria uma animação.",
  },
];
class SceneBoundary extends Component<
  { children: ReactNode; fallback: ReactNode; onFailure: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFailure();
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
export default function InteractiveCodeDemo({ paused }: { paused: boolean }) {
  const [selected, setSelected] = useState(0);
  const [robot, setRobot] = useState(initialRobot);
  const { led, color, position, spin } = robot;
  const [phase, setPhase] = useState<RobotPhase>("idle");
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [executionId, setExecutionId] = useState(0);
  const sequence = useRef(0);
  const pending = useRef<{ id: number; message: string } | null>(null);
  const mounted = useRef(true);
  const [visible, setVisible] = useState(!document.hidden);
  const [result, setResult] = useState("Pronto para sua primeira ideia.");
  const [runs, setRuns] = useState(0);
  const [inView, setInView] = useState(false);
  const [webgl, setWebgl] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    mounted.current = true;
    const visibility = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      mounted.current = false;
      pending.current = null;
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("webgl2");
      setWebgl(!!context);
      context?.getExtension("WEBGL_lose_context")?.loseContext();
    } catch {
      setWebgl(false);
    }
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      rootMargin: "150px",
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const applied = useCallback((id: number) => {
    if (!mounted.current || pending.current?.id !== id) return;
    const message = pending.current.message;
    pending.current = null;
    setRuns((value) => value + 1);
    setResult(message);
    setPhase("success");
  }, []);
  const celebrated = useCallback((id: number) => {
    if (!mounted.current || sequence.current !== id || pending.current) return;
    setPhase((current) => (current === "success" ? "idle" : current));
  }, []);
  const sceneFailure = useCallback(() => {
    if (!mounted.current) return;
    setWebgl(false);
    if (pending.current) {
      pending.current = null;
      setPhase("error");
      setResult("Não foi possível atualizar a cena. Tente executar novamente.");
    }
  }, []);
  function run() {
    if (pending.current) return;
    const id = ++sequence.current;
    setExecutionId(id);
    try {
      const { next, message } = executeRobotCommand(code, robot, !!reduce);
      pending.current = { id, message };
      setPhase("running");
      setRobot(next);
    } catch (error) {
      pending.current = null;
      setPhase("error");
      setResult(
        error instanceof Error
          ? error.message
          : "Não foi possível executar o comando.",
      );
    }
  }
  function reset() {
    pending.current = null;
    setExecutionId(++sequence.current);
    setRobot(initialRobot);
    setPhase("idle");
    setRuns(0);
    setResult("Experiência reiniciada. Vamos criar?");
  }
  const code =
    selected === 0
      ? led
        ? "robo.led.desligar();"
        : "robo.led.ligar();"
      : selected === 1
        ? `interface.cor = "${color === "#a855f7" ? "ciano" : "violeta"}";`
        : commands[selected].code;
  const effectivePhase =
    phase === "idle" && (hovered || focused) ? "hover" : phase;
  const animate = !paused && !reduce && inView && visible;
  const feedback = {
    phase: effectivePhase as RobotPhase,
    executionId,
    animate,
    onApplied: applied,
    onCelebrated: celebrated,
  };
  const fallback = <RobotFallback {...robot} {...feedback} />;
  // Loading UI cannot acknowledge a command before the active renderer applies it.
  const loadingFallback = (
    <RobotFallback
      {...robot}
      {...feedback}
      onApplied={() => {}}
      onCelebrated={() => {}}
    />
  );
  return (
    <SectionReveal id="laboratorio" className="section lab-section">
      <div className="container">
        <div className="lab-heading">
          <div>
            <Eyebrow number="04">MENOS IMAGINAR. MAIS EXPERIMENTAR.</Eyebrow>
            <h2 data-reveal>
              VOCÊ TAMBÉM
              <br />
              PODE <span className="text-lavender">CRIAR.</span>
            </h2>
          </div>
          <p data-reveal>
            Uma ideia. Um comando. Uma descoberta.
            <br />
            Escolha uma ação e veja acontecer.
          </p>
        </div>
        <div className="code-lab" ref={ref} data-robot-state={effectivePhase}>
          <div className="code-editor">
            <div className="editor-top">
              <span className="window-dots">
                <i />
                <i />
                <i />
              </span>
              <span>minha-primeira-ideia.js</span>
              <Terminal size={16} />
            </div>
            <div
              className="command-list"
              role="group"
              aria-label="Escolher comando"
            >
              {commands.map((c, i) => (
                <button
                  key={c.label}
                  onClick={() => setSelected(i)}
                  aria-pressed={selected === i}
                  className={selected === i ? "selected" : ""}
                >
                  <c.icon size={16} />
                  {c.label}
                </button>
              ))}
            </div>
            <div className="code-lines">
              <div>
                <span>01</span>
                <code className="code-comment">
                  // O futuro começa com uma ideia.
                </code>
              </div>
              <div>
                <span>02</span>
                <code>
                  <b>const</b> robo = <em>criarRobo</em>();
                </code>
              </div>
              <div>
                <span>03</span>
              </div>
              <div className="active-code">
                <span>04</span>
                <code>
                  {code}
                  <i className="code-caret" />
                </code>
              </div>
              <div>
                <span>05</span>
              </div>
              <div>
                <span>06</span>
                <code className="code-comment">
                  // Agora é com você. Execute ↓
                </code>
              </div>
            </div>
            <p className="command-explanation">
              {commands[selected].explanation}
            </p>
            <div className="editor-bottom">
              <button
                className="button button-primary execute-button"
                onClick={run}
                disabled={phase === "running"}
                aria-busy={phase === "running"}
                onPointerEnter={(e) => {
                  if (e.pointerType !== "touch") setHovered(true);
                }}
                onPointerLeave={() => setHovered(false)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
              >
                <Play size={16} fill="currentColor" />
                EXECUTAR CÓDIGO
              </button>
              <button
                className="reset-button"
                onClick={reset}
                aria-label="Reiniciar experiência"
              >
                <RotateCcw size={19} />
              </button>
            </div>
          </div>
          <div
            className="lab-preview"
            style={{ "--lab-color": color } as React.CSSProperties}
          >
            <div className="preview-top">
              <span>
                <i /> RESULTADO EM TEMPO REAL
              </span>
              <span>JS → MUNDO</span>
            </div>
            <div
              className="robot-stage"
              role="img"
              aria-label={`Robô digital. LED ${led ? "aceso" : "apagado"}, cor ${color === "#a855f7" ? "violeta" : "ciano"}, posição ${position}, rotações ${spin}.`}
            >
              {webgl && inView ? (
                <SceneBoundary
                  fallback={loadingFallback}
                  onFailure={sceneFailure}
                >
                  <Suspense fallback={loadingFallback}>
                    <RobotScene
                      {...robot}
                      {...feedback}
                      onFailure={sceneFailure}
                    />
                  </Suspense>
                </SceneBoundary>
              ) : (
                fallback
              )}
              {phase === "running" && animate && (
                <RobotParticles executionId={executionId} />
              )}
            </div>
            <div className="preview-status" role="status">
              {phase === "error" ? (
                <AlertCircle size={15} />
              ) : (
                <Check size={15} />
              )}
              {result}
            </div>
            <div className="preview-bottom">
              <span>DEMONSTRAÇÃO INTERATIVA</span>
              <span>{String(runs).padStart(2, "0")} COMANDOS</span>
            </div>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
