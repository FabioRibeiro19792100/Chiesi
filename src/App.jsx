import {
  CalendarRange,
  CircleCheckBig,
  Crosshair,
  FileStack,
  LayoutGrid,
  Lightbulb,
  LineChart,
  Map as MapIcon,
  Network,
  RefreshCw,
  Route,
  SlidersHorizontal,
  Sparkles,
  TableProperties,
  UsersRound,
} from "lucide-react";
import { useEffect, useState } from "react";

const PRECO_HORA_WORKSHOP = 6600;
const PRECO_SC_IMPL = 12000;
const PRECO_SC_LIC = 45;
const ENCONTROS = 6;
const WORKSHOP_ENCONTROS = 1;
const WORKSHOP_HORAS = 2;
const COMITE_ENCONTRO_HORAS = 1;

const CLUSTERS = {
  comite: {
    tag: "Grupo 01",
    label: "Comitê Executivo",
    min: 1,
    max: 50,
    defaultSize: 10,
    defaultTurmas: 1,
    context:
      "Define prioridades e aloca recursos. Fala de transformação digital no nível estratégico e orienta a construção dessa visão para toda a organização.",
    focus:
      "Visão estratégica, tomada de decisão sob ambiguidade e cultura de experimentação",
    deepening:
      "Lacunas de liderança na transformação e conexão com HLM",
  },
  escritorio: {
    tag: "Grupo 02",
    label: "Escritório",
    min: 1,
    max: 500,
    defaultSize: 150,
    defaultTurmas: 3,
    context:
      "O maior grupo, com áreas como TI, Marketing, Medical, Compliance e Regulatórios. Convivem perfis com graus muito diferentes de maturidade e interesse pelo digital.",
    focus: "Ferramentas, processos digitais e colaboração entre áreas",
    deepening: "Maturidade individual em IA e rotinas de trabalho digital",
  },
  fabrica: {
    tag: "Grupo 03",
    label: "Fábrica",
    min: 1,
    max: 500,
    defaultSize: 50,
    defaultTurmas: 1,
    context:
      "Ambiente operacional com rotinas físicas consolidadas. O briefing identifica esse grupo como público do programa e abre espaço para detalhar como a digitalização se aplica especificamente a esse contexto.",
    focus:
      "Digitalização de processos operacionais, rastreabilidade e dados de produção",
    deepening:
      "Lacunas específicas do ambiente produtivo e integração com sistemas",
  },
  fv: {
    tag: "Grupo 04",
    label: "Força de Vendas",
    min: 1,
    max: 500,
    defaultSize: 30,
    defaultTurmas: 1,
    context:
      "O grupo com maior resistência declarada ao digital. A visitação presencial define a identidade profissional da maioria. A liderança reconhece o baixíssimo engajamento com o tema hoje.",
    focus:
      "Canais digitais, CRM e estratégias para alcançar médicos não visitados",
    deepening:
      "Comunicação digital com médicos e uso de dados para priorização de visitas",
  },
};

const MODULES = [
  {
    id: "m1",
    num: "01",
    title: "Transformação Digital",
    durationHours: 16,
    hourlyRate: 2860,
    subtitle:
      "O que a transformação digital pede da rotina, com letramento aplicado e referências do setor.",
    optional: false,
    groups: ["comite", "escritorio", "fabrica", "fv"],
    proposal:
      "O módulo trabalha o que a transformação digital exige de cada profissional e como isso se traduz em decisões e rotinas do dia a dia. Inclui benchmarks do setor farmacêutico e atividades práticas de letramento digital ao longo dos seis encontros.",
  },
  {
    id: "m2",
    num: "02",
    title: "IA & Copilot no dia a dia",
    durationHours: 16,
    hourlyRate: 4400,
    subtitle: "IA aplicada ao trabalho, com prompt na prática e casos adaptados por área.",
    optional: true,
    groups: ["comite", "escritorio", "fabrica", "fv"],
    proposal:
      "Uso prático de IA generativa e do Copilot aplicado à rotina de cada área. Os encontros partem de situações reais de trabalho e incluem engenharia de prompt, limites regulatórios e casos do setor farmacêutico.",
  },
  {
    id: "m3",
    num: "03",
    title: "Comunicação Digital",
    durationHours: 12,
    hourlyRate: 2200,
    subtitle: "Comunicação com médicos por canais digitais, com segmentação, cadência e alcance ampliado.",
    optional: true,
    groups: ["fv"],
    proposal:
      "Canais digitais, segmentação de audiência, frequência e formatos aplicados à comunicação com médicos. O módulo trabalha o digital como extensão da visitação, para manter relacionamento, alcançar médicos não visitados e aumentar o impacto comercial da força de vendas.",
  },
  {
    id: "m4",
    num: "04",
    title: "Mentalidade Ágil",
    durationHours: 8,
    hourlyRate: 2200,
    subtitle:
      "Princípios ágeis traduzidos em comportamento, coordenação e ganho de efetividade.",
    optional: true,
    groups: ["comite", "escritorio", "fabrica", "fv"],
    proposal:
      "Os conceitos do manifesto ágil aplicados à realidade da Chiesi. O módulo trabalha comportamentos e rotinas concretas que aumentam efetividade operacional com incorporação progressiva à dinâmica dos times e processos.",
  },
  {
    id: "m5",
    num: "05",
    title: "Liderança na Transformação",
    durationHours: 12,
    hourlyRate: 3520,
    subtitle:
      "Liderança para mudança cultural, com vulnerabilidade, experimentação e gestão da ambiguidade.",
    optional: false,
    groups: ["comite", "escritorio", "fabrica", "fv"],
    proposal:
      "Como a liderança sustenta uma transformação cultural. O módulo trabalha vulnerabilidade, tolerância ao erro, gestão da ambiguidade e o papel da liderança em times que estão aprendendo a operar de forma diferente.",
  },
];

const CONTEXTO = [
  {
    label: "Breve histórico",
    title: "A Chiesi no Brasil",
    paragraphs: [
      "A Chiesi é uma multinacional italiana com operação consolidada no Brasil. O time é formado majoritariamente por profissionais de longa data, pessoas que conhecem o negócio com profundidade, construíram relações duradouras com médicos e operam com foco no físico: visitas, amostras, eventos presenciais, materiais impressos.",
      "Há cerca de três anos, a organização passou a receber colaboradores com perfil mais digital. Esses perfis convivem hoje na mesma estrutura e pedem uma linguagem comum sobre o que significa operar digitalmente no contexto da Chiesi.",
      "A liderança global coloca transformação digital entre as prioridades estratégicas. No Brasil, essa diretriz chega de forma macro, presente no discurso, e pede tradução para o dia a dia das equipes. Quando projetos digitais entram em pauta, a cobrança por resultado imediato convive com o tempo de consolidação que a mudança cultural pede.",
    ],
  },
  {
    label: "Objetivos",
    title: "Expectativas e recomendações da Chiesi",
    paragraphs: [
      "A Chiesi quer um programa aplicado à rotina, capaz de gerar decisões, novos hábitos de trabalho e ganho operacional. A mudança é tratada internamente como alavanca para eficiência e oportunidade comercial.",
      "A liderança global desenha um change management com foco em CRM para a força de vendas. A Chiesi Brasil busca uma jornada mais abrangente, orientada para toda a organização e conectada à evolução das práticas de trabalho.",
      "Os módulos sugeridos no briefing funcionam como referência inicial. O documento abre espaço para recomendação de arquitetura e convida uma proposta construída a partir das prioridades reais da jornada.",
      "A Chiesi quer que o programa contemple experiências e boas práticas já implementadas na indústria farmacêutica e na área da saúde.",
    ],
  },
  {
    label: "Escopo",
    title: "O briefing informado",
    paragraphs: [],
  },
];

const BRIEFING_ENTREGAVEIS = [
  "Assessment para todos os colaboradores, com diagnóstico de maturidade digital e engajamento com o tema.",
  "Workshop com o Comitê Executivo para mapear maturidade da liderança, levantar interesses e preocupações, e construir as recomendações para o programa.",
  "Plano de change management e treinamento baseado no assessment e no workshop.",
  "Criação e condução da trilha de conteúdos e workshops, contemplando experiências e boas práticas da indústria farmacêutica e da área da saúde.",
  "Proposta de KPIs para avaliar a efetividade do programa.",
];

const BRIEFING_TIMING = [
  "Assessment e workshop com o comitê ainda no segundo semestre de 2026.",
  "Trilha começando na convenção de março de 2027 e se estendendo pelo primeiro semestre.",
  "Encontros remotos, com duração máxima de 4 horas, síncronos e assíncronos.",
];

const CONTEXTO_OBJECTIVES = [
  {
    title: "Aplicação na rotina",
    text: "A Chiesi quer um programa aplicado à rotina, capaz de gerar decisões, novos hábitos de trabalho e ganho operacional. A mudança é tratada internamente como alavanca para eficiência e oportunidade comercial.",
  },
  {
    title: "Escopo organizacional",
    text: "A liderança global desenha um change management com foco em CRM para a força de vendas. A Chiesi Brasil busca uma jornada mais abrangente, orientada para toda a organização e conectada à evolução das práticas de trabalho.",
  },
  {
    title: "Arquitetura aberta a recomendação",
    text: "Os módulos sugeridos no briefing funcionam como referência inicial. O documento abre espaço para recomendação de arquitetura e convida uma proposta construída a partir das prioridades reais da jornada.",
  },
  {
    title: "Referências do setor",
    text: "A Chiesi quer que o programa contemple experiências e boas práticas já implementadas na indústria farmacêutica e na área da saúde.",
  },
];

const CONTEXTO_INDEX = [
  { id: "contexto-organizacao", label: "Breve histórico" },
  { id: "contexto-grupos", label: "Abrangência" },
  { id: "contexto-objetivo", label: "Objetivos" },
  { id: "contexto-escopo", label: "Escopo" },
];

const MASTERTECH_INDEX = [
  { id: "mastertech-visao", label: "Quem somos" },
  { id: "mastertech-jornada", label: "Como evoluímos" },
  { id: "mastertech-metodo", label: "Como atuamos" },
  { id: "mastertech-farma", label: "Experiência farmacêutica" },
];

const SOLUCAO_INDEX = [
  { id: "solucao-diagnostico", label: "Diagnóstico" },
  { id: "solucao-conteudos", label: "Organização da trilha" },
  { id: "solucao-acompanhamento", label: "Acompanhamento" },
  { id: "solucao-gestao", label: "Gestão" },
];

const CONFIG_INDEX = [
  { id: "config-publicos", label: "Abrangência" },
  { id: "config-e2w", label: "Sistema" },
  { id: "config-workshop", label: "Kick-off" },
  { id: "config-programas", label: "Programa" },
];

const ADMIN_INDEX = [
  { id: "admin-publicos", label: "Públicos" },
  { id: "admin-e2w", label: "E2W e workshop" },
  { id: "admin-programas", label: "Programas" },
];

const PROPOSAL_INDEX = [
  { id: "proposal-briefing", label: "Síntese do briefing recebido" },
  { id: "proposal-logic", label: "Como pensamos a proposta" },
  { id: "proposal-structure", label: "A estrutura da proposta" },
  { id: "proposal-publics", label: "Públicos participantes" },
  { id: "proposal-offer", label: "Entrega e investimento" },
  { id: "proposal-calendar", label: "Execução" },
  { id: "proposal-steps", label: "Próximos passos" },
  { id: "proposal-mastertech", label: "Quem é a Mastertech" },
];

const MASTERTECH_STATS = [
  {
    label: "Fundação",
    value: "2015",
    text: "Dez anos de atuação em educação corporativa, transformação digital e cultura de mudança.",
  },
  {
    label: "Escala",
    value: "200+",
    text: "Clientes corporativos de diferentes portes e setores ao longo da última década.",
  },
  {
    label: "Especialidade",
    value: "B2B",
    text: "Programas, consultoria, formação aplicada e construção de soluções para transformação organizacional.",
  },
  {
    label: "Produto",
    value: "E2W",
    text: "Sistema SaaS de gestão de capital humano que estrutura diagnóstico, evolução e leitura gerencial.",
  },
];

const MASTERTECH_TIMELINE = [
  {
    phase: "Início",
    title: "Software house com DNA de produto",
    text: "A Mastertech nasceu em 2015 construindo soluções digitais e repertório técnico em tecnologia, produto e inovação.",
  },
  {
    phase: "Virada",
    title: "Escola orientada para o mercado",
    text: "A operação migrou para educação, formando profissionais e organizando trilhas conectadas às mudanças do trabalho.",
  },
  {
    phase: "Expansão",
    title: "Atuação corporativa consultiva",
    text: "O escopo passou a incluir programas proprietários, formação sob medida, laboratórios de inovação e desenho consultivo.",
  },
  {
    phase: "Atual",
    title: "Empresa de IA com produto SaaS",
    text: "Mais recentemente, a Mastertech evoluiu para uma empresa de IA com sistemas próprios, tendo o E2W como principal produto.",
  },
];

