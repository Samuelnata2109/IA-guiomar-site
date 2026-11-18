import CourseModal from "./CourseModal";
import type { Course } from "../../data/courses";
import { AmbientMotionContext } from "../../components/animations/AmbientMotion";
import CinematicMedia from "../../components/ui/CinematicMedia";
import type { SceneId } from "../../data/media";
import { useEffect, useRef, useContext, useState } from "react";
import { ArrowDownRight } from "lucide-react";
import gsap from "gsap";
import { areas } from "../../data/content";
import { SectionReveal, Eyebrow } from "../../components/animations/Shared";
function Panel({
  area,
  index,
  onOpen,
}: {
  area: (typeof areas)[number];
  index: number;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const paused = useContext(AmbientMotionContext);
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      if (paused) return;
      const ctx = gsap.context(() => {
        gsap.from(ref.current, {
          y: 24,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 92%", once: true },
        });
        gsap.fromTo(
          ".area-parallax",
          { yPercent: 3 },
          {
            yPercent: -3,
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.65,
            },
          },
        );
        gsap.from(".area-visual img", {
          scale: 1.08,
          y: 32,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
        });
        gsap.from(".area-copy>*", {
          y: 26,
          opacity: 0,
          duration: 0.75,
          stagger: 0.08,
          scrollTrigger: { trigger: ref.current, start: "top 82%", once: true },
        });
        gsap.to(".area-halo", {
          opacity: 0.85,
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "center center",
            scrub: true,
          },
        });
      }, ref);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, [paused]);
  return (
    <article
      ref={ref}
      className={`area-panel area-${area.id} ${index === 0 ? "area-wide" : ""}`}
      style={{ "--area-color": area.color } as React.CSSProperties}
      aria-label={`${area.name}: ${area.description}`}
      onPointerMove={(e) => {
        if (
          paused ||
          e.pointerType === "touch" ||
          window.matchMedia("(prefers-reduced-motion: reduce)").matches
        )
          return;
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty(
          "--mx",
          `${((e.clientX - r.left) / r.width) * 100}%`,
        );
        e.currentTarget.style.setProperty(
          "--my",
          `${((e.clientY - r.top) / r.height) * 100}%`,
        );
      }}
    >
      <div className="area-halo" />
      <div className="area-top">
        <span>{area.number} / EXPLORAR</span>
        <ArrowDownRight size={23} />
      </div>
      <div className="area-copy">
        <span className="mini-label">{area.tag}</span>
        <h3>
          {area.name}
          <span>.</span>
        </h3>
        <p>{area.description}</p>
        <p className="area-detail">{area.detail}</p>
        <div className="chips">
          {area.keywords.map((k) => (
            <span key={k}>{k}</span>
          ))}
        </div>
      </div>
      <div className="area-visual">
        <div className="area-parallax">
          <CinematicMedia
            scene={area.id as SceneId}
            alt={`Ilustração conceitual de ${area.name.toLowerCase()}`}
          />
        </div>
      </div>
      <button
        className="area-open"
        aria-label={`Explorar ${area.name}`}
        onClick={onOpen}
      >
        <span className="sr-only">Explorar {area.name}</span>
      </button>
      <span className="area-watermark" aria-hidden="true">
        {area.number}
      </span>
    </article>
  );
}
export default function InteractiveShowcase() {
  const [selected, setSelected] = useState<Course | null>(null);
  const [open, setOpen] = useState(false);
  return (
    <SectionReveal id="areas" className="section showcase container">
      <div className="section-heading">
        <div>
          <Eyebrow number="02">ESCOLHA SUA PRÓXIMA DESCOBERTA</Eyebrow>
          <h2 data-reveal>
            UM CURSO.
            <br />
            <span className="text-lavender">INFINITAS</span> POSSIBILIDADES.
          </h2>
        </div>
        <p data-reveal>
          Cinco portas de entrada.
          <br />
          Um universo para explorar.
        </p>
      </div>
      <div className="areas-grid">
        {areas.map((a, i) => (
          <Panel
            key={a.id}
            area={a}
            index={i}
            onOpen={() => {
              setSelected(a);
              setOpen(true);
            }}
          />
        ))}
      </div>
      <p className="visual-caption">
        Ilustrações conceituais das áreas de aprendizagem.
      </p>
      {selected && (
        <CourseModal
          course={selected}
          open={open}
          onClose={() => setOpen(false)}
          onAfterClose={() => setSelected(null)}
        />
      )}
    </SectionReveal>
  );
}
