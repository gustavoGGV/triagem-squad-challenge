export const slides = [
  {
    tag: "Participar de squad",
    title: "Encontre sua squad e evolua em comunidade.",
    description: "Um espaço para aprender, compartilhar experiências e construir projetos ao lado de quem também ama tecnologia.",
    cta: "Conhecer as squads",
    href: "#squads",
    card: "chat",
  },
  {
    tag: "Esperar por oportunidades",
    title: "Conecte-se com pessoas que possuem gostos mais parecidos com você.",
    description: "Caso não tenha encontrado uma squad compatível, entre na lista de espera e seja chamado para novas squads.",
    cta: "Verificar lista",
    href: "#lista",
    card: "people",
  },
] as const;

export const people = [
  { initials: "AM", name: "Ana Martins", area: "Front-end", color: "bg-[#ef7dba]" },
  { initials: "JO", name: "João Lima", area: "Back-end", color: "bg-[#7851cf]" },
  { initials: "CA", name: "Caio Alves", area: "Dados", color: "bg-[#42a5a5]" },
  { initials: "LI", name: "Lívia Rocha", area: "UX/UI Design", color: "bg-[#e69251]" },
  { initials: "BR", name: "Bruna Costa", area: "Mobile", color: "bg-[#d15ca9]" },
  { initials: "RA", name: "Rafael Nunes", area: "DevOps", color: "bg-[#4e8aca]" },
  { initials: "MA", name: "Marina Souza", area: "QA", color: "bg-[#7b9c51]" },
  { initials: "GU", name: "Gustavo Melo", area: "Cibersegurança", color: "bg-[#c2665d]" },
  { initials: "BE", name: "Beatriz Freitas", area: "Product Management", color: "bg-[#9a67d6]" },
  { initials: "VI", name: "Victor Hugo", area: "Cloud", color: "bg-[#367d91]" },
  { initials: "IS", name: "Isabela Ramos", area: "Inteligência Artificial", color: "bg-[#bd7e43]" },
  { initials: "LE", name: "Leonardo Reis", area: "Blockchain", color: "bg-[#5763b6]" },
  { initials: "PA", name: "Paula Mendes", area: "Developer Relations", color: "bg-[#b65887]" },
  { initials: "FE", name: "Felipe Barros", area: "Game Development", color: "bg-[#4b9b80]" },
  { initials: "TA", name: "Tainá Oliveira", area: "Acessibilidade", color: "bg-[#aa704b]" },
  { initials: "DI", name: "Diego Moreira", area: "Software Architecture", color: "bg-[#7268a7]" },
] as const;

export const squadFilters = ["Todas", "Front-end", "Back-end", "Dados", "Design"] as const;

export const squads = [
  { name: "Pixel Pioneers", area: "Front-end", description: "Interfaces modernas, acessíveis e experiências que fazem diferença.", captain: "Ana Martins", initials: "PP", captainInitials: "AM", color: "#5904D6" },
  { name: "Node Navigators", area: "Back-end", description: "APIs robustas, boas práticas e arquitetura para projetos reais.", captain: "João Lima", initials: "NN", captainInitials: "JL", color: "#7427ED" },
  { name: "Data Orbit", area: "Dados", description: "Explorando dados, visualizações e decisões orientadas por evidências.", captain: "Caio Alves", initials: "DO", captainInitials: "CA", color: "#8D3FFF" },
  { name: "Design Bridge", area: "Design", description: "Do problema à interface: pesquisa, prototipação e colaboração.", captain: "Lívia Rocha", initials: "DB", captainInitials: "LR", color: "#7427ED" },
] as const;
