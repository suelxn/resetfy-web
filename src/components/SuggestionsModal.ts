// Objetivo: Exibir modal com sugestões de exercícios durante a pausa
// - Aparece quando entra em modo Pausa (controlado por main.ts, que só o renderiza quando aberto)
// - Botões: Próxima sugestão, OK/Voltar ao foco

import { createElement, type ReactElement } from 'react';
import type { Suggestion } from '../types';
import { createButton } from './Button';

export interface SuggestionsModalProps {
  sugestao: Suggestion;
  onProxima: () => void;
  onFechar: () => void;
}

export function createSuggestionsModal({ sugestao, onProxima, onFechar }: SuggestionsModalProps): ReactElement {
  // Wrapper separado: o overlay ocupa a tela, e o centralizamento usa 'flex' sem conflito
  return createElement(
    'div',
    { id: 'suggestions-modal', className: 'fixed inset-0 z-50 bg-overlay-default' },
    createElement(
      'div',
      { className: 'flex h-full items-center justify-center p-4' },
      createElement(
        'div',
        { className: 'max-w-md rounded-lg bg-surface-default p-8 text-center text-content-strong shadow-lg' },
        createElement('h2', { className: 'mb-4 text-2xl font-bold text-brand-default' }, 'Hora de Pausar! 🎯'),
        createElement(
          'p',
          { id: 'suggestion-text', className: 'mb-6 text-lg text-content-default' },
          createElement('strong', null, sugestao.titulo),
          createElement('br'),
          createElement('br'),
          sugestao.descricao,
        ),
        createElement(
          'div',
          { className: 'flex justify-center gap-4' },
          createButton({ id: 'next-suggestion-btn', text: 'Próxima', variant: 'outline', size: 'sm', onClick: onProxima }),
          createButton({ id: 'ok-suggestion-btn', text: 'OK, Voltar', variant: 'default', size: 'sm', onClick: onFechar }),
        ),
      ),
    ),
  );
}
