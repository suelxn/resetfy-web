// Objetivo: Switch para alternar entre tema escuro e claro
// - Trilho e círculo usam surface-switch e surface-switch-thumb (styles/theme.css)
// - Ícone no lado livre do trilho: lua (escuro) ou sol (claro), da família lucide
// - Lê o tema salvo e grava a escolha (ver utils/theme.ts)
// - Acessível: role="switch" com aria-checked (ligado = tema claro)

import { useState, type FC } from 'react';
import { Moon, Sun } from 'lucide-react';
import { applyTheme, getSavedTheme, type Theme } from '../utils/theme';

export const Switch: FC = () => {
  const [theme, setTheme] = useState<Theme>(getSavedTheme);
  const isLight = theme === 'light';

  const alternarTema = () => {
    const proximo: Theme = theme === 'dark' ? 'light' : 'dark';
    applyTheme(proximo);
    setTheme(proximo);
  };

  return (
    <div className="flex items-center">
      <button
        id="theme-switch"
        type="button"
        role="switch"
        aria-label="Tema claro"
        aria-checked={isLight}
        onClick={alternarTema}
        className="relative inline-flex h-8 w-16 items-center rounded-full bg-surface-switch transition-colors"
      >
        {isLight ? (
          <Sun aria-hidden="true" className="absolute top-1/2 left-2 h-5 w-5 -translate-y-1/2" />
        ) : (
          <Moon aria-hidden="true" className="absolute top-1/2 right-2 h-5 w-5 -translate-y-1/2" />
        )}
        <span className={`absolute left-2 h-5 w-5 rounded-full bg-surface-switch-thumb transition-transform ${isLight ? 'translate-x-7' : ''}`} />
      </button>
    </div>
  );
};
