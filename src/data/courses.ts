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
// Conteúdos sugeridos pelo briefing: exemplos educativos, não registros de aulas já realizadas.
export const courses: Course[] = [
  {
    id: "robotica",
    number: "01",
    name: "Robótica",
    tag: "DO CÓDIGO AO MOVIMENTO",
    description: "Monte e programe robôs.",
    detail: "Explore o encontro entre programação e o mundo físico.",
    keywords: ["Lógica", "Sensores", "Movimento"],
    color: "#427fb8",
    topics: [
      "Arduino",
      "Sensores e atuadores",
      "Circuitos eletrônicos",
      "Automação",
      "Prototipagem",
    ],
    activities: [
      "Programar um LED",
      "Montar circuitos",
      "Construir protótipos robóticos",
      "Explorar sistemas automatizados",
    ],
    tools: ["Arduino", "Protoboard", "Componentes eletrônicos"],
    images: photos("robotica", "montagem de circuitos"),
  },
  {
    id: "programacao",
    number: "02",
    name: "Programação",
    tag: "IDEIAS QUE SE TORNAM CÓDIGO",
    description: "Transforme ideias em programas.",
    detail:
      "Explore a lógica por trás de sites, aplicações e soluções digitais.",
    keywords: ["Algoritmos", "Lógica", "Desenvolvimento web"],
    color: "#427fb8",
    topics: [
      "Algoritmos e lógica de programação",
      "Condicionais",
      "Laços de repetição",
      "Desenvolvimento web",
      "Orientação a objetos",
    ],
    activities: [
      "Criar sites",
      "Resolver algoritmos",
      "Desenvolver aplicações interativas",
      "Explorar projetos de software",
    ],
    tools: [
      "HTML, CSS e JavaScript",
      "Editor de código",
      "Navegador e ferramentas de desenvolvimento",
    ],
    images: photos("programacao", "programação"),
  },
  {
    id: "design",
    number: "03",
    name: "Design",
    tag: "IDEIAS QUE GANHAM FORMA",
    description: "Crie telas e experiências digitais.",
    detail: "Dê forma à maneira como as pessoas interagem com a tecnologia.",
    keywords: ["Interfaces", "Cores", "Experiências"],
    color: "#76afe3",
    topics: [
      "UI/UX",
      "Teoria das cores",
      "Tipografia",
      "Prototipagem",
      "Identidade visual",
      "Interfaces responsivas",
    ],
    activities: [
      "Desenhar interfaces digitais",
      "Criar materiais visuais",
      "Construir protótipos",
      "Organizar layouts",
    ],
    tools: [
      "Ferramentas de prototipagem",
      "Editores gráficos",
      "Guias de estilo",
    ],
    images: photos("design", "criação de interfaces"),
  },
  {
    id: "manutencao",
    number: "04",
    name: "Manutenção",
    tag: "POR DENTRO DA TECNOLOGIA",
    description: "Descubra como computadores funcionam.",
    detail: "Conheça o universo que existe por trás de cada tela.",
    keywords: ["Hardware", "Componentes", "Computadores"],
    color: "#76afe3",
    topics: [
      "Hardware e placas-mãe",
      "Processadores",
      "Memória RAM",
      "Armazenamento",
      "Diagnóstico",
      "Manutenção preventiva",
    ],
    activities: [
      "Explorar a montagem de computadores",
      "Identificar componentes",
      "Investigar e resolver falhas",
    ],
    tools: [
      "Ferramentas de bancada",
      "Componentes de hardware",
      "Utilitários de diagnóstico",
    ],
    images: photos("manutencao", "manutenção de computadores"),
  },
  {
    id: "redes",
    number: "05",
    name: "Redes",
    tag: "TUDO ESTÁ CONECTADO",
    description: "Conecte computadores e pessoas.",
    detail: "Explore as conexões que aproximam o mundo digital.",
    keywords: ["Conexões", "Dispositivos", "Comunicação"],
    color: "#254d78",
    topics: [
      "Endereçamento IP",
      "Protocolos de rede",
      "Roteadores e switches",
      "Cabeamento estruturado",
      "Topologias de rede",
    ],
    activities: [
      "Montar cabos",
      "Configurar uma rede local",
      "Testar conectividade",
      "Simular redes",
    ],
    tools: [
      "Roteadores e switches",
      "Cabos e conectores",
      "Simuladores de rede",
    ],
    images: photos("redes", "configuração de redes"),
  },
];
