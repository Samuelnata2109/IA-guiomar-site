import type { World } from "./adventure";

type Option = { id: string; label: string; feedback: string };
type Item = {
  id: string;
  label: string;
  category: string;
  feedback: string;
  shape?: "circle" | "triangle" | "partial";
};
type MissionBase = { title: string; badge: string; instructions: string; hint: string };
type Classification = MissionBase & {
  kind: "classify";
  categories: { id: string; label: string }[];
  items: Item[];
};
type Selection = MissionBase & { kind: "data" | "training"; options: Option[] };
type Sequence = MissionBase & { kind: "prompt" | "agent"; options: Option[] };
export type Mission = Classification | Selection | Sequence;
export type MissionResult = { passed: boolean; summary: string; observations: string[] };

export const missions: Mission[] = [
  {
    title: "Primeiro contato",
    badge: "Radar de IA",
    kind: "classify",
    instructions: "Separe os quatro sistemas. Procure os que aprendem padrões com exemplos.",
    hint: "Um horário fixo e uma fórmula seguem regras definidas. Um sistema que aprende com exemplos pode lidar com casos novos.",
    categories: [{ id: "ai", label: "Usa IA" }, { id: "rule", label: "Segue uma regra" }],
    items: [
      { id: "alarm", label: "Alarme programado para as 7h", category: "rule", feedback: "O horário foi definido por uma pessoa." },
      { id: "voice", label: "Teclado que aprendeu a transcrever voz com gravações", category: "ai", feedback: "Ele usa padrões aprendidos em gravações para reconhecer palavras novas." },
      { id: "sum", label: "Calculadora que soma dois números", category: "rule", feedback: "A soma segue uma fórmula fixa." },
      { id: "spam", label: "Filtro que aprendeu a detectar spam com mensagens rotuladas", category: "ai", feedback: "O filtro aplica padrões aprendidos a mensagens que nunca viu." },
    ],
  },
  {
    title: "Organizando os dados",
    badge: "Curadoria de dados",
    kind: "data",
    instructions: "Escolha três exemplos úteis para ensinar BYTE a separar papel e plástico. Inclua os dois materiais.",
    hint: "Prefira exemplos nítidos e variados, com rótulo correto. Dados pessoais são desnecessários aqui.",
    options: [
      { id: "sheet", label: "Folha nítida · papel", feedback: "Rótulo correto e imagem nítida." },
      { id: "bottle", label: "Garrafa nítida · plástico", feedback: "Representa o segundo material." },
      { id: "box", label: "Caixa nítida · papel", feedback: "Acrescenta variedade aos exemplos de papel." },
      { id: "blur", label: "Objeto borrado · plástico?", feedback: "Uma foto borrada com rótulo incerto pode ensinar o padrão errado." },
      { id: "duplicate", label: "Cópia da mesma folha · papel", feedback: "A cópia ocupa o lugar de um exemplo diferente." },
      { id: "personal", label: "Garrafa com nome e endereço visíveis", feedback: "Nome e endereço são desnecessários. Remova dados pessoais antes de usar a imagem." },
    ],
  },
  {
    title: "Ensinando a máquina",
    badge: "Treinamento e teste",
    kind: "training",
    instructions: "Escolha exemplos rotulados e treine BYTE. Ele compara o tamanho e a textura de cada item novo com o exemplo mais parecido.",
    hint: "Experimente o rótulo trocado e compare o teste. Use exemplos nítidos e corretos das duas categorias.",
    options: [
      { id: "small", label: "Folha pequena fosca · papel", feedback: "Exemplo correto de papel." },
      { id: "large", label: "Garrafa grande brilhante · plástico", feedback: "Exemplo correto de plástico." },
      { id: "wrong", label: "Garrafa média brilhante · papel", feedback: "O rótulo trocado ensina BYTE a chamar um plástico de papel." },
    ],
  },
  {
    title: "Olhos inteligentes",
    badge: "Visão computacional",
    kind: "classify",
    instructions: "Classifique os três quadros da câmera. Peça revisão quando o contorno estiver oculto.",
    hint: "Observe o contorno. Uma parte visível pode combinar com mais de uma forma.",
    categories: [{ id: "round", label: "Círculo" }, { id: "corner", label: "Triângulo" }, { id: "review", label: "Pedir revisão" }],
    items: [
      { id: "frame-1", label: "Quadro 1", shape: "circle", category: "round", feedback: "O contorno curvo está completo e não tem vértices." },
      { id: "frame-2", label: "Quadro 2", shape: "triangle", category: "corner", feedback: "O contorno tem três lados e três vértices." },
      { id: "frame-3", label: "Quadro 3", shape: "partial", category: "review", feedback: "O bloqueio esconde o contorno. Peça outra imagem antes de decidir." },
    ],
  },
  {
    title: "Mestre dos prompts",
    badge: "Instruções claras",
    kind: "prompt",
    instructions: "Monte um prompt para o mural de reciclagem. Teste uma instrução vaga e compare com uma que inclua objetivo, contexto, detalhes e limites.",
    hint: "Use as quatro peças específicas. A ordem pode mudar, desde que todas as informações estejam presentes.",
    options: [
      { id: "vague", label: "Faça algo sobre lixo.", feedback: "Sem público, formato ou limite, a resposta tende a ser genérica." },
      { id: "goal", label: "Objetivo · Escreva um aviso de reciclagem.", feedback: "Crie um aviso." },
      { id: "context", label: "Contexto · Para o mural da escola.", feedback: "Use linguagem de mural escolar." },
      { id: "detail", label: "Detalhes · Explique como separar papel e plástico.", feedback: "Inclua as duas categorias." },
      { id: "limit", label: "Limite · Use duas frases e não invente dados.", feedback: "Mantenha a resposta curta e verificável." },
    ],
  },
  {
    title: "Agente inteligente",
    badge: "Núcleo de IA",
    kind: "agent",
    instructions: "Programe o agente da coleta seletiva. Ordene as ações do sensor até o aviso e teste com duas imagens.",
    hint: "Antes de encaminhar, confira a nitidez. Treine antes de classificar. Use o classificador só quando a imagem estiver nítida e envie o aviso no fim.",
    options: [
      { id: "capture", label: "Ler a imagem do sensor", feedback: "A câmera fornece a entrada." },
      { id: "check", label: "Se estiver borrada, pedir revisão e encerrar", feedback: "A condição evita uma decisão sem evidência." },
      { id: "train", label: "Carregar exemplos rotulados e treinar o modelo", feedback: "O modelo precisa de exemplos corretamente rotulados." },
      { id: "predict", label: "Classificar com o modelo treinado", feedback: "O modelo reconhece padrões quando a imagem permite." },
      { id: "route", label: "Encaminhar para a caixa prevista", feedback: "O agente executa a ação com base na previsão." },
      { id: "notify", label: "Pedir ao gerador um aviso curto com o resultado, sem inventar dados", feedback: "O prompt comunica o resultado com um limite explícito." },
    ],
  },
];

