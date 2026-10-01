// Objetivo: Formatar tempo em segundos para MM:SS
// - Converte número de segundos em string legível
// - Usado no display do cronômetro

export function formatarTempo(segundos: number): string {
  const minutos = Math.floor(segundos / 60);
  const segs = segundos % 60;
  return `${String(minutos).padStart(2, '0')}:${String(segs).padStart(2, '0')}`;
}
