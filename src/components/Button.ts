// Objetivo: Botão reutilizável com variantes
// - Variantes: default (ação principal), secondary (ação de apoio), outline (contorno)
// - Usa só as classes de cor e tipografia do styles/theme.css, então acompanha o tema

import { createElement, type ReactElement } from 'react';

export type ButtonVariant = 'default' | 'secondary' | 'outline' | 'ghost' ;
export type ButtonSize = 'sm' | 'md';

export interface ButtonConfig {
  text: string;
  id: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  onClick?: () => void;
}

const BASE_CLASSES =
  'inline-flex cursor-pointer items-center justify-center rounded-lg font-bold transition ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring-default ' +
  'disabled:pointer-events-none disabled:opacity-50';

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  default: 'bg-brand-default text-content-black hover:bg-brand-strong text-content-xstrong',
  secondary: 'bg-surface-strong text-content-strong hover:bg-surface-strong/80',
  outline: 'border border-border-default bg-surface-subtle text-content-default hover:bg-surface-strong hover:text-content-strong',
  ghost: 'bg-brand-default/50 text-content-black hover:bg-brand-strong/80 text-content-xstrong'
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'px-6 py-2',
  md: 'px-8 py-2',
};

export function createButton(config: ButtonConfig): ReactElement {
  return createElement(
    'button',
    {
      id: config.id,
      disabled: config.disabled,
      onClick: config.onClick,
      className: [
        BASE_CLASSES,
        VARIANT_CLASSES[config.variant ?? 'default'],
        SIZE_CLASSES[config.size ?? 'md'],
      ].join(' '),
    },
    config.text,
  );
}
