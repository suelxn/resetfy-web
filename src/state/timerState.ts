// Objetivo: Gerenciar estado do cronômetro
// - Rastreia: tempo restante, modo (foco/pausa), status (ativo/pausado), status do badge e ciclos concluídos hoje
// - O tempo é sempre calculado pelo relógio do sistema (targetTime - Date.now()), não pelo número de ticks do setInterval
// - Salva o estado do timer em resetfy_timer_state, para retomar após recarregar, fechar ou suspender a aba
// - Fornece funções para: iniciar, pausar, resetar, pular pausa, resetar ciclos e configurar durações
// - Notifica componentes quando estado muda (padrão Observer)

import type { Modo, StatusTimer, TimerSalvo, TimerState } from '../types/index';
import { useEffect, useState } from 'react';
import { notificarFimDoFoco, pedirPermissaoNotificacao } from '../utils/notificacao';
import {
  CHAVE_TIMER,
  hoje,
  lerJSON,
  lerPreferencias,
  salvarJSON,
  salvarPreferencias,
} from '../utils/armazenamento';

// Durações atuais em segundos. Começam nas preferências salvas (em minutos) ou nos valores padrão
const prefsIniciais = lerPreferencias();
const duracoes = {
  foco: prefsIniciais.focusDuration * 60,
  pausa: prefsIniciais.breakDuration * 60,
};

const CHAVE_DURACAO: Record<Modo, 'focusDuration' | 'breakDuration'> = {
  foco: 'focusDuration',
  pausa: 'breakDuration',
};

const STATUS_VALIDOS: StatusTimer[] = ['naoIniciado', 'foco', 'pausa', 'interrompido'];

// Momento (timestamp em ms) em que o ciclo atual termina. Só existe enquanto o timer está rodando
let targetTime: number | null = null;
let intervalId: number | null = null;
const subscribers: Set<(state: TimerState) => void> = new Set();

// Segundos que faltam até o timestamp de término. Arredonda para cima para não mostrar 00:00 antes da hora
function segundosRestantes(alvo: number): number {
  return Math.max(0, Math.ceil((alvo - Date.now()) / 1000));
}

// Ciclos de foco concluídos hoje. Se a última conclusão foi em outro dia, o contador vale 0
function ciclosDeHoje(): number {
  const prefs = lerPreferencias();
  return prefs.lastCompletedDate === hoje() ? prefs.completedCyclesToday : 0;
}

// Grava o estado atual do timer para retomar depois de recarregar a página
function salvarTimer() {
  const salvo: TimerSalvo = {
    targetTime,
    remainingTime: state.tempoRestante,
    status: state.status,
    duration: state.tempoTotal,
    cycleType: state.modo,
  };
  salvarJSON(CHAVE_TIMER, salvo);
}

// Lê o timer salvo. Dados corrompidos ou com formato inesperado viram null (começa do zero)
function lerTimer(): TimerSalvo | null {
  const dados = lerJSON(CHAVE_TIMER) as Partial<Record<keyof TimerSalvo, unknown>> | null;
  if (!dados || typeof dados !== 'object') return null;

  const { targetTime: alvo, remainingTime, status, duration, cycleType } = dados;
  const alvoValido = alvo === null || (typeof alvo === 'number' && Number.isFinite(alvo));

  if (
    !alvoValido ||
    typeof remainingTime !== 'number' || !Number.isFinite(remainingTime) || remainingTime < 0 ||
    typeof duration !== 'number' || !Number.isFinite(duration) || duration <= 0 ||
    !STATUS_VALIDOS.includes(status as StatusTimer) ||
    (cycleType !== 'foco' && cycleType !== 'pausa')
  ) {
    return null;
  }

  return {
    targetTime: alvo as number | null,
    remainingTime,
    status: status as StatusTimer,
    duration,
    cycleType,
  };
}

// Monta o estado inicial a partir do timer salvo, ou começa do zero se não houver nada válido
function carregarEstadoInicial(): TimerState {
  const estado: TimerState = {
    tempoRestante: duracoes.foco,
    tempoTotal: duracoes.foco,
    modo: 'foco',
    ativo: false,
    ciclosHoje: ciclosDeHoje(),
    status: 'naoIniciado',
  };

  const salvo = lerTimer();
  if (!salvo) return estado;

  estado.modo = salvo.cycleType;
  estado.tempoTotal = salvo.duration;
  estado.tempoRestante = salvo.remainingTime;
  estado.status = salvo.status;
  targetTime = salvo.targetTime;

  // Com o relógio rodando, o status segue o modo. Parado, "foco" vira "interrompido" (não há contagem para retomar)
  if (targetTime !== null) {
    estado.status = estado.modo === 'pausa' ? 'pausa' : 'foco';
  } else if (estado.status === 'foco') {
    estado.status = 'interrompido';
  }

  return estado;
}

