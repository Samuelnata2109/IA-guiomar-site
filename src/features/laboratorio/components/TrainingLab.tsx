import { useCallback, useRef, useState } from "react";
import { Check, Play, RotateCcw, Square } from "lucide-react";
import { initialRobot, type RobotPhase } from "../game/robotExecution";
import {
  commands, emptyPolicy, examples, learn, origin, simulate, tasks,
  type Category, type Input, type Plan, type Policy, type Step,
} from "../game/training";
import type { Arena } from "./TrainingArena";
import RobotViewport from "./RobotViewport";

const defaultInput: Input = { examples: {}, avoid: false, order: [], priority: "peça", explore: true };
const initialMetrics = { attempts: 0, correct: 0, incorrect: 0, avoided: 0, deliveries: 0, missed: 0, rewards: 0 };
type Frame = { id: number; step: Step | null; arena: Arena };
type Run = { plan: Plan; index: number; id: number; applied: Arena };

function startArena(barrier: boolean, destinations: boolean): Arena {
  return { robot: origin, heading: 0, barrier, destinations };
}

function frameArena(previous: Arena, step: Step): Arena {
  const object = step.cargo ? undefined : step.sample && step.objectPosition
    ? { sample: step.sample, position: step.objectPosition } : previous.object;
  return { ...previous, robot: step.position, heading: step.heading, object, cargo: step.cargo };
}

