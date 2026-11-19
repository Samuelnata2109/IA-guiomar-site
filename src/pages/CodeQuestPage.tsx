import { useContext, useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AmbientMotionContext } from "../components/animations/AmbientMotion";
import InteractiveCodeDemo from "../features/laboratorio/components/InteractiveCodeDemo";
import CodeQuestSection from "../sections/CodeQuest/CodeQuestSection";

export default function CodeQuestPage() {
  const paused = useContext(AmbientMotionContext);
  const navigate = useNavigate();
  const { hash, key } = useLocation();

  useLayoutEffect(() => {
    if (hash !== "#laboratorio") return;
    const target = document.getElementById("laboratorio");
    if (!target) return;
    target.scrollIntoView({ behavior: "instant" });
    target.setAttribute("tabindex", "-1");
    target.addEventListener("blur", () => target.removeAttribute("tabindex"), { once: true });
    target.focus({ preventScroll: true });
  }, [hash, key]);

  return (
    <>
      <CodeQuestSection onExplore={() => navigate("/areas")} />
      <InteractiveCodeDemo paused={paused} />
    </>
  );
}