const MASTERTECH_PILLARS = [
  {
    icon: "calibrate",
    title: "Diagnóstico",
    text: "A leitura sempre começa pelo contexto da empresa, pelas lacunas prioritárias e pelo que precisa ser personalizado na solução.",
  },
  {
    icon: "spark",
    title: "Desenvolvimento da solução",
    text: "É o eixo em que entram formações, criação de conteúdo, laboratórios, programas remotos e presenciais e ativações consultivas.",
  },
  {
    icon: "data",
    title: "Governança",
    text: "A terceira frente consolida o processo com gestão, acompanhamento e sustentação para a mudança gerar efeito real.",
  },
];

const MASTERTECH_CLIENTS = [
  "Itaú",
  "Bradesco",
  "Santander",
  "Citi",
  "Natura",
  "Nestlé",
  "Heineken",
  "Bayer",
  "Roche",
  "IBM",
  "Meta",
  "Visa",
  "Accenture",
  "Porto Seguro",
  "Roblox",
  "Globo",
  "British Council",
];

const MASTERTECH_PHARMA_CASES = [
  {
    client: "Bayer",
    text: "Relacionamento longevo com iniciativas em dados, análise de dados, agilidade e design thinking para construção de produtos em oncologia.",
  },
  {
    client: "Daiichi Sankyo",
    text: "Ativações ao longo de três anos, incluindo construção de produtos e uma trilha ampla de transformação digital com workshops ao longo de um ano.",
  },
  {
    client: "Roche",
    text: "Trabalho voltado a team building e fortalecimento de dinâmica de equipe.",
  },
  {
    client: "Novo Nordisk",
    text: "Projeto de comunicação digital para a força de vendas, com foco em repertório aplicado à rotina comercial.",
  },
  {
    client: "Amgen",
    text: "Atuação específica em criação de produtos, conectada ao contexto do setor farmacêutico.",
  },
];

const ECOSYSTEM_LINE_NAME = "E2W";

const SOLUCAO = [
  {
    label: "Diagnóstico",
    title: "Entendimento inicial",
    systemIntro: {
      label: "E2W",
      title: "O sistema por trás do diagnóstico",
      text: "O E2W é o sistema proprietário da Mastertech para gestão de capital humano. Ele estrutura o mapeamento de competências, o alinhamento de metas entre colaborador e liderança, a geração de planos de desenvolvimento e o acompanhamento da evolução ao longo do tempo com uma régua comum de proficiência.",
    },
    blocks: [
      {
        label: "Como começa",
        icon: "path",
        lead: "O programa começa com um alinhamento formal entre colaborador e liderança.",
        items: [
          {
            title: "Autoavaliação por competência",
            text: "Cada pessoa registra onde está hoje e onde quer chegar em cada competência prioritária.",
          },
          {
            title: "Meta bilateral",
            text: "O gestor revisa essa leitura, aprova, ajusta ou devolve para calibração.",
          },
          {
            title: "Ponto de partida comum",
            text: "A jornada só começa depois desse acordo sobre a meta de desenvolvimento.",
          },
        ],
      },
      {
        label: "Como se calibra",
        icon: "calibrate",
        lead: "A leitura inicial segue um processo de validação antes de orientar o programa.",
        items: [
          {
            title: "Leitura revisada",
            text: "A autoavaliação é combinada à visão da liderança para construir uma leitura convergente do ponto de partida.",
          },
          {
            title: "Meta ajustada",
            text: "Quando necessário, a meta de desenvolvimento é recalibrada antes do início da jornada.",
          },
          {
            title: "Base confiável",
            text: "O programa parte de prioridades já validadas e organizadas em uma base comum de desenvolvimento.",
          },
        ],
      },
      {
        label: "O que isso produz",
        icon: "map",
        lead: "Esse diagnóstico já gera a base que orienta a jornada da Chiesi.",
        items: [
          {
            title: "Mapa individual",
            text: "Cada colaborador passa a ter um retrato claro das competências técnicas, comportamentais e digitais que precisa desenvolver.",
          },
          {
            title: "Prioridades pactuadas",
            text: "O sistema registra o ponto de partida e as prioridades acordadas entre a pessoa e sua liderança.",
          },
          {
            title: "Base para o programa",
            text: "Essa leitura orienta a arquitetura dos encontros e a forma de medir efetividade ao longo da jornada.",
          },
        ],
      },
    ],
  },
  {
    label: "Acompanhamento",
    title: "Gestão por dados em tempo real",
    intro:
      "O E2W acompanha toda a jornada, registra a evolução de cada colaborador e transforma essas leituras em decisões de desenvolvimento.",
    streams: [
      {
        title: "Atualização individual",
        icon: "refresh",
        text: "Cada colaborador pode se reavaliar ao longo do programa. Um advisor de IA valida tecnicamente essa leitura. Quando há evidência consistente de evolução, o mapa de competências é atualizado.",
      },
      {
        title: "Leitura coletiva",
        icon: "collective",
        text: "Com o acúmulo dessas leituras, o E2W constrói uma visão longitudinal de cada colaborador. Também revela padrões por grupo, identifica maturidade distribuída na organização e abre espaço para aprendizado entre pares.",
      },
      {
        title: "Aprofundamentos orientados por dados",
        icon: "data",
        text: "Os dados revelam lacunas específicas e orientam aprofundamentos adicionais. Esses encontros surgem a partir do que o sistema aprende ao longo da jornada e ampliam a precisão do desenvolvimento.",
      },
    ],
  },
];

const CONTENT_LOGIC_CARDS = [
  {
    title: "Base comum",
    icon: "grid",
    text: "Os temas centrais são os mesmos para todos os grupos, o que constrói uma linguagem compartilhada sobre transformação digital na organização.",
  },
  {
    title: "Calibração por público",
    icon: "tune",
    text: "A sequência, os exemplos e os aprofundamentos mudam conforme o que o E2W identifica para comitê executivo, escritório, fábrica e força de vendas.",
  },
  {
    title: "Aplicação prática",
    icon: "spark",
    text: "Cada encontro traduz o conteúdo em decisões, rotinas e entregas concretas, com aplicação direta na operação.",
  },
];

const PROPOSAL_PRINCIPLES = [
  {
    title: "Base comum com calibração por público",
    text: "A proposta organiza uma base comum para toda a organização e calibra exemplos, casos e aprofundamentos para a realidade de cada público.",
  },
  {
    title: "Aprendizagem aplicada à operação",
    text: "Os encontros foram desenhados para gerar decisões, entregas e mudanças de rotina, com aplicação direta nas práticas de trabalho.",
  },
  {
    title: "Infraestrutura sistêmica da jornada",
    text: "A proposta incorpora uma camada sistêmica que conecta diagnóstico, acompanhamento e leitura gerencial ao longo de toda a jornada.",
  },
];

const PROPOSAL_EXECUTION_STEPS = [
  {
    title: "Validação final de escopo",
    text: "Confirmação da arquitetura, dos módulos incluídos, do recorte de públicos e das premissas que sustentam a proposta.",
  },
  {
    title: "Fechamento comercial",
    text: "Alinhamento de investimento, condições do E2W, ajustes finais de composição e decisão de aprovação da proposta.",
  },
  {
    title: "Alinhamento de cronograma",
    text: "Definição da janela de início, da cadência sugerida e dos marcos principais de ativação do programa.",
  },
  {
    title: "Kick-off da jornada",
    text: "Com a proposta aprovada, a Mastertech consolida o plano final e prepara o início oficial da jornada com a Chiesi.",
  },
];

const PROPOSAL_CALENDAR = [
  {
    phase: "2º semestre de 2026",
    title: "Workshop executivo e fechamento do desenho",
    text: "Leitura da liderança, calibração final do escopo e definição da arquitetura que orienta a jornada.",
  },
  {
    phase: "Fim de 2026",
    title: "Diagnóstico e ativação da base do programa",
    text: "Assessment, alinhamento de metas com gestores e preparação da trilha para o início da execução.",
  },
  {
    phase: "Março de 2027",
    title: "Abertura da trilha principal",
    text: "Início da jornada na convenção, com entrada coordenada dos grupos participantes.",
  },
  {
    phase: "1º semestre de 2027",
    title: "Execução, acompanhamento e ajustes",
    text: "Cadência dos encontros, leitura contínua de evolução e aprofundamentos definidos a partir do percurso.",
  },
];

const PROPOSAL_STRUCTURE_CAPABILITIES = [
  {
    layer: "Workshop executivo",
    composition: "Comitê Executivo",
    role: "Abre a jornada com leitura da liderança e definição das prioridades que orientam o programa.",
  },
  {
    layer: "Trilha principal",
    composition: "Módulos e públicos participantes",
    role: "Concentra a execução dos encontros, a aplicação prática dos conteúdos e a cadência da jornada.",
  },
  {
    layer: "E2W",
    composition: "Diagnóstico, acompanhamento e leitura gerencial",
    role: "Sustenta a leitura inicial, acompanha a evolução ao longo da jornada e transforma evidências em visibilidade gerencial.",
  },
];

function CardIcon({ type, size = "md" }) {
  const icons = {
    path: Route,
    calibrate: Crosshair,
    map: MapIcon,
    grid: LayoutGrid,
    tune: SlidersHorizontal,
    spark: Sparkles,
    refresh: RefreshCw,
    collective: UsersRound,
    data: LineChart,
  };
  const Icon = icons[type] || Route;

  return (
    <span className={`card-icon card-icon-${size}`} aria-hidden="true">
      <Icon size={28} strokeWidth={1.0} />
    </span>
  );
}

function createInitialModuleSettings() {
  return Object.fromEntries(
    MODULES.map((module) => [
      module.id,
      {
        format: "ao_vivo",
        content: "base",
        clusters: Object.fromEntries(
          Object.entries(CLUSTERS).map(([clusterId, cluster]) => [
            clusterId,
            {
              on: module.groups.includes(clusterId),
              turmas: cluster.defaultTurmas,
            },
          ])
        ),
      },
    ])
  );
}

function formatCurrency(value) {
  return `R$ ${Math.round(value).toLocaleString("pt-BR")}`;
}

function formatHours(value) {
  return `${Math.round(value)}h`;
}

function formatPerSessionBreakdown(totalHours, sessionHours) {
  if (!totalHours || !sessionHours) return "";
  const meetings = totalHours / sessionHours;
  const roundedMeetings = Number.isInteger(meetings) ? meetings : Number(meetings.toFixed(1));
  const meetingLabel = roundedMeetings === 1 ? "encontro" : "encontros";
  const sessionLabel = sessionHours === 1 ? "hora" : "horas";
  return `${roundedMeetings} ${meetingLabel} de ${sessionHours} ${sessionLabel}`;
}

function formatHoursByTurma(totalHours, turmas) {
  if (!totalHours || !turmas) return "";
  const hoursPerTurma = totalHours / turmas;
  const roundedPerTurma = Number.isInteger(hoursPerTurma)
    ? hoursPerTurma
    : Number(hoursPerTurma.toFixed(1));
  return `${roundedPerTurma}h por turma`;
}

function formatPeopleByTurma(totalPeople, turmas) {
  if (!totalPeople || !turmas) return "";
  const peoplePerTurma = totalPeople / turmas;
  return Number.isInteger(peoplePerTurma)
    ? String(peoplePerTurma)
    : peoplePerTurma.toFixed(1).replace(".", ",");
}

function getModuleSessionHours(clusterId, adminPricing) {
  return clusterId === "comite" ? adminPricing.comiteMeetingHours : 2;
}

function clampNumber(value, fallback, min, max) {
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed)) return fallback;
  return Math.max(min, Math.min(max, parsed));
}

function createInitialAdminPricing() {
  return {
    workshopHourly: PRECO_HORA_WORKSHOP,
    workshopHours: WORKSHOP_HORAS,
    workshopMeetings: WORKSHOP_ENCONTROS,
    comiteMeetingHours: COMITE_ENCONTRO_HORAS,
    ecosystemImplant: PRECO_SC_IMPL,
    ecosystemLicense: PRECO_SC_LIC,
  };
}

function createInitialAdminModuleParams() {
  return Object.fromEntries(
    MODULES.map((module) => [
      module.id,
      {
        title: module.title,
        durationHours: module.durationHours,
        hourlyRate: module.hourlyRate,
      },
    ])
  );
}

const ADMIN_STORAGE_KEY = "chiesi-proposta-admin-config";
const ADMIN_STORAGE_BACKUP_KEY = "chiesi-proposta-admin-config-backup";
const SCENARIO_STORAGE_KEY = "chiesi-proposta-scenario-config";
const SCENARIO_STORAGE_BACKUP_KEY = "chiesi-proposta-scenario-config-backup";
const STORAGE_VERSION = 2;
const PERSIST_ENDPOINT = "/__persist/chiesi-proposta-config";

function createInitialAdminState() {
  return {
    version: STORAGE_VERSION,
    clusterSizes: Object.fromEntries(
      Object.entries(CLUSTERS).map(([clusterId, cluster]) => [clusterId, cluster.defaultSize])
    ),
    adminPricing: createInitialAdminPricing(),
    adminModuleParams: createInitialAdminModuleParams(),
  };
}

