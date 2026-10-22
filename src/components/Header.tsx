// Objetivo: Criar o cabeçalho da aplicação
// - Exibe logo e título (padrão: favicon.svg e "RESETFY")
// - Inclui switch de tema claro/escuro

import type { FC } from 'react';
import { Switch } from './Switch';
import { IconButton } from './IconButton';

interface HeaderProps {
  title?: string;
  logoUrl?: string;
  onAlternarConfiguracoes: () => void;
}

// BASE_URL inclui o base do Vite (ex.: /resetfy-web/ em prod); um caminho começando com "/" ignoraria o subcaminho
export const Header: FC<HeaderProps> = ({ title = 'RESETFY', logoUrl = `${import.meta.env.BASE_URL}favicon.svg`, onAlternarConfiguracoes }) => {
  return (
    <header className="background-global h-16 border-b border-border-default/50">
      <div className="mx-auto flex h-full items-center justify-between px-4">
        <div className="flex items-center">
          <img src={logoUrl} alt={title} className="mr-3 h-8 w-8" />
          <h1 className="text-2xl font-bold text-content-xstrong">{title}</h1>
        </div>
        <div className='flex flex-row items-center gap-4'>
        <Switch />
        <IconButton id="settings-btn" icon="settings" label="Configurações" variant="outline" onClick={onAlternarConfiguracoes} />
        </div>
      </div>
    </header>
  );
};
