import { useEffect, useRef, useState } from "react";
import { Award, ChevronRight, RotateCcw } from "lucide-react";
import Modal from "../../../components/ui/Modal";
import { aiTerrain, evaluateMission, missions, route, type Mission, type MissionInput, type MissionResult } from "../game/aiMissions";
import { useAdventureLayout } from "../hooks/useAdventureLayout";
import AdventureWorld from "./AdventureWorld";

const storageKey = "ds-code-quest-ai-v1";

function restoreProgress() {
  try {
    const stored = Number(sessionStorage.getItem(storageKey));
    if (Number.isInteger(stored) && stored >= 0 && stored <= missions.length) return stored;
  } catch {
    // The game works without storage.
  }
  return 0;
}

function CameraFrame({ shape }: { shape: "circle" | "triangle" | "partial" }) {
  const description = {
    circle: "Contorno fechado, curvo e sem vértices",
    triangle: "Contorno fechado com três lados e três vértices",
    partial: "Segmento curto, com o restante do contorno oculto",
  }[shape];
  return (
    <svg viewBox="0 0 100 64" role="img" aria-label={description} className="ai-camera-frame">
      <rect width="100" height="64" rx="5" fill="#12243e" />
      <path d="M8 20V8h12m60 0h12v12M8 44v12h12m60 0h12V44" fill="none" stroke="#76afe3" />
      {shape === "circle" && <circle cx="50" cy="32" r="16" fill="none" stroke="#dceaf5" strokeWidth="3" />}
      {shape === "triangle" && <path d="m50 14 20 34H30Z" fill="none" stroke="#dceaf5" strokeWidth="3" />}
      {shape === "partial" && <>
        <path d="M36 38Q39 23 52 19" fill="none" stroke="#dceaf5" strokeWidth="3" />
        <path d="M43 11h29v42H43z" fill="#254d78" />
        <path d="m44 25 13-13M44 38l26-26M44 51l26-26m-12 27 12-12" stroke="#76afe3" opacity=".55" />
      </>}
    </svg>
  );
}

function MissionControls({ mission, input, onChange }: {
  mission: Mission;
  input: MissionInput;
  onChange: (input: MissionInput) => void;
}) {
  if (mission.kind === "classify") {
    return (
      <div className="ai-choices">
        {mission.items.map(item => (
          <label className="ai-classifier" key={item.id}>
            {item.shape && <CameraFrame shape={item.shape} />}
            <span>{item.label}</span>
            <select value={input.labels[item.id] ?? ""} onChange={event =>
              onChange({ ...input, labels: { ...input.labels, [item.id]: event.target.value } })
            }>
              <option value="">Classificar</option>
              {mission.categories.map(category => <option key={category.id} value={category.id}>{category.label}</option>)}
            </select>
          </label>
        ))}
      </div>
    );
  }
  const ordered = mission.kind === "prompt" || mission.kind === "agent";
  return (
    <>
      <div className="ai-choices" role="group" aria-label={ordered ? "Peças disponíveis" : "Exemplos disponíveis"}>
        {mission.options.map(option => {
          const selected = input.selected.includes(option.id);
          return (
            <button type="button" key={option.id} aria-pressed={selected} onClick={() => onChange({
              ...input,
              selected: selected ? input.selected.filter(id => id !== option.id) : [...input.selected, option.id],
            })}>
              {option.label}
            </button>
          );
        })}
      </div>
      {ordered && (
        <div className="ai-sequence">
          <strong>{mission.kind === "prompt" ? "Seu prompt" : "Sua sequência"}</strong>
          {input.selected.length === 0 ? <p>Toque nas peças para montar. Toque de novo para remover.</p> :
            <ol>{input.selected.map(id => <li key={id}>{mission.options.find(option => option.id === id)?.label}</li>)}</ol>}
        </div>
      )}
    </>
  );
}

