export type RobotPhase = "idle" | "hover" | "running" | "success" | "error";
export type RobotState = {
  led: boolean;
  color: string;
  position: number;
  spin: number;
};
export const initialRobot: RobotState = {
  led: false,
  color: "#a855f7",
  position: 0,
  spin: 0,
};
export type RobotFeedback = {
  phase: RobotPhase;
  executionId: number;
  animate: boolean;
  onApplied: (id: number) => void;
  onCelebrated: (id: number) => void;
};
// Execute the same four supported commands. No eval, random errors, or completion timers.
export function executeRobotCommand(
  code: string,
  state: RobotState,
  reduced: boolean,
) {
  if (!Number.isFinite(state.position) || !Number.isFinite(state.spin))
    throw new Error("Estado do robô inválido. Reinicie a experiência.");
  const next = { ...state };
  let message: string;
  if (code === "robo.led.ligar();" || code === "robo.led.desligar();") {
    next.led = code === "robo.led.ligar();";
    message = next.led ? "LED aceso. Sua ideia ganhou luz!" : "LED desligado.";
  } else if (
    code === 'interface.cor = "ciano";' ||
    code === 'interface.cor = "violeta";'
  ) {
    next.color = code.includes("ciano") ? "#38bdf8" : "#a855f7";
    message =
      next.color === "#38bdf8"
        ? "Interface alterada para ciano."
        : "Interface alterada para violeta.";
  } else if (code === "robo.mover(1);") {
    next.position = state.position >= 1 ? -1 : state.position + 1;
    message = `Robô movido para a posição ${next.position}.`;
  } else if (code === "robo.girar(360);") {
    next.spin += 1;
    message = reduced
      ? "Rotação concluída. Movimento reduzido ativo."
      : "Rotação de 360° executada.";
  } else {
    throw new Error(
      "Comando não reconhecido. Escolha uma das ações disponíveis.",
    );
  }
  return { next, message };
}
