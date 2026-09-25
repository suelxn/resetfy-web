"use strict";
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
    function atualizarTela() {
        const minutos = Math.floor(tempoRestante / 60);
        const segundos = tempoRestante % 60;
        const minFormatado = String(minutos).padStart(2, '0');
        const segFormatado = String(segundos).padStart(2, '0');
        const tempoTexto = `${minFormatado}:${segFormatado}`;
        const nomeModo = modoAtual === 'foco' ? 'Foco' : 'Pausa';
        if (timerDisplay)
            timerDisplay.innerText = tempoTexto;
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
                    const querFazerPausa = confirm("Hora de fazer uma pausa!\n\n" +
                        "- Beba água\n" +
                        "- Pisque os olhos\n" +
                        "- Alongue o corpo\n\n" +
                        "Clique em OK para 'Fazer a pausa' ou CANCELAR para 'Pular a pausa'.");
                    if (querFazerPausa) {
                        modoAtual = 'pausa';
                        tempoRestante = TEMPO_PAUSA;
                        atualizarTela();
                        iniciarTimer();
                    }
                    else {
                        modoAtual = 'foco';
                        tempoRestante = TEMPO_FOCO;
                        atualizarTela();
                        iniciarTimer();
                    }
                }
                else {
                    alert("A pausa acabou! Clique em Iniciar quando estiver pronto para os 50 minutos de foco.");
                    modoAtual = 'foco';
                    tempoRestante = TEMPO_FOCO;
                    atualizarTela();
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
        btnStart?.addEventListener('click', iniciarTimer);
        btnPause?.addEventListener('click', pausarTimer);
        btnReset?.addEventListener('click', resetarTimer);
        atualizarTela();
    });
})();
