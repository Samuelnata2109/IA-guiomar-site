import { useEffect, useRef } from "react";
import gsap from "gsap";
export default function RobotParticles({
  executionId,
}: {
  executionId: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".processing-symbol",
        { y: 20, opacity: 0, scale: 0.6 },
        {
          y: -80,
          opacity: 0.8,
          scale: 1,
          duration: 0.65,
          stagger: 0.06,
          ease: "power2.out",
        },
      );
      gsap.to(".processing-symbol", {
        opacity: 0,
        duration: 0.45,
        stagger: 0.06,
        delay: 0.65,
      });
    }, ref);
    return () => ctx.revert();
  }, [executionId]);
  return (
    <div ref={ref} className="processing-particles" aria-hidden="true">
      {["</>", "{ }", "•", "01", "•", "( )"].map((symbol, i) => (
        <span
          key={i}
          className="processing-symbol"
          style={{ left: `${20 + i * 11}%`, top: `${52 + (i % 3) * 8}%` }}
        >
          {symbol}
        </span>
      ))}
    </div>
  );
}
