import { useCallback, useLayoutEffect, useState } from "react";
import type { MouseEvent } from "react";
import { MotionConfig, useReducedMotion } from "motion/react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "lenis/dist/lenis.css";
import { Footer } from "../../sections/Escola/SchoolLocation";
import { AmbientMotionContext } from "../animations/AmbientMotion";
import SmoothScroll from "../animations/SmoothScroll";
import { isHomeAnchor } from "./homeAnchors";
import Navigation from "./Navigation";
import { ThemeProvider } from "./ThemeProvider";

export default function SiteLayout() {
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const navigate = useNavigate();
  const { pathname, hash, key } = useLocation();
  const home = pathname === "/";
  const navigateToAnchor = useCallback((anchor: string) => {
    if (window.location.hash !== `#/${anchor}`) {
      navigate({ pathname: "/", hash: anchor });
    }
  }, [navigate]);

  useLayoutEffect(() => {
    const target = (home && isHomeAnchor(hash)) || hash === "#conteudo"
      ? document.getElementById(hash.slice(1))
      : null;
    if (!target) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }

    target.scrollIntoView({ behavior: "instant" });
    if (!target.hasAttribute("tabindex")) {
      target.setAttribute("tabindex", "-1");
      target.addEventListener("blur", () => target.removeAttribute("tabindex"), { once: true });
    }
    target.focus({ preventScroll: true });
  }, [home, pathname, hash, key]);

  function handleAnchor(event: MouseEvent<HTMLDivElement>) {
    if (
      event.defaultPrevented || event.button !== 0 ||
      event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ||
      !(event.target instanceof Element)
    ) return;

    const link = event.target.closest<HTMLAnchorElement>("a[href]");
    const anchor = link?.getAttribute("href");
    if (!anchor || !isHomeAnchor(anchor) || link?.target || link?.hasAttribute("download")) return;
    // On the home page, Lenis handles scrolling before updating the URL.
    if (home && !paused && !reducedMotion) return;

    event.preventDefault();
    navigate({ pathname: "/", hash: anchor }, { replace: home && hash === anchor });
  }

  return (
    <ThemeProvider>
      <AmbientMotionContext.Provider value={paused}>
        <MotionConfig reducedMotion="user">
          <SmoothScroll onAnchorComplete={navigateToAnchor} />
          <div className={paused ? "app motion-paused" : "app"} onClick={handleAnchor}>
            {home ? (
              <a className="skip-link" href="#curso">Pular para o conteúdo</a>
            ) : (
              <a className="skip-link" href={`#${pathname}#conteudo`}>Pular para o conteúdo</a>
            )}
            <Navigation paused={paused} setPaused={setPaused} />
            <main id="conteudo">
              <Outlet />
            </main>
            <Footer />
          </div>
        </MotionConfig>
      </AmbientMotionContext.Provider>
    </ThemeProvider>
  );
}
