export interface MarketingCategory {
  name: string;
  phrases: { title: string; text: string }[];
}

export const marketingPhrases: MarketingCategory[] = [
  {
    name: "Empresa de Construção",
    phrases: [
      {
        title: "Do Projeto à Realidade",
        text: "Transformamos ideias em estruturas sólidas. Construa seu futuro com quem entende de solidez e confiança.",
      },
      {
        title: "Sua Obra Sem Dor de Cabeça",
        text: "Cuidamos de cada etapa, da fundação ao acabamento final. Entregamos qualidade no prazo certo.",
      },
      {
        title: "Onde Grandes Projetos Nascem",
        text: "Engenharia de alto nível para resultados que impressionam. Seu próximo grande projeto começa aqui.",
      },
    ],
  },
  {
    name: "Mestre de Obras / Profissional",
    phrases: [
      {
        title: "A Experiência Faz a Diferença",
        text: "Anos de canteiro de obra garantindo segurança e excelência na execução do seu projeto.",
      },
      {
        title: "Seu Sonho em Boas Mãos",
        text: "Coordenação precisa de equipes e foco em cada detalhe. O resultado perfeito que você espera.",
      },
    ],
  },
  {
    name: "Construção de Casas",
    phrases: [
      {
        title: "Sua Nova Casa Espera por Você",
        text: "Casas projetadas para o seu conforto e da sua família. A chave do seu novo lar mais perto do que imagina.",
      },
      {
        title: "A Casa dos Seus Sonhos Existe.",
        text: "Da ideia inicial ao acabamento final, estamos com você para construir a casa perfeita.",
      },
      {
        title: "Casas de Alto Padrão",
        text: "Requinte e sofisticação para sua família. Ambientes planejados para experiências inesquecíveis.",
      },
    ],
  },
  {
    name: "Piscinas e Saunas",
    phrases: [
      {
        title: "Seu Oásis Particular",
        text: "Projetos de piscinas e saunas com design exclusivo. O lazer perfeito sem sair de casa.",
      },
      {
        title: "Mergulhe no Conforto",
        text: "Construção de piscinas modernas com tecnologia de ponta e acabamento impecável.",
      },
    ],
  },
  {
    name: "Área Gourmet",
    phrases: [
      {
        title: "A Melhor Parte da Casa",
        text: "Áreas gourmet feitas para reunir, celebrar e criar memórias. O coração do seu novo lar.",
      },
      {
        title: "Churrasco com Estilo",
        text: "Integração e sofisticação no seu espaço gourmet. Transforme seus domingos com estilo.",
      },
    ],
  },
  {
    name: "Sítios e Fazendas",
    phrases: [
      {
        title: "O Refúgio Perfeito",
        text: "Construções rurais que misturam o rústico ao luxo. Conforto absoluto no meio da natureza.",
      },
      {
        title: "Seu Sítio, Sua Paz",
        text: "Projetos arquitetônicos para sítios e chácaras com respeito ao meio ambiente e alto padrão.",
      },
    ],
  },
  {
    name: "Apartamentos",
    phrases: [
      {
        title: "Reforma Inteligente",
        text: "Otimização de espaços no seu apartamento com projetos ágeis e execução limpa.",
      },
      {
        title: "Do Antigo ao Moderno",
        text: "Renove o seu espaço, renove a sua vida! Reformas completas de apartamentos com entrega ágil.",
      },
    ],
  },
];