function MissionRound({ stage, onResult, onNext }: {
  stage: number;
  onResult: (result: MissionResult | null) => void;
  onNext: () => void;
}) {
  const mission = missions[stage];
  const [input, setInput] = useState<MissionInput>({ labels: {}, selected: [] });
  const [result, setResult] = useState<MissionResult | null>(null);
  const [preview, setPreview] = useState<string[]>([]);
  const work = useRef<HTMLDivElement>(null);

  function reset() {
    setInput({ labels: {}, selected: [] });
    setResult(null);
    setPreview([]);
    onResult(null);
  }

  function update(next: MissionInput) {
    if (result) setPreview(result.observations);
    setResult(null);
    setInput(next);
    onResult(null);
  }

  function run() {
    const outcome = evaluateMission(mission, input);
    setResult(outcome);
    onResult(outcome);
    work.current?.scrollTo({ top: 0 });
  }

  const action = {
    classify: "Verificar classificação", data: "Verificar conjunto", training: "Treinar e testar",
    prompt: "Simular resposta", agent: "Simular fluxo",
  }[mission.kind];
  return (
    <section className="ai-mission-panel" aria-label="Comandos da missão">
      <div ref={work} className="ai-mission-scroll" tabIndex={0} aria-label="Atividade e feedback">
        <p className="ai-instructions">{mission.instructions}</p>
        <div className="ai-feedback" role="status" data-result={result ? (result.passed ? "success" : "error") : undefined}>
          {result && <>
            <strong>{result.summary}</strong>
            <ul>{result.observations.map(text => <li key={text}>{text}</li>)}</ul>
            {result.passed && <p><Award size={16} aria-hidden="true" /> Selo conquistado · {mission.badge}</p>}
          </>}
        </div>
        {(mission.kind === "training" || mission.kind === "prompt" || mission.kind === "agent") &&
          <p className="ai-simulation-note">Simulação didática local.</p>}
        <MissionControls mission={mission} input={input} onChange={update} />
        {preview.length > 0 && (
          <details className="ai-hint">
            <summary>Comparar com o teste anterior</summary>
            <ul>{preview.map(text => <li key={text}>{text}</li>)}</ul>
          </details>
        )}
        <details className="ai-hint">
          <summary>Dica do BYTE</summary>
          <p>{mission.hint}</p>
        </details>
      </div>
      <div className="ai-mission-actions">
        <button type="button" className="ai-reset" onClick={reset} aria-label="Reiniciar missão" title="Reiniciar missão">
          <RotateCcw size={17} aria-hidden="true" />
        </button>
        {result?.passed ? (
          <button type="button" className="button button-primary" onClick={onNext}>
            {stage === missions.length - 1 ? "Concluir aventura" : "Próxima missão"} <ChevronRight size={16} />
          </button>
        ) : (
          <button type="button" className="button button-primary" onClick={run}>{action}</button>
        )}
      </div>
    </section>
  );
}

export default function AiQuestGame({ open, onClose, onAfterClose }: {
  open: boolean;
  onClose: () => void;
  onAfterClose: () => void;
}) {
  const layout = useAdventureLayout();
  const [completed, setCompleted] = useState(restoreProgress);
  const [stage, setStage] = useState(() => Math.min(completed, missions.length - 1));
  const [victory, setVictory] = useState(() => completed === missions.length);
  const [visited, setVisited] = useState(false);
  const [round, setRound] = useState<MissionResult | null>(null);
  const title = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    try {
      sessionStorage.setItem(storageKey, String(completed));
    } catch {
      // Storage can be disabled on some devices.
    }
  }, [completed]);

  useEffect(() => {
    if (visited) title.current?.focus();
  }, [stage, victory, visited]);

  function go(next: number) {
    setVisited(true);
    setVictory(false);
    setStage(next);
    setRound(null);
  }

  return (
    <Modal open={open} onClose={onClose} onAfterClose={onAfterClose} title="CODE QUEST 3D · IA" className="quest-modal adventure-modal ai-quest-modal">
      <div ref={layout.shell} className="adventure-shell ai-quest" style={layout.style}>
        <ol className="adventure-progress" aria-label="Progresso das seis missões">
          {missions.map((mission, index) => (
            <li key={mission.title}>
              <button type="button" disabled={index > completed}
                aria-label={`Missão ${index + 1}: ${mission.title}${index < completed ? " (selo conquistado)" : ""}`}
                aria-current={!victory && stage === index ? "step" : undefined} onClick={() => { if (victory || index !== stage) go(index); }}>
                {index < completed ? "✓" : index + 1}
              </button>
            </li>
          ))}
        </ol>
        <h2 ref={title} tabIndex={-1} className="adventure-title">
          {victory ? "Núcleo restaurado!" : `${String(stage + 1).padStart(2, "0")} / ${missions[stage].title}`}
        </h2>
        <div ref={layout.panels} className="ai-quest-workspace">
          <div className="ai-quest-board">
            <AdventureWorld
              level={aiTerrain}
              world={route[victory ? missions.length : stage + Number(!!round?.passed)]}
              state={victory ? "celebration" : round ? (round.passed ? "success" : "error") : "idle"}
              active={open}
            />
          </div>
          <div className="adventure-divider" role="separator" aria-label="Ajustar largura do cenário" aria-orientation="vertical"
            aria-valuemin={40} aria-valuemax={65} aria-valuenow={layout.ratio} tabIndex={0}
            onKeyDown={layout.onKeyDown} onPointerDown={layout.onPointerDown} onPointerMove={layout.onPointerMove} />
          {victory ? (
            <section className="ai-victory" aria-label="Seus selos">
              <p>BYTE chegou ao portal. Você conectou dados, aprendizado, visão, prompts e automação.</p>
              <ul>{missions.map(mission => <li key={mission.badge}><Award size={17} aria-hidden="true" /> {mission.badge}</li>)}</ul>
              <button type="button" className="button button-primary" onClick={() => { setCompleted(0); go(0); }}>Jogar novamente</button>
            </section>
          ) : (
            <MissionRound key={stage} stage={stage} onResult={result => {
              setRound(result);
              if (result?.passed) setCompleted(count => Math.max(count, stage + 1));
            }}
              onNext={() => stage === missions.length - 1 ? setVictory(true) : go(stage + 1)} />
          )}
        </div>
        <p className="adventure-save">{completed}/{missions.length} selos · Progresso salvo nesta sessão</p>
      </div>
    </Modal>
  );
}
