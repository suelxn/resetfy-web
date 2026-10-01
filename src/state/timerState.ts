// Objetivo: Gerenciar estado do cronômetro
// - Rastreia: tempo restante, modo (foco/pausa), status (ativo/pausado)
// - Fornece funções para: iniciar, pausar, resetar, atualizar tempo
// - Notifica componentes quando estado muda (padrão Observer)

import { TEMPOS } from '../config/constants';
import type { Modo, TimerState } from '../types/index';

let state: TimerState = {
  tempoRestante: TEMPOS.FOCO,
  tempoTotal: TEMPOS.FOCO,
  modo: 'foco',
  ativo: false,
  ciclo: 1,
};

let intervalId: number | null = null;
const subscribers: Set<(state: TimerState) => void> = new Set();

// Notifica todos os componentes que se inscreveram no estado
function notificar() {
  subscribers.forEach(callback => callback({ ...state }));
}

// Subscreve para receber atualizações de estado
export function subscribe(callback: (state: TimerState) => void) {
  subscribers.add(callback);
  return () => subscribers.delete(callback);
}

// Inicia o cronômetro
export function iniciar() {
  if (state.ativo) return;
  state.ativo = true;

  intervalId = window.setInterval(() => {
    state.tempoRestante--;

    if (state.tempoRestante <= 0) {
      alternarModo();
    }

    notificar();
  }, 1000);

  notificar();
}

// Pausa o cronômetro
export function pausar() {
  state.ativo = false;
  if (intervalId !== null) clearInterval(intervalId);
  notificar();
}

// Reseta para o tempo inicial
export function resetar() {
  pausar();
  state.ciclo = 1;
  state.modo = 'foco';
  state.tempoRestante = TEMPOS.FOCO;
  state.tempoTotal = TEMPOS.FOCO;
  notificar();
}

// Alterna entre Foco e Pausa
function alternarModo() {
  if (state.modo === 'foco') {
    state.modo = 'pausa';
    state.tempoTotal = TEMPOS.PAUSA;
  } else {
    state.modo = 'foco';
    state.ciclo++;
    state.tempoTotal = TEMPOS.FOCO;
  }
  state.tempoRestante = state.tempoTotal;
  pausar();
  notificar();
}

// Retorna estado atual
export function getState(): TimerState {
  return { ...state };
}
