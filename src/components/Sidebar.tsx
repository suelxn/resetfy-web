// Objetivo: Painel lateral reutilizável (ex.: configurações)
// - Abre logo abaixo do header: é posicionado dentro da área relative que fica abaixo dele (ver main.tsx)
// - Desliza pela direita ao abrir e volta para a direita ao fechar
// - Fechamento é controlado pelo componente pai (botão de configurações)
// - Cabeçalho com título (18px); o conteúdo vem por children

import type { FC, ReactNode } from 'react';

interface SidebarProps {
  title: string;
  open: boolean;
  children?: ReactNode;
}

export const Sidebar: FC<SidebarProps> = ({ title, open, children }) => {
  // Sempre montado: a animação precisa do estado fechado para deslizar ao abrir e ao fechar
  return (
    <aside
      role="dialog"
      aria-modal="false"
      aria-label={title}
      aria-hidden={!open}
      className={[
        'absolute inset-y-0 right-0 z-50 flex w-80 max-w-full flex-col gap-6 bg-background p-6 text-content-strong border-l border-border-default/50',
        'transition-[translate,visibility] duration-300 ease-out',
        open ? 'translate-x-0 visible' : 'invisible translate-x-full',
      ].join(' ')}
    >
      <h2 className="text-lg font-bold text-content-xstrong">{title}</h2>
      {children}
    </aside>
  );
};
