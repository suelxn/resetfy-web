// Objetivo: Centralizar configuração de temas (dark/light)
// - Define cores e estilos para cada tema
// - Configurável e reutilizável em toda aplicação

export type ThemeMode = 'dark' | 'light';

export interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    textSecondary: string;
    border: string;
  };
}

export const themes: Record<ThemeMode, ThemeConfig> = {
  dark: {
    colors: {
      primary: '#F01A75',      // pink-500
      secondary: '#FF428E',     // pink-400
      background: '#1D1C24',    // escuro
      text: '#FFFFFF',          // branco
      textSecondary: '#A0A0A0', // cinza
      border: '#333333',        // cinza escuro
    },
  },
  light: {
    colors: {
      primary: '#FF70A9',       // pink-300
      secondary: '#FF428E',     // pink-400
      background: '#FFFFFF',    // branco
      text: '#000000',          // preto
      textSecondary: '#666666', // cinza
      border: '#EEEEEE',        // cinza claro
    },
  },
};

export function getTheme(mode: ThemeMode): ThemeConfig {
  return themes[mode];
}

export function getCurrentTheme(): ThemeMode {
  return (localStorage.getItem('theme') as ThemeMode) || 'dark';
}

export function setTheme(mode: ThemeMode): void {
  localStorage.setItem('theme', mode);
}
