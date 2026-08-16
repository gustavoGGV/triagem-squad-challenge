# Desafio de UI — Squads He4rt

Uma experiência de candidatura para as Squads da He4rt Developers. O projeto apresenta um formulário em etapas, revisão editável, tela de confirmação e interface responsiva com temas claro e escuro.

## Destaques

- Formulário de candidatura em 5 etapas com validação por etapa.
- Resumo da candidatura em tempo real, exibido como crachá lateral.
- Tela de revisão para editar qualquer conjunto de respostas antes do envio.
- Tela de sucesso com resumo completo e instruções para o desafio no GitHub.
- Alternância entre modo claro e escuro.
- Header responsivo com menu lateral em telas menores.
- Acessibilidade: validação anunciada, foco no primeiro campo inválido, navegação por teclado, drawer com foco contido e suporte a redução de movimento.

## Tecnologias

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## Estrutura principal

```text
src/app/
├── assets/                # Logos da He4rt
├── components/
│   ├── ApplicationForm.tsx # Formulário, revisão e confirmação
│   └── Header.tsx          # Navegação e menu responsivo
├── globals.css             # Estilos e animações globais
├── icon.tsx                # Ícone roxo da aba do navegador
├── layout.tsx
└── page.tsx
```

---

Desafio de UI | Squads He4rt