function LabTask({ stage, paused, onPass, onNext }: {
  stage: number;
  paused: boolean;
  onPass: (stage: number) => void;
  onNext: () => void;
}) {
  const task = tasks[stage];
  const classifier = task.id === "classify" || task.id === "patterns" || task.id === "autonomous";
  const delivery = task.id === "deliver" || task.id === "autonomous";
  const rules = task.id === "avoid" || task.id === "autonomous";
  const reinforcement = task.id === "reward";
  const barrier = rules || reinforcement;
  const [input, setInput] = useState(defaultInput);
  const [trained, setTrained] = useState<Input["examples"] | null>(null);
  const [policy, setPolicy] = useState<Policy>(emptyPolicy);
  const [metrics, setMetrics] = useState(initialMetrics);
  const [history, setHistory] = useState<string[]>([]);
  const [message, setMessage] = useState("Aguardando configuração.");
  const [phase, setPhase] = useState<RobotPhase>("idle");
  const [passed, setPassed] = useState(false);
  const [frame, setFrame] = useState<Frame>(() => ({ id: 0, step: null, arena: startArena(barrier, delivery) }));
  const pending = useRef<Run | null>(null);
  const serial = useRef(0);

  const applied = useCallback((id: number) => {
    const run = pending.current;
    if (run?.id !== id) return;
    const step = run.plan.steps[run.index];
    const arena = frameArena(run.applied, step);
    run.applied = arena;
    setHistory(previous => [...previous, step.message]);
    setMetrics(previous => ({
      ...previous,
      correct: previous.correct + Number(step.correct === true),
      incorrect: previous.incorrect + Number(step.correct === false),
      avoided: previous.avoided + Number(!!step.avoided),
      deliveries: previous.deliveries + Number(step.delivered === true),
      missed: previous.missed + Number(step.delivered === false),
      rewards: previous.rewards + (step.reward ?? 0),
    }));
    if (step.path && step.reward !== undefined) {
      const { path, reward } = step;
      setPolicy(previous => learn(previous, path, reward));
    }
    run.index++;
    const next = run.plan.steps[run.index];
    if (next) {
      run.id = ++serial.current;
      setFrame({ id: run.id, step: next, arena: frameArena(arena, next) });
      setMessage(next.message);
      return;
    }
    pending.current = null;
    setPassed(run.plan.success);
    setPhase(run.plan.success ? "success" : "error");
    setMessage(run.plan.explanation);
    if (run.plan.success) onPass(stage);
  }, [onPass, stage]);

  const celebrated = useCallback((id: number) => {
    if (serial.current === id && !pending.current) {
      setPhase(previous => previous === "success" ? "idle" : previous);
    }
  }, []);

  function train() {
    setTrained({ ...input.examples });
    setMessage(`Modelo pronto com ${Object.keys(input.examples).length} exemplo(s). Teste com objetos novos.`);
    setPhase("idle");
    setPassed(false);
  }

  function run() {
    if (pending.current || (classifier && !trained)) return;
    const plan = simulate(task.id, { ...input, examples: trained ?? input.examples }, policy);
    const arena = startArena(barrier, delivery);
    setHistory([]);
    setPassed(false);
    setMetrics(previous => ({
      ...initialMetrics,
      attempts: previous.attempts + 1,
      rewards: previous.rewards,
    }));
    const step = plan.steps[0];
    if (!step) {
      setPhase("error");
      setMessage(plan.explanation);
      return;
    }
    const id = ++serial.current;
    pending.current = { plan, index: 0, id, applied: arena };
    setPhase("running");
    setFrame({ id, step, arena: frameArena(arena, step) });
    setMessage(step.message);
  }

  function stop() {
    const run = pending.current;
    if (!run) return;
    pending.current = null;
    setFrame({ id: ++serial.current, step: null, arena: run.applied });
    setPhase("idle");
    setMessage("Execução interrompida. Os resultados mostram apenas etapas concluídas.");
  }

  function reset() {
    pending.current = null;
    setFrame({ id: ++serial.current, step: null, arena: startArena(barrier, delivery) });
    setInput(defaultInput);
    setPolicy(emptyPolicy);
    setTrained(null);
    setPassed(false);
    setMetrics(initialMetrics);
    setHistory([]);
    setPhase("idle");
    setMessage("Tarefa reiniciada. Configure uma nova tentativa.");
  }

  function label(id: string, category: string) {
    const labels = { ...input.examples };
    if (category === "peça" || category === "cápsula") labels[id] = category;
    else delete labels[id];
    setInput({ ...input, examples: labels });
    setTrained(null);
    setPassed(false);
    setMessage("Exemplos alterados. Treine o modelo para aplicar os novos rótulos.");
  }

  function toggleCommand(id: string) {
    setInput({ ...input, order: input.order.includes(id) ? input.order.filter(command => command !== id) : [...input.order, id] });
  }

  const running = phase === "running";
  const total = metrics.correct + metrics.incorrect;
  const scene = frame.arena;
  return (
    <div className="code-lab lab-training">
      <div className="lab-preview lab-training-preview">
        <div className="preview-top"><span><i /> AMBIENTE DE TESTE</span><span>{task.title}</span></div>
        <RobotViewport
          arena={scene} robot={{ ...initialRobot, led: frame.step?.action === "scan" && running }}
          paused={paused} phase={phase} executionId={frame.id} onApplied={applied} onCelebrated={celebrated}
          label={`Robô em X ${scene.robot.x}, Z ${scene.robot.z}.${scene.cargo ? ` Transportando objeto ${scene.cargo.id}.` : ""}${scene.object ? ` Objeto ${scene.object.sample.id}: ${scene.object.sample.shape}.` : ""}`}
        />
        {delivery && <div className="lab-destinations"><span>■ Destino das peças</span><span>● Destino das cápsulas</span></div>}
        <div className="lab-training-actions">
          <button type="button" className="button button-primary" onClick={run} disabled={running || (classifier && !trained)}>
            <Play size={16} aria-hidden="true" /> Testar robô
          </button>
          <button type="button" onClick={stop} disabled={!running}><Square size={15} aria-hidden="true" /> Parar</button>
          <button type="button" onClick={reset}><RotateCcw size={16} aria-hidden="true" /> Reiniciar tarefa</button>
        </div>
        <p className="preview-status lab-training-status" role="status" data-phase={phase}>{message}</p>
      </div>
      <div className="lab-training-controls">
        <div className="lab-training-objective">
          <span className="mini-label">{task.method}</span>
          <h3>{task.title}</h3>
          <p>{task.goal}</p>
        </div>
        <fieldset disabled={running}>
          <legend>Configurar treinamento</legend>
          {classifier && <>
            <div className="lab-example-list">
              {examples.slice(0, task.id === "classify" ? 2 : examples.length).map(example => (
                <label key={example.id}>
                  <span>{example.id} · {example.shape}, tamanho {example.size}</span>
                  <select value={input.examples[example.id] ?? ""} onChange={event => label(example.id, event.target.value)}>
                    <option value="">Sem rótulo</option>
                    <option value="peça">Peça</option>
                    <option value="cápsula">Cápsula</option>
                  </select>
                </label>
              ))}
            </div>
            <button type="button" onClick={train} disabled={Object.keys(input.examples).length === 0}>Treinar modelo</button>
            <p className="lab-training-note">Rotule blocos como peças e esferas como cápsulas. Deixe sem rótulo para excluir um exemplo.</p>
          </>}
          {rules && <label className="lab-training-field">Ao detectar uma barreira
            <select value={input.avoid ? "avoid" : "stop"} onChange={event => setInput({ ...input, avoid: event.target.value === "avoid" })}>
              <option value="stop">Parar no local</option>
              <option value="avoid">Contornar e seguir</option>
            </select>
          </label>}
          {delivery && <>
            <label className="lab-training-field">Entregar primeiro
              <select value={input.priority} onChange={event => setInput({ ...input, priority: event.target.value === "peça" ? "peça" : "cápsula" })}>
                <option value="peça">Peças</option>
                <option value="cápsula">Cápsulas</option>
              </select>
            </label>
            <div className="lab-command-choices" role="group" aria-label="Comandos da sequência">
              {commands.map(command => (
                <button type="button" key={command.id} aria-pressed={input.order.includes(command.id)} onClick={() => toggleCommand(command.id)}>
                  {command.label}
                </button>
              ))}
            </div>
            <div className="lab-ordered">
              <strong>Sequência</strong>
              {input.order.length ? <ol>{input.order.map(id => <li key={id}>{commands.find(command => command.id === id)?.label}</li>)}</ol>
                : <p>Selecione os comandos na ordem. Selecione novamente para remover.</p>}
            </div>
          </>}
          {reinforcement && <>
            <label className="lab-training-field">Estratégia para o próximo teste
              <select value={input.explore ? "explore" : "best"} onChange={event => setInput({ ...input, explore: event.target.value === "explore" })}>
                <option value="explore">Explorar trajetos ainda não testados</option>
                <option value="best">Escolher pela recompensa média</option>
              </select>
            </label>
            <p className="lab-training-note">O robô recebe −3 pela rota bloqueada e +4 ao chegar ao destino. A média é atualizada ao fim de cada tentativa.</p>
            <ul className="lab-policy">
              <li>Rota direta · {policy.short.count} teste(s) · média {policy.short.count ? policy.short.value.toFixed(1) : "—"}</li>
              <li>Desvio · {policy.safe.count} teste(s) · média {policy.safe.count ? policy.safe.value.toFixed(1) : "—"}</li>
            </ul>
          </>}
        </fieldset>
        <section className="lab-training-results" aria-label="Resultados do treinamento">
          <h4>Resultados</h4>
          <dl>
            <div><dt>Tentativas</dt><dd>{metrics.attempts}</dd></div>
            {classifier && <>
              <div><dt>Exemplos no modelo</dt><dd>{Object.keys(trained ?? {}).length}</dd></div>
              <div><dt>Acertos / erros</dt><dd>{metrics.correct} / {metrics.incorrect}</dd></div>
              <div><dt>Taxa de acerto</dt><dd>{total ? `${Math.round(100 * metrics.correct / total)}%` : "—"}</dd></div>
            </>}
            {barrier && <div><dt>Obstáculos evitados</dt><dd>{metrics.avoided}</dd></div>}
            {delivery && <div><dt>Entregas certas / erradas</dt><dd>{metrics.deliveries} / {metrics.missed}</dd></div>}
            {reinforcement && <div><dt>Recompensa acumulada</dt><dd>{metrics.rewards}</dd></div>}
          </dl>
          {history.length > 0 && <details><summary>Ver etapas executadas</summary><ol>{history.map((entry, index) => <li key={index}>{entry}</li>)}</ol></details>}
          {passed && <p className="lab-training-complete"><Check size={17} aria-hidden="true" /> Tarefa concluída</p>}
          {passed && stage < tasks.length - 1 && <button type="button" onClick={onNext}>Próxima tarefa</button>}
        </section>
      </div>
    </div>
  );
}

export default function TrainingLab({ paused }: { paused: boolean }) {
  const [stage, setStage] = useState(0);
  const [completed, setCompleted] = useState(0);
  const pass = useCallback((index: number) => setCompleted(count => Math.max(count, index + 1)), []);
  const select = useRef<HTMLSelectElement>(null);
  return (
    <div className="lab-training-shell">
      <div className="lab-training-nav">
        <label>Tarefa <select ref={select} value={stage} onChange={event => setStage(Number(event.target.value))}>
          {tasks.map((task, index) => (
            <option key={task.id} value={index} disabled={index > completed}>
              {String(index + 1).padStart(2, "0")} · {task.title}
            </option>
          ))}
        </select></label>
        <span>{completed}/{tasks.length} tarefas concluídas</span>
      </div>
      <LabTask key={stage} stage={stage} paused={paused} onPass={pass} onNext={() => { setStage(stage + 1); select.current?.focus(); }} />
    </div>
  );
}
