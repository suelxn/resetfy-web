// Objetivo: Container global da aplicação
// - Define background, padding e estrutura de layout
// - Envolve Header, Main content e Footer
// - Responsável por estilos globais e responsividade

export function createLayout(): HTMLElement {
  const layout = document.createElement('div');
  layout.id = 'layout';
  layout.className = 'w-full min-h-screen flex flex-col bg-[#1D1C24]';

  return layout;
}
