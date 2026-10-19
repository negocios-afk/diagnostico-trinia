// ============================================================
// CONFIGURAÇÃO: preencha antes de publicar
// ============================================================
const CONFIG = {
  // Link da agenda de 30 minutos (negocios@trinia.com.br)
  calendarUrl: "COLE_AQUI_O_LINK_DA_AGENDA",

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
  qualificado: "diag_qualificado",
};

// ============================================================
// ROTEIRO
// tipo: botoes | texto | whatsapp | agenda | fim
// next: próximo passo. Quem vai para "nutricao" não é enviado ao HubSpot.
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
      msgs: ["Vamos direto ao ponto. Qual é o seu cargo?"],
      campo: "cargo",
      opcoes: [
        { label: "Sócio ou dono", next: "nome" },
        { label: "Diretor ou gestor", next: "nome" },
        { label: "Outro", next: "nutricao" },
      ],
    },

    nome: {
      tipo: "texto",
      msgs: ["Perfeito. Como posso te chamar?"],
      campo: "nome",
      next: "faturamento",
    },

    faturamento: {
      tipo: "botoes",
      msgs: ["Boa, {nome}. Qual é o faturamento mensal aproximado da empresa?"],
      campo: "faturamento",
      opcoes: [
        { label: "Até R$ 500 mil", next: "nutricao" },
        { label: "De R$ 500 mil a R$ 750 mil", next: "decisor" },
        { label: "De R$ 750 mil a R$ 1 milhão", next: "decisor" },
        // Acima do foco atual: segue no fluxo e fica marcado para revisão manual
        { label: "Acima de R$ 1 milhão", next: "decisor" },
      ],
    },

    decisor: {
      tipo: "botoes",
      msgs: ["Hoje, quem toma as decisões do dia a dia da empresa?"],
      campo: "decisor",
      opcoes: [
        { label: "Eu, com tempo para isso", next: "desafio" },
        { label: "Um gestor com autonomia", next: "desafio" },
        { label: "Ainda ninguém com esse papel", next: "nutricao" },
      ],
    },

    desafio: {
      tipo: "botoes",
      msgs: ["Qual é o maior desafio agora?"],
      campo: "desafio",
      opcoes: [
        { label: "Crescer sem perder o controle", next: "disposicao" },
        { label: "Organizar rotinas e indicadores", next: "disposicao" },
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
        { label: "Só quero uma ferramenta para acompanhar números", next: "nutricao" },
      ],
    },

    contato: {
      tipo: "whatsapp",
      msgs: [
        "Pelo que você respondeu, vale uma conversa de 30 minutos com o nosso time.",
        "Me passa seu WhatsApp para confirmar o horário?",
      ],
      campo: "whatsapp",
      next: "agendar",
    },

    agendar: {
      tipo: "agenda",
      msgs: ["Pronto. Escolha o horário que funciona para você."],
    },

    nutricao: {
      tipo: "fim",
      msgs: [
        "Obrigado pelas respostas. Hoje não parece o melhor momento para uma conversa.",
        "Vamos compartilhar conteúdos sobre gestão e crescimento. Se fizer sentido no futuro, é só nos procurar.",
      ],
    },
  },
};
