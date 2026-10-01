// Objetivo: Exibir APENAS o cronômetro (MM:SS)
// - Mostra tempo em formato MM:SS
// - Será atualizado pela lógica do state/timerState.ts

export function createTimer(): HTMLElement {
  const timeDisplay = document.createElement('div');
  timeDisplay.id = 'time-display';
  timeDisplay.className = 'text-8xl font-bold text-pink-400 font-mono';
  timeDisplay.textContent = '50:00';

  return timeDisplay;
}