function createInitialScenarioState() {
  return {
    version: STORAGE_VERSION,
    scAtivo: true,
    clusters: {
      comite: true,
      escritorio: true,
      fabrica: true,
      fv: true,
    },
    mods: {
      workshop: true,
      m1: true,
      m2: true,
      m3: true,
      m4: true,
      m5: true,
    },
    workshopTurmas: 1,
    moduleSettings: createInitialModuleSettings(),
  };
}

function mergeAdminState(defaults, parsed) {
  return {
    ...defaults,
    ...parsed,
    clusterSizes: { ...defaults.clusterSizes, ...(parsed?.clusterSizes || {}) },
    adminPricing: { ...defaults.adminPricing, ...(parsed?.adminPricing || {}) },
    adminModuleParams: { ...defaults.adminModuleParams, ...(parsed?.adminModuleParams || {}) },
  };
}

function mergeScenarioState(defaults, parsed) {
  return {
    ...defaults,
    ...parsed,
    clusters: { ...defaults.clusters, ...(parsed?.clusters || {}) },
    mods: { ...defaults.mods, ...(parsed?.mods || {}) },
    moduleSettings: { ...defaults.moduleSettings, ...(parsed?.moduleSettings || {}) },
  };
}

function loadPersistedAdminState() {
  const defaults = createInitialAdminState();
  if (typeof window === "undefined") return defaults;

  try {
    const raw =
      window.localStorage.getItem(ADMIN_STORAGE_KEY) ||
      window.localStorage.getItem(ADMIN_STORAGE_BACKUP_KEY);
    if (!raw) return defaults;
    const parsed = JSON.parse(raw);
    return mergeAdminState(defaults, parsed);
  } catch {
    return defaults;
  }
}

function loadPersistedScenarioState() {
  const defaults = createInitialScenarioState();
  if (typeof window === "undefined") return defaults;

  try {
    const raw =
      window.localStorage.getItem(SCENARIO_STORAGE_KEY) ||
      window.localStorage.getItem(SCENARIO_STORAGE_BACKUP_KEY);
    if (!raw) return defaults;
    const parsed = JSON.parse(raw);
    return mergeScenarioState(defaults, parsed);
  } catch {
    return defaults;
  }
}

