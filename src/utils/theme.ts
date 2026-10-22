// Objetivo: Ler, salvar e aplicar o tema (claro/escuro)
// - O tema vai no atributo data-theme do <html>, que ativa os tokens do styles/theme.css
// - Fica salvo em resetfy_user_preferences (ver utils/armazenamento.ts)
// - Padrão: escuro

import { lerPreferencias, salvarPreferencias } from './armazenamento';

export type Theme = 'dark' | 'light';

export function getSavedTheme(): Theme {
  return lerPreferencias().theme;
}

export function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  salvarPreferencias({ theme });
}
