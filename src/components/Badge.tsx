// Objetivo: Componente de badge para indicadores visuais
// - Exibe status/tags com estilo único padronizado
// - Variante dot: sem fundo, mostra um ponto de 8px antes do texto, na cor do status
// - Usado para: ciclo, status do timer

import type { FC } from 'react';
import type { StatusTimer } from '../types';

interface BadgeProps {
  text: string;
  id?: string;
  variant?: 'default' | 'dot';
  dot?: StatusTimer;
}

const BASE_CLASSES = 'rounded-full bg-brand-default/50 px-2 py-1 text-sm font-medium text-neutral-0';

const DOT_CLASSES: Record<StatusTimer, string> = {
  naoIniciado: 'bg-badge-dot-nao-iniciado',
  foco: 'bg-badge-dot-foco',
  pausa: 'bg-badge-dot-pausa',
  interrompido: 'bg-badge-dot-interrompido',
};

export const Badge: FC<BadgeProps> = ({ text, id, variant = 'default', dot = 'foco' }) => {
  if (variant === 'dot') {
    return (
      <span id={id} className="inline-flex items-center gap-2 px-2 text-sm font-bold text-content-xstrong">
        <span aria-hidden="true" className={`size-2 rounded-full ${DOT_CLASSES[dot]}`} />
        {text}
      </span>
    );
  }

  return (
    <span id={id} className={`inline-block ${BASE_CLASSES}`}>
      {text}
    </span>
  );
};
