// Objetivo: Criar o cabeçalho da aplicação
// - Exibe logo (favicon.svg) e título "RESETFY"
// - Inclui switch de tema claro/escuro

import { createElement, type ReactElement } from 'react';
import { Switch } from './Switch';

export function createHeader(): ReactElement {
  return createElement(
    'header',
    { className: 'background-global shadow-md' },
    createElement(
      'div',
      { className: 'mx-auto flex items-center justify-between px-4 py-4' },
      createElement(
        'div',
        { className: 'flex items-center' },
        createElement('img', { src: '/favicon.svg', alt: 'RESETFY', className: 'mr-3 h-8 w-8' }),
        createElement('h1', { className: 'text-2xl font-bold text-content-xstrong' }, 'RESETFY'),
      ),
      createElement(Switch),
    ),
  );
}
