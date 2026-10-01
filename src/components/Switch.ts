// Objetivo: Componente de switch para alternar temas (claro/escuro)
// - Exibe indicação visual do tema ativo
// - Permite toggle entre light e dark
// - Dispara evento ao mudar tema

export interface SwitchConfig {
  onChange?: (isDark: boolean) => void;
}

export function createSwitch(config?: SwitchConfig): HTMLElement {
  const container = document.createElement('div');
  container.className = 'flex items-center gap-3';

  // Label Light
  const labelLight = document.createElement('span');
  labelLight.textContent = '☀️';
  labelLight.className = 'text-xl cursor-pointer';

  // Switch button
  const switchBtn = document.createElement('button');
  switchBtn.id = 'theme-switch';
  switchBtn.className = 'relative inline-flex items-center w-14 h-7 rounded-full transition-colors bg-pink-500 hover:bg-pink-600';
  switchBtn.setAttribute('aria-label', 'Alternar tema');

  // Toggle circle
  const toggle = document.createElement('div');
  toggle.className = 'absolute left-1 w-5 h-5 bg-white rounded-full transition-transform';

  switchBtn.appendChild(toggle);

  // Label Dark
  const labelDark = document.createElement('span');
  labelDark.textContent = '🌙';
  labelDark.className = 'text-xl cursor-pointer';

  // State
  let isDark = localStorage.getItem('theme') === 'dark' || true;
  updateSwitch();

  // Event listener
  switchBtn.addEventListener('click', () => {
    isDark = !isDark;
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateSwitch();
    config?.onChange?.(isDark);
  });

  function updateSwitch() {
    if (isDark) {
      toggle.classList.add('translate-x-7');
      switchBtn.className = 'relative inline-flex items-center w-14 h-7 rounded-full transition-colors bg-gray-700 hover:bg-gray-800';
    } else {
      toggle.classList.remove('translate-x-7');
      switchBtn.className = 'relative inline-flex items-center w-14 h-7 rounded-full transition-colors bg-yellow-400 hover:bg-yellow-500';
    }
  }

  container.appendChild(labelLight);
  container.appendChild(switchBtn);
  container.appendChild(labelDark);

  return container;
}
