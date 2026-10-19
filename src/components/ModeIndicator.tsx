// Objetivo: Exibir o status do timer como badge com ponto colorido, sem fundo
// - Não iniciado: "NÃO INICIADO" com ponto verde (sucesso)
// - Foco: "FOCO" com ponto brand
// - Pausa (fim do foco, hora do intervalo): "INTERVALO" com ponto amarelo
// - Interrompido (pausado pelo usuário): "INTERROMPIDO" com ponto vermelho (danger)

import type { FC } from 'react';
import type { StatusTimer } from '../types';
import { Badge } from './Badge';

const TEXTOS: Record<StatusTimer, string> = {
  naoIniciado: 'NÃO INICIADO',
  foco: 'FOCO',
  pausa: 'INTERVALO',
  interrompido: 'INTERROMPIDO',
};

interface ModeIndicatorProps {
  status: StatusTimer;
}

export const ModeIndicator: FC<ModeIndicatorProps> = ({ status }) => {
  return <Badge id="mode-indicator" variant="dot" dot={status} text={TEXTOS[status]} />;
};
