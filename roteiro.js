// ============================================================
// CONFIGURAÇÃO: preencha antes de publicar
// ============================================================
const CONFIG = {
  // Link da agenda de 30 minutos (negocios@trinia.com.br)
  calendarUrl: "https://calendar.app.google/qX7ajH1N8n17Ap92A",

  // Formulário do HubSpot (público: pode ficar no código)
  // portalId: Configurações > Conta > ID da conta
  // formGuid: ID do formulário criado no HubSpot
  hubspot: {
    portalId: "COLE_AQUI",
    formGuid: "COLE_AQUI",
  },
};

// Campo do HubSpot para cada resposta.
// Os campos personalizados (diag_*) precisam existir no HubSpot com esses nomes internos.
const MAPA_CAMPOS = {
  nome: "firstname",
  whatsapp: "phone",
  cargo: "diag_cargo",
  faturamento: "diag_faturamento",
  decisor: "diag_decisor",
  desafio: "diag_desafio",
  disposicao: "diag_disposicao",
  gatilho: "diag_gatilho",
  lead: "diag_lead",
  consentimento: "diag_consentimento",
};

// ============================================================
// ROTEIRO
// tipo: botoes | texto | whatsapp | agenda
// Todos chegam à agenda: a página não recusa mais ninguém.
// ============================================================
const ROTEIRO = {
  inicio: "abertura",
  passos: {
    abertura: {
      tipo: "botoes",
      msgs: [
        "Empresas que organizam a operação crescem com menos dependência do dono.",
        "Quer ver em 2 minutos onde a sua está hoje?",
      ],
      opcoes: [{ label: "Quero ver", next: "cargo" }],
    },

    cargo: {
      tipo: "botoes",
      msgs: ["Vamos direto ao ponto. Qual é o seu cargo na empresa?"],
      campo: "cargo",
      opcoes: [
        { label: "Sócio ou dono", next: "nome" },
        { label: "Fundador", next: "nome" },
        { label: "Diretor", next: "nome" },
        { label: "Gerente", next: "nome" },
        { label: "Coordenador ou supervisor", next: "nome" },
        { label: "Outro", next: "nome" },
      ],
    },

    nome: {
      tipo: "texto",
      msgs: ["Perfeito. Como posso te chamar?"],
      campo: "nome",
      placeholder: "Seu primeiro nome",
      erro: "Escreva como podemos te chamar.",
      minimo: 2,
      next: "faturamento",
    },

    faturamento: {
      tipo: "texto",
      msgs: ["Boa, {nome}. Qual é o faturamento mensal aproximado da empresa?"],
      campo: "faturamento",
      placeholder: "Ex.: 800 mil por mês",
      erro: "Escreva um valor aproximado, mesmo que seja uma estimativa.",
      minimo: 2,
      next: "decisor",
    },

    decisor: {
      tipo: "botoes",
      msgs: ["Hoje, quem toma as decisões do dia a dia da empresa?"],
      campo: "decisor",
      opcoes: [
        { label: "Eu, com tempo para isso", next: "desafio" },
        { label: "Eu, mas com pouco tempo", next: "desafio" },
        { label: "Um gestor com autonomia", next: "desafio" },
        { label: "Um gestor com pouca autonomia", next: "desafio" },
        { label: "Um comitê ou sócios", next: "desafio" },
        { label: "Ainda ninguém com esse papel", next: "desafio" },
        { label: "Não sei dizer", next: "desafio" },
      ],
    },

    desafio: {
      tipo: "botoes",
      msgs: ["Qual é o maior desafio agora?"],
      campo: "desafio",
      opcoes: [
        { label: "Crescer sem perder o controle", next: "disposicao" },
        { label: "Organizar rotinas e processos", next: "disposicao" },
        { label: "Acompanhar indicadores com clareza", next: "disposicao" },
        { label: "Reduzir a dependência do dono", next: "disposicao" },
        { label: "Aumentar a margem", next: "disposicao" },
        { label: "Montar uma equipe com processos", next: "disposicao" },
        { label: "Preparar a empresa para venda ou sociedade", next: "disposicao" },
        { label: "Decidir com mais dados", next: "disposicao" },
      ],
    },

    disposicao: {
      tipo: "botoes",
      msgs: ["Você topa mudar algumas rotinas nos próximos 90 dias para executar um plano?"],
      campo: "disposicao",
      opcoes: [
        { label: "Sim, quero começar", next: "contato" },
        { label: "Depende do que for proposto", next: "contato" },
        { label: "Quero entender melhor antes", next: "contato" },
        { label: "Prefiro começar com uma ferramenta", next: "contato" },
        { label: "Ainda não tenho certeza", next: "contato" },
      ],
    },

    contato: {
      tipo: "whatsapp",
      msgs: [
        "Obrigado, {nome}. Com essas respostas, vale uma conversa de 30 minutos com o nosso time.",
        "Me passa seu WhatsApp para confirmar o horário?",
      ],
      campo: "whatsapp",
      next: "agendar",
    },

    agendar: {
      tipo: "agenda",
      msgs: ["Pronto. Escolha o melhor horário para a conversa."],
    },
  },
};
