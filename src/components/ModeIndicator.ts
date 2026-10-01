// Objetivo: Exibir indicador de modo (Foco/Pausa)
// - Mostra o modo atual em texto
// - Será atualizado pela lógica do state/timerState.ts

export function createModeIndicator(): HTMLElement {
  const modeIndicator = document.createElement('div');
  modeIndicator.id = 'mode-indicator';
  modeIndicator.className = 'text-lg font-semibold text-pink-500';
  modeIndicator.textContent = 'FOCO';

  return modeIndicator;
}
