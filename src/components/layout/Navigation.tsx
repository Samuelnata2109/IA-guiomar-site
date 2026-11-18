import { ThemeToggle } from "./ThemeProvider";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Menu, X, Pause, Play } from "lucide-react";
export default function Navigation({
  paused,
  setPaused,
}: {
  paused: boolean;
  setPaused: (v: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const links = [
    ["O curso", "#curso"],
    ["Áreas", "#areas"],
    ["Code Quest", "#code-quest"],
    ["Projetos", "#projetos"],
    ["A escola", "#escola"],
  ];
  useEffect(() => {
    if (!open) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, [open]);
  return (
    <header className="navigation">
      <div className="nav-inner">
        <a
          className="brand"
          href="#inicio"
          aria-label="Desenvolvimento de Sistemas — início"
        >
          <span className="brand-icon" aria-hidden="true">
            &lt;/&gt;
          </span>
          <span>
            DESENVOLVIMENTO
            <small>
              DE SISTEMAS <i /> GUIOMAR
            </small>
          </span>
        </a>
        <nav aria-label="Navegação principal" className="desktop-nav">
          {links.map(([t, h]) => (
            <a key={h} href={h}>
              {t}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <ThemeToggle />
          <button
            className="motion-toggle"
            onClick={() => setPaused(!paused)}
            aria-label={
              paused ? "Ativar movimento ambiente" : "Pausar movimento ambiente"
            }
            aria-pressed={paused}
          >
            {paused ? <Play size={15} /> : <Pause size={15} />}
          </button>
          <a className="nav-cta" href="#matriculas">
            Quero fazer parte <ArrowUpRight size={16} />
          </a>
          <button
            ref={trigger}
            className="menu-button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            className="mobile-nav"
            aria-label="Navegação mobile"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            {[...links, ["Matrículas", "#matriculas"]].map(([t, h], i) => (
              <a key={h} href={h} onClick={() => setOpen(false)}>
                <span>0{i + 1}</span>
                {t}
                <ArrowUpRight size={20} />
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
