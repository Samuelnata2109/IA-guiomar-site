export type Position = { x: number; z: number };
export type Category = "peça" | "cápsula";
export type Sample = {
  id: string;
  category: Category;
  shape: "bloco" | "esfera";
  size: number;
};
export type Action = "scan" | "turn" | "move" | "pickup" | "drop" | "avoid";
export type Step = {
  action: Action;
  position: Position;
  heading: number;
  message: string;
  cargo?: Sample;
  sample?: Sample;
  objectPosition?: Position;
  prediction?: Category;
  correct?: boolean;
  avoided?: boolean;
  delivered?: boolean;
  reward?: number;
  path?: Path;
};
export type Path = "short" | "safe";
export type Policy = Record<Path, { count: number; value: number }>;
export type Plan = { steps: Step[]; success: boolean; explanation: string };
export type Input = {
  examples: Record<string, Category>;
  avoid: boolean;
  order: string[];
  priority: Category;
  explore: boolean;
};
export const origin = { x: 0, z: 2 };
export const pickup = { x: 0, z: 0 };
export const obstacle = { x: 0, z: 1 };
export const bins: Record<Category, Position> = {
  peça: { x: -2, z: -1 },
  cápsula: { x: 2, z: -1 },
};
export const examples: Sample[] = [
  { id: "A", category: "peça", shape: "bloco", size: 1 },
  { id: "B", category: "cápsula", shape: "esfera", size: 3 },
  { id: "C", category: "peça", shape: "bloco", size: 3 },
  { id: "D", category: "cápsula", shape: "esfera", size: 1 },
];
const tests: Sample[] = [
  { id: "T1", category: "peça", shape: "bloco", size: 2 },
  { id: "T2", category: "cápsula", shape: "esfera", size: 2 },
  { id: "T3", category: "peça", shape: "bloco", size: 3 },
  { id: "T4", category: "cápsula", shape: "esfera", size: 1 },
];
export const commands = [
  { id: "inspect", label: "Analisar objeto" },
  { id: "collect", label: "Coletar objeto" },
  { id: "deliver", label: "Transportar e entregar" },
];
export const tasks = [
  { id: "classify", title: "Classificação de objetos", method: "Modelo treinado com exemplos",
    goal: "Rotule as amostras A e B. Treine o robô e veja como ele classifica objetos de tamanho diferente." },
  { id: "avoid", title: "Desviando de obstáculos", method: "Regras programadas",
    goal: "Escolha o que acontece quando o sensor detecta uma barreira. Chegue ao destino sem colidir." },
  { id: "patterns", title: "Reconhecimento de padrões", method: "Modelo treinado com exemplos",
    goal: "Use exemplos de vários tamanhos para ensinar o robô a separar blocos e esferas. Compare as previsões." },
  { id: "deliver", title: "Entrega inteligente", method: "Comandos programados",
    goal: "Defina o material prioritário e monte a sequência para inspecionar, coletar e entregar cada objeto." },
  { id: "reward", title: "Aprendendo com os erros", method: "Simulação de aprendizado por reforço",
    goal: "Faça várias tentativas. O robô experimenta os trajetos e usa as recompensas para decidir o próximo." },
  { id: "autonomous", title: "Robô autônomo", method: "Modelo treinado + regras programadas",
    goal: "Treine o classificador, configure o desvio e monte a sequência para entregar objetos novos aos destinos corretos." },
] as const;
export type TaskId = (typeof tasks)[number]["id"];
export const emptyPolicy: Policy = { short: { count: 0, value: 0 }, safe: { count: 0, value: 0 } };

export function learn(policy: Policy, path: Path, reward: number): Policy {
  const current = policy[path];
  const count = current.count + 1;
  return { ...policy, [path]: { count, value: current.value + (reward - current.value) / count } };
}

function predict(sample: Sample, labels: Input["examples"]) {
  // Equally weight one size step and one shape mismatch. For ties, retain the earlier example.
  const distance = (candidate: Sample) =>
    Math.abs(sample.size - candidate.size) + Number(sample.shape !== candidate.shape);
  const nearest = examples.filter(candidate => labels[candidate.id])
    .reduce<Sample | undefined>((best, candidate) => !best || distance(candidate) < distance(best) ? candidate : best, undefined);
  return nearest && labels[nearest.id];
}

