// Objetivo: Renderizar os botões de controle do timer, conforme o status atual
// - Grupo com 296px de largura; os botões dividem essa largura igualmente (flex-1)
// - naoIniciado: INICIAR
// - foco: ENCERRAR (ghost) e PAUSAR (secondary)
// - pausa (fim do foco, aguardando escolha, ou intervalo rodando): PULAR PAUSA e ENCERRAR
// - interrompido: CONTINUAR e ENCERRAR
// - Os handlers vêm por props, de main.tsx, que conhece o estado do timer

import type { FC } from 'react';
import type { StatusTimer } from '../types';
import { Button } from './Button';

interface ControlsProps {
  status: StatusTimer;
  onIniciar: () => void;
  onPausar: () => void;
  onEncerrar: () => void;
  onPularPausa: () => void;
}

export const Controls: FC<ControlsProps> = ({ status, onIniciar, onPausar, onEncerrar, onPularPausa }) => {
  return (
    <div className="flex w-[296px] gap-6 pb-16">
      {status === 'naoIniciado' && (
        <Button id="play-btn" text="INICIAR" className="min-w-0 flex-1" onClick={onIniciar} />
      )}
      {status === 'foco' && (
        <>
          <Button id="end-btn" text="ENCERRAR" variant="ghost" className="min-w-0 flex-1" onClick={onEncerrar} />
          <Button id="pause-btn" text="PAUSAR" variant="secondary" className="min-w-0 flex-1" onClick={onPausar} />
        </>
      )}
      {status === 'pausa' && (
        <>
          <Button id="skip-btn" text="PULAR PAUSA" variant="secondary" className="min-w-0 flex-1" onClick={onPularPausa} />
          <Button id="end-btn" text="ENCERRAR" variant="ghost" className="min-w-0 flex-1" onClick={onEncerrar} />
        </>
      )}
      {status === 'interrompido' && (
        <>
          <Button id="continue-btn" text="CONTINUAR" className="min-w-0 flex-1" onClick={onIniciar} />
          <Button id="end-btn" text="ENCERRAR" variant="ghost" className="min-w-0 flex-1" onClick={onEncerrar} />
        </>
      )}
    </div>
  );
};
