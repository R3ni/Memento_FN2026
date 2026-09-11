// ===============================
// CONFIGURAÇÕES DO JOGO
// ===============================

let faseAtual = 1;
let erros = 0;
let tempoRestante = 90;
let timer = null;

let historico = [];

let numeroDisplay;
let botoes;


// ===============================
// INICIAR JOGO
// ===============================

function iniciarJogo() {

    faseAtual = 1;
    erros = 0;
    tempoRestante = 90;
    historico = [];

    numeroDisplay = document.getElementById("numero-display");
    botoes = document.querySelectorAll(".number-button");

    atualizarTela();

    sortearBotoes();

    iniciarTimer();
}


// ===============================
// TIMER
// ===============================

function iniciarTimer() {

    clearInterval(timer);

    timer = setInterval(() => {

        tempoRestante--;

        atualizarTimer();

        if (tempoRestante <= 0) {

            clearInterval(timer);

            derrota("Tempo esgotado!");
        }

    }, 1000);
}


// ===============================
// MOSTRAR TIMER
// ===============================

function atualizarTimer() {

    const minutos = Math.floor(tempoRestante / 60);
    const segundos = tempoRestante % 60;

    const tempoFormatado =
        String(minutos).padStart(2, "0") +
        ":" +
        String(segundos).padStart(2, "0");

    document.getElementById("timer").textContent =
        "Tempo: " + tempoFormatado;
}


// ===============================
// SORTEAR BOTÕES
// ===============================

function sortearBotoes() {

    let numeros = [1, 2, 3, 4];

    numeros.sort(() => Math.random() - 0.5);

    botoes.forEach((botao, indice) => {

        botao.textContent = numeros[indice];

        botao.dataset.numero = numeros[indice];

        botao.onclick = () => {

            clicarBotao(indice + 1, numeros[indice]);

        };

    });


    // Sorteia o número do display
    let display = Math.floor(Math.random() * 4) + 1;

    numeroDisplay.textContent = display;
}


// ===============================
// CLIQUE NO BOTÃO
// ===============================

function clicarBotao(posicao, numero) {

    const display = Number(numeroDisplay.textContent);

    const correto = verificarResposta(
        faseAtual,
        display,
        posicao,
        numero
    );


    if (correto) {

        // Guarda a informação da fase
        historico.push({
            fase: faseAtual,
            posicao: posicao,
            numero: numero
        });

        proximaFase();

    } else {

        erro();

    }
}


// ===============================
// VERIFICAR RESPOSTA
// ===============================

function verificarResposta(fase, display, posicao, numero) {

    // FASE 1
    if (fase === 1) {

        // Display = posição
        return display === posicao;
    }


    // FASE 2
    if (fase === 2) {

        const respostas = {
            1: 4,
            2: 1,
            3: 2,
            4: 3
        };

        return numero === respostas[display];
    }


    // FASE 3
    if (fase === 3) {

        if (display === 1) {
            return posicao === 2;
        }

        if (display === 2) {
            return numero === 4;
        }

        if (display === 3) {
            return posicao === 4;
        }

        if (display === 4) {
            return numero === 1;
        }
    }


    // FASE 4
    if (fase === 4) {

        const referencias = {
            1: 1,
            2: 2,
            3: 3,
            4: 1
        };

        const faseReferencia = referencias[display];

        const memoria =
            historico.find(
                item => item.fase === faseReferencia
            );

        return posicao === memoria.posicao;
    }


    // FASE 5
    if (fase === 5) {

        const referencias = {
            1: 1,
            2: 3,
            3: 2,
            4: 4
        };

        const faseReferencia = referencias[display];

        const memoria =
            historico.find(
                item => item.fase === faseReferencia
            );

        return numero === memoria.numero;
    }

    return false;
}


// ===============================
// ERRO
// ===============================

function erro() {

    erros++;

    atualizarErros();

    if (erros >= 3) {
        derrota();
        return;
    }

    // Volta para a Fase 1
    faseAtual = 1;

    // Apaga a memória das fases anteriores
    historico = [];

    // Sorteia novamente os botões
    sortearBotoes();

    // Atualiza a tela
    atualizarTela();
}


// ===============================
// PRÓXIMA FASE
// ===============================

function proximaFase() {

    if (faseAtual === 5) {

        clearInterval(timer);

        vitoria();

        return;
    }

    faseAtual++;

    atualizarTela();

    sortearBotoes();
}


// ===============================
// ATUALIZAR FASE
// ===============================

function atualizarTela() {

    document.getElementById("fase").textContent =
        "Fase: " + faseAtual + "/5";

    atualizarErros();
    atualizarTimer();
}


// ===============================
// ATUALIZAR ERROS
// ===============================

function atualizarErros() {

    const elemento =
        document.getElementById("erros");

    elemento.textContent =
        "Erros: " + erros + "/3";
}


// ===============================
// VITÓRIA
// ===============================

function vitoria() {

    // Calcula quanto tempo foi usado
    const tempoUtilizado = 90 - tempoRestante;

    // Guarda o tempo para a tela de vitória
    localStorage.setItem(
        "tempoUtilizado",
        tempoUtilizado
    );

    // Vai para a tela de vitória
    window.location.href = "vitoria.html";
}


// ===============================
// DERROTA
// ===============================

function derrota(motivo) {

    localStorage.setItem(
        "motivoDerrota",
        motivo
    );

    window.location.href =
        "derrota.html";
}


// ===============================
// INICIAR AUTOMATICAMENTE
// ===============================

window.addEventListener("DOMContentLoaded", () => {

    iniciarJogo();

});