export const route: World[] = [
  { x: 2, z: 4, direction: 0 },
  { x: 2, z: 3, direction: 0 },
  { x: 2, z: 2, direction: 0 },
  { x: 3, z: 2, direction: 1 },
  { x: 3, z: 1, direction: 0 },
  { x: 4, z: 1, direction: 1 },
  { x: 4, z: 0, direction: 0 },
];
export const aiTerrain = {
  size: 5,
  start: [2, 4] as [number, number],
  goal: [4, 0] as [number, number],
  obstacles: [[1, 2], [4, 3], [1, 0]] as [number, number][],
};
export type MissionInput = { labels: Record<string, string>; selected: string[] };

const examples = [
  { id: "small", features: [1, 0], label: "papel" },
  { id: "large", features: [5, 2], label: "plástico" },
  { id: "wrong", features: [3, 2], label: "papel" },
];
const samples = [
  { label: "Papel", features: [2, 0], expected: "papel" },
  { label: "Plástico", features: [3, 2], expected: "plástico" },
];
const distance = (a: number[], b: number[]) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);

function predict(features: number[], training: typeof examples) {
  return training.reduce((best, candidate) =>
    distance(features, candidate.features) < distance(features, best.features) ? candidate : best).label;
}

function train(selected: string[]): MissionResult {
  const training = examples.filter(({ id }) => selected.includes(id));
  if (!training.length) return { passed: false, summary: "Escolha pelo menos um exemplo para treinar.", observations: [] };
  const predictions = samples.map(sample => ({ ...sample, predicted: predict(sample.features, training) }));
  const correct = predictions.filter(({ predicted, expected }) => predicted === expected).length;
  return {
    passed: correct === samples.length,
    summary: `${correct}/${samples.length} acertos no teste. ${correct === samples.length
      ? "Exemplos corretos das duas categorias ajudaram BYTE a generalizar."
      : "Troque o rótulo inadequado removendo esse exemplo ou acrescente exemplos da categoria que falta."}`,
    observations: predictions.map(({ label, expected, predicted }) => `${label} novo → previsão: ${predicted}. Esperado: ${expected}.`),
  };
}