let state: TimerState = carregarEstadoInicial();

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

// Para o relógio e descarta o término previsto, sem mudar o status do badge
function parar() {
  targetTime = null;
  state.ativo = false;
  if (intervalId !== null) clearInterval(intervalId);
  intervalId = null;
}

// Registra um foco concluído no contador diário. Salvo no localStorage, zera na virada do dia
function registrarCicloConcluido() {
  const prefs = lerPreferencias();
  const total = (prefs.lastCompletedDate === hoje() ? prefs.completedCyclesToday : 0) + 1;

  salvarPreferencias({ completedCyclesToday: total, lastCompletedDate: hoje() });
  state.ciclosHoje = total;
}

// Fim do foco: conta o ciclo e espera o usuário escolher fazer a pausa ou pular (status "pausa")
function concluirFoco() {
  parar();
  registrarCicloConcluido();
  state.modo = 'pausa';
  state.tempoTotal = duracoes.pausa;
  state.tempoRestante = state.tempoTotal;
  state.status = 'pausa';
  salvarTimer();
  notificarFimDoFoco();
}

// Avança para o próximo ciclo de foco, parado e com status "não iniciado"
// Não conta ciclo: usado no fim da pausa e ao pular a pausa
function proximoCiclo() {
  parar();
  state.modo = 'foco';
  state.tempoTotal = duracoes.foco;
  state.tempoRestante = state.tempoTotal;
  state.status = 'naoIniciado';
  salvarTimer();
}

// Recalcula o tempo restante pelo relógio do sistema. Também cobre o ciclo que terminou com a aba em segundo plano
function atualizarPeloRelogio() {
  state.ciclosHoje = ciclosDeHoje();

  if (targetTime !== null) {
    const restante = segundosRestantes(targetTime);

    if (restante > 0) {
      state.tempoRestante = restante;
    } else if (state.modo === 'foco') {
      concluirFoco();
    } else {
      proximoCiclo();
    }
  }

  notificar();
}

// Inicia o cronômetro (também retoma o foco interrompido e a pausa)
export function iniciar() {
  if (state.ativo) return;
  pedirPermissaoNotificacao();
  state.ativo = true;
  state.status = state.modo === 'pausa' ? 'pausa' : 'foco';
  targetTime = Date.now() + state.tempoRestante * 1000;

  intervalId = window.setInterval(atualizarPeloRelogio, 1000);

  salvarTimer();
  notificar();
}

// Pausa o cronômetro pelo usuário: guarda o tempo que faltava e mostra "interrompido" (ou continua "pausa" no intervalo)
export function pausar() {
  if (targetTime !== null) {
    state.tempoRestante = segundosRestantes(targetTime);
  }
  parar();
  state.status = state.modo === 'pausa' ? 'pausa' : 'interrompido';
  salvarTimer();
  notificar();
}

// Reseta para o tempo inicial. O contador diário de ciclos é mantido: só o botão "Resetar ciclos" zera
export function resetar() {
  parar();
  state.modo = 'foco';
  state.tempoRestante = duracoes.foco;
  state.tempoTotal = duracoes.foco;
  // ENCERRAR volta ao estado "não iniciado", também após recarregar a página
  state.status = 'naoIniciado';
  salvarTimer();
  notificar();
}

// Pula a pausa e vai para o próximo ciclo (só inicia quando o usuário clicar em iniciar)
export function pularPausa() {
  proximoCiclo();
  notificar();
}

// Altera a duração de foco ou pausa, em segundos
// - Com o timer parado no mesmo modo, o tempo exibido muda na hora
// - Caso contrário, a nova duração vale a partir do próximo ciclo
// - Grava a duração em minutos em resetfy_user_preferences
export function configurarDuracao(modo: Modo, segundos: number) {
  duracoes[modo] = segundos;
  salvarPreferencias({ [CHAVE_DURACAO[modo]]: segundos / 60 });

  if (!state.ativo && state.modo === modo) {
    state.tempoRestante = segundos;
    state.tempoTotal = segundos;
    salvarTimer();
    notificar();
  }
}

// Volta a contagem diária de ciclos para 0, sem mexer no tempo nem no modo atual
export function resetarCiclos() {
  state.ciclosHoje = 0;
  salvarPreferencias({ completedCyclesToday: 0 });
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

// Ao voltar para a aba, recalcula pelo relógio: o setInterval pode ter sido atrasado ou suspenso pelo navegador
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') atualizarPeloRelogio();
});

// Restaura o cronômetro ao carregar o módulo, antes da primeira renderização
if (targetTime !== null) {
  state.ativo = true;
  intervalId = window.setInterval(atualizarPeloRelogio, 1000);
  atualizarPeloRelogio();
}
