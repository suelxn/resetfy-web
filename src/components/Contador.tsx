// Objetivo: Mostrar em qual item da lista estou e quantos faltam (ex.: "Exercício 2 de 8 · faltam 6")
// - atual é 1-based (primeiro item = 1)

import type { FC } from 'react';

interface ContadorProps {
  atual: number;
  total: number;
}

export const Contador: FC<ContadorProps> = ({ atual, total }) => {
  return (
    <span id="contador-exercicio" className="text-sm font-medium text-content-subtle">
      Exercício {atual} de {total} · faltam {total - atual}
    </span>
  );
};
