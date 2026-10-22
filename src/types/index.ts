// Objetivo: Definir tipos e interfaces da aplicação
// - Modo: 'foco' ou 'pausa'
// - StatusTimer: estado exibido no badge (naoIniciado, foco, pausa, interrompido)
// - TimerState: estado do cronômetro (tempo, modo, ativo, status, ciclos concluídos hoje)
// - TimerSalvo: estado do cronômetro gravado no localStorage (resetfy_timer_state)
// - Suggestion: sugestão de exercício

export type Modo = 'foco' | 'pausa';

export type StatusTimer = 'naoIniciado' | 'foco' | 'pausa' | 'interrompido';

export interface TimerState {
  tempoRestante: number;
  tempoTotal: number;
  modo: Modo;
  ativo: boolean;
  ciclosHoje: number;
  status: StatusTimer;
}

export interface TimerSalvo {
  targetTime: number | null;
  remainingTime: number;
  status: StatusTimer;
  duration: number;
  cycleType: Modo;
}

export interface Suggestion {
  id: number;
  titulo: string;
  descricao: string;
}
