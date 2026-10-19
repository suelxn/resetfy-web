// Objetivo: Orquestrador principal da aplicação
// - Importa estilos e componentes
// - Componente App: liga o estado do timer e das configurações aos componentes
// - Monta a aplicação no elemento #app

import { StrictMode, useEffect, useState, type FC } from 'react';
import { createRoot } from 'react-dom/client';
import { Trash2 } from 'lucide-react';
import './styles/main.css';
import { Layout } from './components/Layout';
import { Header } from './components/Header';
import { ModeIndicator } from './components/ModeIndicator';
import { Badge } from './components/Badge';
import { Timer } from './components/Timer';
import { Controls } from './components/Controls';
import { Exercicios } from './components/Exercicios';
import { CicloConcluidoModal } from './components/CicloConcluidoModal';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { Slide } from './components/Slide';
import { Button } from './components/Button';
import { useTimer, iniciar, pausar, pularPausa, resetar, resetarCiclos, configurarDuracao, getDuracoes } from './state/timerState';
import { formatarTempo } from './utils/formatTime';
import { getElement } from './utils/dom';
import { suggestions } from './config/suggestions';
import type { Modo } from './types';

const App: FC = () => {
  const state = useTimer();
  // Índice do exercício exibido (modal de ciclo concluído e layout da pausa)
  const [indiceExercicio, setIndiceExercicio] = useState(0);
  // Configurações: durações em segundos e visibilidade do painel
  const [duracoes, setDuracoes] = useState(getDuracoes);
  const [configuracoesAbertas, setConfiguracoesAbertas] = useState(false);

  // Fim do foco: pergunta se o usuário quer fazer a pausa agora ou pular
  const cicloConcluido = state.status === 'pausa' && !state.ativo;
  // Intervalo rodando: o layout mostra o cronômetro da pausa com os exercícios
  const emIntervalo = state.status === 'pausa' && state.ativo;

  // Atualiza o título da aba sempre que o tempo ou o modo mudam
  useEffect(() => {
    document.title = `${formatarTempo(state.tempoRestante)} - ${state.modo.toUpperCase()} - RESETFY`;
  }, [state.tempoRestante, state.modo]);

  // Ao entrar em pausa, começa pelo primeiro exercício
  useEffect(() => {
    if (state.modo === 'pausa') setIndiceExercicio(0);
  }, [state.modo]);

  // Espaço inicia ou pausa o cronômetro (ignorado quando o foco está em um botão ou campo)
  useEffect(() => {
    const aoPressionarEspaco = (event: KeyboardEvent) => {
      if (event.code !== 'Space' || event.repeat || cicloConcluido) return;

      const alvo = event.target as Element;
      if (alvo.closest?.('button, input, textarea, select, a')) return;

      event.preventDefault();
      if (!state.ativo) {
        iniciar();
      } else if (state.modo === 'foco') {
        pausar();
      }
    };

    window.addEventListener('keydown', aoPressionarEspaco);
    return () => window.removeEventListener('keydown', aoPressionarEspaco);
  }, [state.ativo, state.modo, cicloConcluido]);

  const encerrar = () => {
    resetar();
    setIndiceExercicio(0);
  };

  const exercicioAnterior = () => {
    setIndiceExercicio(indice => Math.max(0, indice - 1));
  };

  const proximoExercicio = () => {
    setIndiceExercicio(indice => Math.min(suggestions.length - 1, indice + 1));
  };

  // Recebe a duração em minutos do slider e grava em segundos
  const alterarDuracao = (modo: Modo, minutos: number) => {
    const segundos = minutos * 60;
    configurarDuracao(modo, segundos);
    setDuracoes(atuais => ({ ...atuais, [modo]: segundos }));
  };

  return (
    <Layout>
      <Header onAlternarConfiguracoes={() => setConfiguracoesAbertas(aberta => !aberta)} />
      {/* Área abaixo do header: o sidebar é posicionado dentro dela, então começa sempre logo abaixo da divisória */}
      <div className="relative flex flex-1 flex-col overflow-hidden">
        <main className="flex flex-1 flex-col items-center justify-center gap-20">
          <div className="flex w-70 items-center justify-between">
            <ModeIndicator status={state.status} />
            <Badge id="cycle-info" text={`Ciclo ${state.ciclo}`} />
          </div>
          <Timer segundos={state.tempoRestante} />
          {emIntervalo && (
            <div className="w-full max-w-md rounded-lg bg-surface-default p-6 shadow-lg">
              <Exercicios indice={indiceExercicio} onAnterior={exercicioAnterior} onProximo={proximoExercicio} />
            </div>
          )}
          <Controls status={state.status} onIniciar={iniciar} onPausar={pausar} onEncerrar={encerrar} onPularPausa={pularPausa} />
        </main>
        {cicloConcluido && (
          <CicloConcluidoModal
            onFazerPausa={iniciar}
            onPular={pularPausa}
          />
        )}
        <Sidebar title="Configurações" open={configuracoesAbertas}>
          <Slide
            id="duracao-foco"
            label="Duração do foco"
            value={duracoes.foco / 60}
            min={5}
            max={90}
            step={5}
            unit="min"
            onChange={minutos => alterarDuracao('foco', minutos)}
          />
          <Slide
            id="duracao-pausa"
            label="Duração da pausa"
            value={duracoes.pausa / 60}
            min={1}
            max={30}
            step={1}
            unit="min"
            onChange={minutos => alterarDuracao('pausa', minutos)}
          />
          <div className="mt-auto flex flex-col">
            <Button id="reset-ciclos-btn" text="Resetar ciclos" variant="danger" size="sm" icon={Trash2} onClick={resetarCiclos} />
          </div>
        </Sidebar>
        <Footer />
      </div>
    </Layout>
  );
};

createRoot(getElement('app')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
