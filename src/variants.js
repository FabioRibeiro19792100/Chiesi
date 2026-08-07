import defaultConfig from "../data/chiesi-proposta-config.json";
import omniConfig from "../data/chiesi-proposta-config--omni.json";

export const DEFAULT_VARIANT_ID = "default";

// Cada variante e uma versao completa da proposta: um arquivo de configuracao
// proprio (numeros e toggles) e um overlay de texto sobre as constantes do App.
// A variante default nao tem overlay — renderiza exatamente a proposta atual.
//
// omni: recorte de primeiro passo — modulo Comunicacao Digital apenas para a
// forca de vendas, abrindo na convencao de marco de 2027, com o E2W cobrado.
export const VARIANTS = {
  default: {
    id: "default",
    config: defaultConfig,
    readOnly: false,
    copy: {},
  },
  omni: {
    id: "omni",
    config: omniConfig,
    readOnly: true,
    copy: {
      PROPOSAL_CALENDAR: [
        {
          phase: "Fevereiro de 2027",
          title: "Diagnóstico E2W da força de vendas",
          text: "Autoavaliação por competência, alinhamento de metas com a liderança e leitura do ponto de partida do grupo, com antecedência suficiente para calibrar a trilha antes da convenção.",
        },
        {
          phase: "Março de 2027 · convenção",
          title: "Abertura do programa",
          text: "Entrada da força de vendas na jornada, com a base on-demand liberada na sequência da convenção.",
        },
        {
          phase: "Abril a junho de 2027",
          title: "Execução dos encontros ao vivo",
          text: "Cadência dos encontros, com casos reais de relacionamento e aplicação direta na rotina comercial.",
        },
        {
          phase: "Julho de 2027",
          title: "Fechamento e leitura de resultados",
          text: "Reavaliação no E2W, comparação com o diagnóstico inicial e leitura gerencial da evolução do grupo.",
        },
      ],

      PROPOSAL_STRUCTURE_CAPABILITIES: [
        {
          layer: "E2W",
          composition: "Base técnica da metodologia · inegociável",
          role: "Sistema proprietário que diagnostica, acompanha e governa a evolução. Sem E2W não existe a proposta Mastertech — é o que permite definir entregáveis e calibrar a trilha da força de vendas.",
        },
        {
          layer: "Base on-demand",
          composition: "2h gravadas · obrigatória",
          role: "Conteúdo gravado com a fundação conceitual do módulo, disponível para toda a força de vendas. Sempre remoto, sempre presente.",
        },
        {
          layer: "Trilha ao vivo customizada",
          composition: "3 a 6 encontros · calibrados pelo E2W",
          role: "Encontros prioritariamente práticos — casos de relacionamento com médicos, decisões de canal e construção de plano por território. Default comercial: 3 encontros de 2 horas.",
        },
      ],

      CONTENT_LOGIC_CARDS: [
        {
          title: "Base comum on-demand obrigatória",
          icon: "grid",
          text: "O módulo começa por uma gravação única de 2 horas, igual para toda a força de vendas. Essa base nivela linguagem e conceitos, e é parte inegociável da metodologia.",
        },
        {
          title: "E2W como elemento estruturante",
          icon: "tune",
          text: "O E2W faz o diagnóstico de maturidade da força de vendas e define o quanto o grupo precisa aprofundar. É o que calibra a trilha ao vivo e organiza acompanhamento, evolução e entregáveis.",
        },
        {
          title: "Encontros ao vivo prioritariamente práticos",
          icon: "spark",
          text: "A trilha customizada (de 3 a 6 encontros) é mão na massa: casos reais, decisões compartilhadas e aplicação direta na rotina comercial da força de vendas.",
        },
      ],

      PROPOSAL_PRINCIPLES: [
        {
          title: "Base on-demand obrigatória",
          text: "A jornada começa por uma gravação única de 2 horas, comum a toda a força de vendas. Essa base é parte inegociável da metodologia Mastertech.",
        },
        {
          title: "E2W como elemento estruturante",
          text: "O E2W diagnostica a maturidade da força de vendas e define o quanto a trilha ao vivo precisa aprofundar. Sem E2W não existe a proposta Mastertech.",
        },
        {
          title: "Trilha ao vivo prática e calibrada",
          text: "A trilha customizada varia de 3 a 6 encontros, com default comercial de 3. São encontros prioritariamente práticos, com casos reais e aplicação direta na operação comercial.",
        },
      ],

      // O Comite Executivo nao participa desta versao, e os itens escritos no
      // plural de publicos passam a falar da forca de vendas.
      PROPOSAL_FAQ_PATCH: {
        omit: ["Por que o Comitê Executivo opera com encontros de 1 hora?"],
        patch: {
          "Qual é o papel do diagnóstico dentro da metodologia?": {
            answer:
              "O diagnóstico organiza prioridades, profundidade e recortes da solução. Ele dá precisão à jornada e orienta as escolhas que tornam a trilha aderente à realidade da força de vendas.",
          },
          "Como a solução é calibrada por público?": {
            question: "Como a solução é calibrada para a força de vendas?",
            answer:
              "A base on-demand nivela linguagem e fundamentos, enquanto a trilha ao vivo é ajustada conforme a realidade, a maturidade e a rotina comercial do grupo, a partir do diagnóstico do E2W.",
          },
          "Como a Mastertech garante aplicação prática ao longo da jornada?": {
            answer:
              "A aplicação prática está presente no desenho metodológico e na organização dos encontros em torno de situações reais da rotina comercial. Isso aproxima conteúdo, operação e tomada de decisão.",
          },
          "Como a evolução dos participantes é acompanhada?": {
            answer:
              "A evolução é acompanhada por indicadores de progresso e consolidação de evidências ao longo do percurso. Isso permite observar aprofundamento, aderência e movimento de desenvolvimento no grupo.",
          },
          "Como a lógica de investimento se conecta ao desenho da proposta?": {
            answer:
              "O investimento acompanha a arquitetura da solução: base on-demand, trilha ao vivo calibrada pelo E2W e camada de sistema e governança. O valor reflete a estrutura desta versão da jornada.",
          },
        },
      },

      PROPOSAL_INDEX: [
        { id: "proposal-briefing", label: "Síntese do briefing recebido" },
        { id: "proposal-logic", label: "Como pensamos a proposta" },
        { id: "proposal-structure", label: "A estrutura da proposta" },
        { id: "proposal-publics", label: "Público participante" },
        { id: "proposal-offer", label: "Entrega e investimento" },
        { id: "proposal-calendar", label: "Execução" },
        { id: "proposal-steps", label: "Próximos passos" },
        { id: "proposal-mastertech", label: "Quem é a Mastertech" },
      ],

      text: {
        contextoHeroSub:
          "O que identificamos sobre a organização, o público e o escopo desta versão do programa.",

        contextoGruposTitle: "Público participante",

        contextoGruposIntro:
          "A força de vendas é o grupo com maior resistência declarada ao digital e o que concentra a oportunidade comercial mais direta. Esta versão da proposta concentra o programa nesse público, com uma trilha desenhada para a rotina de relacionamento com médicos.",

        solucaoTrilhaCaput:
          "O programa combina uma base on-demand obrigatória de 2 horas — gravação única para toda a força de vendas — com uma trilha ao vivo de 3 a 6 encontros, calibrada pelo E2W. Default comercial: 3 encontros.",

        solucaoComoAcontece:
          "O módulo começa pela base on-demand obrigatória de 2 horas, comum a toda a força de vendas. Em seguida o grupo percorre uma trilha ao vivo de 3 a 6 encontros — prioritariamente prática, com casos reais e aplicação na rotina — calibrada pelo diagnóstico do E2W. O default comercial é 3 encontros.",

        proposalBriefingCaput:
          "Esta proposta nasce de uma leitura objetiva do briefing: contexto da organização, natureza do desafio e escopo esperado para a jornada. Esta versão recorta um primeiro passo dentro desse escopo — Comunicação Digital para a força de vendas, com abertura na convenção de março de 2027.",

        proposalLogicCaput:
          "A solução foi desenhada para preservar coerência institucional, responder à realidade da força de vendas e transformar aprendizado em operação concreta.",

        proposalStructureCaput:
          "Nesta versão, a metodologia proprietária Mastertech se sustenta em três camadas: o E2W como base técnica inegociável, a base on-demand obrigatória do módulo e a trilha ao vivo customizada de 3 a 6 encontros com a força de vendas.",

        proposalPublicsKicker: "Público participante",

        proposalPublicsTitle: "Objetivo do público",

        proposalPublicsCaput:
          "Esta versão concentra o programa na força de vendas, com foco na comunicação digital com médicos e no uso de canais como extensão da visitação.",

        proposalCalendarCaput:
          "O calendário abaixo organiza a jornada em marcos claros, do diagnóstico que antecede a convenção de março de 2027 à leitura final de resultados.",
      },
    },
  },
};
