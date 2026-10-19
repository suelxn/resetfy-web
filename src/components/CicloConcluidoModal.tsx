// Objetivo: Modal exibido ao fim do foco, perguntando se o usuário quer fazer a pausa agora ou pular
// - Aparece quando o foco acaba (controlado por main.tsx)
// - Botões: Fazer a pausa (inicia o intervalo) e Pular (vai para o próximo ciclo, sem iniciar)
// - Mesmo padrão de overlay dos demais modais

import type { FC } from 'react';
import { Button } from './Button';

interface CicloConcluidoModalProps {
  onFazerPausa: () => void;
  onPular: () => void;
}

export const CicloConcluidoModal: FC<CicloConcluidoModalProps> = ({ onFazerPausa, onPular }) => {
  return (
    <div id="ciclo-concluido-modal" className="fixed inset-0 z-50 bg-overlay-default">
      <div className="flex h-full items-center justify-center p-4">
        <div className="w-full max-w-md rounded-lg bg-surface-subtle p-8 text-left text-content-strong shadow-lg">
          <h2 className="mb-3 text-2xl font-bold text-content-xstrong">Ciclo concluído!</h2>
          <p className="mb-6 text-base text-content-default">
            O tempo de foco chegou ao fim. Quer fazer uma pausa agora ou pular para o próximo ciclo?
          </p>
          <div className="flex flex-col gap-3">
            <Button id="fazer-pausa-btn" text="Fazer a pausa" onClick={onFazerPausa} />
            <Button id="pular-ciclo-btn" text="Pular" variant="secondary" onClick={onPular} />
          </div>
        </div>
      </div>
    </div>
  );
};
