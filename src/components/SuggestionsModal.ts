// Objetivo: Exibir modal com sugestões de exercícios durante a pausa
// - Aparece quando entra em modo Pausa
// - Mostra exercício aleatório/sequencial
// - Botões: Próxima sugestão, OK/Voltar ao foco

export function createSuggestionsModal(): HTMLElement {
  const modal = document.createElement('div');
  modal.id = 'suggestions-modal';
  modal.className = 'hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';

  const content = document.createElement('div');
  content.className = 'bg-white rounded-lg p-8 max-w-md text-center';

  const title = document.createElement('h2');
  title.className = 'text-2xl font-bold text-pink-600 mb-4';
  title.textContent = 'Hora de Pausar! 🎯';

  const suggestion = document.createElement('p');
  suggestion.id = 'suggestion-text';
  suggestion.className = 'text-lg text-gray-700 mb-6';
  suggestion.textContent = 'Sugestão de exercício aparecerá aqui';

  const buttonsContainer = document.createElement('div');
  buttonsContainer.className = 'flex gap-4 justify-center';

  const nextBtn = document.createElement('button');
  nextBtn.id = 'next-suggestion-btn';
  nextBtn.textContent = 'Próxima';
  nextBtn.className = 'px-6 py-2 bg-pink-400 text-white font-bold rounded-lg hover:bg-pink-500 transition';

  const okBtn = document.createElement('button');
  okBtn.id = 'ok-suggestion-btn';
  okBtn.textContent = 'OK, Voltar';
  okBtn.className = 'px-6 py-2 bg-pink-600 text-white font-bold rounded-lg hover:bg-pink-700 transition';

  buttonsContainer.appendChild(nextBtn);
  buttonsContainer.appendChild(okBtn);

  content.appendChild(title);
  content.appendChild(suggestion);
  content.appendChild(buttonsContainer);
  modal.appendChild(content);

  return modal;
}
