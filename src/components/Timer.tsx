// Objetivo: Exibir APENAS o cronômetro (MM:SS)
// - Recebe o tempo restante em segundos e mostra no formato MM:SS

import type { FC } from 'react';
import { formatarTempo } from '../utils/formatTime';

interface TimerProps {
  segundos: number;
}

export const Timer: FC<TimerProps> = ({ segundos }) => {
  return (
    <div id="time-display" className="font-mono text-8xl font-bold text-brand-default">
      {formatarTempo(segundos)}
    </div>
  );
};
