// Objetivo: Mostrar o exercício atual com contador e navegação Voltar/Próximo
// - Usado no modal de ciclo concluído e no layout da pausa
// - Os exercícios vêm de config/suggestions.ts; o índice é controlado pelo pai

import type { FC } from 'react';
import { suggestions } from '../config/suggestions';
import { Button } from './Button';
import { Contador } from './Contador';

interface ExerciciosProps {
  indice: number;
  onAnterior: () => void;
  onProximo: () => void;
}

export const Exercicios: FC<ExerciciosProps> = ({ indice, onAnterior, onProximo }) => {
  const exercicio = suggestions[indice];
  const total = suggestions.length;

  return (
    <div className="flex w-full flex-col gap-3 text-left">
      <Contador atual={indice + 1} total={total} />
      <h2 className="text-lg font-bold text-content-xstrong">{exercicio.titulo}</h2>
      <p className="text-base text-content-default">{exercicio.descricao}</p>
      <div className="flex justify-between gap-4">
        <Button id="exercicio-anterior-btn" text="Voltar" variant="outline" size="sm" disabled={indice === 0} onClick={onAnterior} />
        <Button id="exercicio-proximo-btn" text="Próximo" variant="outline" size="sm" disabled={indice === total - 1} onClick={onProximo} />
      </div>
    </div>
  );
};
