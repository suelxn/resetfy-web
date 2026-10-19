// Objetivo: Rodapé da aplicação
// - Logo da Suelen (assets/logo-suelendias.svg) à esquerda, seguida do texto de crédito
// - Usa só as classes de cor e tipografia do styles/theme.css, então acompanha o tema

import type { FC } from 'react';
import logoSuelendias from '../assets/logo-suelendias.svg';

export const Footer: FC = () => {
  return (
    <footer className="flex items-center justify-center gap-3 py-4 text-sm text-content-default">
      <img src={logoSuelendias} alt="" aria-hidden="true" className="h-6 w-6" />
      <span>Feito com amor por Suelen Dias</span>
    </footer>
  );
};
