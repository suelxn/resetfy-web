// Objetivo: Definir tipos e interfaces da aplicação
// - Modo: 'foco' ou 'pausa'
// - TimerState: estado do cronômetro (tempo, modo, ativo)
// - Suggestion: sugestão de exercício

export type Modo = 'foco' | 'pausa';

export interface TimerState {
  tempoRestante: number;
  tempoTotal: number;
  modo: Modo;
  ativo: boolean;
  ciclo: number;
}

export interface Suggestion {
  id: number;
  titulo: string;
  descricao: string;
}
