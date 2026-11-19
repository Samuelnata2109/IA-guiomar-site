import { useEffect, useLayoutEffect, useState } from "react";
import { MotionConfig } from "motion/react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "lenis/dist/lenis.css";
import { Footer } from "../../sections/Escola/SchoolLocation";
import { AmbientMotionContext } from "../animations/AmbientMotion";
import SmoothScroll from "../animations/SmoothScroll";
import Navigation from "./Navigation";
import { ThemeProvider } from "./ThemeProvider";

const legacyRoutes: Record<string, string> = {
  "#curso": "/curso",
  "#areas": "/areas",
  "#code-quest": "/code-quest",
  "#laboratorio": "/code-quest#laboratorio",
  "#projetos": "/projetos",
  "#escola": "/escola",
};

const pageTitles: Record<string, string> = {
  "/": "Início",
  "/curso": "O curso",
  "/areas": "Áreas",
  "/code-quest": "Code Quest",
  "/projetos": "Projetos",
  "/escola": "A escola",
};

export default function SiteLayout() {
  const [paused, setPaused] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname, hash, key } = location;
  const isHome = pathname === "/";
  const layoutClass = ["app", isHome && "app-home", paused && "motion-paused"]
    .filter(Boolean)
    .join(" ");

  useEffect(() => {
    document.title = `${pageTitles[pathname] ?? "Página não encontrada"} | Inteligência Artificial · Guiomar`;
  }, [pathname]);

  const legacyRoute = pathname === "/" && Object.hasOwn(legacyRoutes, hash) ? legacyRoutes[hash] : undefined;

  useEffect(() => {
    if (legacyRoute) navigate(legacyRoute, { replace: true });
  }, [legacyRoute, navigate]);

  useLayoutEffect(() => {
    if (legacyRoute) return;
    if (pathname === "/code-quest" && hash === "#laboratorio") return;
    const target = hash === "#matriculas" && pathname === "/"
      ? document.getElementById("matriculas")
      : document.getElementById("conteudo");

    if (hash === "#matriculas" || hash === "#conteudo") {
      target?.scrollIntoView({ behavior: "instant" });
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
    if (!target) return;
    if (!target.hasAttribute("tabindex")) {
      target.setAttribute("tabindex", "-1");
      target.addEventListener("blur", () => target.removeAttribute("tabindex"), { once: true });
    }
    target.focus({ preventScroll: true });
  }, [pathname, hash, key, legacyRoute]);

  return (
    <ThemeProvider>
      <AmbientMotionContext.Provider value={paused}>
        <MotionConfig reducedMotion="user">
          <SmoothScroll />
          <div className={layoutClass}>
            <Link className="skip-link" to={{ pathname, hash: "#conteudo" }}>
              Pular para o conteúdo
            </Link>
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
