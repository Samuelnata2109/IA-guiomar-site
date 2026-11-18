import { Component, lazy, Suspense, useState, type ReactNode } from "react";
import { ArrowUpRight, Terminal } from "lucide-react";
import { SectionReveal, Eyebrow } from "../../components/animations/Shared";
import { ByteFallback } from "../../features/code-quest/components/ByteCharacter";
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
export default function CodeQuestSection() {
  const [loaded, setLoaded] = useState(false),
    [open, setOpen] = useState(false);
  return (
    <SectionReveal id="code-quest" className="section quest-section">
      <div className="container quest-entry">
        <div className="quest-entry-copy">
          <Eyebrow>CODE QUEST 3D / JAVASCRIPT ADVENTURE</Eyebrow>
          <h2 data-reveal>
            VOCÊ CONSEGUE
            <br />
            PROGRAMAR O <span className="text-lavender">FUTURO?</span>
          </h2>
          <p data-reveal>
            Aprenda JavaScript enquanto salva um universo digital. BYTE ensina
            cada passo: você não precisa saber programar para começar.
          </p>
          <div className="quest-entry-meta" data-reveal>
            <span>10 FASES</span>
            <span>NO SEU RITMO</span>
            <span>SEM CADASTRO</span>
          </div>
          <button
            className="button button-primary"
            onClick={() => {
              setLoaded(true);
              setOpen(true);
            }}
            data-reveal
          >
            INICIAR DESAFIO
            <ArrowUpRight size={18} />
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
            SEU PRÓXIMO PARCEIRO DE CÓDIGO.
          </span>
        </div>
      </div>
      {loaded && (
        <QuestLoadBoundary
          onClose={() => {
            setOpen(false);
            setLoaded(false);
          }}
        >
          <Suspense
            fallback={
              <p className="quest-loading" role="status">
                Preparando o desafio…
              </p>
            }
          >
            <CodeQuestGame
              open={open}
              onClose={() => setOpen(false)}
              onAfterClose={() => setLoaded(false)}
            />
          </Suspense>
        </QuestLoadBoundary>
      )}
    </SectionReveal>
  );
}
