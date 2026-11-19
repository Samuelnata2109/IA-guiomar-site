import { ThemeToggle } from "./ThemeProvider";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, BrainCircuit, Menu, X, Pause, Play } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
export default function Navigation({
  paused,
  setPaused,
}: {
  paused: boolean;
  setPaused: (v: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const links = [
    ["Início", "/"],
    ["O curso", "/curso"],
    ["Áreas", "/areas"],
    ["Code Quest", "/code-quest"],
    ["Projetos", "/projetos"],
    ["A escola", "/escola"],
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
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);
  return (
    <header className="navigation">
      <div className="nav-inner">
        <Link
          className="brand"
          to="/"
          aria-label="Inteligência Artificial — início"
        >
          <span className="brand-icon" aria-hidden="true">
            <BrainCircuit size={22} />
          </span>
          <span>
            INTELIGÊNCIA ARTIFICIAL
            <small>
              CURSO TÉCNICO <i /> GUIOMAR
            </small>
          </span>
        </Link>
        <nav aria-label="Navegação principal" className="desktop-nav">
          {links.map(([t, h]) => (
            <NavLink key={h} to={h} end>
              {t}
            </NavLink>
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
          <Link className="nav-cta" to="/#matriculas">
            Quero fazer parte <ArrowUpRight size={16} />
          </Link>
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
            {links.map(([t, h], i) => (
              <NavLink key={h} to={h} end onClick={() => setOpen(false)}>
                <span>0{i + 1}</span>
                {t}
                <ArrowUpRight size={20} />
              </NavLink>
            ))}
            <Link to="/#matriculas" onClick={() => setOpen(false)}>
              <span>07</span>
              Matrículas
              <ArrowUpRight size={20} />
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
