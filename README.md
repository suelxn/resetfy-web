# Resetfy Web - Timer de Concentração e Pausa

Aplicação web em desenvolvimento nasceu com o objetivo de me ajudar na prevenção de doenças ocupacionais relacionadas ao uso prolongado de computador.

O Resetfy tem como objetivo incentivar pausas durante a jornada de uso do computador, exibindo lembretes, sugestões de exercícios e orientações para reduzir riscos de problemas como LER/DORT, síndrome do túnel do carpo e fadiga visual.

## Funcionalidades

* **Cronômetro Pomodoro**: Ciclos automáticos de 50 minutos de foco e 5 minutos de pausa
* **Controles Intuitivos**: Botões Iniciar, Pausar e Resetar o temporizador
* **Indicador de Modo**: Exibe visualmente se está em modo Foco ou Pausa
* **Sugestões de Exercícios**: Modal com sugestões de exercícios durante o período de pausa
* **Tema Claro/Escuro**: Switch para alternar entre tema dark e light com paleta de cores personalizadas
* **Exibição em Tempo Real**: Atualiza o título da aba e a interface em tempo real
* **Responsividade**: Interface otimizada para diferentes tamanhos de tela


## Tecnologias Utilizadas

* **React 19**: Interface em componentes de função com hooks
* **Vite**: Build tool moderno e rápido
* **TypeScript**: Lógica com tipagem estática
* **Tailwind CSS**: Estilização com CSS utilities
* **HTML5**: Estrutura semântica
* **CSS Custom Properties**: Sistema de temas dinâmicos (light/dark)



## Estrutura do Projeto

```
src/
├── assets/                  # Ícones SVG usados na interface
│   ├── bedtime.svg          # Ícone do tema escuro
│   ├── close.svg            # Ícone de fechar
│   ├── light_mode.svg       # Ícone do tema claro
│   ├── logo-suelendias.svg  # Logo
│   └── setting.svg          # Ícone de configurações
├── components/              # Componentes de interface
│   ├── Badge.tsx             # Badge reutilizável (ex.: ciclo atual)
│   ├── Button.tsx            # Botão com texto e variantes
│   ├── Controls.tsx          # Botões de controle (Iniciar, Pausar, Encerrar)
│   ├── Header.tsx            # Cabeçalho com logo, título e switch de tema
│   ├── IconButton.tsx        # Botão só com ícone lucide (aceita apenas os ícones registrados)
│   ├── Layout.tsx            # Container global da aplicação
│   ├── ModeIndicator.tsx     # Indicador de modo (Foco/Pausa)
│   ├── SuggestionsModal.tsx  # Modal com sugestões de exercício na pausa
│   ├── Switch.tsx            # Switch de tema claro/escuro (com estado)
│   └── Timer.tsx             # Display do cronômetro (MM:SS)
├── config/                  # Configurações e constantes
│   ├── constants.ts         # Tempos (foco: 50min, pausa: 5min)
│   └── suggestions.ts       # Lista de sugestões de exercícios
├── state/                   # Gerenciamento de estado
│   └── timerState.ts        # Lógica do timer e hook useTimer
├── styles/                  # Estilos globais
│   ├── colors.css           # Paleta de cores da marca
│   ├── main.css             # Importações de CSS
│   └── theme.css            # Variáveis CSS dos temas (light/dark)
├── types/                   # Definições de tipos TypeScript
│   └── index.ts             # Interfaces (Modo, TimerState, Suggestion)
├── utils/                   # Funções utilitárias
│   ├── dom.ts               # Acesso seguro a elementos do DOM (getElement)
│   ├── formatTime.ts        # Converte segundos em MM:SS
│   └── theme.ts             # Lê, salva e aplica o tema
├── vite-env.d.ts            # Tipos do Vite (imports de SVG)
└── main.tsx                  # Orquestrador: componente App e montagem na página
```


## Como Executar o Projeto

### Pré-requisitos

* **Node.js** (versão 16+)
* **npm** ou **yarn**

### Instalação

```bash
# Clonar repositório
git clone <url-repositorio>
cd resetfy-web

# Instalar dependências
npm install
```

### Desenvolvimento

```bash
# Inicia o servidor de desenvolvimento com hot reload
npm run dev
```

Acesse `http://localhost:5173` no navegador.

### Build para Produção

```bash
# Compila TypeScript e otimiza para produção
npm run build

# Preview da build
npm run preview
```


## Arquitetura

### Padrão de Estado (Observer + hook)
O `timerState.ts` implementa um padrão Observer. O hook `useTimer` se inscreve nele e faz o componente re-renderizar a cada mudança:
```typescript
const state = useTimer();  // Recebe atualizações em tempo real
```

### Sistema de Temas
Utiliza **CSS Custom Properties** para temas dinâmicos:
- **Dark**: Fundo escuro com cores vibrantes
- **Light**: Fundo branco com cores adaptadas

Variáveis configuráveis em `src/styles/theme.css`

### Separação de Responsabilidades
- **Components**: Funções que recebem dados por props e devolvem elementos React (sem estado global)
- **State**: Gerencia lógica do timer e expõe o hook `useTimer`
- **Main**: Componente `App` que liga o estado aos componentes
- **Config**: Centraliza configurações e dados
- **Utils**: Funções reutilizáveis
- **Types**: Interfaces TypeScript


## Personalização

### Alterar Cores dos Temas
Edite `src/styles/theme.css`:
```css
:root {
  --color-mode-indicator: #F01A75;  /* Cor de FOCO */
  --color-timer: #F01A75;           /* Cor do TIMER */
}

[data-theme="light"] {
  --color-mode-indicator: #F01A75;  /* Cor de FOCO no modo light */
}
```

### Alterar Durações
Edite `src/config/constants.ts`:
```typescript
export const TEMPOS = {
  FOCO: 50 * 60,    // Minutos de foco
  PAUSA: 5 * 60,    // Minutos de pausa
};
```

### Adicionar Sugestões de Exercício
Edite `src/config/suggestions.ts` e adicione novos exercícios à array.
