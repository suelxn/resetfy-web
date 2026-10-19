// Objetivo: Container global da aplicação
// - Define background, cor de texto e estrutura de layout
// - Envolve Header, Main content e Modal

import type { FC, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div id="layout" className="flex min-h-screen w-full flex-col bg-background-global text-content-xstrong">
      {children}
    </div>
  );
};
