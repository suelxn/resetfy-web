// Objetivo: Controle deslizante com rótulo e valor atual
// - Rótulo à esquerda e valor com unidade à direita (ex.: "50 min")
// - Thumb rosa (brand-default): hover troca para brand-strong, e ao pressionar aparece o focus-ring
// - Trilho preenchido até o valor atual com a cor da marca, e o restante em surface-strong

import type { CSSProperties, FC } from 'react';

interface SlideProps {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit: string;
  onChange: (value: number) => void;
}

// Thumb: o input range nativo precisa de appearance-none para aceitar estilo próprio
const THUMB_CLASSES = [
  '[&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full',
  '[&::-webkit-slider-thumb]:bg-brand-default [&::-webkit-slider-thumb]:transition-colors',
  '[&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0',
  '[&::-moz-range-thumb]:bg-brand-default [&::-moz-range-thumb]:transition-colors',
  'hover:[&::-webkit-slider-thumb]:bg-brand-strong hover:[&::-moz-range-thumb]:bg-brand-strong',
  'active:[&::-webkit-slider-thumb]:ring-4 active:[&::-webkit-slider-thumb]:ring-focus-ring-default/40',
  'active:[&::-moz-range-thumb]:ring-4 active:[&::-moz-range-thumb]:ring-focus-ring-default/40',
].join(' ');

export const Slide: FC<SlideProps> = ({ id, label, value, min, max, step = 1, unit, onChange }) => {
  const porcentagem = ((value - min) / (max - min)) * 100;

  // Trilho: parte preenchida até o valor atual, com as variáveis de tema de theme.css
  const estiloTrilho: CSSProperties = {
    background: `linear-gradient(to right, var(--brand-default) ${porcentagem}%, var(--surface-strong) ${porcentagem}%)`,
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-base text-content-default">{label}</label>
        <span className="text-base text-content-default">{value} {unit}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={event => onChange(Number(event.target.value))}
        style={estiloTrilho}
        className={`h-1 w-full cursor-pointer appearance-none rounded-full focus:outline-none ${THUMB_CLASSES}`}
      />
    </div>
  );
};
