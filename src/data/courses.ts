export type CourseId =
  | "robotica"
  | "programacao"
  | "design"
  | "manutencao"
  | "redes";
export type CourseImage = {
  id: string;
  src?: string;
  alt: string;
  caption: string;
};
export type Course = {
  id: CourseId;
  number: string;
  name: string;
  tag: string;
  description: string;
  detail: string;
  keywords: string[];
  color: string;
  topics: string[];
  activities: string[];
  tools: string[];
  images: CourseImage[];
};
const photos = (id: CourseId, activity: string): CourseImage[] => [
  {
    id: `${id}-01`,
    alt: `Espaço para fotografia real de ${activity}`,
    caption: `Fotografia real de ${activity} — aguardando envio.`,
  },
  {
    id: `${id}-02`,
    alt: `Espaço para fotografia real de uma atividade de ${id}`,
    caption: "Registro de atividade prática — aguardando fotografia real.",
  },
];
// Conteúdos alinhados à matriz curricular. Atividades são sugestões educativas.
export const courses: Course[] = [
  {
    id: "robotica",
    number: "01",
    name: "Introdução à Inteligência Artificial",
    tag: "PRIMEIROS PASSOS EM IA",
    description: "Descubra como a IA funciona, onde está presente e como pode transformar o mundo.",
    detail: "Uma introdução a sistemas que aprendem com dados e reconhecem padrões, com atenção ao uso responsável.",
    keywords: ["Fundamentos", "Cotidiano", "Ética"],
    color: "#427fb8",
    topics: [
      "Fundamentos da Inteligência Artificial",
      "Aplicações no cotidiano",
      "Ética e responsabilidade",
    ],
    activities: [
      "Identificar exemplos de IA no dia a dia",
      "Observar como dados ajudam a reconhecer padrões",
      "Conversar sobre impactos e escolhas responsáveis",
    ],
    tools: ["Dados", "Padrões", "Aplicações de IA"],
    images: photos("robotica", "Inteligência Artificial"),
  },
  {
    id: "programacao",
    number: "02",
    name: "IA Generativa e Engenharia de Prompts",
    tag: "IDEIAS EM CONVERSA COM A IA",
    description: "Aprenda a conversar com inteligências artificiais e criar conteúdos utilizando instruções estratégicas.",
    detail: "Explore a geração de conteúdos e como escrever instruções claras, avaliando os resultados com responsabilidade.",
    keywords: ["IA generativa", "Prompts", "Conteúdos"],
    color: "#427fb8",
    topics: [
      "Inteligência Artificial generativa",
      "Engenharia de prompts",
      "Geração de conteúdos",
      "Uso responsável das ferramentas",
    ],
    activities: [
      "Experimentar instruções com objetivos diferentes",
      "Comparar e revisar conteúdos gerados",
      "Reconhecer limites e possíveis erros das ferramentas",
    ],
    tools: [
      "Modelos generativos",
      "Instruções",
      "Conteúdos digitais",
    ],
    images: photos("programacao", "IA generativa"),
  },
  {
    id: "design",
    number: "03",
    name: "Machine Learning",
    tag: "APRENDER COM DADOS",
    description: "Descubra como ensinar computadores a reconhecer padrões, aprender com dados e realizar previsões.",
    detail: "Reúne os conteúdos de Machine Learning I e II previstos em etapas diferentes da matriz curricular.",
    keywords: ["Dados", "Aprendizado", "Previsões"],
    color: "#76afe3",
    topics: [
      "Aprendizado de máquina",
      "Preparação de dados",
      "Treinamento e avaliação de modelos",
      "Reconhecimento de padrões",
    ],
    activities: [
      "Preparar dados para análise",
      "Observar como modelos identificam padrões",
      "Comparar previsões e avaliar resultados",
    ],
    tools: [
      "Conjuntos de dados",
      "Modelos de aprendizado",
      "Métricas de avaliação",
    ],
    images: photos("design", "aprendizado de máquina"),
  },
  {
    id: "manutencao",
    number: "04",
    name: "Visão Computacional",
    tag: "A IA TAMBÉM PODE VER",
    description: "Aprenda como os computadores conseguem interpretar imagens, reconhecer objetos e analisar ambientes.",
    detail: "Conheça formas de analisar informações visuais e algumas aplicações práticas dessa tecnologia.",
    keywords: ["Imagens", "Reconhecimento", "Ambientes"],
    color: "#76afe3",
    topics: [
      "Processamento de imagens",
      "Detecção de objetos",
      "Reconhecimento visual",
      "Aplicações práticas",
    ],
    activities: [
      "Observar características presentes em imagens",
      "Explorar exemplos de detecção e reconhecimento visual",
      "Discutir usos e limites da análise de imagens",
    ],
    tools: [
      "Imagens digitais",
      "Modelos visuais",
      "Dados de imagem",
    ],
    images: photos("manutencao", "visão computacional"),
  },
  {
    id: "redes",
    number: "05",
    name: "Automação e Agentes de IA",
    tag: "SISTEMAS QUE REALIZAM TAREFAS",
    description: "Explore como criar sistemas inteligentes capazes de executar tarefas e automatizar processos.",
    detail: "Investigue como agentes de IA podem usar ferramentas em etapas de um processo automatizado.",
    keywords: ["Automação", "Agentes", "Soluções"],
    color: "#254d78",
    topics: [
      "Automação inteligente",
      "Agentes de Inteligência Artificial",
      "Integração de ferramentas",
      "Desenvolvimento de soluções",
    ],
    activities: [
      "Mapear etapas de uma tarefa que pode ser automatizada",
      "Explorar como um agente segue instruções e utiliza ferramentas",
      "Considerar supervisão e responsabilidade nos processos",
    ],
    tools: [
      "Agentes de IA",
      "Ferramentas digitais",
      "Processos automatizados",
    ],
    images: photos("redes", "automação e agentes de IA"),
  },
];