export function simulate(task: TaskId, input: Input, policy: Policy): Plan {
  const steps: Step[] = [];
  let position = origin;
  let heading = 0;
  let cargo: Sample | undefined;
  const add = (action: Action, message: string, extra: Partial<Step> = {}) =>
    steps.push({ position, heading, action, message, cargo, ...extra });

  function move(target: Position, avoided = false) {
    if (target.x === position.x && target.z === position.z) return;
    const angle = target.x !== position.x ? (target.x > position.x ? Math.PI / 2 : -Math.PI / 2)
      : target.z > position.z ? 0 : Math.PI;
    // Take the shortest turn even when crossing ±π.
    const turn = Math.atan2(Math.sin(angle - heading), Math.cos(angle - heading));
    if (Math.abs(turn) > .01) {
      heading += turn;
      add("turn", "Alinhando o robô ao trajeto.");
    }
    position = target;
    if (avoided) add("avoid", "Barreira contornada. O caminho está livre.", { avoided: true });
    else add("move", cargo ? "Transportando o objeto." : "Avançando para a próxima posição.");
  }

  function navigate(avoid: boolean) {
    add("scan", "Sensor detectou uma barreira na rota direta.");
    if (!avoid) {
      add("scan", "Rota interrompida. O sensor bloqueou o avanço diante da barreira.");
      return false;
    }
    move({ x: -1, z: 2 });
    move({ x: -1, z: 0 });
    move(pickup, true);
    return true;
  }

  function classify(sample: Sample) {
    const prediction = predict(sample, input.examples);
    const correct = prediction === sample.category;
    add("scan", `Objeto ${sample.id}: ${sample.shape}, tamanho ${sample.size}. Previsão: ${prediction ?? "sem exemplos"}. Referência: ${sample.category}.`,
      { sample, objectPosition: pickup, prediction, correct });
    return prediction;
  }

  const finish = (success: boolean, explanation: string): Plan => ({ steps, success, explanation });

  if (task === "classify" || task === "patterns") {
    const samples = task === "classify" ? tests.slice(0, 2) : tests.slice(2);
    samples.forEach(classify);
    const success = steps.every(step => step.correct);
    return finish(success, success ? "Os exemplos rotulados ajudaram o robô a reconhecer objetos novos."
      : "O robô compara formato e tamanho. Corrija rótulos ou acrescente amostras de tamanhos diferentes e compare as previsões.");
  }
  if (task === "avoid") {
    const success = navigate(input.avoid);
    return finish(success, success ? "A regra reagiu à leitura do sensor e abriu um desvio."
      : "Configure a condição para contornar barreiras e execute outra vez.");
  }
  if (task === "reward") {
    const path = input.explore && !policy.short.count ? "short"
      : input.explore && !policy.safe.count ? "safe"
        : policy.short.value >= policy.safe.value ? "short" : "safe";
    const success = navigate(path === "safe");
    add("scan", success ? "Destino alcançado: +4 pontos." : "Rota bloqueada: −3 pontos.",
      { path, reward: success ? 4 : -3 });
    return finish(success, success ? "O desvio obteve retorno maior. Teste novamente e compare a próxima escolha."
      : "A penalidade reduz o valor médio da rota direta. A próxima tentativa pode escolher a outra rota.");
  }

  if (task === "autonomous" && !navigate(input.avoid))
    return finish(false, "O sensor parou o robô. Configure o desvio antes de coletar.");

  const queue = [...(task === "deliver" ? examples.slice(0, 2) : tests.slice(2))]
    .sort((first, second) => Number(second.category === input.priority) - Number(first.category === input.priority));
  let correctDeliveries = 0;
  for (const sample of queue) {
    move(pickup);
    let destination: Category | undefined;
    for (const command of input.order) {
      if (command === "inspect") {
        if (task === "autonomous") destination = classify(sample);
        else {
          destination = sample.category;
          add("scan", `O leitor identificou a etiqueta do objeto ${sample.id}: ${destination}.`,
            { sample, objectPosition: pickup });
        }
      }
      if (command === "collect") {
        if (!destination) return finish(false, "Analise o objeto antes da coleta para definir seu destino.");
        cargo = sample;
        add("pickup", `Objeto ${sample.id} coletado.`);
      }
      if (command === "deliver") {
        if (!cargo || !destination) return finish(false, "Colete o objeto antes de tentar transportá-lo.");
        move({ x: bins[destination].x, z: 0 });
        move(bins[destination]);
        cargo = undefined;
        const correct = destination === sample.category;
        if (correct) correctDeliveries++;
        add("drop", correct ? `Objeto ${sample.id} entregue no destino correto.` : `Objeto ${sample.id} entregue no destino errado.`,
          { sample, objectPosition: position, delivered: correct });
      }
    }
    if (cargo || !steps.some(step => step.action === "drop" && step.sample === sample))
      return finish(false, "A sequência ficou incompleta. Inclua análise, coleta e entrega nesta ordem.");
    // Return via the delivery lane rather than crossing the obstacle.
    move({ x: position.x, z: 0 });
  }

  const success = correctDeliveries === queue.length;
  return finish(success, success ? "Todos os objetos chegaram ao destino. A prioridade definiu qual foi atendido primeiro."
    : "A entrega segue a previsão. Revise os exemplos para evitar destinos incorretos.");
}
