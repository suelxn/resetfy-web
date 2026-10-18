// Objetivo: Orquestrador principal da aplicação
// - Importa estilos e componentes
// - Monta a estrutura visual na página
// - Conecta botões e modal à lógica do timer

import { StrictMode, createElement, useEffect, useState, type ReactElement } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/main.css';
import { createLayout } from './components/Layout';
import { createHeader } from './components/Header';
import { createModeIndicator } from './components/ModeIndicator';
import { createBadge } from './components/Badge';
import { createTimer } from './components/Timer';
import { createControls } from './components/Controls';
import { createSuggestionsModal } from './components/SuggestionsModal';
import { useTimer, iniciar, pausar, resetar } from './state/timerState';
import { formatarTempo } from './utils/formatTime';
import { getElement } from './utils/dom';
import { suggestions } from './config/suggestions';

function App(): ReactElement {
  const state = useTimer();
  // Índice da sugestão exibida no modal
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [modalAberto, setModalAberto] = useState(false);

  // Atualiza o título da aba sempre que o tempo ou o modo mudam
  useEffect(() => {
    document.title = `${formatarTempo(state.tempoRestante)} - ${state.modo.toUpperCase()} - RESETFY`;
  }, [state.tempoRestante, state.modo]);

  // Abre o modal de sugestões ao entrar em pausa
  useEffect(() => {
    if (state.modo === 'pausa' && !state.ativo) {
      setIndiceAtual(0);
      setModalAberto(true);
    }
  }, [state.modo, state.ativo]);

  function encerrar() {
    resetar();
    setIndiceAtual(0);
    setModalAberto(false);
  }

  function proximaSugestao() {
    setIndiceAtual(indice => (indice + 1) % suggestions.length);
  }

  return createLayout(
    createHeader(),
    createElement(
      'main',
      { className: 'flex flex-1 flex-col items-center justify-center gap-20' },
      createElement(
        'div',
        { className: 'flex w-70 items-center justify-between' },
        createModeIndicator(state.modo),
        createBadge({ id: 'cycle-info', text: `Ciclo ${state.ciclo}` }),
      ),
      createTimer(state.tempoRestante),
      createControls({ ativo: state.ativo, onIniciar: iniciar, onPausar: pausar, onEncerrar: encerrar }),
    ),
    modalAberto && createSuggestionsModal({
      sugestao: suggestions[indiceAtual],
      onProxima: proximaSugestao,
      onFechar: () => setModalAberto(false),
    }),
  );
}

createRoot(getElement('app')).render(createElement(StrictMode, null, createElement(App)));
