import CodeQuestSection from "./sections/CodeQuest/CodeQuestSection";
import { ThemeProvider } from "./components/layout/ThemeProvider";
import "lenis/dist/lenis.css";
import SmoothScroll from "./components/animations/SmoothScroll";
import { AmbientMotionContext } from "./components/animations/AmbientMotion";
import { useState } from "react";
import { MotionConfig } from "motion/react";
import Navigation from "./components/layout/Navigation";
import CinematicHero from "./sections/Hero/CinematicHero";
import Course from "./sections/SobreCurso/Course";
import InteractiveShowcase from "./sections/Disciplinas/InteractiveShowcase";
import ProjectGallery from "./sections/Projetos/ProjectGallery";
import InteractiveCodeDemo from "./features/laboratorio/components/InteractiveCodeDemo";
import SchoolLocation, {
  Enrollment,
  Footer,
} from "./sections/Escola/SchoolLocation";
export default function App() {
  const [paused, setPaused] = useState(false);
  return (
    <ThemeProvider>
      <AmbientMotionContext.Provider value={paused}>
        <MotionConfig reducedMotion="user">
          <SmoothScroll />
          <div className={paused ? "app motion-paused" : "app"}>
            <a className="skip-link" href="#curso">
              Pular para o conteúdo
            </a>
            <Navigation paused={paused} setPaused={setPaused} />
            <main>
              <CinematicHero />
              <Course />
              <InteractiveShowcase />
              <CodeQuestSection />
              <ProjectGallery />
              <InteractiveCodeDemo paused={paused} />
              <Enrollment />
              <SchoolLocation />
            </main>
            <Footer />
          </div>
        </MotionConfig>
      </AmbientMotionContext.Provider>
    </ThemeProvider>
  );
}
