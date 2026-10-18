// Objetivo: Exibir indicador de modo (Foco/Pausa)
// - Mostra o modo atual em texto
// - A cor muda entre text-brand-default (foco) e text-mode-break (pausa)

import { createElement, type ReactElement } from 'react';
import type { Modo } from '../types';

export function createModeIndicator(modo: Modo): ReactElement {
  const isFoco = modo === 'foco';

  return createElement(
    'div',
    {
      id: 'mode-indicator',
      className: ['px-2 text-lg font-bold text-content-xstrong', isFoco ? 'text-brand-default' : 'text-mode-break'].join(' '),
    },
    isFoco ? 'FOCO' : 'PAUSA',
  );
}