function App() {
  const [persistedAdminState] = useState(() => loadPersistedAdminState());
  const [persistedScenarioState] = useState(() => loadPersistedScenarioState());
  const [adminMode] = useState(() => {
    if (typeof window === "undefined") return false;
    return new URLSearchParams(window.location.search).get("admin") === "1";
  });
  const [screen, setScreen] = useState("contexto");
  const [proposalReady, setProposalReady] = useState(false);
  const [entryMode, setEntryMode] = useState("cover");
  const [activeContextAnchor, setActiveContextAnchor] = useState(CONTEXTO_INDEX[0].id);
  const [activeMastertechAnchor, setActiveMastertechAnchor] = useState(MASTERTECH_INDEX[0].id);
  const [activeSolutionAnchor, setActiveSolutionAnchor] = useState(SOLUCAO_INDEX[0].id);
  const [activeConfigAnchor, setActiveConfigAnchor] = useState(CONFIG_INDEX[0].id);
  const [activeProposalAnchor, setActiveProposalAnchor] = useState(PROPOSAL_INDEX[0].id);
  const [activeAdminAnchor, setActiveAdminAnchor] = useState(ADMIN_INDEX[0].id);
  const [scAtivo, setScAtivo] = useState(persistedScenarioState.scAtivo);
  const [clusters, setClusters] = useState(persistedScenarioState.clusters);
  const [mods, setMods] = useState(persistedScenarioState.mods);
  const [clusterSizes, setClusterSizes] = useState(persistedAdminState.clusterSizes);
  const [workshopTurmas, setWorkshopTurmas] = useState(persistedScenarioState.workshopTurmas);
  const [moduleSettings, setModuleSettings] = useState(persistedScenarioState.moduleSettings);
  const [adminPricing, setAdminPricing] = useState(persistedAdminState.adminPricing);
  const [adminModuleParams, setAdminModuleParams] = useState(persistedAdminState.adminModuleParams);
  const [adminSavedAt, setAdminSavedAt] = useState(null);
  const [hasHydratedPersistence, setHasHydratedPersistence] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function hydrateFromFile() {
      if (typeof window === "undefined") return;

      try {
        const response = await fetch(PERSIST_ENDPOINT, {
          headers: { Accept: "application/json" },
        });
        if (!response.ok) throw new Error("Persistencia indisponivel");

        const payload = await response.json();
        if (cancelled) return;

        if (payload?.admin) {
          const mergedAdminState = mergeAdminState(createInitialAdminState(), payload.admin);
          setClusterSizes(mergedAdminState.clusterSizes);
          setAdminPricing(mergedAdminState.adminPricing);
          setAdminModuleParams(mergedAdminState.adminModuleParams);
        }

        if (payload?.scenario) {
          const mergedScenarioState = mergeScenarioState(
            createInitialScenarioState(),
            payload.scenario
          );
          setScAtivo(mergedScenarioState.scAtivo);
          setClusters(mergedScenarioState.clusters);
          setMods(mergedScenarioState.mods);
          setWorkshopTurmas(mergedScenarioState.workshopTurmas);
          setModuleSettings(mergedScenarioState.moduleSettings);
        }

        if (payload?.savedAt) {
          setAdminSavedAt(new Date(payload.savedAt));
        }
      } catch {
        // Mantem o fallback local atual quando o endpoint nao estiver disponivel.
      } finally {
        if (!cancelled) {
          setHasHydratedPersistence(true);
        }
      }
    }

    hydrateFromFile();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !hasHydratedPersistence) return;
    const nextAdminState = {
      version: STORAGE_VERSION,
      clusterSizes,
      adminPricing,
      adminModuleParams,
    };

    try {
      const serialized = JSON.stringify(nextAdminState);
      window.localStorage.setItem(ADMIN_STORAGE_KEY, serialized);
      window.localStorage.setItem(ADMIN_STORAGE_BACKUP_KEY, serialized);
    } catch (error) {
      console.warn("Nao foi possivel persistir configuracao localmente.", error);
    }
  }, [
    clusterSizes,
    adminPricing,
    adminModuleParams,
    hasHydratedPersistence,
  ]);

  useEffect(() => {
    if (typeof window === "undefined" || !hasHydratedPersistence) return;
    const nextScenarioState = {
      version: STORAGE_VERSION,
      scAtivo,
      clusters,
      mods,
      workshopTurmas,
      moduleSettings,
    };

    try {
      const serialized = JSON.stringify(nextScenarioState);
      window.localStorage.setItem(SCENARIO_STORAGE_KEY, serialized);
      window.localStorage.setItem(SCENARIO_STORAGE_BACKUP_KEY, serialized);
    } catch (error) {
      console.warn("Nao foi possivel persistir o cenario da proposta.", error);
    }
  }, [
    scAtivo,
    clusters,
    mods,
    workshopTurmas,
    moduleSettings,
    hasHydratedPersistence,
  ]);

  useEffect(() => {
    if (typeof window === "undefined" || !hasHydratedPersistence) return;

    const payload = {
      version: STORAGE_VERSION,
      savedAt: new Date().toISOString(),
      admin: {
        version: STORAGE_VERSION,
        clusterSizes,
        adminPricing,
        adminModuleParams,
      },
      scenario: {
        version: STORAGE_VERSION,
        scAtivo,
        clusters,
        mods,
        workshopTurmas,
        moduleSettings,
      },
    };

    fetch(PERSIST_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(() => {
        setAdminSavedAt(new Date(payload.savedAt));
      })
      .catch((error) => {
        console.warn("Nao foi possivel persistir configuracao em arquivo local.", error);
      });
  }, [
    scAtivo,
    clusters,
    mods,
    clusterSizes,
    workshopTurmas,
    moduleSettings,
    adminPricing,
    adminModuleParams,
    hasHydratedPersistence,
  ]);

  const activeParticipants = Object.entries(clusterSizes).reduce(
    (sum, [clusterId, size]) => sum + (clusters[clusterId] ? size : 0),
    0
  );

  const allModulesSelected = MODULES.every((module) => mods[module.id]);
  const activeModuleDefs = MODULES.filter((module) => mods[module.id]);

  let totalHours = 0;
  let totalMeetings = 0;
  const investmentLines = [];
  const summaryModules = [];
  const moduleDetails = {};

  if (mods.workshop) {
    const hours = workshopTurmas * adminPricing.workshopMeetings * adminPricing.workshopHours;
    const workshopValorPorTurma =
      adminPricing.workshopMeetings * adminPricing.workshopHours * adminPricing.workshopHourly;
    const value = workshopValorPorTurma * workshopTurmas;
    totalHours += hours;
    totalMeetings += workshopTurmas * adminPricing.workshopMeetings;
    investmentLines.push({
      name: "Workshop Comitê Executivo",
      displayName: `Workshop Comitê Executivo · ${
        adminPricing.workshopMeetings * adminPricing.workshopHours
      }h`,
      detail: `${workshopTurmas} turma(s) · ${adminPricing.workshopMeetings} encontro · ${hours}h`,
      composition: [
        `${workshopTurmas} turma(s)`,
        `${formatCurrency(workshopValorPorTurma)} por turma`,
        `${formatCurrency(value)} no total`,
      ],
      value,
    });
    summaryModules.push({
      name: "Workshop Comitê Executivo",
      detail: `${workshopTurmas * adminPricing.workshopMeetings} encontro · ${hours}h`,
    });
  }

  activeModuleDefs.forEach((module) => {
    const settings = moduleSettings[module.id];
    const clusterRows = [];
    const moduleParams = adminModuleParams[module.id];
    const moduleBaseHours = moduleParams.durationHours;
    const hourlyRate = moduleParams.hourlyRate;
    let moduleHours = 0;
    let moduleMeetings = 0;

    Object.entries(CLUSTERS).forEach(([clusterId, cluster]) => {
      const clusterConfig = settings.clusters[clusterId];
      if (!clusters[clusterId] || !clusterConfig.on) return;

      const turmas = settings.format === "ao_vivo" ? clusterConfig.turmas : 1;
      const hours = turmas * moduleBaseHours;
      const sessionHours = getModuleSessionHours(clusterId, adminPricing);
      const meetings = turmas * (moduleBaseHours / sessionHours);

      moduleHours += hours;
      moduleMeetings += meetings;
      clusterRows.push({
        cluster: cluster.label,
        clusterId,
        turmas,
        people: clusterSizes[clusterId],
        hours,
        sessionHours,
      });
    });

    if (settings.format === "gravado") {
      moduleHours = moduleBaseHours;
      moduleMeetings = ENCONTROS;
    }

    let multiplier = 1;
    if (settings.content === "customizado") multiplier += 0.2;
    let value = 0;
    let composition = [];

    if (settings.format === "gravado") {
      const valorBase = moduleBaseHours * hourlyRate;
      value = valorBase * multiplier;
      composition = [
        `${formatCurrency(hourlyRate)}/h`,
        `${formatCurrency(value)} no total`,
        ...(settings.content === "customizado"
          ? ["Inclui adicional de customização"]
          : []),
      ];
    } else {
      const valorPorTurma = moduleBaseHours * hourlyRate;
      const turmasTotais = clusterRows.reduce((sum, row) => sum + row.turmas, 0);
      const valorBase = valorPorTurma * turmasTotais;
      value = valorBase * multiplier;
      composition = [
        `${turmasTotais} turma(s)`,
        `${formatCurrency(valorPorTurma)} por turma`,
        `${formatCurrency(value)} no total`,
        ...(settings.content === "customizado"
          ? ["Inclui adicional de customização"]
          : []),
      ];
    }

    totalHours += moduleHours;
    totalMeetings += moduleMeetings;
    investmentLines.push({
      name: module.title,
      displayName: `${module.title} · ${moduleBaseHours}h`,
      detail: `${
        settings.format === "gravado"
          ? `On-demand · ${Math.round(moduleHours)}h × ${formatCurrency(hourlyRate)}`
          : `Remoto ao vivo · ${Math.round(moduleHours)}h × ${formatCurrency(hourlyRate)}`
      } · ${settings.content === "customizado" ? "Customizado" : "Base"}`,
      composition,
      value,
    });
    summaryModules.push({
      name: module.title,
      detail: `${Math.round(moduleMeetings)} encontros · ${Math.round(moduleHours)}h`,
    });
    moduleDetails[module.id] = { clusterRows, value };
  });

  if (scAtivo) {
    if (allModulesSelected) {
      investmentLines.push({
        name: ECOSYSTEM_LINE_NAME,
        detail: "Incluso nos primeiros 12 meses",
        composition: [
          "Base de implantação zerada",
          "Licenças zeradas por 12 meses",
        ],
        value: 0,
      });
    } else {
      investmentLines.push({
        name: ECOSYSTEM_LINE_NAME,
        detail: `Implantação + ${activeParticipants} licenças × 12 meses`,
        composition: [
          `Implantação da plataforma: ${formatCurrency(adminPricing.ecosystemImplant)}`,
          `${activeParticipants} licenças × ${formatCurrency(adminPricing.ecosystemLicense)}/mês`,
          `Contratação por 12 meses`,
        ],
        value: adminPricing.ecosystemImplant + activeParticipants * adminPricing.ecosystemLicense * 12,
      });
    }
  }

  const totalInvestment = investmentLines.reduce((sum, item) => sum + item.value, 0);
  const configInvestmentLines = [...investmentLines].sort((a, b) => {
    const aEco = a.name === ECOSYSTEM_LINE_NAME;
    const bEco = b.name === ECOSYSTEM_LINE_NAME;
    if (aEco && !bEco) return -1;
    if (!aEco && bEco) return 1;
    return 0;
  });
  const ecosystemLine = configInvestmentLines.find(
    (line) => line.name === ECOSYSTEM_LINE_NAME
  );
  const workshopLine = configInvestmentLines.find(
    (line) => line.name === "Workshop Comitê Executivo"
  );
  const programInvestmentLines = configInvestmentLines.filter(
    (line) => line.name !== ECOSYSTEM_LINE_NAME && line.name !== "Workshop Comitê Executivo"
  );
  const totalWeeks = Math.ceil(totalHours / 4);
  const ecosystemPartial =
    adminPricing.ecosystemImplant + activeParticipants * adminPricing.ecosystemLicense * 12;
  const activeClusterEntries = Object.entries(CLUSTERS).filter(([clusterId]) => clusters[clusterId]);
  const activeModuleCount = Object.values(mods).filter(Boolean).length;
  const proposalPrograms = [];
  const offerRows = [];
  const proposalStructureCapabilities = scAtivo
    ? [
        "Diagnóstico com alinhamento entre colaborador e liderança",
        "Leitura contínua de evolução individual e coletiva",
        "Aprofundamentos definidos a partir de lacunas reais do percurso",
        "Indicadores gerenciais nativos para acompanhar efetividade",
      ]
    : [
        "Workshop executivo para alinhar direção e prioridades",
        "Trilha principal com módulos calibrados por público",
        "Execução remota com cadência semanal de até 4 horas",
        "Leitura de avanço concentrada na operação da jornada",
      ];

  if (mods.workshop) {
    proposalPrograms.push({
      name: "Workshop Comitê Executivo",
      audiences: "Comitê Executivo",
      formatMain: "Remoto",
      formatSub: "(ao vivo)",
      content: "Diagnóstico e alinhamento da liderança",
      loadMain: `${workshopTurmas} turma(s)`,
      loadSub: `${adminPricing.workshopHours}h · ${adminPricing.workshopMeetings} encontro`,
    });
  }

  activeModuleDefs.forEach((module) => {
    const settings = moduleSettings[module.id];
    const clusterRows = moduleDetails[module.id]?.clusterRows || [];
    const allActiveAudiencesCovered =
      clusterRows.length > 0 && clusterRows.length === activeClusterEntries.length;
    const audiences = allActiveAudiencesCovered
      ? "Todos os públicos"
      : clusterRows.map((row) => row.cluster).join(" · ");
    const totalTurmas = clusterRows.reduce((sum, row) => sum + row.turmas, 0);
    const totalModuleHours = Math.round(clusterRows.reduce((sum, row) => sum + row.hours, 0));

    proposalPrograms.push({
      name: module.title,
      audiences,
      formatMain: settings.format === "gravado" ? "On-demand" : "Remoto",
      formatSub: settings.format === "gravado" ? null : "(ao vivo)",
      content: settings.content === "customizado" ? "Customizado" : "Base",
      loadMain:
        settings.format === "gravado"
          ? `${ENCONTROS} episódios`
          : `${totalTurmas} turma(s)`,
      loadSub:
        settings.format === "gravado"
          ? `${adminModuleParams[module.id].durationHours}h`
          : `${formatHoursByTurma(totalModuleHours, totalTurmas)}\n${totalModuleHours}h no total`,
    });
  });

  if (scAtivo) {
    offerRows.push({
      name: "E2W",
      audiences: "Todos os públicos",
      formatMain: "Sistema",
      formatSub: null,
      loadMain: "12 meses",
      loadSub: allModulesSelected
        ? "Incluído na contratação completa"
        : `${activeParticipants} licenças ativas`,
      pricePerTurma: null,
      value: allModulesSelected ? 0 : ecosystemPartial,
    });
  }

  if (mods.workshop) {
    offerRows.push({
      name: "Workshop Comitê Executivo",
      audiences: "Comitê Executivo",
      formatMain: "Remoto",
      formatSub: "(ao vivo)",
      loadMain: `${workshopTurmas} turma(s)`,
      loadSub: `${adminPricing.workshopHours * adminPricing.workshopMeetings}h por turma\n${workshopTurmas * adminPricing.workshopHours * adminPricing.workshopMeetings}h no total`,
      pricePerTurma:
        adminPricing.workshopHours * adminPricing.workshopMeetings * adminPricing.workshopHourly,
      value:
        investmentLines.find((line) => line.name === "Workshop Comitê Executivo")?.value ?? 0,
    });
  }

  activeModuleDefs.forEach((module) => {
    const program = proposalPrograms.find((item) => item.name === module.title);
    const investment = investmentLines.find((line) => line.name === module.title);
    const clusterRows = moduleDetails[module.id]?.clusterRows || [];
    const totalTurmas = clusterRows.reduce((sum, row) => sum + row.turmas, 0);
    if (!program || !investment) return;

    offerRows.push({
      ...program,
      pricePerTurma: totalTurmas ? investment.value / totalTurmas : null,
      value: investment.value,
    });
  });

  const proposalDate = new Date().toLocaleDateString("pt-BR");

  useEffect(() => {
    function syncEntryMode() {
      const nextMode = window.innerWidth < 900 ? "mobile-block" : "cover";
      setEntryMode((current) => {
        if (window.innerWidth < 900) return "mobile-block";
        if (current === "mobile-block") return "cover";
        return current;
      });
      if (nextMode === "mobile-block") {
        setScreen("contexto");
      }
    }

    syncEntryMode();
    window.addEventListener("resize", syncEntryMode);

    return () => window.removeEventListener("resize", syncEntryMode);
  }, []);

  useEffect(() => {
    if (screen !== "contexto") return;

    const sections = CONTEXTO_INDEX.map((item) => document.getElementById(item.id)).filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) {
          setActiveContextAnchor(visible[0].target.id);
        }
      },
      {
        rootMargin: "-120px 0px -55% 0px",
        threshold: [0.15, 0.35, 0.6],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [screen]);

  useEffect(() => {
    if (screen !== "mastertech") return;

    const sections = MASTERTECH_INDEX.map((item) => document.getElementById(item.id)).filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) {
          setActiveMastertechAnchor(visible[0].target.id);
        }
      },
      {
        rootMargin: "-120px 0px -55% 0px",
        threshold: [0.15, 0.35, 0.6],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [screen]);

  useEffect(() => {
    if (screen !== "solucao") return;

    const sections = SOLUCAO_INDEX.map((item) => document.getElementById(item.id)).filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) {
          setActiveSolutionAnchor(visible[0].target.id);
        }
      },
      {
        rootMargin: "-120px 0px -55% 0px",
        threshold: [0.15, 0.35, 0.6],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [screen]);

  useEffect(() => {
    if (screen !== "admin") return;

    const sections = ADMIN_INDEX.map((item) => document.getElementById(item.id)).filter(Boolean);
    if (!sections.length) return;

    const updateActiveAnchor = () => {
      const threshold = window.scrollY + 136;
      const current =
        sections.reduce(
          (active, section) => (section.offsetTop <= threshold ? section : active),
          sections[0]
        ) || sections[0];

      setActiveAdminAnchor(current.id);
    };

    updateActiveAnchor();
    window.addEventListener("scroll", updateActiveAnchor, { passive: true });
    window.addEventListener("resize", updateActiveAnchor);

    return () => {
      window.removeEventListener("scroll", updateActiveAnchor);
      window.removeEventListener("resize", updateActiveAnchor);
    };
  }, [screen]);

  useEffect(() => {
    if (screen !== "config") return;

    const sections = CONFIG_INDEX.map((item) => document.getElementById(item.id)).filter(Boolean);
    if (!sections.length) return;

    const updateActiveAnchor = () => {
      const threshold = window.scrollY + 136;
      const current =
        sections.reduce(
          (active, section) => (section.offsetTop <= threshold ? section : active),
          sections[0]
        ) || sections[0];

      setActiveConfigAnchor(current.id);
    };

    updateActiveAnchor();
    window.addEventListener("scroll", updateActiveAnchor, { passive: true });
    window.addEventListener("resize", updateActiveAnchor);

    return () => {
      window.removeEventListener("scroll", updateActiveAnchor);
      window.removeEventListener("resize", updateActiveAnchor);
    };
  }, [screen]);

  useEffect(() => {
    if (screen !== "proposta" || !proposalReady) return;

    const sections = PROPOSAL_INDEX.map((item) => document.getElementById(item.id)).filter(Boolean);
    if (!sections.length) return;

    const updateActiveAnchor = () => {
      const threshold = window.scrollY + 136;
      const current =
        sections.reduce(
          (active, section) => (section.offsetTop <= threshold ? section : active),
          sections[0]
        ) || sections[0];

      setActiveProposalAnchor(current.id);
    };

    updateActiveAnchor();
    window.addEventListener("scroll", updateActiveAnchor, { passive: true });
    window.addEventListener("resize", updateActiveAnchor);

    return () => {
      window.removeEventListener("scroll", updateActiveAnchor);
      window.removeEventListener("resize", updateActiveAnchor);
    };
  }, [screen, proposalReady]);
  function updateClusterSize(clusterId, value) {
    const cluster = CLUSTERS[clusterId];
    setClusterSizes((current) => ({
      ...current,
      [clusterId]: clampNumber(value, current[clusterId], cluster.min, cluster.max),
    }));
  }

  function updateWorkshopTurmas(value) {
    setWorkshopTurmas((current) => clampNumber(value, current, 1, 4));
  }

  function updateModuleSetting(moduleId, recipe) {
    setModuleSettings((current) => ({
      ...current,
      [moduleId]: recipe(current[moduleId]),
    }));
  }

  function updateAdminPricing(field, value, min = 1, max = 999999) {
    setAdminPricing((current) => ({
      ...current,
      [field]: clampNumber(value, current[field], min, max),
    }));
  }

  function updateAdminModuleParam(moduleId, field, value, min = 1, max = 999999) {
    setAdminModuleParams((current) => ({
      ...current,
      [moduleId]: {
        ...current[moduleId],
        [field]: clampNumber(value, current[moduleId][field], min, max),
      },
    }));
  }

  function goToProposal() {
    setProposalReady(true);
    setScreen("proposta");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openProposalTab() {
    if (!proposalReady) {
      setProposalReady(true);
    }
    setScreen("proposta");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function printProposal() {
    if (typeof window === "undefined" || !proposalReady) return;
    window.print();
  }

  function showScreen(nextScreen) {
    setScreen(nextScreen);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function enterExperience() {
    setEntryMode("app");
    setScreen("contexto");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      {entryMode === "cover" ? (
        <section className="cover">
          <div className="cover-grid"></div>
          <div className="cover-inner">
            <div className="cover-title">Chiesi</div>
            <div className="cover-subtitle">
              Programa de Transformação Digital e Gestão da Mudança
            </div>
            <button className="cover-enter" onClick={enterExperience} aria-label="Entrar na proposta">
              <span className="cover-enter-shaft"></span>
              <span className="cover-enter-head"></span>
            </button>
          </div>
          <div className="cover-foot">Mastertech x Chiesi Brasil</div>
        </section>
      ) : null}

      {entryMode === "mobile-block" ? (
        <section className="mobile-block">
          <div className="cover-grid"></div>
          <div className="mobile-block-inner">
            <div className="mobile-block-title">Esta proposta foi desenhada para desktop</div>
            <div className="mobile-block-text">
              Abra esta proposta em um computador para a melhor leitura.
            </div>
          </div>
          <div className="cover-foot">Mastertech x Chiesi Brasil</div>
        </section>
      ) : null}

      {entryMode === "app" ? (
        <>
      <nav className="nav">
        <div className="nav-tabs">
          <button className={`nav-tab ${screen === "contexto" ? "active" : ""}`} onClick={() => showScreen("contexto")}>
            CONTEXTO
          </button>
          <button className={`nav-tab ${screen === "mastertech" ? "active" : ""}`} onClick={() => showScreen("mastertech")}>
            MASTERTECH
          </button>
          <button className={`nav-tab ${screen === "solucao" ? "active" : ""}`} onClick={() => showScreen("solucao")}>
            DESENHO DA SOLUÇÃO
          </button>
          <button className={`nav-tab ${screen === "config" ? "active" : ""}`} onClick={() => showScreen("config")}>
            PERSONALIZAR PROPOSTA
          </button>
          <button
            className={`nav-tab ${screen === "proposta" ? "active" : ""}`}
            onClick={openProposalTab}
          >
            VER PROPOSTA
          </button>
          {adminMode ? (
            <button className={`nav-tab ${screen === "admin" ? "active" : ""}`} onClick={() => showScreen("admin")}>
              PARAMETROS
            </button>
          ) : null}
        </div>
        <div className="nav-brand">Mastertech</div>
      </nav>

      <section id="tela-contexto" className={`screen ${screen === "contexto" ? "active" : ""}`}>
        <div className="hero">
          <div className="hero-grid"></div>
          <div className="hero-inner">
            <h1 className="hero-title">Visão geral</h1>
            <p className="hero-sub">
              O que identificamos sobre a organização, os públicos e o escopo do programa.
            </p>
          </div>
        </div>

        <div className="editorial-layout">
          <aside className="section-index" aria-label="Índice da seção">
            <div className="section-index-kicker">Nesta seção</div>
            {CONTEXTO_INDEX.map((item) => (
              <a
                className={`section-index-link ${activeContextAnchor === item.id ? "active" : ""}`}
                href={`#${item.id}`}
                key={item.id}
                onClick={() => setActiveContextAnchor(item.id)}
              >
                {item.label}
              </a>
            ))}
          </aside>

          <div className="editorial-main">
            <section className="section section-anchor" id="contexto-organizacao">
              <div className="section-label">{CONTEXTO[0].label}</div>
              <h2 className="section-title">{CONTEXTO[0].title}</h2>
              <div className="section-body">
                {CONTEXTO[0].paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>

            <section className="section section-anchor" id="contexto-grupos">
              <div className="section-label">Abrangência</div>
              <h2 className="section-title">Públicos participantes</h2>
              <div className="section-body">
                <p>
                  Cada grupo traz perguntas diferentes para o tema da transformação digital.
                  Essa variação pede uma arquitetura calibrada por público e sustenta uma jornada
                  com linguagem comum e aplicações específicas.
                </p>
              </div>
              <div className="num-grid">
                {Object.entries(CLUSTERS).map(([clusterId, cluster]) => (
                  <div className="num-item" key={cluster.label}>
                    <div className="num-text">
                      <strong>{cluster.label}</strong>
                      <div className="num-meta">{clusterSizes[clusterId]} colaboradores</div>
                      {cluster.context}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {CONTEXTO.slice(1).map((section) => {
              const sectionId =
                section.title === "Expectativas e recomendações da Chiesi"
                  ? "contexto-objetivo"
                  : section.title === "O briefing informado"
                    ? "contexto-escopo"
                    : undefined;

              return (
                <section className="section section-anchor" key={section.title} id={sectionId}>
                  <div className="section-label">{section.label}</div>
                  <h2 className="section-title">{section.title}</h2>
                  {sectionId === "contexto-escopo" ? (
                    <>
                      <div className="section-body">
                        <p>O briefing define cinco entregáveis e um timing.</p>
                      </div>
                      <div className="brief-grid">
                        <div className="brief-panel">
                          <div className="brief-panel-label">Entregáveis</div>
                          <div className="brief-list">
                            {BRIEFING_ENTREGAVEIS.map((item, index) => (
                              <div className="brief-item" key={item}>
                                <div className="brief-item-num">{index + 1}</div>
                                <div className="brief-item-text">{item}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="brief-panel brief-panel-timing">
                          <div className="brief-panel-label">Timing</div>
                          <div className="brief-timing">
                            {BRIEFING_TIMING.map((item) => (
                              <div className="brief-timing-item" key={item}>
                                {item}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : sectionId === "contexto-objetivo" ? (
                    <div className="context-objectives">
                      {CONTEXTO_OBJECTIVES.map((item) => (
                        <div className="context-objective-row" key={item.title}>
                          <div className="context-objective-title">{item.title}</div>
                          <div className="context-objective-content">
                            <div className="context-objective-text">{item.text}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="section-body">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  )}
                  {sectionId === "contexto-escopo" ? (
                    <div className="cta-row">
                      <button className="btn-cta" onClick={() => showScreen("mastertech")}>
                        Ver a Mastertech →
                      </button>
                    </div>
                  ) : null}
                </section>
              );
            })}
          </div>
        </div>
      </section>

      <section id="tela-mastertech" className={`screen ${screen === "mastertech" ? "active" : ""}`}>
        <div className="hero">
          <div className="hero-grid"></div>
          <div className="hero-inner">
            <h1 className="hero-title">Quem é a Mastertech</h1>
            <p className="hero-sub">
              Dez anos de atuação em educação corporativa, transformação digital, inovação e cultura ágil.
            </p>
          </div>
        </div>

        <div className="editorial-layout">
          <aside className="section-index" aria-label="Índice da seção">
            <div className="section-index-kicker">Nesta seção</div>
            {MASTERTECH_INDEX.map((item) => (
              <a
                className={`section-index-link ${activeMastertechAnchor === item.id ? "active" : ""}`}
                href={`#${item.id}`}
                key={item.id}
                onClick={() => setActiveMastertechAnchor(item.id)}
              >
                {item.label}
              </a>
            ))}
          </aside>

          <div className="editorial-main">
            <section className="section section-anchor" id="mastertech-visao">
              <div className="section-label">Quem somos</div>
              <h2 className="section-title">Uma escola que flui</h2>
              <div className="section-body">
                <p>
                  Fundada em 2015, a Mastertech é uma empresa de educação especializada em transformação digital,
                  inovação e cultura ágil. Ao longo de dez anos, consolidou uma atuação corporativa que combina
                  diagnóstico, desenho de soluções e execução aplicada à realidade de cada organização.
                </p>
              </div>
              <div className="mastertech-stats-grid">
                {MASTERTECH_STATS.map((item) => (
                  <div className="mastertech-stat-card" key={item.label}>
                    <div className="mastertech-stat-label">{item.label}</div>
                    <div className="mastertech-stat-value">{item.value}</div>
                    <p className="mastertech-stat-text">{item.text}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="section section-anchor" id="mastertech-jornada">
              <div className="section-label">Como evoluímos</div>
              <h2 className="section-title">Da base técnica à operação consultiva e de produto</h2>
              <div className="mastertech-timeline">
                {MASTERTECH_TIMELINE.map((item) => (
                  <div className="mastertech-timeline-item" key={item.title}>
                    <div className="mastertech-timeline-phase">{item.phase}</div>
                    <div className="mastertech-timeline-title">{item.title}</div>
                    <p className="mastertech-timeline-text">{item.text}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="section section-anchor" id="mastertech-metodo">
              <div className="section-label">Como atuamos</div>
              <h2 className="section-title">Três pilares organizam a forma de trabalhar da Mastertech</h2>
              <div className="follow-flow mastertech-pillars-flow">
                {MASTERTECH_PILLARS.map((item) => (
                  <div className="follow-step mastertech-pillar-card" key={item.title}>
                    <CardIcon type={item.icon} size="lg" />
                    <div className="follow-step-head">
                      <div className="follow-kicker">{item.title}</div>
                    </div>
                    <p>{item.text}</p>
                  </div>
                ))}
              </div>
              <div className="content-logic-note">
                <div className="content-logic-note-label">Nesta proposta</div>
                <p className="content-logic-note-text">
                  O que está sendo oferecido à Chiesi concentra principalmente os dois primeiros pilares:
                  o diagnóstico de contexto e o eixo central de desenvolvimento da solução.
                </p>
              </div>
            </section>

            <section className="section section-anchor" id="mastertech-farma">
              <div className="section-label">Credenciais</div>
              <h2 className="section-title">Clientes corporativos e experiência farmacêutica</h2>
              <div className="section-body">
                <p>
                  Ao longo da última década, a Mastertech atendeu mais de 200 clientes corporativos de diferentes
                  portes e setores. Entre as relações construídas nesse percurso estão projetos em serviços
                  financeiros, consumo, tecnologia, indústria, mídia e educação, além de uma presença recorrente
                  no setor farmacêutico.
                </p>
              </div>
              <div className="brief-grid">
                <div className="brief-panel">
                  <div className="brief-panel-label">Alguns dos nossos clientes corporativos</div>
                  <p className="mastertech-client-line">
                    {MASTERTECH_CLIENTS.map((client, index) => (
                      <span className="mastertech-client-inline" key={client}>
                        {client}
                        {index < MASTERTECH_CLIENTS.length - 1 ? " · " : ""}
                      </span>
                    ))}
                  </p>
                </div>
                <div className="brief-panel brief-panel-timing">
                  <div className="brief-panel-label">Leitura do portfólio</div>
                  <div className="brief-timing">
                    <div className="brief-timing-item">
                      Atuação em programas corporativos de diferentes portes, formatos e graus de profundidade.
                    </div>
                    <div className="brief-timing-item">
                      Experiência em transformação digital, inovação, dados, agilidade, comunicação e criação de produtos.
                    </div>
                    <div className="brief-timing-item">
                      Repertório aplicado tanto em formação quanto em desenho consultivo de soluções.
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-logic-note mastertech-pharma-band">
                <div className="content-logic-note-label">Setor farmacêutico</div>
                <p className="content-logic-note-text">
                  Dentro desse histórico, a Mastertech acumulou experiências específicas com Bayer, Roche,
                  Daiichi Sankyo, Novo Nordisk e Amgen, o que amplia o repertório para atuar em um setor
                  regulado, técnico e sensível à dinâmica comercial.
                </p>
              </div>
              <div className="card-grid">
                {MASTERTECH_PHARMA_CASES.map((item) => (
                  <div className="card" key={item.client}>
                    <div className="card-label">Farmacêutico</div>
                    <div className="card-title">{item.client}</div>
                    <div className="card-items">
                      <span className="card-item">
                        <span className="card-item-mark"></span>
                        <span className="card-item-text">{item.text}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="cta-row">
                <button className="btn-cta" onClick={() => showScreen("solucao")}>
                  Ver a solução →
                </button>
              </div>
            </section>
          </div>
        </div>
      </section>

      <section id="tela-solucao" className={`screen ${screen === "solucao" ? "active" : ""}`}>
        <div className="hero">
          <div className="hero-grid"></div>
          <div className="hero-inner">
            <h1 className="hero-title">A abordagem da Mastertech</h1>
            <p className="hero-sub">
              Diagnóstico, conteúdos, acompanhamento e leitura gerencial orientados pelo E2W, sistema proprietário da Mastertech.
            </p>
          </div>
        </div>

        <div className="editorial-layout">
          <aside className="section-index" aria-label="Índice da seção">
            <div className="section-index-kicker">Nesta seção</div>
            {SOLUCAO_INDEX.map((item) => (
              <a
                className={`section-index-link ${activeSolutionAnchor === item.id ? "active" : ""}`}
                href={`#${item.id}`}
                key={item.id}
                onClick={() => setActiveSolutionAnchor(item.id)}
              >
                {item.label}
              </a>
            ))}
          </aside>

          <div className="editorial-main">
            <section className="section section-anchor" id="solucao-diagnostico">
              <div className="section-label">{SOLUCAO[0].label}</div>
              <h2 className="section-title">{SOLUCAO[0].title}</h2>
              <div className="diagnostic-system">
                <div className="diagnostic-system-label">{SOLUCAO[0].systemIntro.label}</div>
                <div className="diagnostic-system-body">
                  <h3 className="diagnostic-system-title">{SOLUCAO[0].systemIntro.title}</h3>
                  <p className="diagnostic-system-text">{SOLUCAO[0].systemIntro.text}</p>
                </div>
              </div>
              <div className="diagnostic-grid">
                {SOLUCAO[0].blocks.map((block) => (
                  <div className="diagnostic-card" key={block.label}>
                    <CardIcon type={block.icon} />
                    <div className="diagnostic-card-label">{block.label}</div>
                    <p className="diagnostic-card-lead">{block.lead}</p>
                    <div className="diagnostic-card-stack">
                      {block.items.map((item) => (
                        <div className="diagnostic-card-item" key={`${block.label}-${item.title}`}>
                          <div className="diagnostic-card-item-title">{item.title}</div>
                          <p className="diagnostic-card-item-text">{item.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="section section-anchor" id="solucao-conteudos">
              <div className="section-label">Organização da trilha</div>
              <h2 className="section-title">O desenvolvimento do programa</h2>
              <div className="section-body">
                <p className="editorial-caput">
                  O programa combina uma base comum para toda a organização com calibração
                  específica por público. O E2W organiza essa ponte entre prioridade institucional
                  e realidade de cada grupo.
                </p>
              </div>
              <div className="content-logic-grid">
                {CONTENT_LOGIC_CARDS.map((card) => (
                  <div className="content-logic-card" key={card.title}>
                    <CardIcon type={card.icon} />
                    <div className="content-logic-title">{card.title}</div>
                    <p className="content-logic-text">{card.text}</p>
                  </div>
                ))}
              </div>
              <div className="content-logic-note">
                <div className="content-logic-note-label">Como acontece</div>
                <p className="content-logic-note-text">
                  Cada grupo percorre 6 encontros, majoritariamente práticos, em formato remoto
                  ao vivo e com carga calibrada por módulo, sempre com entrega ao final de cada etapa.
                </p>
              </div>
              <div className="matrix-intro">
                <div className="matrix-intro-label">Leitura comparativa</div>
                <p className="matrix-intro-text">
                  A matriz abaixo mostra como essa base comum se desdobra por público. O
                  conteúdo central percorre todos os grupos e a ênfase de cada trilha responde
                  às lacunas prioritárias de cada contexto.
                </p>
              </div>
              <div className="group-matrix-shell">
                <table className="group-matrix-table">
                  <colgroup>
                    <col className="group-matrix-col group-matrix-col-criterion" />
                    <col className="group-matrix-col group-matrix-col-group" />
                    <col className="group-matrix-col group-matrix-col-group" />
                    <col className="group-matrix-col group-matrix-col-group" />
                    <col className="group-matrix-col group-matrix-col-group" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th className="group-matrix-corner">Critério</th>
                      {Object.values(CLUSTERS).map((cluster) => (
                        <th className="group-matrix-colhead" key={`head-${cluster.label}`}>
                          {cluster.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th className="group-matrix-rowlabel">Ênfase dos encontros</th>
                      {Object.values(CLUSTERS).map((cluster) => (
                        <td className="group-matrix-cell" key={`focus-${cluster.label}`}>
                          {cluster.focus}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th className="group-matrix-rowlabel">Aprofundamento orientado por</th>
                      {Object.values(CLUSTERS).map((cluster) => (
                        <td className="group-matrix-cell" key={`deepening-${cluster.label}`}>
                          {cluster.deepening}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="section section-anchor" id="solucao-acompanhamento">
              <div className="section-label">{SOLUCAO[1].label}</div>
              <h2 className="section-title">{SOLUCAO[1].title}</h2>
              <div className="section-body section-body-wide">
                <p className="editorial-caput">{SOLUCAO[1].intro}</p>
                <div className="follow-flow">
                  {SOLUCAO[1].streams.map((stream) => (
                    <div className="follow-step" key={stream.title}>
                      <CardIcon type={stream.icon} size="lg" />
                      <div className="follow-step-head">
                        <div className="follow-kicker">{stream.title}</div>
                      </div>
                      <p>{stream.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="section section-anchor" id="solucao-gestao">
              <div className="section-label">Gestão</div>
              <h2 className="section-title">Visão gerencial do geral ao específico</h2>
              <div className="section-body">
                <p>
                  A Chiesi passa a ter acesso a uma leitura gerencial contínua do programa em
                  quatro níveis: individual, por grupo, do programa e institucional. Os
                  indicadores existem desde o início como dado nativo do E2W e sustentam uma
                  leitura contínua da evolução da jornada.
                </p>
              </div>
              <div className="card-grid">
                {[
                  ["Individual", "Cada colaborador", ["Mapa de competências atualizado", "Metas acordadas com a liderança", "Status do plano de desenvolvimento", "Evolução ao longo do programa"]],
                  ["Por grupo", "Cada grupo", ["Distribuição de maturidade no grupo", "Gaps coletivos prioritários", "Evolução desde o início do programa", "Comparação entre grupos"]],
                  ["Do programa", "Os encontros", ["Progresso por encontro e grupo", "Variação de maturidade por etapa", "Indicadores de mudança comportamental", "Base para ajustes em tempo real"]],
                  ["Institucional", "A organização", ["Visão consolidada do capital humano", "Distribuição de competências por área", "Evolução trimestral", "Base para decisões de continuidade"]],
                ].map(([label, title, items]) => (
                  <div className="card" key={title}>
                    <div className="card-label">{label}</div>
                    <div className="card-title">{title}</div>
                    <div className="card-items">
                      {items.map((item) => (
                        <span className="card-item" key={item}>
                          <span className="card-item-mark"></span>
                          <span className="card-item-text">{item}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="cta-row">
                <button className="btn-cta" onClick={() => showScreen("config")}>
                  Personalizar proposta →
                </button>
              </div>
            </section>
          </div>
        </div>
      </section>

      <section id="tela-config" className={`screen ${screen === "config" ? "active" : ""}`}>
        <div className="hero">
          <div className="hero-grid"></div>
          <div className="hero-inner">
            <h1 className="hero-title">Definições da jornada</h1>
            <p className="hero-sub">
              Defina públicos, módulos, formato e conteúdo. O investimento é calculado em tempo real.
            </p>
          </div>
        </div>

        <div className="config-layout">
          <aside className="section-index" aria-label="Índice da seção">
            <div className="section-index-kicker">Nesta seção</div>
            {CONFIG_INDEX.map((item) => (
              <a
                className={`section-index-link ${activeConfigAnchor === item.id ? "active" : ""}`}
                href={`#${item.id}`}
                key={item.id}
                onClick={() => setActiveConfigAnchor(item.id)}
              >
                {item.label}
              </a>
            ))}
          </aside>

        <div className="config-wrap">
          <div className="config-left">
            <div className="block section-anchor" id="config-publicos">
              <div className="block-label">Abrangência</div>
              <div className="block-title">Áreas e pessoas</div>
              <div className="block-desc">
                Selecione os grupos participantes e informe o número de pessoas em cada um.
              </div>
              <div className="clusters-grid">
                {Object.entries(CLUSTERS).map(([clusterId, cluster]) => (
                  <div
                    className={`cluster-card ${clusters[clusterId] ? "active" : ""}`}
                    key={clusterId}
                    onClick={() =>
                      setClusters((current) => ({
                        ...current,
                        [clusterId]: !current[clusterId],
                      }))
                    }
                  >
                    <div className="cluster-toggle"></div>
                    <div className="cluster-tag">{cluster.tag}</div>
                    <div className="cluster-name">{cluster.label}</div>
                    <div className="num-row">
                      <div className="num-label">Participantes</div>
                      <input
                        className="num-input"
                        type="number"
                        min={cluster.min}
                        max={cluster.max}
                        value={clusterSizes[clusterId]}
                        onClick={(event) => event.stopPropagation()}
                        onChange={(event) => updateClusterSize(clusterId, event.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="divider"></div>

            <div className="block">
              <div className="block-label">Estrutura da proposta</div>
              <div className="block-title">As partes da proposta</div>
              <div className="block-desc">
                Habilite os módulos e configure formato, conteúdo e turmas por grupo.
              </div>

              <div className="sep section-anchor" id="config-e2w">
                <div className="sep-label">E2W</div>
              </div>
              <div className={`eco-card ${scAtivo ? "active" : ""}`}>
                <div className="eco-header" onClick={() => setScAtivo((current) => !current)}>
                  <div className="eco-toggle"></div>
                  <div className="eco-header-left">
                    <div className="eco-tag">Sistema</div>
                    <div className="eco-name">
                      Sistema de desenvolvimento de competências
                    </div>
                  </div>
                </div>
                <div className="eco-body">
                  <div className="eco-conds">
                    <div className="eco-cond on">
                      <div className="eco-cond-main">
                        <div className="eco-cond-top">
                          <div>
                            <div className="eco-cond-name">Base de contratação do E2W</div>
                          </div>
                          <div className="eco-cond-side">
                            <div className={`eco-cond-val ${allModulesSelected ? "crossed" : ""}`}>
                              {formatCurrency(ecosystemPartial)}
                            </div>
                            <div className="eco-cond-subval">
                              {allModulesSelected ? "zerado no programa completo" : "valor aplicável na configuração atual"}
                            </div>
                          </div>
                        </div>
                        <div className="eco-cond-breakdown">
                          <div className="eco-cond-line">
                            <span className="eco-cond-line-label">Implantação</span>
                            <span className="eco-cond-line-text">
                              {formatCurrency(adminPricing.ecosystemImplant)}, em parcela única
                            </span>
                          </div>
                          <div className="eco-cond-line">
                            <span className="eco-cond-line-label">Licenças</span>
                            <span className="eco-cond-line-text">
                              {activeParticipants} pessoas × {formatCurrency(adminPricing.ecosystemLicense)} por mês
                            </span>
                          </div>
                          <div className="eco-cond-line">
                            <span className="eco-cond-line-label">Vigência</span>
                            <span className="eco-cond-line-text">12 meses de uso do sistema</span>
                          </div>
                        </div>
                        <div className="eco-note eco-note-inline">
                          {allModulesSelected
                            ? "Quando todos os módulos são contratados, essa base de cobrança é zerada e o E2W fica incluso por 12 meses."
                            : "Ao contratar todos os módulos, esse valor é zerado e o E2W fica incluso por 12 meses."}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="sep section-anchor" id="config-workshop" style={{ marginTop: 20 }}>
                <div className="sep-label">Kick-off</div>
              </div>
              <div className={`mod-card ${mods.workshop ? "active" : ""}`}>
                <div
                  className="mod-header"
                  onClick={() =>
                    setMods((current) => ({ ...current, workshop: !current.workshop }))
                  }
                >
                  <div className="mod-toggle"></div>
                  <div className="mod-info">
                    <div className="mod-num">Entregável · Comitê Executivo</div>
                    <div className="mod-title">Workshop Comitê Executivo</div>
                    <div className="mod-sub">
                      Leitura da maturidade da liderança e alinhamento das diretrizes que orientam o programa.
                    </div>
                  </div>
                </div>
                <div className="mod-body">
                  <div className="mod-table">
                    <div className="mod-table-head">
                      <span>Grupo</span>
                      <span>Pessoas</span>
                      <span>Turmas</span>
                      <span>Pessoas/turma</span>
                      <span>Horas</span>
                    </div>
                    <div className={`mod-table-row ${clusters.comite ? "" : "off"}`}>
                      <span>Comitê Executivo</span>
                      <span>{clusters.comite ? clusterSizes.comite : "N/A"}</span>
                      <span>
                        {clusters.comite ? (
                          <span className="mod-cell-stack">
                            <input
                              className="t-input"
                              type="number"
                              min="1"
                              max="4"
                              value={workshopTurmas}
                              onChange={(event) => updateWorkshopTurmas(event.target.value)}
                            />
                          </span>
                        ) : (
                          "N/A"
                        )}
                      </span>
                      <span>
                        {clusters.comite ? (
                          <span className="mod-people-inline">
                            <span>{formatPeopleByTurma(clusterSizes.comite, workshopTurmas)}</span>
                          </span>
                        ) : (
                          "N/A"
                        )}
                      </span>
                      <span>
                        {clusters.comite ? (
                          <span className="mod-hours-inline">
                            <span>{`${workshopTurmas * adminPricing.workshopMeetings * adminPricing.workshopHours}h`}</span>
                            <span className="mod-hours-detail">
                              {formatPerSessionBreakdown(
                                workshopTurmas * adminPricing.workshopMeetings * adminPricing.workshopHours,
                                adminPricing.workshopHours
                              )}
                            </span>
                          </span>
                        ) : (
                          "N/A"
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="sep section-anchor" id="config-programas" style={{ marginTop: 20 }}>
                <div className="sep-label">Programa</div>
              </div>
              <div className="pedagogy">
                <div className="pedagogy-label">Os pilares de conteúdo</div>
                <p>
                  Os temas são os mesmos para todos os grupos, com sequência e exemplos
                  calibrados para a realidade de cada um.
                </p>
              </div>
              <div className="mods-list">
                {MODULES.map((module) => {
                  const settings = moduleSettings[module.id];
                  const moduleParams = adminModuleParams[module.id];
                  const activeGroups = Object.entries(CLUSTERS).filter(
                    ([clusterId]) => clusters[clusterId] && settings.clusters[clusterId].on
                  );

                  return (
                    <div className={`mod-card ${mods[module.id] ? "active" : ""}`} key={module.id}>
                      <div
                        className="mod-header"
                        onClick={() =>
                          setMods((current) => ({
                            ...current,
                            [module.id]: !current[module.id],
                          }))
                        }
                      >
                        <div className="mod-toggle"></div>
                        <div className="mod-info">
                          <div className="mod-num">
                            Módulo {module.num}
                            {module.optional ? <span className="opt-tag">opcional</span> : null}
                          </div>
                          <div className="mod-title">{module.title}</div>
                          <div className="mod-sub">{module.subtitle}</div>
                          <div className="mod-structure">{moduleParams.durationHours}h por turma</div>
                        </div>
                      </div>

                      <div className="mod-body">
                        <div className="mod-opts-row">
                          <div className="mod-opt-group">
                            <div className="mod-opt-label">Conteúdo</div>
                            <div className="mod-opt-btns">
                              <label className={`opt-btn ${settings.content === "base" ? "sel" : ""}`}>
                                <input
                                  type="radio"
                                  checked={settings.content === "base"}
                                  onChange={() =>
                                    updateModuleSetting(module.id, (current) => ({
                                      ...current,
                                      content: "base",
                                    }))
                                  }
                                />
                                Base
                              </label>
                              <label
                                className={`opt-btn ${settings.content === "customizado" ? "sel" : ""}`}
                              >
                                <input
                                  type="radio"
                                  checked={settings.content === "customizado"}
                                  onChange={() =>
                                    updateModuleSetting(module.id, (current) => ({
                                      ...current,
                                      content: "customizado",
                                    }))
                                  }
                                />
                                Customizado <span className="opt-btn-tag">+20%</span>
                              </label>
                            </div>
                            <div className="opt-legend">
                              {settings.content === "base"
                                ? "Mesmo conteúdo para todos os grupos, com a mesma estrutura, os mesmos materiais e a mesma narrativa de aprendizagem."
                                : (
                                  <>
                                    Conteúdo adaptado para cada grupo, com linguagem, exemplos e
                                    casos ajustados ao contexto de cada público.{" "}
                                    <strong>Esse formato adiciona 20% ao valor do módulo.</strong>
                                  </>
                                )}
                            </div>
                          </div>

                          <div className="mod-opt-group">
                            <div className="mod-opt-label">Formato</div>
                            <div className="mod-opt-btns">
                              <label className={`opt-btn ${settings.format === "ao_vivo" ? "sel" : ""}`}>
                                <input
                                  type="radio"
                                  checked={settings.format === "ao_vivo"}
                                  onChange={() =>
                                    updateModuleSetting(module.id, (current) => ({
                                      ...current,
                                      format: "ao_vivo",
                                    }))
                                  }
                                />
                                Remoto ao vivo
                              </label>
                              <label className={`opt-btn ${settings.format === "gravado" ? "sel" : ""}`}>
                                <input
                                  type="radio"
                                  checked={settings.format === "gravado"}
                                  onChange={() =>
                                    updateModuleSetting(module.id, (current) => ({
                                      ...current,
                                      format: "gravado",
                                    }))
                                  }
                                />
                                On-demand <span className="opt-btn-tag">{formatCurrency(moduleParams.hourlyRate)}/h</span>
                              </label>
                            </div>
                            <div className="opt-legend">
                              {settings.format === "ao_vivo"
                                ? "Sessões síncronas remotas, com facilitação ao vivo e interação entre participantes. Requer definição de turmas por grupo."
                                : "Conteúdos gravados para disponibilização em LMS interno. Produção única para todos, incluindo roteiro, gravação e edição."}
                            </div>
                          </div>
                        </div>

                        {settings.format === "gravado" ? (
                          <div className="gravado-resumo">
                            <div className="gr-item">
                              <div className="gr-val">
                                {activeGroups.reduce(
                                  (sum, [clusterId]) => sum + clusterSizes[clusterId],
                                  0
                                )}
                              </div>
                              <div className="gr-label">pessoas</div>
                            </div>
                            <div className="gr-item">
                              <div className="gr-val">{moduleParams.durationHours}h</div>
                              <div className="gr-label">produção</div>
                            </div>
                            <div className="gr-item">
                              <div className="gr-val">{ENCONTROS}</div>
                              <div className="gr-label">encontros</div>
                            </div>
                          </div>
                        ) : (
                          <div className="mod-table">
                            <div className="mod-table-head">
                              <span>Grupo</span>
                              <span>Pessoas</span>
                              <span>Turmas</span>
                              <span>Pessoas/turma</span>
                              <span>Horas</span>
                            </div>

                            {Object.entries(CLUSTERS).map(([clusterId, cluster]) => {
                              const clusterConfig = settings.clusters[clusterId];
                              const on = clusters[clusterId] && clusterConfig.on;

                              return (
                                <div className={`mod-table-row ${on ? "" : "off"}`} key={`${module.id}-${clusterId}`}>
                                  <span>
                                    <label className="t-check">
                                      <input
                                        type="checkbox"
                                        checked={clusterConfig.on}
                                        onChange={(event) =>
                                          updateModuleSetting(module.id, (current) => ({
                                            ...current,
                                            clusters: {
                                              ...current.clusters,
                                              [clusterId]: {
                                                ...current.clusters[clusterId],
                                                on: event.target.checked,
                                              },
                                            },
                                          }))
                                        }
                                      />
                                      {cluster.label}
                                    </label>
                                  </span>
                                  <span>{on ? clusterSizes[clusterId] : "N/A"}</span>
                                  <span>
                                    {on ? (
                                      <span className="mod-cell-stack">
                                        <input
                                          className="t-input"
                                          type="number"
                                          min="1"
                                          max="20"
                                          value={clusterConfig.turmas}
                                          onChange={(event) =>
                                            updateModuleSetting(module.id, (current) => ({
                                              ...current,
                                              clusters: {
                                                ...current.clusters,
                                                [clusterId]: {
                                                  ...current.clusters[clusterId],
                                                  turmas: clampNumber(
                                                    event.target.value,
                                                    current.clusters[clusterId].turmas,
                                                    1,
                                                    20
                                                  ),
                                                },
                                              },
                                            }))
                                          }
                                        />
                                      </span>
                                    ) : (
                                      "N/A"
                                    )}
                              </span>
                              <span>
                                {on ? (
                                  <span className="mod-people-inline">
                                    <span>{formatPeopleByTurma(clusterSizes[clusterId], clusterConfig.turmas)}</span>
                                  </span>
                                ) : (
                                  "N/A"
                                )}
                              </span>
                              <span>
                                {on ? (
                                  <span className="mod-hours-inline">
                                    <span>{`${clusterConfig.turmas * moduleParams.durationHours}h`}</span>
                                    <span className="mod-hours-detail">
                                      {formatPerSessionBreakdown(
                                        clusterConfig.turmas * moduleParams.durationHours,
                                        getModuleSessionHours(clusterId, adminPricing)
                                      )}
                                    </span>
                                  </span>
                                ) : (
                                  "N/A"
                                )}
                              </span>
                            </div>
                          );
                        })}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="cta-row">
                <button className="btn-cta" onClick={goToProposal}>
                  Gerar proposta →
                </button>
              </div>
            </div>
          </div>

          <aside className="config-right">
            <div className="right-panel-body">
              <div className="right-panel-summary">
                <div className="right-panel-title right-panel-title-inline">Resumo da configuração</div>
                <div className="right-top">
                  <div className="right-label">Investimento total estimado</div>
                  <div className="right-total">
                    {formatCurrency(totalInvestment)} <span></span>
                  </div>
                  <div className="right-stats">
                    <div className="right-stat">
                      <span className="rs-val">{activeParticipants}</span>
                      <span className="rs-lbl">pessoas</span>
                    </div>
                    <div className="right-stat">
                      <span className="rs-val">{Math.round(totalHours)}h</span>
                      <span className="rs-lbl">horas</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="right-invest">
                <div className="right-invest-title">Precificação</div>
                {investmentLines.length === 0 ? (
                  <div className="invest-line">
                    <div className="il-name">Nenhum módulo selecionado</div>
                    <div className="il-val">N/A</div>
                  </div>
                ) : (
                  <>
                    {ecosystemLine ? (
                      <div className="invest-section">
                        <div className="invest-section-label">Parte 1</div>
                        <div className="invest-section-title">Sistema de gestão de capital humano</div>
                        <div className="invest-line invest-line-eco" key={`${ecosystemLine.name}-${ecosystemLine.value}`}>
                          <div className="invest-line-head">
                            <div className="il-name">{ecosystemLine.displayName || ecosystemLine.name}</div>
                            <div className="il-val">
                              {ecosystemLine.value > 0 ? formatCurrency(ecosystemLine.value) : "Incluso"}
                            </div>
                          </div>
                          {ecosystemLine.composition ? (
                            <div className="il-comp">
                              {ecosystemLine.composition.map((item) => (
                                <div className="il-comp-line" key={`${ecosystemLine.name}-${item}`}>
                                  {item}
                                </div>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    ) : null}

                    {workshopLine ? (
                      <div className="invest-section">
                        <div className="invest-section-label">Parte 2</div>
                        <div className="invest-section-title">Workshop executivo</div>
                        <div className="invest-line" key={`${workshopLine.name}-${workshopLine.value}`}>
                          <div className="invest-line-head">
                            <div className="il-name">{workshopLine.displayName || workshopLine.name}</div>
                            <div className="il-val">
                              {workshopLine.value > 0 ? formatCurrency(workshopLine.value) : "Incluso"}
                            </div>
                          </div>
                          {workshopLine.composition ? (
                            <div className="il-comp">
                              {workshopLine.composition.map((item) => (
                                <div className="il-comp-line" key={`${workshopLine.name}-${item}`}>
                                  {item}
                                </div>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    ) : null}

                    {programInvestmentLines.length ? (
                      <div className="invest-section">
                        <div className="invest-section-label">Parte 3</div>
                        <div className="invest-section-title">Programas</div>
                        {programInvestmentLines.map((line) => (
                          <div className="invest-line" key={`${line.name}-${line.value}`}>
                            <div className="invest-line-head">
                              <div className="il-name">{line.displayName || line.name}</div>
                              <div className="il-val">
                                {line.value > 0 ? formatCurrency(line.value) : "Incluso"}
                              </div>
                            </div>
                            {line.composition ? (
                              <div className="il-comp">
                                {line.composition.map((item) => (
                                  <div className="il-comp-line" key={`${line.name}-${item}`}>
                                    {item}
                                  </div>
                                ))}
                              </div>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </>
                )}
                <div className="invest-total">
                  <div className="it-label">Total</div>
                  <div className="it-val">{formatCurrency(totalInvestment)}</div>
                </div>
              </div>

              <div className="right-cta">
                <button className="btn-primary" onClick={goToProposal}>
                  Gerar proposta →
                </button>
              </div>
            </div>
          </aside>
        </div>
        </div>
      </section>

      <section id="tela-proposta" className={`screen ${screen === "proposta" ? "active" : ""}`}>
        {!proposalReady ? null : (
          <>
        <div className="hero fade">
          <div className="hero-grid"></div>
          <div className="hero-inner">
            <h1 className="hero-title">Documento executivo da proposta</h1>
            <p className="hero-sub">{proposalDate}</p>
          </div>
        </div>

        <div className="proposal-layout">
          <aside className="section-index" aria-label="Índice da seção">
            <div className="section-index-kicker">Nesta seção</div>
            {PROPOSAL_INDEX.map((item) => (
              <a
                className={`section-index-link ${activeProposalAnchor === item.id ? "active" : ""}`}
                href={`#${item.id}`}
                key={item.id}
                onClick={() => setActiveProposalAnchor(item.id)}
              >
                {item.label}
              </a>
            ))}
            <button className="btn-ghost proposal-print-btn" onClick={printProposal}>
              Exportar PDF
            </button>
          </aside>

        <div className="proposal-doc">
          <section className="proposal-section fade section-anchor" id="proposal-briefing">
            <div className="proposal-head">
              <div className="proposal-icon">
                <FileStack size={34} strokeWidth={1.0} />
              </div>
              <div>
                <div className="proposal-kicker">Síntese do briefing recebido</div>
                <h2 className="proposal-title">Ponto de partida</h2>
                <p className="proposal-caput">
                  Esta proposta nasce de uma leitura objetiva do briefing: contexto da organização,
                  natureza do desafio e escopo esperado para a jornada.
                </p>
              </div>
            </div>

            <div className="proposal-summary-grid">
              <div className="proposal-summary-card">
                <div className="proposal-card-label">Contexto</div>
                <ul className="proposal-list">
                  <li>Operação consolidada, com forte herança presencial e maturidade digital desigual entre os públicos.</li>
                  <li>Transformação digital como prioridade estratégica, com necessidade de tradução homogênea para a rotina das equipes.</li>
                  <li>Necessidade de mudança cultural real convivendo com pressão por resultado em horizonte curto.</li>
                </ul>
              </div>
              <div className="proposal-summary-card">
                <div className="proposal-card-label">Pedido</div>
                <ul className="proposal-list">
                  <li>Programa para toda a organização, com desdobramento coordenado entre os diferentes públicos.</li>
                  <li>Assessment, workshop executivo, trilha principal, change management e KPIs de efetividade.</li>
                  <li>Arquitetura orientada por recomendação, construída a partir das prioridades reais do briefing.</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="proposal-section fade section-anchor" id="proposal-logic">
            <div className="proposal-head">
              <div className="proposal-icon">
                <Lightbulb size={34} strokeWidth={1.0} />
              </div>
              <div>
                <div className="proposal-kicker">Como pensamos a proposta</div>
                <h2 className="proposal-title">A lógica estrutural</h2>
                <p className="proposal-caput">
                  A solução foi desenhada para preservar coerência institucional, responder a
                  públicos distintos e transformar aprendizado em operação concreta.
                </p>
              </div>
            </div>

            <div className="proposal-principles-grid">
              {PROPOSAL_PRINCIPLES.map((principle, index) => (
                <div className="proposal-principle-card" key={principle.title}>
                  <div className="proposal-principle-title-wrap">
                    <div className="proposal-principle-title">{principle.title}</div>
                    {index === 2 && scAtivo ? (
                      <div className="proposal-principle-tag">E2W</div>
                    ) : null}
                  </div>
                  <p className="proposal-principle-text">
                    {index === 2 && scAtivo
                      ? `${principle.text} O E2W é o sistema proprietário da Mastertech que sustenta essa camada, alinhando metas entre colaborador e liderança, acompanhando evolução ao longo da jornada e transformando essas evidências em leitura gerencial para a organização.`
                      : principle.text}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="proposal-section fade section-anchor" id="proposal-structure">
            <div className="proposal-head">
              <div className="proposal-icon">
                <Network size={34} strokeWidth={1.0} />
              </div>
              <div>
                <div className="proposal-kicker">A estrutura da proposta</div>
                <h2 className="proposal-title">
                  Os serviços e produtos
                </h2>
                <p className="proposal-caput">
                  {scAtivo
                    ? "A proposta combina uma jornada principal, formada por workshop e trilha por públicos, com o E2W como camada sistêmica de sustentação."
                    : "A proposta combina workshop executivo e trilha por públicos como núcleo da jornada nesta configuração."}
                </p>
              </div>
            </div>

            <div className="proposal-layer-stack">
              {PROPOSAL_STRUCTURE_CAPABILITIES.filter((item) => (scAtivo ? true : item.layer !== "E2W")).map(
                (item, index, arr) => (
                  <div
                    className={`proposal-layer proposal-layer-${item.layer.toLowerCase().replace(/\s+/g, "-")} ${
                      index === arr.length - 1 ? "is-emphasis" : ""
                    }`}
                    key={item.layer}
                  >
                    <div className="proposal-layer-front">{item.layer}</div>
                    <div className="proposal-layer-composition">{item.composition}</div>
                    <div className="proposal-layer-role">{item.role}</div>
                  </div>
                )
              )}
            </div>

            <div className="proposal-structure-note">
              {scAtivo
                ? allModulesSelected
                  ? "E2W incluído por 12 meses nesta configuração."
                  : `${activeParticipants} licenças previstas para o E2W nesta configuração.`
                : "E2W não incluído nesta configuração."}
            </div>
          </section>

          <section className="proposal-section fade section-anchor" id="proposal-publics">
            <div className="proposal-head">
              <div className="proposal-icon">
                <UsersRound size={34} strokeWidth={1.0} />
              </div>
              <div>
                <div className="proposal-kicker">Públicos participantes</div>
                <h2 className="proposal-title">Objetivos de cada área</h2>
                <p className="proposal-caput">
                  Os grupos entram na mesma jornada com volume e foco dominante ajustados à realidade de cada área.
                </p>
              </div>
            </div>

            <div className="proposal-public-card-grid">
              {activeClusterEntries.map(([clusterId, cluster]) => (
                <div className="proposal-public-card" key={`proposal-public-row-${clusterId}`}>
                  <div className="proposal-public-card-top">
                    <div className="proposal-public-card-name">{cluster.label}</div>
                    <div className="proposal-public-card-size">
                      <strong>{clusterSizes[clusterId]}</strong>
                      <span>pessoas</span>
                    </div>
                  </div>
                  <div className="proposal-public-card-focus">{cluster.focus}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="proposal-section fade section-anchor" id="proposal-offer">
            <div className="proposal-head">
              <div className="proposal-icon">
                <TableProperties size={34} strokeWidth={1.0} />
              </div>
              <div>
                <div className="proposal-kicker">Entrega e investimento</div>
                <h2 className="proposal-title">O detalhe da precificação</h2>
                <p className="proposal-caput">
                  A leitura abaixo junta estrutura do programa e investimento numa única tabela executiva.
                </p>
              </div>
            </div>

            <div className="proposal-table-shell">
              <table className="proposal-table proposal-offer-table">
                <thead>
                  <tr>
                    <th>Programa</th>
                    <th>Público(s)</th>
                    <th>Formato</th>
                    <th>Carga</th>
                    <th>Preço/turma</th>
                    <th>Preço total</th>
                  </tr>
                </thead>
                <tbody>
                  {offerRows.map((row) => (
                    <tr key={`offer-row-${row.name}`}>
                      <td>{row.name}</td>
                      <td>{row.audiences}</td>
                      <td>
                        <span className="proposal-load-cell proposal-format-cell">
                          <strong>{row.formatMain}</strong>
                          {row.formatSub ? <span>{row.formatSub}</span> : null}
                        </span>
                      </td>
                      <td>
                        <span className="proposal-load-cell">
                          <strong>{row.loadMain}</strong>
                          <span>
                            {String(row.loadSub)
                              .split("\n")
                              .map((part, index) => (
                                <span className="proposal-load-subline" key={`${row.name}-load-${index}`}>
                                  {part}
                                </span>
                              ))}
                          </span>
                        </span>
                      </td>
                      <td>
                        {row.pricePerTurma == null
                          ? "—"
                          : row.value > 0
                            ? formatCurrency(row.pricePerTurma)
                            : "Incluso"}
                      </td>
                      <td>{row.value > 0 ? formatCurrency(row.value) : "Incluso"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="proposal-investment-foot">
              <div className="proposal-investment-total">
                <div className="proposal-card-label">Investimento total estimado</div>
                <div className="proposal-investment-value">{formatCurrency(totalInvestment)}</div>
              </div>
            </div>
          </section>

          <section className="proposal-section fade section-anchor" id="proposal-calendar">
            <div className="proposal-head">
              <div className="proposal-icon">
                <CalendarRange size={34} strokeWidth={1.0} />
              </div>
              <div>
                <div className="proposal-kicker">Execução</div>
                <h2 className="proposal-title">Sugestão de calendário</h2>
                <p className="proposal-caput">
                  O calendário abaixo organiza a proposta em marcos claros, do fechamento do desenho ao acompanhamento do programa.
                </p>
              </div>
            </div>

            <div className="proposal-table-shell">
              <table className="proposal-table">
                <thead>
                  <tr>
                    <th>Etapa</th>
                    <th>Quando</th>
                    <th>O que acontece</th>
                  </tr>
                </thead>
                <tbody>
                  {PROPOSAL_CALENDAR.map((item) => (
                    <tr key={`${item.phase}-${item.title}`}>
                      <td>{item.title}</td>
                      <td>{item.phase}</td>
                      <td>{item.text}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </section>

          <section className="proposal-section fade section-anchor" id="proposal-steps">
            <div className="proposal-head">
              <div className="proposal-icon">
                <CircleCheckBig size={34} strokeWidth={1.0} />
              </div>
              <div>
                <div className="proposal-kicker">Próximos passos</div>
                <h2 className="proposal-title">Pontos para debate após leitura da proposta</h2>
                <p className="proposal-caput">
                  A aprovação da proposta abre uma sequência curta de validações comerciais e operacionais para ativação da jornada.
                </p>
              </div>
            </div>

            <div className="proposal-steps-list">
              {PROPOSAL_EXECUTION_STEPS.map((step, index) => (
                <div className="proposal-step-item" key={`proposal-step-${step.title}`}>
                  <div className="proposal-step-index">{index + 1}</div>
                  <div className="proposal-step-body">
                    <div className="proposal-step-title">{step.title}</div>
                    <div className="proposal-step-text">{step.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="proposal-section fade section-anchor" id="proposal-mastertech">
            <div className="proposal-head">
              <div className="proposal-icon">
                <Sparkles size={34} strokeWidth={1.0} />
              </div>
              <div>
                <div className="proposal-kicker">Quem é a Mastertech</div>
                <h2 className="proposal-title">Credenciais que sustentam a proposta</h2>
                <p className="proposal-caput">
                  A Mastertech foi fundada em 2015 e, ao longo de dez anos, consolidou uma atuação corporativa
                  especializada em transformação digital, inovação, cultura ágil e desenho de soluções aplicadas.
                </p>
              </div>
            </div>

            <div className="proposal-summary-grid">
              <div className="proposal-summary-card">
                <div className="proposal-card-label">Atuação</div>
                <ul className="proposal-list">
                  <li>Mais de 200 clientes corporativos de diferentes portes e setores.</li>
                  <li>Origem em tecnologia, evolução para escola e ampliação para programas e atuação consultiva.</li>
                  <li>Desenvolvimento recente de sistemas de IA, com o E2W como principal produto SaaS.</li>
                </ul>
              </div>
              <div className="proposal-summary-card">
                <div className="proposal-card-label">Setor farmacêutico</div>
                <ul className="proposal-list">
                  <li>Experiências com Bayer, Roche, Daiichi Sankyo, Novo Nordisk e Amgen.</li>
                  <li>Projetos que passaram por dados, agilidade, design thinking, comunicação digital e construção de produtos.</li>
                  <li>Repertório acumulado para trabalhar transformação em um contexto regulado e comercialmente sensível.</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
        </div>
          </>
        )}
      </section>

      {adminMode ? (
        <section id="tela-admin" className={`screen ${screen === "admin" ? "active" : ""}`}>
          <div className="hero">
            <div className="hero-grid"></div>
            <div className="hero-inner">
              <h1 className="hero-title">Parâmetros internos</h1>
              <p className="hero-sub">
                Área oculta por link. Os valores salvos aqui afetam a proposta e ficam visíveis só quando você acessa com <strong>?admin=1</strong>.
              </p>
            </div>
          </div>

          <div className="editorial-layout">
            <aside className="section-index" aria-label="Índice da seção">
              <div className="section-index-kicker">Nesta seção</div>
              {ADMIN_INDEX.map((item) => (
                <a
                  className={`section-index-link ${activeAdminAnchor === item.id ? "active" : ""}`}
                  href={`#${item.id}`}
                  key={item.id}
                  onClick={() => setActiveAdminAnchor(item.id)}
                >
                  {item.label}
                </a>
              ))}
            </aside>

            <div className="editorial-main">
              <section className="section section-anchor" id="admin-publicos">
                <div className="admin-page-head">
                  <div>
                    <div className="admin-panel-kicker">Persistência local</div>
                    <h2 className="section-title">Públicos</h2>
                  </div>
                  <div className="admin-save-badge">
                    {adminSavedAt
                      ? `Salvo localmente às ${adminSavedAt.toLocaleTimeString("pt-BR", {
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })}`
                      : "Salvando localmente"}
                  </div>
                </div>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Público</th>
                      <th>Pessoas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(CLUSTERS).map(([clusterId, cluster]) => (
                      <tr key={`admin-cluster-${clusterId}`}>
                        <td>{cluster.label}</td>
                        <td>
                          <input
                            className="admin-input"
                            type="number"
                            min={cluster.min}
                            max={cluster.max}
                            value={clusterSizes[clusterId]}
                            onChange={(event) => updateClusterSize(clusterId, event.target.value)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>

              <section className="section section-anchor" id="admin-e2w">
                <div className="admin-panel-label">E2W e workshop</div>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Parâmetro</th>
                      <th>Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Workshop · valor/hora</td>
                      <td>
                        <input
                          className="admin-input"
                          type="number"
                          min="1"
                          value={adminPricing.workshopHourly}
                          onChange={(event) =>
                            updateAdminPricing("workshopHourly", event.target.value)
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Workshop · carga por encontro</td>
                      <td>
                        <input
                          className="admin-input"
                          type="number"
                          min="1"
                          value={adminPricing.workshopHours}
                          onChange={(event) =>
                            updateAdminPricing("workshopHours", event.target.value, 1, 24)
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Workshop · encontros</td>
                      <td>
                        <input
                          className="admin-input"
                          type="number"
                          min="1"
                          value={adminPricing.workshopMeetings}
                          onChange={(event) =>
                            updateAdminPricing("workshopMeetings", event.target.value, 1, 12)
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Comitê · horas por encontro</td>
                      <td>
                        <input
                          className="admin-input"
                          type="number"
                          min="1"
                          max="8"
                          value={adminPricing.comiteMeetingHours}
                          onChange={(event) =>
                            updateAdminPricing("comiteMeetingHours", event.target.value, 1, 8)
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>E2W · implantação</td>
                      <td>
                        <input
                          className="admin-input"
                          type="number"
                          min="0"
                          value={adminPricing.ecosystemImplant}
                          onChange={(event) =>
                            updateAdminPricing("ecosystemImplant", event.target.value, 0)
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>E2W · licença/mês</td>
                      <td>
                        <input
                          className="admin-input"
                          type="number"
                          min="0"
                          value={adminPricing.ecosystemLicense}
                          onChange={(event) =>
                            updateAdminPricing("ecosystemLicense", event.target.value, 0)
                          }
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>

              <section className="section section-anchor" id="admin-programas">
                <div className="admin-panel-label">Programas</div>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Programa</th>
                      <th>Carga (h)</th>
                      <th>Valor/h</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MODULES.map((module) => (
                      <tr key={`admin-module-${module.id}`}>
                        <td>{module.title}</td>
                        <td>
                          <input
                            className="admin-input"
                            type="number"
                            min="1"
                            value={adminModuleParams[module.id].durationHours}
                            onChange={(event) =>
                              updateAdminModuleParam(module.id, "durationHours", event.target.value, 1, 80)
                            }
                          />
                        </td>
                        <td>
                          <input
                            className="admin-input"
                            type="number"
                            min="1"
                            value={adminModuleParams[module.id].hourlyRate}
                            onChange={(event) =>
                              updateAdminModuleParam(module.id, "hourlyRate", event.target.value, 1)
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            </div>
          </div>
        </section>
      ) : null}
        </>
      ) : null}
    </>
  );
}

export default App;
