// Objetivo: Ler, salvar e aplicar o tema (claro/escuro)
// - O tema vai no atributo data-theme do <html>, que ativa os tokens do styles/theme.css
// - Padrão: escuro

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'theme';

export function getSavedTheme(): Theme {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'light' ? 'light' : 'dark';
  } catch {
    return 'dark';
  }
}

export function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;

  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Armazenamento indisponível (ex.: navegação privada): o tema vale só nesta sessão
  }
}
