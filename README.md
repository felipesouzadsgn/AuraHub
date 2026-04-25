# 🌌 AuraHub - Comando Central

**AuraHub** é um sistema central de comando pessoal, desenhado com uma interface premium (dark mode com brilhos "Aura"), feito para maximizar sua performance, organizar suas finanças, rastrear hábitos e gerenciar seu conhecimento. Tudo isso de forma unificada e gamificada.

## ✨ Módulos Principais

O AuraHub é dividido em módulos de alta performance (Nós/Engines), cada um com um propósito específico para a sua evolução:

- 📊 **Weekly Analytics:** Visão geral do seu progresso na semana.
- 💰 **Financial Node:** Controle completo e estruturado do seu patrimônio.
- ⚔️ **Training Engine:** "Forja o corpo, fortalece a mente". Rastreamento da evolução física.
- 🧬 **Habit Matrix:** "Disciplina diária, dominação eterna". Acompanhamento de hábitos essenciais.
- 🧠 **Second Brain (Knowledge Base):** Seu espaço centralizado de conhecimento, anotações e ideias.
- 🎯 **Goal Tracker:** "Metas claras, resultados reais". Transforme sua visão de longo prazo em execução diária.
- ⏱️ **Focus Engine:** Ferramenta de foco profundo para produção máxima.
- 🏆 **Achievements:** Sistema de recompensas e conquistas para gamificar a sua jornada.

## 🚀 Tecnologias

Este projeto foi construído utilizando uma stack moderna e extremamente performática:

- **[React 19](https://react.dev/)** + **[TypeScript](https://www.typescriptlang.org/)**
- **[Vite](https://vitejs.dev/)** (Build e Dev Server)
- **[Tailwind CSS](https://tailwindcss.com/)** (Estilização utility-first)
- **[Framer Motion](https://www.framer.com/motion/)** (Animações fluidas e micro-interações)
- **[Shadcn/UI](https://ui.shadcn.com/)** (Componentes de UI acessíveis e altamente customizáveis)
- **[Recharts](https://recharts.org/)** (Visualização de dados)
- **[Lucide React](https://lucide.dev/)** (Iconografia moderna)

## 📦 Como rodar o projeto localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) (Recomendado v20+)
- Gerenciador de pacotes (`npm`, `yarn`, `pnpm` ou `bun`)

### Passos

1. **Clone o repositório:**
   ```bash
   git clone git@github.com:felipesouzadsgn/AuraHub.git
   cd AuraHub
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Acesse a aplicação:**
   Abra `http://localhost:3000` (ou a porta exibida no terminal) no seu navegador.

## 📂 Estrutura de Diretórios

```text
AuraHub/
├── src/
│   ├── components/      # Componentes globais e UI (Shadcn)
│   ├── hooks/           # Custom React hooks (ex: use-mobile)
│   ├── pages/           # Páginas da aplicação (Home.tsx)
│   ├── sections/        # Os módulos principais do sistema (Financial, Habits, Focus, etc.)
│   ├── lib/             # Funções utilitárias
│   ├── App.tsx          # Root da aplicação e rotas
│   └── main.tsx         # Entry point do React
├── tailwind.config.js   # Configurações do tema e plugins Tailwind
└── vite.config.ts       # Configurações do bundler Vite
```

## 🎨 Design e Estética

O design foi concebido com uma filosofia **Dark/Premium**, usando fundos pretos profundos (`#020202`), efeitos de desfoque de luz vermelha/azul (Aura Glow) para dar profundidade e hierarquia visual, além de transições graciosas gerenciadas pelo Framer Motion, que criam a sensação de um sistema vivo e interativo.

---
Desenvolvido por Felipe Souza.
