// Objetivo: Botão reutilizável com variantes
// - Variantes: default (ação principal), secondary (ação de apoio), outline (contorno), ghost, danger (ação destrutiva)
// - Usa só as classes de cor e tipografia do styles/theme.css, então acompanha o tema
// - Ícone opcional (lucide) antes do texto
// - className extra para ajustes de layout (ex.: w-full)

import type { FC } from 'react';
import type { LucideIcon } from 'lucide-react';

export type ButtonVariant = 'default' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md';

interface ButtonProps {
  text: string;
  id: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const BASE_CLASSES =
  'inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg font-bold transition ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring-default ' +
  'disabled:pointer-events-none disabled:opacity-50';

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  default: 'bg-brand-default text-content-black hover:bg-brand-strong text-content-xstrong',
  secondary: 'bg-surface-strong text-content-strong hover:bg-surface-strong/80',
  outline: 'border border-border-default bg-surface-subtle text-content-default hover:bg-surface-strong hover:text-content-strong',
  ghost: 'bg-brand-default/50 text-content-black hover:bg-brand-strong/80 text-content-xstrong',
  danger: 'bg-danger-default/50 text-content-xstrong hover:bg-danger-strong/80',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'px-6 py-2',
  md: 'px-8 py-2',
};

export const Button: FC<ButtonProps> = ({ text, id, variant = 'default', size = 'md', icon: Icon, className, disabled, onClick }) => {
  const classes = [BASE_CLASSES, VARIANT_CLASSES[variant], SIZE_CLASSES[size], className].filter(Boolean).join(' ');

  return (
    <button id={id} disabled={disabled} onClick={onClick} className={classes}>
      {Icon && <Icon aria-hidden="true" />}
      {text}
    </button>
  );
};
