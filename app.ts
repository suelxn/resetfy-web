// RESPONSABILIDADE: Lógica completa do temporizador Pomodoro com tipagem TypeScript
// Este arquivo gerencia:
// - Alternância entre ciclos de foco (50 min) e pausa (5 min)
// - Contagem regressiva do tempo com atualização em tempo real
// - Manipulação de elementos do DOM (display, botões, título da aba)
// - Eventos de clique dos botões (Iniciar, Pausar, Resetar)
// - Notificações ao fim de cada ciclo via confirm() e alert()
// - Sincronização do tempo no título da aba do navegador

(() => {
    type Modo = 'foco' | 'pausa';

    const TEMPO_FOCO: number = 50 * 60; // 50 minutos em segundos
    const TEMPO_PAUSA: number = 5 * 60;  // 5 minutos em segundos

    let modoAtual: Modo = 'foco';
    let tempoRestante: number = TEMPO_FOCO;
    let intervalId: number | null = null;

    let timerDisplay: HTMLElement | null = null;
    let tituloModoDisplay: HTMLElement | null = null;
    let btnStart: HTMLButtonElement | null = null;
    let btnPause: HTMLButtonElement | null = null;
    let btnReset: HTMLButtonElement | null = null;
    let modalCicloEncerrado: HTMLElement | null = null;
    let btnFazerPausa: HTMLButtonElement | null = null;
    let btnPularPausa: HTMLButtonElement | null = null;
    let telaPausa: HTMLElement | null = null;
    let timerPausaDisplay: HTMLElement | null = null;
    let btnEncerrarPausa: HTMLButtonElement | null = null;
    let telaFoco: HTMLElement | null = null;

    function atualizarTela(): void {
        const minutos: number = Math.floor(tempoRestante / 60);
        const segundos: number = tempoRestante % 60;

        const minFormatado: string = String(minutos).padStart(2, '0');
        const segFormatado: string = String(segundos).padStart(2, '0');
        const tempoTexto: string = `${minFormatado}:${segFormatado}`;

        const nomeModo: string = modoAtual === 'foco' ? 'Foco' : 'Pausa';

        if (timerDisplay) timerDisplay.innerText = tempoTexto;
        if (timerPausaDisplay) timerPausaDisplay.innerText = tempoTexto;
        if (tituloModoDisplay) tituloModoDisplay.innerText = `Modo: ${nomeModo}`;
        document.title = `${tempoTexto} - ${nomeModo}`;
    }

    function pararTimer(): void {
        if (intervalId !== null) {
            clearInterval(intervalId);
            intervalId = null;
        }
        if (btnStart) btnStart.disabled = false;
        if (btnPause) btnPause.disabled = true;
    }

    function exibirModalCicloEncerrado(): void {
        if (telaFoco) telaFoco.style.display = 'none';
        if (telaPausa) telaPausa.style.display = 'none';
        if (modalCicloEncerrado) {
            (modalCicloEncerrado as HTMLElement).style.display = 'flex';
        }
    }

    function fecharModalCicloEncerrado(): void {
        if (modalCicloEncerrado) {
            (modalCicloEncerrado as HTMLElement).style.display = 'none';
        }
    }

    function exibirTelaPausa(): void {
        if (telaFoco) telaFoco.style.display = 'none';
        if (telaPausa) telaPausa.style.display = 'block';
    }

    function exibirTelaFoco(): void {
        if (telaPausa) telaPausa.style.display = 'none';
        if (telaFoco) telaFoco.style.display = 'block';
    }

    function iniciarTimer(): void {
        if (intervalId !== null) return;

        if (btnStart) btnStart.disabled = true;
        if (btnPause) btnPause.disabled = false;

        intervalId = window.setInterval(() => {
            tempoRestante--;

            atualizarTela();

            if (tempoRestante <= 0) {
                pararTimer();

                if (modoAtual === 'foco') {
                    exibirModalCicloEncerrado();
                } else {
                    exibirTelaFoco();
                    modoAtual = 'foco';
                    tempoRestante = TEMPO_FOCO;
                    atualizarTela();
                    iniciarTimer();
                }
            }
        }, 1000);
    }

    function pausarTimer(): void {
        pararTimer();
    }

    function resetarTimer(): void {
        pararTimer();
        modoAtual = 'foco';
        tempoRestante = TEMPO_FOCO;
        atualizarTela();
    }

    // Inicializa quando o documento HTML estiver totalmente carregado
    document.addEventListener('DOMContentLoaded', () => {
        timerDisplay = document.getElementById('timer');
        tituloModoDisplay = document.getElementById('tituloModo');
        btnStart = document.getElementById('btnStart') as HTMLButtonElement;
        btnPause = document.getElementById('btnPause') as HTMLButtonElement;
        btnReset = document.getElementById('btnReset') as HTMLButtonElement;
        modalCicloEncerrado = document.getElementById('modalCicloEncerrado');
        btnFazerPausa = document.getElementById('btnFazerPausa') as HTMLButtonElement;
        btnPularPausa = document.getElementById('btnPularPausa') as HTMLButtonElement;
        telaPausa = document.getElementById('telaPausa');
        timerPausaDisplay = document.getElementById('timerPausa');
        btnEncerrarPausa = document.getElementById('btnEncerrarPausa') as HTMLButtonElement;
        telaFoco = document.getElementById('telaFoco');

        btnStart?.addEventListener('click', iniciarTimer);
        btnPause?.addEventListener('click', pausarTimer);
        btnReset?.addEventListener('click', resetarTimer);

        btnFazerPausa?.addEventListener('click', () => {
            fecharModalCicloEncerrado();
            exibirTelaPausa();
            modoAtual = 'pausa';
            tempoRestante = TEMPO_PAUSA;
            atualizarTela();
            iniciarTimer();
        });

        btnPularPausa?.addEventListener('click', () => {
            fecharModalCicloEncerrado();
            exibirTelaFoco();
            modoAtual = 'foco';
            tempoRestante = TEMPO_FOCO;
            atualizarTela();
            iniciarTimer();
        });

        btnEncerrarPausa?.addEventListener('click', () => {
            pararTimer();
            exibirTelaFoco();
            modoAtual = 'foco';
            tempoRestante = TEMPO_FOCO;
            atualizarTela();
            iniciarTimer();
        });

        atualizarTela();
    });
})();