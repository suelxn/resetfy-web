```markdown
# Timer de Concentração e Pausa (Pomodoro)

Projeto simples de cronômetro para navegador que alterna entre períodos de foco (50 minutos) e pausas curtas para bem-estar (5 minutos), incentivando hábitos como beber água, piscar os olhos e se alongar.

## 📌 Funcionalidades

- **Contagem Regressiva**: Alterna automaticamente entre 50 minutos de foco e 5 minutos de pausa.
- **Exibição na Aba**: O tempo e o modo atual (`Foco` ou `Pausa`) são atualizados em tempo real no título da aba do navegador (`document.title`).
- **Controles**: Botões para Iniciar, Pausar e Resetar o temporizador.
- **Alertas**: Notificações via pop-up ao final de cada ciclo informando o momento da pausa ou do retorno ao foco.

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura da página web.
- **TypeScript**: Lógica do temporizador, manipulação do DOM e controle do ciclo com tipagem estática.

## 📂 Estrutura do Projeto

```text
.
├── index.html    # Interface e marcação da aplicação
├── app.ts        # Lógica da aplicação escrita em TypeScript
└── app.js        # Código JavaScript gerado após a compilação do TypeScript

```

## 🚀 Como Executar o Projeto

### Pré-requisitos

É necessário ter o **Node.js** e o compilador do **TypeScript** instalados na sua máquina.

1. Caso não tenha o TypeScript instalado globalmente, instale executando:
```bash
npm install -g typescript

```



### Passo a Passo

1. Transpile o arquivo TypeScript (`app.ts`) para JavaScript (`app.js`):
```bash
tsc app.ts

```


2. Abra o arquivo `index.html` em qualquer navegador web de sua preferência.

## ⚙️ Como Funciona o Código (`app.ts`)

* **Tipagem de Modos**: Utiliza o tipo union `type Modo = 'foco' | 'pausa'` para garantir o estado correto do ciclo.
* **Manipulação do DOM**: Seleciona elementos HTML através da asserção de tipos (`as HTMLElement`, `as HTMLButtonElement`) para prevenir erros em tempo de compilação.
* **Gerenciamento de Tempo**: Utiliza a função `window.setInterval` para decrementar o contador a cada segundo e formatar os minutos e segundos com `padStart(2, '0')`.

```

```