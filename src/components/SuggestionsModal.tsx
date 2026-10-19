// Objetivo: Exibir modal com sugestões de exercícios durante a pausa
// - Aparece quando entra em modo Pausa (controlado por main.tsx, que só o renderiza quando aberto)
// - Botões: Próxima sugestão, OK/Voltar ao foco

import type { FC } from 'react';
import type { Suggestion } from '../types';
import { Button } from './Button';

interface SuggestionsModalProps {
  sugestao: Suggestion;
  onProxima: () => void;
  onFechar: () => void;
}

export const SuggestionsModal: FC<SuggestionsModalProps> = ({ sugestao, onProxima, onFechar }) => {
  // Wrapper separado: o overlay ocupa a tela, e o centralizamento usa 'flex' sem conflito
  return (
    <div id="suggestions-modal" className="fixed inset-0 z-50 bg-overlay-default">
      <div className="flex h-full items-center justify-center p-4">
        <div className="max-w-md rounded-lg bg-surface-default p-8 text-center text-content-strong shadow-lg">
          <h2 className="mb-4 text-2xl font-bold text-brand-default">Hora de Pausar! 🎯</h2>
          <p id="suggestion-text" className="mb-6 text-lg text-content-default">
            <strong>{sugestao.titulo}</strong>
            <br />
            <br />
            {sugestao.descricao}
          </p>
          <div className="flex justify-center gap-4">
            <Button id="next-suggestion-btn" text="Próxima" variant="outline" size="sm" onClick={onProxima} />
            <Button id="ok-suggestion-btn" text="OK, Voltar" variant="default" size="sm" onClick={onFechar} />
          </div>
        </div>
      </div>
    </div>
  );
};
