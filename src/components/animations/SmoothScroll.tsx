import { useContext, useEffect } from "react";
import { useReducedMotion } from "motion/react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AmbientMotionContext } from "./AmbientMotion";
gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll() {
  const reduced = useReducedMotion();
  const paused = useContext(AmbientMotionContext);
  useEffect(() => {
    if (reduced || paused) return;
    // One clock only: GSAP drives Lenis. Touch keeps the browser's native inertia.
    const lenis = new Lenis({
      autoRaf: false,
      smoothWheel: true,
      syncTouch: false,
      lerp: 0.1,
      anchors: false,
      prevent: (node) => !!node.closest("dialog, [data-lenis-prevent]"),
    });
    const tick = (seconds: number) => lenis.raf(seconds * 1000);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.lagSmoothing(0);
    gsap.ticker.add(tick);
    let disposed = false;
    const refresh = () => {
      if (!disposed) {
        lenis.resize();
        ScrollTrigger.refresh();
      }
    };
    const modalLock = () => {
      if (document.hidden || document.querySelector(".modal-shell[open]"))
        lenis.stop();
      else {
        lenis.start();
        lenis.resize();
      }
    };
    window.addEventListener("ds:modal-lock", modalLock);
    const visibility = () => {
      gsap.ticker.remove(tick);
      modalLock();
      if (!document.hidden) {
        lenis.resize();
        gsap.ticker.add(tick);
      }
    };
    const anchor = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const link = (event.target as Element).closest<HTMLAnchorElement>(
        "a[href]",
      );
      if (!link || link.target === "_blank" || link.hasAttribute("download"))
        return;
      const url = new URL(link.href);
      if (
        url.origin !== location.origin ||
        url.pathname !== location.pathname ||
        url.search !== location.search ||
        !url.hash
      )
        return;
      let target: HTMLElement | null;
      try {
        target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      } catch {
        return;
      }
      if (!target) return;
      event.preventDefault();
      const padding =
        parseFloat(
          getComputedStyle(document.documentElement).scrollPaddingTop,
        ) || 0;
      lenis.scrollTo(target, {
        offset: -padding,
        onComplete: () => {
          if (disposed) return;
          if (location.hash !== url.hash) history.pushState(null, "", url.hash);
          const temporaryTabIndex = !target.hasAttribute("tabindex");
          if (temporaryTabIndex) target.setAttribute("tabindex", "-1");
          target.focus({ preventScroll: true });
          if (temporaryTabIndex) target.removeAttribute("tabindex");
        },
      });
    };
    const assetLoad = (event: Event) => {
      if (event.target instanceof HTMLImageElement) refresh();
    };
    document.addEventListener("click", anchor);
    document.addEventListener("visibilitychange", visibility);
    document.addEventListener("load", assetLoad, true);
    document.fonts?.ready.then(refresh);
    refresh();
    return () => {
      disposed = true;
      window.removeEventListener("ds:modal-lock", modalLock);
      document.removeEventListener("click", anchor);
      document.removeEventListener("visibilitychange", visibility);
      document.removeEventListener("load", assetLoad, true);
      gsap.ticker.remove(tick);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
      gsap.ticker.lagSmoothing(500, 33);
    };
  }, [reduced, paused]);
  return null;
}
