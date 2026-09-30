"use strict";
// RESPONSABILIDADE: Lógica completa do temporizador Pomodoro com tipagem TypeScript
// Este arquivo gerencia:
// - Alternância entre ciclos de foco (50 min) e pausa (5 min)
// - Contagem regressiva do tempo com atualização em tempo real
// - Manipulação de elementos do DOM (display, botões, título da aba)
// - Eventos de clique dos botões (Iniciar, Pausar, Resetar)
// - Notificações ao fim de cada ciclo via confirm() e alert()
// - Sincronização do tempo no título da aba do navegador
(() => {
    const TEMPO_FOCO = 50 * 60; // 50 minutos em segundos
    const TEMPO_PAUSA = 5 * 60; // 5 minutos em segundos
    let modoAtual = 'foco';
    let tempoRestante = TEMPO_FOCO;
    let intervalId = null;
    let timerDisplay = null;
    let tituloModoDisplay = null;
    let btnStart = null;
    let btnPause = null;
    let btnReset = null;
    let modalCicloEncerrado = null;
    let btnFazerPausa = null;
    let btnPularPausa = null;
    let telaPausa = null;
    let timerPausaDisplay = null;
    let btnEncerrarPausa = null;
    let telaFoco = null;
    function atualizarTela() {
        const minutos = Math.floor(tempoRestante / 60);
        const segundos = tempoRestante % 60;
        const minFormatado = String(minutos).padStart(2, '0');
        const segFormatado = String(segundos).padStart(2, '0');
        const tempoTexto = `${minFormatado}:${segFormatado}`;
        const nomeModo = modoAtual === 'foco' ? 'Foco' : 'Pausa';
        if (timerDisplay)
            timerDisplay.innerText = tempoTexto;
        if (timerPausaDisplay)
            timerPausaDisplay.innerText = tempoTexto;
        if (tituloModoDisplay)
            tituloModoDisplay.innerText = `Modo: ${nomeModo}`;
        document.title = `${tempoTexto} - ${nomeModo}`;
    }
    function pararTimer() {
        if (intervalId !== null) {
            clearInterval(intervalId);
            intervalId = null;
        }
        if (btnStart)
            btnStart.disabled = false;
        if (btnPause)
            btnPause.disabled = true;
    }
    function exibirModalCicloEncerrado() {
        if (telaFoco)
            telaFoco.style.display = 'none';
        if (telaPausa)
            telaPausa.style.display = 'none';
        if (modalCicloEncerrado) {
            modalCicloEncerrado.style.display = 'flex';
        }
    }
    function fecharModalCicloEncerrado() {
        if (modalCicloEncerrado) {
            modalCicloEncerrado.style.display = 'none';
        }
    }
    function exibirTelaPausa() {
        if (telaFoco)
            telaFoco.style.display = 'none';
        if (telaPausa)
            telaPausa.style.display = 'block';
    }
    function exibirTelaFoco() {
        if (telaPausa)
            telaPausa.style.display = 'none';
        if (telaFoco)
            telaFoco.style.display = 'block';
    }
    function iniciarTimer() {
        if (intervalId !== null)
            return;
        if (btnStart)
            btnStart.disabled = true;
        if (btnPause)
            btnPause.disabled = false;
        intervalId = window.setInterval(() => {
            tempoRestante--;
            atualizarTela();
            if (tempoRestante <= 0) {
                pararTimer();
                if (modoAtual === 'foco') {
                    exibirModalCicloEncerrado();
                }
                else {
                    exibirTelaFoco();
                    modoAtual = 'foco';
                    tempoRestante = TEMPO_FOCO;
                    atualizarTela();
                    iniciarTimer();
                }
            }
        }, 1000);
    }
    function pausarTimer() {
        pararTimer();
    }
    function resetarTimer() {
        pararTimer();
        modoAtual = 'foco';
        tempoRestante = TEMPO_FOCO;
        atualizarTela();
    }
    // Inicializa quando o documento HTML estiver totalmente carregado
    document.addEventListener('DOMContentLoaded', () => {
        timerDisplay = document.getElementById('timer');
        tituloModoDisplay = document.getElementById('tituloModo');
        btnStart = document.getElementById('btnStart');
        btnPause = document.getElementById('btnPause');
        btnReset = document.getElementById('btnReset');
        modalCicloEncerrado = document.getElementById('modalCicloEncerrado');
        btnFazerPausa = document.getElementById('btnFazerPausa');
        btnPularPausa = document.getElementById('btnPularPausa');
        telaPausa = document.getElementById('telaPausa');
        timerPausaDisplay = document.getElementById('timerPausa');
        btnEncerrarPausa = document.getElementById('btnEncerrarPausa');
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
