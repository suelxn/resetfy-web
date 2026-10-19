// Objetivo: Definir tipos e interfaces da aplicação
// - Modo: 'foco' ou 'pausa'
// - StatusTimer: estado exibido no badge (naoIniciado, foco, pausa, interrompido)
// - TimerState: estado do cronômetro (tempo, modo, ativo, status)
// - Suggestion: sugestão de exercício

export type Modo = 'foco' | 'pausa';

export type StatusTimer = 'naoIniciado' | 'foco' | 'pausa' | 'interrompido';

export interface TimerState {
  tempoRestante: number;
  tempoTotal: number;
  modo: Modo;
  ativo: boolean;
  ciclo: number;
  status: StatusTimer;
}

export interface Suggestion {
  id: number;
  titulo: string;
  descricao: string;
}
