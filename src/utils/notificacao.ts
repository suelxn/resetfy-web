// Objetivo: Avisar o usuário com notificação do navegador quando o foco acaba
// - Pede permissão na primeira vez que o cronômetro é iniciado (clique do usuário)
// - Só notifica com a aba em segundo plano; com a aba aberta, o modal já avisa

export function pedirPermissaoNotificacao(): void {
  if ('Notification' in window && Notification.permission === 'default') {
    void Notification.requestPermission();
  }
}

export function notificarFimDoFoco(): void {
  if (!('Notification' in window) || Notification.permission !== 'granted' || !document.hidden) return;

  new Notification('Ciclo concluído!', { body: 'Hora de fazer uma pausa.' });
}
