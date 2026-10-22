// Objetivo: Ler e gravar dados no localStorage com segurança
// - resetfy_user_preferences: tema, durações (em minutos), ciclos concluídos hoje e data da última conclusão
// - resetfy_timer_state: estado do cronômetro (targetTime, status, duração e tipo de ciclo), para retomar após recarregar
// - Toda leitura e escrita tem try/catch: storage bloqueado ou dados corrompidos usam o padrão, sem quebrar a aplicação

import { TEMPOS } from '../config/constants';

export const CHAVE_PREFERENCIAS = 'resetfy_user_preferences';
export const CHAVE_TIMER = 'resetfy_timer_state';

export interface Preferencias {
  theme: 'dark' | 'light';
  focusDuration: number;
  breakDuration: number;
  completedCyclesToday: number;
  lastCompletedDate: string;
}

export const PREFERENCIAS_PADRAO: Preferencias = {
  theme: 'dark',
  focusDuration: TEMPOS.FOCO / 60,
  breakDuration: TEMPOS.PAUSA / 60,
  completedCyclesToday: 0,
  lastCompletedDate: '',
};

// Data de hoje no formato AAAA-MM-DD (fuso local)
export function hoje(): string {
  const agora = new Date();
  const mes = String(agora.getMonth() + 1).padStart(2, '0');
  const dia = String(agora.getDate()).padStart(2, '0');
  return `${agora.getFullYear()}-${mes}-${dia}`;
}

export function lerJSON(chave: string): unknown {
  try {
    const bruto = localStorage.getItem(chave);
    return bruto === null ? null : JSON.parse(bruto);
  } catch {
    return null;
  }
}

export function salvarJSON(chave: string, valor: unknown): void {
  try {
    localStorage.setItem(chave, JSON.stringify(valor));
  } catch {
    // Armazenamento indisponível (ex.: navegação privada): os dados valem só nesta sessão
  }
}

function numeroNoIntervalo(valor: unknown, minimo: number, maximo: number, padrao: number): number {
  return typeof valor === 'number' && Number.isFinite(valor) && valor >= minimo && valor <= maximo ? valor : padrao;
}

// Lê as preferências salvas, completando com o padrão o que estiver ausente ou fora da faixa dos sliders
export function lerPreferencias(): Preferencias {
  const salvo = lerJSON(CHAVE_PREFERENCIAS);
  const dados: Partial<Record<keyof Preferencias, unknown>> = salvo && typeof salvo === 'object' ? salvo : {};

  return {
    theme: dados.theme === 'light' ? 'light' : 'dark',
    focusDuration: numeroNoIntervalo(dados.focusDuration, 5, 90, PREFERENCIAS_PADRAO.focusDuration),
    breakDuration: numeroNoIntervalo(dados.breakDuration, 1, 30, PREFERENCIAS_PADRAO.breakDuration),
    completedCyclesToday: Math.max(0, Math.floor(numeroNoIntervalo(dados.completedCyclesToday, 0, Infinity, 0))),
    lastCompletedDate: typeof dados.lastCompletedDate === 'string' ? dados.lastCompletedDate : '',
  };
}

// Grava apenas os campos informados, mantendo os demais
export function salvarPreferencias(parcial: Partial<Preferencias>): void {
  salvarJSON(CHAVE_PREFERENCIAS, { ...lerPreferencias(), ...parcial });
}
