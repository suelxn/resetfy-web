// Objetivo: Orquestrador principal da aplicação
// - Importa estilos e componentes
// - Monta a estrutura visual na página
// - Inicializa listeners de eventos e lógica do timer

import './styles/main.css';
import { createLayout } from './components/Layout';
import { createHeader } from './components/Header';
import { createModeIndicator } from './components/ModeIndicator';
import { createBadge } from './components/Badge';
import { createTimer } from './components/Timer';
import { createControls } from './components/Controls';
import { createSuggestionsModal } from './components/SuggestionsModal';
import { subscribe, iniciar, pausar, resetar, getState } from './state/timerState';
import { formatarTempo } from './utils/formatTime';
import { suggestions } from './config/suggestions';

// Renderiza a estrutura visual completa com Layout global
const app = document.getElementById('app')!;
const layout = createLayout();

// Main content: Mode + Badge + Timer + Controls
const mainContent = document.createElement('div');
mainContent.className = 'flex flex-col flex-1 items-center justify-center gap-[80px]';

// Top: Mode Indicator + Badge lado a lado (mesma largura do Timer)
const topContainer = document.createElement('div');
topContainer.className = 'flex items-center justify-between w-70 align-middle';
topContainer.appendChild(createModeIndicator());
topContainer.appendChild(createBadge({ text: 'Ciclo 1 de ∞' }));
topContainer.children[1].id = 'cycle-info';

mainContent.appendChild(topContainer);
mainContent.appendChild(createTimer());
mainContent.appendChild(createControls());

// Monta layout: Header + Main + Modal
layout.appendChild(createHeader());
layout.appendChild(mainContent);
layout.appendChild(createSuggestionsModal());
app.appendChild(layout);

// Índice da sugestão atual
let indiceAtual = 0;

// Conecta eventos dos botões à lógica do timer
function inicializarEventos() {
  const playBtn = document.getElementById('play-btn')! as HTMLButtonElement;
  const pauseBtn = document.getElementById('pause-btn')! as HTMLButtonElement;
  const resetBtn = document.getElementById('reset-btn')! as HTMLButtonElement;
  const nextSuggestionBtn = document.getElementById('next-suggestion-btn')! as HTMLButtonElement;
  const okSuggestionBtn = document.getElementById('ok-suggestion-btn')! as HTMLButtonElement;

  playBtn.addEventListener('click', () => {
    iniciar();
    playBtn.disabled = true;
    pauseBtn.disabled = false;
  });

  pauseBtn.addEventListener('click', () => {
    pausar();
    playBtn.disabled = false;
    pauseBtn.disabled = true;
  });

  resetBtn.addEventListener('click', () => {
    resetar();
    indiceAtual = 0;
    playBtn.disabled = false;
    pauseBtn.disabled = true;
    fecharModal();
  });

  nextSuggestionBtn.addEventListener('click', () => {
    indiceAtual = (indiceAtual + 1) % suggestions.length;
    atualizarSugestao();
  });

  okSuggestionBtn.addEventListener('click', fecharModal);
}

// Atualiza display do cronômetro quando estado muda
function atualizarDisplay(state: any) {
  const timeDisplay = document.getElementById('time-display')!;
  const modeIndicator = document.getElementById('mode-indicator')!;
  const cycleInfo = document.getElementById('cycle-info')!;

  timeDisplay.textContent = formatarTempo(state.tempoRestante);
  modeIndicator.textContent = state.modo === 'foco' ? 'FOCO' : 'PAUSA';
  modeIndicator.className = state.modo === 'foco'
    ? 'text-lg font-semibold text-pink-300'
    : 'text-lg font-semibold text-blue-300';
  cycleInfo.textContent = `Ciclo ${state.ciclo} de ∞`;

  // Mostra modal de sugestões ao entrar em modo pausa
  if (state.modo === 'pausa' && !state.ativo) {
    indiceAtual = 0;
    atualizarSugestao();
    abrirModal();
  }

  // Atualiza título da aba
  document.title = `${formatarTempo(state.tempoRestante)} - ${state.modo.toUpperCase()} - RESETFY`;
}

// Abre modal de sugestões
function abrirModal() {
  const modal = document.getElementById('suggestions-modal')!;
  modal.classList.remove('hidden');
}

// Fecha modal de sugestões
function fecharModal() {
  const modal = document.getElementById('suggestions-modal')!;
  modal.classList.add('hidden');
}

// Atualiza sugestão exibida no modal
function atualizarSugestao() {
  const sugestao = suggestions[indiceAtual];
  const suggestionText = document.getElementById('suggestion-text')!;
  suggestionText.innerHTML = `<strong>${sugestao.titulo}</strong><br/><br/>${sugestao.descricao}`;
}

// Subscreve para receber atualizações do timer
subscribe(atualizarDisplay);

// Inicializa a aplicação
inicializarEventos();
atualizarDisplay(getState());