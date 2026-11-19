import { useContext } from "react";
import { AmbientMotionContext } from "../components/animations/AmbientMotion";
import InteractiveCodeDemo from "../features/laboratorio/components/InteractiveCodeDemo";
import CodeQuestSection from "../sections/CodeQuest/CodeQuestSection";

export default function CodeQuestPage() {
  const paused = useContext(AmbientMotionContext);

  return (
    <>
      <CodeQuestSection />
      <InteractiveCodeDemo paused={paused} />
    </>
  );
}
