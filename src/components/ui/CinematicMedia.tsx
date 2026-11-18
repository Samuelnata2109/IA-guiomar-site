import { AmbientMotionContext } from "../animations/AmbientMotion";
import { useEffect, useRef, useState, useContext } from "react";
import { useReducedMotion } from "motion/react";
import { media, type SceneId } from "../../data/media";
export default function CinematicMedia({
  scene,
  alt = "",
  priority = false,
}: {
  scene: SceneId;
  alt?: string;
  priority?: boolean;
}) {
  const source = media[scene];
  const paused = useContext(AmbientMotionContext);
  const video = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const el = video.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !reduced && !paused)
        el.play().catch(() => setFailed(true));
      else el.pause();
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced, paused]);
  if ((source.webm || source.mp4) && !reduced && !failed)
    return (
      <video
        ref={video}
        poster={source.poster}
        muted
        loop
        playsInline
        preload="none"
        aria-label={alt || undefined}
        aria-hidden={!alt}
        onError={() => setFailed(true)}
      >
        {source.webm && <source src={source.webm} type="video/webm" />}
        {source.mp4 && <source src={source.mp4} type="video/mp4" />}
      </video>
    );
  return (
    <img
      src={source.poster}
      alt={alt}
      width={scene === "hero" ? 1672 : 700}
      height={scene === "hero" ? 941 : 500}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
    />
  );
}
