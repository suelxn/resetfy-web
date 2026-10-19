// Objetivo: Botão reutilizável com variantes, que aceita apenas ícones da família lucide
// - Variantes: default (ação principal), secondary (ação de apoio), outline (contorno), ghost
// - Usa só as classes de cor e tipografia do styles/theme.css, então acompanha o tema

import type { FC } from 'react';
import { Moon, Settings, Sun, X } from 'lucide-react';

// Para usar um novo ícone, importe-o do lucide-react e registre-o aqui
const ICONS = {
  moon: Moon,
  sun: Sun,
  x: X,
  settings: Settings,
} as const;

export type IconName = keyof typeof ICONS;
export type IconButtonVariant = 'default' | 'secondary' | 'outline' | 'ghost' ;
export type IconButtonSize = 'sm' | 'md';

interface IconButtonProps {
  icon: IconName;
  label: string;
  id: string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  onClick?: () => void;
}

const BASE_CLASSES =
  'inline-flex cursor-pointer items-center justify-center rounded-lg transition ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring-default ' +
  'disabled:pointer-events-none disabled:opacity-50';

const VARIANT_CLASSES: Record<IconButtonVariant, string> = {
  default: 'bg-brand-default text-content-black hover:bg-brand-strong text-content-xstrong',
  secondary: 'bg-surface-strong text-content-strong hover:bg-surface-strong/80',
  outline: 'text-content-default hover:bg-surface-strong text-content-white',
  ghost: 'bg-brand-default/50 text-content-black hover:bg-brand-strong/80 text-content-xstrong'
};

const SIZE_CLASSES: Record<IconButtonSize, string> = {
  sm: 'px-1 py-1',
  md: 'px-2 py-2',
};

export const IconButton: FC<IconButtonProps> = ({ icon, label, id, variant = 'default', size = 'md', onClick }) => {
  const Icon = ICONS[icon];
  const className = [BASE_CLASSES, VARIANT_CLASSES[variant], SIZE_CLASSES[size]].join(' ');

  return (
    <button id={id} type="button" aria-label={label} onClick={onClick} className={className}>
      <Icon aria-hidden="true" />
    </button>
  );
};
