// ======================================
// PEGAR O TEMPO DA PARTIDA
// ======================================

const tempo = Number(
    localStorage.getItem("tempoUtilizado") || 0
);


// ======================================
// CONVERTER PARA MM:SS
// ======================================

const minutos = Math.floor(tempo / 60);

const segundos = tempo % 60;


const tempoFormatado =
    String(minutos).padStart(2, "0") +
    ":" +
    String(segundos).padStart(2, "0");


// Mostrar na tela

document.getElementById(
    "tempo-final"
).textContent = tempoFormatado;



// ======================================
// BOTÃO SALVAR
// ======================================

document.getElementById(
    "salvar"
).addEventListener("click", function () {


    const jogador1 =
        document.getElementById(
            "jogador1"
        ).value.trim();


    const jogador2 =
        document.getElementById(
            "jogador2"
        ).value.trim();


    const mensagem =
        document.getElementById(
            "mensagem"
        );



    // ==================================
    // VERIFICAR NOMES
    // ==================================

    if (jogador1 === "" || jogador2 === "") {

        mensagem.textContent =
            "Digite o nome dos dois jogadores.";

        return;
    }



    // ==================================
   fetch("php/salvar_pontuacao.php", {
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    body:
        "jogador1=" + encodeURIComponent(jogador1) +
        "&jogador2=" + encodeURIComponent(jogador2) +
        "&tempo=" + encodeURIComponent(tempo)
})
.then(response => response.json())
.then(data => {

    if (data.sucesso) {

        mensagem.textContent =
            "Pontuação salva com sucesso!";

    } else {

        mensagem.textContent =
            data.mensagem;
    }

})
.catch(error => {

    console.error(error);

    mensagem.textContent =
        "Erro ao conectar com o servidor.";
});

});