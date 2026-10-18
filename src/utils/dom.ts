// Objetivo: Acessar elementos do DOM com segurança
// - Falha com mensagem clara se o id não existir, em vez de erro genérico de null

export function getElement<T extends HTMLElement = HTMLElement>(id: string): T {
  const element = document.getElementById(id);

  if (!element) {
    throw new Error(`Elemento #${id} não encontrado no DOM`);
  }

  return element as T;
}
