// Objetivo: Gerenciar estado do cronômetro
// - Rastreia: tempo restante, modo (foco/pausa), status (ativo/pausado), status do badge e ciclo
// - Fornece funções para: iniciar, pausar, resetar, pular pausa, atualizar tempo e configurar durações
// - Notifica componentes quando estado muda (padrão Observer)

import { TEMPOS } from '../config/constants';
import type { Modo, TimerState } from '../types/index';
import { useEffect, useState } from 'react';
import { notificarFimDoFoco, pedirPermissaoNotificacao } from '../utils/notificacao';

// Durações atuais em segundos. Começam nos valores padrão e podem ser alteradas pela configuração
const duracoes = {
  foco: TEMPOS.FOCO,
  pausa: TEMPOS.PAUSA,
};

const CHAVE_ULTIMO_INICIO = 'ultimoInicio';
const CHAVE_CICLO = 'ciclo';

// Data de hoje no formato AAAA-MM-DD (fuso local)
function hoje(): string {
  const agora = new Date();
  const mes = String(agora.getMonth() + 1).padStart(2, '0');
  const dia = String(agora.getDate()).padStart(2, '0');
  return `${agora.getFullYear()}-${mes}-${dia}`;
}

// Indica se o cronômetro já foi iniciado hoje (salvo no navegador)
function iniciouHoje(): boolean {
  try {
    return localStorage.getItem(CHAVE_ULTIMO_INICIO) === hoje();
  } catch {
    return false;
  }
}

function registrarInicioHoje() {
  try {
    localStorage.setItem(CHAVE_ULTIMO_INICIO, hoje());
  } catch {
    // Armazenamento indisponível: o status "não iniciado" volta a valer só nesta sessão
  }
}

// Esquece o início de hoje: o cronômetro volta a contar como "não iniciado"
function esquecerInicioHoje() {
  try {
    localStorage.removeItem(CHAVE_ULTIMO_INICIO);
  } catch {
    // Armazenamento indisponível: nada a limpar
  }
}

// Ciclo salvo no navegador, para não voltar ao ciclo 1 ao recarregar a página
function lerCiclo(): number {
  try {
    const salvo = Number(localStorage.getItem(CHAVE_CICLO));
    return Number.isInteger(salvo) && salvo >= 1 ? salvo : 1;
  } catch {
    return 1;
  }
}

function salvarCiclo(ciclo: number) {
  try {
    localStorage.setItem(CHAVE_CICLO, String(ciclo));
  } catch {
    // Armazenamento indisponível: o ciclo vale só nesta sessão
  }
}

let state: TimerState = {
  tempoRestante: duracoes.foco,
  tempoTotal: duracoes.foco,
  modo: 'foco',
  ativo: false,
  ciclo: lerCiclo(),
  status: iniciouHoje() ? 'interrompido' : 'naoIniciado',
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
  return () => {
    subscribers.delete(callback);
  };
}

// Inicia o cronômetro (também retoma o foco interrompido e a pausa)
export function iniciar() {
  if (state.ativo) return;
  pedirPermissaoNotificacao();
  state.ativo = true;
  state.status = state.modo === 'pausa' ? 'pausa' : 'foco';
  registrarInicioHoje();

  intervalId = window.setInterval(() => {
    state.tempoRestante--;

    if (state.tempoRestante <= 0) {
      alternarModo();
    }

    notificar();
  }, 1000);

  notificar();
}

// Para o relógio, sem mudar o status do badge
function parar() {
  state.ativo = false;
  if (intervalId !== null) clearInterval(intervalId);
}

// Pausa o cronômetro pelo usuário: o badge mostra "interrompido" (ou continua "pausa" no intervalo)
export function pausar() {
  parar();
  state.status = state.modo === 'pausa' ? 'pausa' : 'interrompido';
  notificar();
}

// Reseta para o tempo inicial. O número de ciclos é mantido: só o botão "Resetar ciclos" zera
export function resetar() {
  parar();
  state.modo = 'foco';
  state.tempoRestante = duracoes.foco;
  state.tempoTotal = duracoes.foco;
  // ENCERRAR volta ao estado "não iniciado" e esquece o início de hoje, também após recarregar a página
  esquecerInicioHoje();
  state.status = 'naoIniciado';
  notificar();
}

// Troca de modo quando o tempo acaba
// - Fim do foco: para e espera o usuário escolher fazer a pausa ou pular (status "pausa")
// - Fim da pausa: o próximo ciclo fica parado, esperando o usuário clicar em iniciar
function alternarModo() {
  if (state.modo === 'foco') {
    parar();
    state.modo = 'pausa';
    state.tempoTotal = duracoes.pausa;
    state.tempoRestante = state.tempoTotal;
    state.status = 'pausa';
    notificarFimDoFoco();
  } else {
    proximoCiclo();
  }
  notificar();
}

// Avança para o próximo ciclo de foco, parado e com status "não iniciado"
function proximoCiclo() {
  parar();
  state.ciclo++;
  salvarCiclo(state.ciclo);
  state.modo = 'foco';
  state.tempoTotal = duracoes.foco;
  state.tempoRestante = state.tempoTotal;
  state.status = 'naoIniciado';
}

// Pula a pausa e vai para o próximo ciclo (só inicia quando o usuário clicar em iniciar)
export function pularPausa() {
  proximoCiclo();
  notificar();
}

// Altera a duração de foco ou pausa, em segundos
// - Com o timer parado no mesmo modo, o tempo exibido muda na hora
// - Caso contrário, a nova duração vale a partir do próximo ciclo
export function configurarDuracao(modo: Modo, segundos: number) {
  duracoes[modo] = segundos;

  if (!state.ativo && state.modo === modo) {
    state.tempoRestante = segundos;
    state.tempoTotal = segundos;
    notificar();
  }
}

// Volta a contagem de ciclos para 1, sem mexer no tempo nem no modo atual
export function resetarCiclos() {
  state.ciclo = 1;
  salvarCiclo(1);
  notificar();
}

// Retorna as durações atuais, em segundos
export function getDuracoes() {
  return { ...duracoes };
}

// Retorna estado atual
export function getState(): TimerState {
  return { ...state };
}

// Hook para componentes React: devolve o estado atual e re-renderiza a cada notificação
export function useTimer(): TimerState {
  const [timer, setTimer] = useState<TimerState>(getState);

  useEffect(() => subscribe(setTimer), []);

  return timer;
}
