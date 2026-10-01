// Objetivo: Componente reutilizável de botão
// - Reduz duplicação de código de estilização
// - Aceita: texto, ID, variante (primary/secondary/danger), callback

export interface ButtonConfig {
  text: string;
  id: string;
  variant?: 'primary' | 'secondary' | 'danger';
  onClick?: () => void;
}

export function createButton(config: ButtonConfig): HTMLButtonElement {
  const button = document.createElement('button');
  button.id = config.id;
  button.textContent = config.text;

  const baseClass = 'px-8 py-3 font-bold rounded-lg transition disabled:opacity-50';

  const variants = {
    primary: 'bg-pink-500 text-white hover:bg-pink-600',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600',
    danger: 'bg-gray-400 text-white hover:bg-gray-500',
  };

  button.className = `${baseClass} ${variants[config.variant || 'primary']}`;

  if (config.onClick) {
    button.addEventListener('click', config.onClick);
  }

  return button;
}
