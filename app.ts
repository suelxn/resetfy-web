type Modo = 'foco' | 'pausa';

const TEMPO_FOCO: number = 50 * 60; // 50 minutos em segundos
const TEMPO_PAUSA: number = 5 * 60;  // 5 minutos em segundos

let modoAtual: Modo = 'foco';
let tempoRestante: number = TEMPO_FOCO;
let intervalId: number | null = null;

// Mapeamento dos elementos do DOM com tipagem
const timerDisplay = document.getElementById('timer') as HTMLElement;
const tituloModoDisplay = document.getElementById('tituloModo') as HTMLElement;
const btnStart = document.getElementById('btnStart') as HTMLButtonElement;
const btnPause = document.getElementById('btnPause') as HTMLButtonElement;
const btnReset = document.getElementById('btnReset') as HTMLButtonElement;

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

function iniciarTimer(): void {
    if (intervalId !== null) return;

    if (btnStart) btnStart.disabled = true;
    if (btnPause) btnPause.disabled = false;

    intervalId = window.setInterval(() => {
        tempoRestante--;

        atualizarTela();

        if (tempoRestante <= 0) {
            if (intervalId !== null) {
                clearInterval(intervalId);
                intervalId = null;
            }

            if (btnStart) btnStart.disabled = false;
            if (btnPause) btnPause.disabled = true;

            if (modoAtual === 'foco') {
                alert("Hora de fazer uma pausa!\n\n- Beba água\n- Pisque os olhos\n- Alongue o corpo\n\nClique em OK para iniciar a pausa de 5 minutos.");
                modoAtual = 'pausa';
                tempoRestante = TEMPO_PAUSA;
                atualizarTela();
                iniciarTimer();
            } else {
                alert("A pausa acabou! Clique em OK para voltar ao foco de 50 minutos.");
                modoAtual = 'foco';
                tempoRestante = TEMPO_FOCO;
                atualizarTela();
                iniciarTimer();
            }
        }
    }, 1000);
}

function pausarTimer(): void {
    if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
    }
    
    if (btnStart) btnStart.disabled = false;
    if (btnPause) btnPause.disabled = true;
}

function resetarTimer(): void {
    pausarTimer();
    modoAtual = 'foco';
    tempoRestante = TEMPO_FOCO;
    atualizarTela();
}

// Event Listeners
btnStart?.addEventListener('click', iniciarTimer);
btnPause?.addEventListener('click', pausarTimer);
btnReset?.addEventListener('click', resetarTimer);

// Inicializa a tela com o valor padrão
atualizarTela();