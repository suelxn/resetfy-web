// Objetivo: Container global da aplicação
// - Define background, cor de texto e estrutura de layout
// - Envolve Header, Main content e Modal

import { createElement, type ReactElement, type ReactNode } from 'react';

export function createLayout(...children: ReactNode[]): ReactElement {
  return createElement(
    'div',
    { id: 'layout', className: 'flex min-h-screen w-full flex-col bg-background-global text-content-xstrong' },
    ...children,
  );
}
