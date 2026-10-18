// Objetivo: Exibir APENAS o cronômetro (MM:SS)
// - Recebe o tempo restante em segundos e mostra no formato MM:SS

import { createElement, type ReactElement } from 'react';
import { formatarTempo } from '../utils/formatTime';

export function createTimer(segundos: number): ReactElement {
  return createElement(
    'div',
    { id: 'time-display', className: 'font-mono text-8xl font-bold text-brand-default' },
    formatarTempo(segundos),
  );
}
