import { useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Braces, X } from "lucide-react";
import { areas, projects, type Project } from "../../data/content";
import { SectionReveal, Eyebrow } from "../../components/animations/Shared";
export default function ProjectGallery() {
  const [filter, setFilter] = useState("Todos");
  const [selected, setSelected] = useState<Project | null>(null);
  const titleId = useId();
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
                {filtered.map((p) => {
                  const cover = p.media?.[0];
                  const preview = cover?.type === "image" ? cover.src : cover?.poster;
                  return (
                    <button
                      className="project-card"
                      key={p.id}
                      onClick={() => {
                        setSelected(p);
                        dialog.current?.showModal();
                      }}
                    >
                      {preview ? (
                        <img src={preview} alt={cover?.alt ?? ""} loading="lazy" />
                      ) : (
                        <span>{cover ? "Vídeo nos detalhes" : "Mídia ainda não disponibilizada"}</span>
                      )}
                      <small>{p.category}</small>
                      <h3>{p.title}</h3>
                      <p>{p.description}</p>
                    </button>
                  );
                })}
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
                      ? "Os projetos de Inteligência Artificial ainda não foram publicados."
                      : "Ainda não há projetos de " +
                        filter.toLowerCase() +
                        " publicados no site do curso."}{" "}
                    Este espaço está reservado para as criações reais da turma.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <dialog
        ref={dialog}
        className="project-dialog"
        aria-labelledby={selected ? titleId : undefined}
        data-lenis-prevent
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
            <h3 id={titleId}>{selected.title}</h3>
            {selected.media?.map((media) => (
              <figure key={media.src}>
                {media.type === "image" ? <img src={media.src} alt={media.alt} loading="lazy" /> : <video controls playsInline preload="metadata" src={media.src} poster={media.poster} aria-label={media.alt} />}
                {media.caption && <figcaption>{media.caption}</figcaption>}
              </figure>
            ))}
            <p>{selected.description}</p>
            {selected.technologies?.length ? <p><strong>Tecnologias:</strong> {selected.technologies.join(", ")}</p> : null}
            {selected.details?.map((detail) => <p key={detail}>{detail}</p>)}
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
