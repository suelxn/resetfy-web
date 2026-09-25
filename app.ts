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

    function atualizarTela(): void {
        const minutos: number = Math.floor(tempoRestante / 60);
        const segundos: number = tempoRestante % 60;
        
        const minFormatado: string = String(minutos).padStart(2, '0');
        const segFormatado: string = String(segundos).padStart(2, '0');
        const tempoTexto: string = `${minFormatado}:${segFormatado}`;
        
        const nomeModo: string = modoAtual === 'foco' ? 'Foco' : 'Pausa';

        if (timerDisplay) timerDisplay.innerText = tempoTexto;
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
                    const querFazerPausa: boolean = confirm(
                        "Hora de fazer uma pausa!\n\n" +
                        "- Beba água\n" +
                        "- Pisque os olhos\n" +
                        "- Alongue o corpo\n\n" +
                        "Clique em OK para 'Fazer a pausa' ou CANCELAR para 'Pular a pausa'."
                    );

                    if (querFazerPausa) {
                        modoAtual = 'pausa';
                        tempoRestante = TEMPO_PAUSA;
                        atualizarTela();
                        iniciarTimer();
                    } else {
                        modoAtual = 'foco';
                        tempoRestante = TEMPO_FOCO;
                        atualizarTela();
                        iniciarTimer();
                    }

                } else {
                    alert("A pausa acabou! Clique em Iniciar quando estiver pronto para os 50 minutos de foco.");
                    
                    modoAtual = 'foco';
                    tempoRestante = TEMPO_FOCO;
                    atualizarTela();
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

        btnStart?.addEventListener('click', iniciarTimer);
        btnPause?.addEventListener('click', pausarTimer);
        btnReset?.addEventListener('click', resetarTimer);

        atualizarTela();
    });
})();