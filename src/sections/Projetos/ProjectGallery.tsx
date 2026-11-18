import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Braces, X } from "lucide-react";
import { areas, projects, officialSite, type Project } from "../../data/content";
import { SectionReveal, Eyebrow } from "../../components/animations/Shared";
export default function ProjectGallery() {
  const [filter, setFilter] = useState("Todos");
  const [selected, setSelected] = useState<Project | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const filtered = projects.filter(
    (p) => filter === "Todos" || p.category === filter,
  );
  return (
    <SectionReveal id="projetos" className="section projects-section container">
      <div className="section-heading">
        <div>
          <Eyebrow number="03">FEITO POR QUEM APRENDE</Eyebrow>
          <h2 data-reveal>
            IDEIAS QUE VIRAM
            <br />
            <span className="text-lavender">REALIDADE.</span>
          </h2>
        </div>
        <p data-reveal>
          O próximo projeto incrível
          <br />
          pode começar com você.
        </p>
      </div>
      <div className="filters" aria-label="Filtrar projetos por área">
        {["Todos", ...areas.map((a) => a.name)].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={filter === f ? "active" : ""}
          >
            {f}
          </button>
        ))}
      </div>
      <div aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {filtered.length ? (
              <div className="projects-grid">
                {filtered.map((p) => (
                  <button
                    className="project-card"
                    key={p.id}
                    onClick={() => {
                      setSelected(p);
                      dialog.current?.showModal();
                    }}
                  >
                    {p.image ? (
                      <img src={p.image} alt={p.title} loading="lazy" />
                    ) : (
                      <span>Imagem ainda não disponibilizada</span>
                    )}
                    <small>{p.category}</small>
                    <h3>{p.title}</h3>
                    <p>{p.description}</p>
                  </button>
                ))}
              </div>
            ) : (
              <div className="empty-projects">
                <div className="project-ghost" aria-hidden="true">
                  <div className="ghost-window">
                    <div>
                      <i />
                      <i />
                      <i />
                    </div>
                    <Braces size={72} strokeWidth={1} />
                    <span>IDEIA → CÓDIGO → PROJETO</span>
                  </div>
                  <span className="ghost-cube" />
                </div>
                <div className="empty-copy">
                  <span className="pill">EM CONSTRUÇÃO</span>
                  <h3>
                    Grandes ideias.
                    <br />
                    Novas histórias em breve.
                  </h3>
                  <p>
                    {filter === "Todos"
                      ? "Os projetos dos estudantes ainda não foram publicados no site do curso."
                      : "Ainda não há projetos de " +
                        filter.toLowerCase() +
                        " publicados no site do curso."}{" "}
                    Este espaço está reservado para as criações reais da turma.
                  </p>
                  <a
                    className="inline-link"
                    href={officialSite + "#projetos"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Acompanhar o site do curso <ArrowUpRight size={18} />
                  </a>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <dialog
        ref={dialog}
        className="project-dialog"
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
        onClose={() => setSelected(null)}
      >
        <button
          className="dialog-close"
          aria-label="Fechar detalhes"
          onClick={() => dialog.current?.close()}
        >
          <X />
        </button>
        {selected && (
          <>
            <span className="eyebrow">{selected.category}</span>
            <h3>{selected.title}</h3>
            {selected.image && (
              <img src={selected.image} alt={selected.title} />
            )}
            <p>{selected.description}</p>
            {selected.url && (
              <a href={selected.url} target="_blank" rel="noopener noreferrer">
                Abrir projeto <ArrowUpRight />
              </a>
            )}
          </>
        )}
      </dialog>
    </SectionReveal>
  );
}
