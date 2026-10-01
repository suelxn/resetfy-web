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

* **Vite**: Build tool moderno e rápido
* **TypeScript**: Lógica com tipagem estática
* **Tailwind CSS**: Estilização com CSS utilities
* **HTML5**: Estrutura semântica
* **CSS Custom Properties**: Sistema de temas dinâmicos (light/dark)



## Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Header.ts       # Cabeçalho com logo e switch de tema
│   ├── Timer.ts        # Display do cronômetro (MM:SS)
│   ├── ModeIndicator.ts # Indicador de modo (Foco/Pausa)
│   ├── Badge.ts        # Componente de badge reutilizável
│   ├── Button.ts       # Componente de botão customizável
│   ├── Controls.ts     # Botões de controle (Play, Pause, Reset)
│   ├── Switch.ts       # Switch de tema claro/escuro
│   ├── SuggestionsModal.ts # Modal com sugestões de exercício
│   └── Layout.ts       # Container global com estilos globais
├── config/             # Configurações e constantes
│   ├── theme.ts        # Configuração de temas
│   ├── theme.css       # Variáveis CSS dos temas
│   ├── constants.ts    # Tempos (foco: 50min, pausa: 5min)
│   ├── suggestions.ts  # Lista de sugestões de exercícios
│   └── colors.ts       # Paleta de cores da marca
├── state/              # Gerenciamento de estado
│   └── timerState.ts   # Lógica central do timer (iniciar, pausar, resetar)
├── types/              # Definições de tipos TypeScript
│   └── index.ts        # Interfaces (Modo, TimerState, Suggestion)
├── utils/              # Funções utilitárias
│   └── formatTime.ts   # Converte segundos em MM:SS
├── styles/             # Estilos globais
│   └── main.css        # Importações de CSS
└── main.ts             # Orquestrador principal da aplicação
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

### Padrão de Estado (Observer)
O `timerState.ts` implementa um padrão Observer onde componentes se inscrevem para mudanças de estado:
```typescript
subscribe(atualizarDisplay);  // Recebe atualizações em tempo real
```

### Sistema de Temas
Utiliza **CSS Custom Properties** para temas dinâmicos:
- **Dark**: Fundo escuro com cores vibrantes
- **Light**: Fundo branco com cores adaptadas

Variáveis configuráveis em `src/styles/theme.css`

### Separação de Responsabilidades
- **Components**: Apenas renderizam elementos DOM
- **State**: Gerencia lógica do timer
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
