// Objetivo: Botão reutilizável com variantes, que aceita apenas ícones da pasta assets
// - Variantes: default (ação principal), secondary (ação de apoio), outline (contorno), ghost
// - Usa só as classes de cor e tipografia do styles/theme.css, então acompanha o tema
// - Ícones são registrados em ICONS: o TypeScript só aceita os nomes listados ali
// - Acessível: como o botão não tem texto visível, o label vira aria-label

import { createElement, type ReactElement } from 'react';
import bedtimeIcon from '../assets/bedtime.svg';
import closeIcon from '../assets/close.svg';
import lightModeIcon from '../assets/light_mode.svg';
import logoIcon from '../assets/logo-suelendias.svg';
import settingIcon from '../assets/setting.svg';

// Para usar um novo ícone, coloque o arquivo em src/assets e registre-o aqui
const ICONS = {
  bedtime: bedtimeIcon,
  close: closeIcon,
  light_mode: lightModeIcon,
  'logo-suelendias': logoIcon,
  setting: settingIcon,
} as const;

export type IconName = keyof typeof ICONS;
export type IconButtonVariant = 'default' | 'secondary' | 'outline' | 'ghost' ;
export type IconButtonSize = 'sm' | 'md';

export interface ButtonConfig {
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
  outline: 'text-content-default hover:bg-brand-default text-content-white',
  ghost: 'bg-brand-default/50 text-content-black hover:bg-brand-strong/80 text-content-xstrong'
};

const SIZE_CLASSES: Record<IconButtonSize, string> = {
  sm: 'px-6 py-2',
  md: 'px-8 py-2',
};

export function createButton(config: ButtonConfig): ReactElement {
  return createElement(
    'button',
    {
      id: config.id,
      type: 'button',
      'aria-label': config.label,
      onClick: config.onClick,
      className: [
        BASE_CLASSES,
        VARIANT_CLASSES[config.variant ?? 'default'],
        SIZE_CLASSES[config.size ?? 'md'],
      ].join(' '),
    },
    createElement('img', { src: ICONS[config.icon], alt: '', 'aria-hidden': true }),
  );
}
