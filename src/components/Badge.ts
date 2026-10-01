// Objetivo: Componente de badge para indicadores visuais
// - Exibe status/tags com estilo único padronizado
// - Usado para: ciclo, tags, indicadores

export interface BadgeConfig {
  text: string;
}

export function createBadge(config: BadgeConfig): HTMLElement {
  const badge = document.createElement('span');
  badge.textContent = config.text;
  badge.className = 'inline-block px-2 py-1 rounded-full font-medium text-sm';
  badge.style.backgroundColor = 'var(--color-badge-bg)';
  badge.style.color = 'var(--color-badge-text)';

  return badge;
}
