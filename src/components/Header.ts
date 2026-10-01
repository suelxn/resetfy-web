// Objetivo: Criar o cabeçalho da aplicação
// - Exibe logo (favicon.svg) e título "RESETFY"
// - Inclui switch de tema claro/escuro
// - Estilizado com cores e fontes da marca

import { createSwitch } from './Switch';

export function createHeader(): HTMLElement {
  const header = document.createElement('header');
  header.className = 'shadow-md';
  header.style.backgroundColor = 'var(--color-background)';

  const container = document.createElement('div');
  container.className = 'max-w-7xl mx-auto px-4 py-4 flex items-center justify-between';

  // Left side: Logo + Title
  const leftSection = document.createElement('div');
  leftSection.className = 'flex items-center';

  const logo = document.createElement('img');
  logo.src = '/favicon.svg';
  logo.alt = 'RESETFY Logo';
  logo.className = 'w-8 h-8 mr-3';

  const title = document.createElement('h1');
  title.textContent = 'RESETFY';
  title.className = 'text-2xl font-bold text-pink-300';

  leftSection.appendChild(logo);
  leftSection.appendChild(title);

  // Right side: Theme Switch
  const rightSection = createSwitch();

  container.appendChild(leftSection);
  container.appendChild(rightSection);
  header.appendChild(container);

  return header;
}
