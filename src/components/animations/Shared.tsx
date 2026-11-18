import { AmbientMotionContext } from "./AmbientMotion";
import { useEffect, useRef, useContext, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export function AnimatedGradient({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`animated-gradient ${className}`} />
  );
}
export function SectionReveal({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const paused = useContext(AmbientMotionContext);
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      if (paused) return;
      const ctx = gsap.context(() => {
        const groups = new Map<Element, Element[]>();
        ref.current?.querySelectorAll("[data-reveal]").forEach((el) => {
          const parent = el.parentElement!;
          groups.set(parent, [...(groups.get(parent) || []), el]);
        });
        groups.forEach((els) =>
          gsap.from(els, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: els[0], start: "top 90%", once: true },
          }),
        );
      }, ref);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, [paused]);
  return (
    <section ref={ref} id={id} className={className}>
      {children}
    </section>
  );
}
export function Eyebrow({
  children,
  number,
}: {
  children: ReactNode;
  number?: string;
}) {
  return (
    <div className="eyebrow" data-reveal>
      {number && <span className="section-no">{number} /</span>}
      <span>{children}</span>
    </div>
  );
}
