import CinematicMedia from "../../components/ui/CinematicMedia";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowDown, ArrowUpRight, ChevronRight } from "lucide-react";
import { AnimatedGradient } from "../../components/animations/Shared";
export function FloatingObjects() {
  return (
    <div className="floating-details" aria-hidden="true">
      <span className="orbit-label label-one">
        <i /> SYSTEM.READY
      </span>
      <span className="orbit-label label-two">&lt;crie o próximo/&gt;</span>
      <span className="crosshair cross-one">+</span>
      <span className="crosshair cross-two">+</span>
    </div>
  );
}
export default function CinematicHero() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from(".hero-art", { opacity: 0, duration: 1.4 }, 0)
          .from(
            ".hero .animated-gradient",
            { opacity: 0, scale: 0.8, duration: 1.3 },
            0.2,
          )
          .from(
            ".title-line>span",
            { yPercent: 110, duration: 1.05, stagger: 0.1 },
            0.4,
          )
          .from(".hero-description", { y: 18, opacity: 0, duration: 0.8 }, 0.7)
          .from(
            ".hero-buttons>a",
            { y: 20, opacity: 0, duration: 0.7, stagger: 0.1 },
            0.9,
          )
          .from(".floating-details", { opacity: 0, duration: 1 }, 1.1)
          .from(".hero-bottom", { opacity: 0, y: 10, duration: 0.6 }, 1.4);
        gsap.to(".hero-content", {
          y: 55,
          scale: 0.97,
          opacity: 0.55,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
        gsap.to(".hero-art", {
          yPercent: 12,
          scale: 1.06,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }, ref);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);
  return (
    <section
      className="hero"
      id="inicio"
      ref={ref}
      aria-labelledby="hero-title"
    >
      <AnimatedGradient />
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-art" aria-hidden="true">
        <CinematicMedia scene="hero" priority />
        <FloatingObjects />
      </div>
      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <span /> ENSINO MÉDIO + FORMAÇÃO TÉCNICA
          </div>
          <h1 id="hero-title">
            <span className="title-line">
              <span>E SE A</span>
            </span>
            <span className="title-line">
              <span>TECNOLOGIA</span>
            </span>
            <span className="title-line">
              <span>PUDESSE APRENDER?</span>
            </span>
            <span className="hero-invitation">
              VENHA ENSINAR
              <br />
              O FUTURO<span className="purple-dot">.</span>
            </span>
          </h1>
          <p className="hero-description">
            Descubra o universo da Inteligência Artificial e aprenda a
            transformar criatividade, dados e tecnologia em soluções
            inteligentes.
          </p>
          <div className="hero-buttons">
            <a className="button button-primary" href="#curso">
              Conheça o curso <ArrowDown size={17} />
            </a>
            <a className="button button-text" href="#escola">
              Explore a IA <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
        <div className="hero-bottom">
          <a href="#curso" className="scroll-cue">
            <span>
              <ArrowDown size={17} />
            </span>
            ROLE PARA DESCOBRIR
          </a>
          <div className="hero-location">
            DO INTERIOR DO CEARÁ.
            <br />
            <strong>PARA UM MUNDO DE POSSIBILIDADES.</strong>
          </div>
          <span className="hero-coordinate">
            CARIRÉ — CE <ChevronRight size={15} />
          </span>
        </div>
      </div>
    </section>
  );
}
