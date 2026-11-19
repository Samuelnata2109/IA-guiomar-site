import { Component, lazy, Suspense, useState, type ReactNode } from "react";
import { ArrowUpRight, Terminal } from "lucide-react";
import { SectionReveal, Eyebrow } from "../../components/animations/Shared";
import { ByteFallback } from "../../features/code-quest/components/ByteCharacter";
const AiQuestGame = lazy(() => import("../../features/code-quest/components/AiQuestGame"));
const CodeQuestGame = lazy(() => import("../../features/code-quest/components/CodeQuestGame"));
class QuestLoadBoundary extends Component<
  { children: ReactNode; onClose: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <div className="quest-loading" role="alert">
        <p>
          Não foi possível carregar o desafio. Recarregue a página para tentar
          novamente.
        </p>
        <div className="mission-buttons">
          <button
            className="quest-secondary"
            onClick={() => window.location.reload()}
          >
            Recarregar página
          </button>
          <button className="quest-secondary" onClick={this.props.onClose}>
            Fechar
          </button>
        </div>
      </div>
    ) : (
      this.props.children
    );
  }
}
export default function CodeQuestSection({ onExplore }: { onExplore?: () => void }) {
  const [loaded, setLoaded] = useState<"ai" | "javascript" | null>(null),
    [open, setOpen] = useState(false);
  const ActiveGame = loaded === "javascript" ? CodeQuestGame : AiQuestGame;
  return (
    <SectionReveal id="code-quest" className="section quest-section">
      <div className="container quest-entry">
        <div className="quest-entry-copy">
          <Eyebrow>CODE QUEST 3D / MISSÕES DE IA</Eyebrow>
          <h2 data-reveal>
            VOCÊ CONSEGUE
            <br />
            PROGRAMAR O <span className="text-lavender">FUTURO?</span>
          </h2>
          <p data-reveal>
            Ajude BYTE a restaurar um núcleo digital. Organize dados,
            teste previsões e prepare um agente de IA em seis missões interativas.
          </p>
          <div className="quest-entry-meta" data-reveal>
            <span>6 MISSÕES</span>
            <span>NO SEU RITMO</span>
            <span>SEM CADASTRO</span>
          </div>
          <button
            className="button button-primary"
            onClick={() => {
              setLoaded("ai");
              setOpen(true);
            }}
            data-reveal
          >
            INICIAR DESAFIO
            <ArrowUpRight size={18} />
          </button>
          <button className="button button-text" onClick={() => { setLoaded("javascript"); setOpen(true); }}>
            Aventura JavaScript
          </button>
        </div>
        <div className="quest-teaser" aria-hidden="true" data-reveal>
          <div className="quest-orbit" />
          <ByteFallback active={false} />
          <span className="teaser-code">
            <Terminal size={15} /> FUTURE.INIT()
          </span>
          <span className="teaser-caption">
            CONHEÇA BYTE.
            <br />
            SEU PARCEIRO NAS MISSÕES.
          </span>
        </div>
      </div>
      {loaded && (
        <QuestLoadBoundary
          onClose={() => {
            setOpen(false);
            setLoaded(null);
          }}
        >
          <Suspense
            fallback={
              <p className="quest-loading" role="status">
                Preparando o desafio…
              </p>
            }
          >
            <ActiveGame
              open={open}
              onClose={() => setOpen(false)}
              onAfterClose={() => setLoaded(null)}
              onExplore={onExplore}
            />
          </Suspense>
        </QuestLoadBoundary>
      )}
    </SectionReveal>
  );
}
