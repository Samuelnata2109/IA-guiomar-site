import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import type { RobotState, RobotFeedback } from "../game/robotExecution";
export default function RobotFallback({
  led,
  color,
  position,
  spin,
  animate,
  phase,
  executionId,
  onApplied,
  onCelebrated,
}: RobotState & RobotFeedback) {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const root = ref.current!;
      const pose = root.querySelector(".robot-pose");
      const head = root.querySelector(".robot-head");
      const eyes = root.querySelectorAll(".robot-head i");
      const complete = () => {
        if (phase === "running") onApplied(executionId);
        if (phase === "success") onCelebrated(executionId);
      };
      if (!animate) {
        gsap.set(root, { x: position * 45, rotation: spin * 360 });
        gsap.set([pose, head], { y: 0, rotation: 0 });
        gsap.set(eyes, { scaleY: 1 });
        complete();
        return;
      }
      const timeline = gsap.timeline({ onComplete: complete });
      timeline.to(
        root,
        {
          x: position * 45,
          rotation: spin * 360,
          duration: phase === "running" ? 0.6 : 0.2,
          ease: "power2.out",
        },
        0,
      );
      if (phase !== "idle")
        timeline.to(
          head,
          {
            rotation: phase === "error" ? 14 : phase === "hover" ? -10 : 0,
            duration: 0.25,
          },
          0,
        );
      if (phase === "running")
        timeline
          .to(pose, { y: 5, rotation: -3, duration: 0.15 }, 0)
          .to(
            pose,
            { y: 0, rotation: 0, duration: 0.45, ease: "power2.out" },
            0.15,
          );
      else if (phase === "success")
        timeline
          .to(pose, { y: -17, duration: 0.24, ease: "power2.out" }, 0)
          .to(pose, { y: 0, duration: 0.3, ease: "power2.in" }, 0.24);
      else {
        gsap.to(pose, {
          y: -6,
          duration: 1.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
        if (phase === "idle")
          gsap.fromTo(
            head,
            { rotation: -3 },
            {
              rotation: 3,
              duration: 2.1,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            },
          );
        gsap
          .timeline({ repeat: -1, repeatDelay: 4.3, delay: 3 })
          .to(eyes, { scaleY: 0.1, duration: 0.08 })
          .to(eyes, { scaleY: 1, duration: 0.1 });
      }
    }, ref);
    return () => ctx.kill(false);
  }, [
    led,
    color,
    position,
    spin,
    animate,
    phase,
    executionId,
    onApplied,
    onCelebrated,
  ]);
  return (
    <div
      ref={ref}
      className={`fallback-robot ${led || phase === "success" ? "led-on" : ""}`}
      style={{ "--robot-color": color } as React.CSSProperties}
    >
      <div className="robot-pose">
        <div className="robot-antenna" />
        <div className="robot-head">
          <i />
          <i />
        </div>
        <div className="robot-body" />
      </div>
    </div>
  );
}
