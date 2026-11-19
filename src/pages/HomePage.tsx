import { useContext } from "react";
import { AmbientMotionContext } from "../components/animations/AmbientMotion";
import InteractiveCodeDemo from "../features/laboratorio/components/InteractiveCodeDemo";
import CodeQuestSection from "../sections/CodeQuest/CodeQuestSection";
import InteractiveShowcase from "../sections/Disciplinas/InteractiveShowcase";
import SchoolLocation, { Enrollment } from "../sections/Escola/SchoolLocation";
import CinematicHero from "../sections/Hero/CinematicHero";
import ProjectGallery from "../sections/Projetos/ProjectGallery";
import Course from "../sections/SobreCurso/Course";

export default function HomePage() {
  const paused = useContext(AmbientMotionContext);

  return (
    <>
      <CinematicHero />
      <Course />
      <InteractiveShowcase />
      <CodeQuestSection />
      <ProjectGallery />
      <InteractiveCodeDemo paused={paused} />
      <Enrollment />
      <SchoolLocation />
    </>
  );
}
