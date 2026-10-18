// Objetivo: Componente de badge para indicadores visuais
// - Exibe status/tags com estilo único padronizado
// - Usado para: ciclo, tags, indicadores

import { createElement, type ReactElement } from 'react';

export interface BadgeConfig {
  text: string;
  id?: string;
}

export function createBadge(config: BadgeConfig): ReactElement {
  return createElement(
    'span',
    {
      id: config.id,
      className: 'inline-block rounded-full bg-brand-default/50 px-2 py-1 text-sm font-medium text-neutral-0',
    },
    config.text,
  );
}
