// Objetivo: Switch para alternar entre tema escuro e claro
// - Trilho e círculo usam surface-switch e surface-switch-thumb (styles/theme.css)
// - Ícone no lado livre do trilho: bedtime (escuro) ou light_mode (claro)
// - Lê o tema salvo e grava a escolha (ver utils/theme.ts)
// - Acessível: role="switch" com aria-checked (ligado = tema claro)

import { createElement, useState, type ReactElement } from 'react';
import { applyTheme, getSavedTheme, type Theme } from '../utils/theme';
import bedtimeIcon from '../assets/bedtime.svg';
import lightModeIcon from '../assets/light_mode.svg';

export function Switch(): ReactElement {
  const [theme, setTheme] = useState<Theme>(getSavedTheme);
  const isLight = theme === 'light';

  function alternarTema() {
    const proximo: Theme = theme === 'dark' ? 'light' : 'dark';
    applyTheme(proximo);
    setTheme(proximo);
  }

  return createElement(
    'div',
    { className: 'flex items-center' },
    createElement(
      'button',
      {
        id: 'theme-switch',
        type: 'button',
        role: 'switch',
        'aria-label': 'Tema claro',
        'aria-checked': isLight,
        onClick: alternarTema,
        className: 'relative inline-flex h-8 w-16 items-center rounded-full bg-surface-switch transition-colors',
      },
      createElement('img', {
        src: isLight ? lightModeIcon : bedtimeIcon,
        alt: '',
        'aria-hidden': true,
        className: ['absolute top-1/2 h-5 w-5 -translate-y-1/2', isLight ? 'left-2' : 'right-2'].join(' '),
      }),
      createElement('span', {
        className: ['absolute left-2 h-5 w-5 rounded-full bg-surface-switch-thumb transition-transform', isLight ? 'translate-x-7' : ''].join(' ').trim(),
      }),
    ),
  );
}