function runAgent(steps: string[]) {
  return [true, false].map(clear => {
    const image = clear ? "Imagem nítida" : "Imagem borrada";
    if (steps[0] !== "capture") return { ok: false, text: `${image} → o fluxo começou sem ler o sensor.` };
    let checked = false;
    let training: typeof examples = [];
    let prediction = "";
    let routed = false;
    for (const step of steps.slice(1)) {
      if (step === "check") {
        if (!clear) return { ok: true, text: `${image} → revisão humana, sem previsão nem envio.` };
        checked = true;
      }
      if (step === "train") training = examples.filter(example => example.id !== "wrong");
      if (step === "predict") {
        if (!checked) return { ok: false, text: `${image} → BYTE tentou prever antes de verificar a qualidade.` };
        if (!training.length) return { ok: false, text: `${image} → o modelo ainda precisa de exemplos rotulados.` };
        prediction = predict(samples[1].features, training);
      }
      if (step === "route") {
        if (!prediction) return { ok: false, text: `${image} → destino escolhido antes da classificação.` };
        routed = true;
      }
      if (step === "notify") {
        if (!routed) return { ok: false, text: `${image} → aviso enviado antes da ação.` };
        return { ok: true, text: `${image} → previsão: ${prediction} → caixa de ${prediction} → aviso: “Item encaminhado para a caixa de ${prediction}.”` };
      }
    }
    return { ok: false, text: `${image} → o fluxo ainda está incompleto.` };
  });
}

export function evaluateMission(mission: Mission, { labels, selected }: MissionInput): MissionResult {
  switch (mission.kind) {
    case "classify": {
      const correct = mission.items.filter(item => labels[item.id] === item.category).length;
      const subject = mission.items[0].shape ? "quadros" : "sistemas";
      return {
        passed: correct === mission.items.length,
        summary: `${correct}/${mission.items.length} ${subject} classificados corretamente.`,
        observations: mission.items.map(item =>
          `${item.label} · ${labels[item.id] === item.category ? "Correto" : labels[item.id] ? "Revise" : "Falta classificar"}. ${item.feedback}`),
      };
    }
    case "data": {
      const passed = selected.length === 3 && ["sheet", "bottle", "box"].every(id => selected.includes(id));
      return {
        passed,
        summary: passed ? "Conjunto aprovado: rótulos corretos, dois materiais e exemplos variados."
          : "Revise sua seleção. BYTE precisa de três exemplos confiáveis que incluam papel e plástico.",
        observations: mission.options.filter(option => selected.includes(option.id)).map(option => option.feedback),
      };
    }
    case "training":
      return train(selected);
    case "prompt": {
      const pieces = ["goal", "context", "detail", "limit"];
      const passed = !selected.includes("vague") && pieces.every(id => selected.includes(id));
      const preview = passed
        ? "Separe o papel do plástico antes do descarte. Coloque cada material na caixa indicada no mural."
        : selected.includes("detail") ? "Separe papel e plástico para reciclar."
          : selected.includes("goal") ? "Vamos reciclar mais na escola!" : "O lixo é um problema. Recicle quando puder.";
      return {
        passed,
        summary: passed ? "As quatro peças dão ao gerador um pedido claro e verificável."
          : "Retire a instrução vaga e inclua as quatro peças específicas.",
        observations: [
          "Instrução vaga → “O lixo é um problema. Recicle quando puder.”",
          `Seu prompt → “${preview}”`,
        ],
      };
    }
    case "agent": {
      const simulations = runAgent(selected);
      const passed = simulations.every(simulation => simulation.ok);
      return {
        passed,
        summary: passed ? "Fluxo aprovado. BYTE automatizou a coleta e encaminhou o caso incerto para revisão."
          : "Revise a ordem e use a verificação da imagem antes de classificar.",
        observations: simulations.map(simulation => simulation.text),
      };
    }
  }
}
