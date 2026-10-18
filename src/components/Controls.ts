// Objetivo: Renderizar botões de controle do timer
// - Play: inicia o cronômetro
// - Pause: pausa o cronômetro
// - Reset: volta ao estado inicial (50:00)
// - Os listeners são recebidos por props, vindos de main.ts, que conhece o estado do timer

import { createElement, type ReactElement } from 'react';
import { createButton } from './Button';

export interface ControlsProps {
  ativo: boolean;
  onIniciar: () => void;
  onPausar: () => void;
  onEncerrar: () => void;
}

export function createControls({ ativo, onIniciar, onPausar, onEncerrar }: ControlsProps): ReactElement {
  return createElement(
    'div',
    { className: 'flex justify-center gap-6 pb-16' },
    createButton({ id: 'play-btn', text: 'INICIAR', disabled: ativo, onClick: onIniciar }),
    createButton({ id: 'pause-btn', text: 'PAUSAR', variant: 'secondary', disabled: !ativo, onClick: onPausar }),
    createButton({ id: 'end-btn', text: 'ENCERRAR', variant: 'ghost', onClick: onEncerrar }),
  );
}
