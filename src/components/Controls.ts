// Objetivo: Renderizar botões de controle do timer
// - Play: inicia o cronômetro
// - Pause: pausa o cronômetro
// - Reset: volta ao estado inicial (50:00)

export function createControls(): HTMLElement {
  const container = document.createElement('div');
  container.className = 'flex gap-4 justify-center pb-16';

  const playBtn = document.createElement('button');
  playBtn.id = 'play-btn';
  playBtn.textContent = 'INICIAR';
  playBtn.className = 'px-8 py-3 bg-pink-500 text-white font-bold rounded-lg hover:bg-pink-600 transition';

  const pauseBtn = document.createElement('button');
  pauseBtn.id = 'pause-btn';
  pauseBtn.textContent = 'PAUSAR';
  pauseBtn.className = 'px-8 py-3 bg-gray-500 text-white font-bold rounded-lg hover:bg-gray-600 transition disabled:opacity-50';
  pauseBtn.disabled = true;

  const resetBtn = document.createElement('button');
  resetBtn.id = 'reset-btn';
  resetBtn.textContent = 'RESETAR';
  resetBtn.className = 'px-8 py-3 bg-gray-400 text-white font-bold rounded-lg hover:bg-gray-500 transition';

  container.appendChild(playBtn);
  container.appendChild(pauseBtn);
  container.appendChild(resetBtn);

  return container;
}
