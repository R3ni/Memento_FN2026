fetch("php/buscar_ranking.php")
    .then(response => response.json())
    .then(ranking => {

        const lista =
            document.getElementById("ranking-lista");

        lista.innerHTML = "";

        ranking.forEach((jogador, index) => {

            const minutos =
                Math.floor(jogador.tempo / 60);

            const segundos =
                jogador.tempo % 60;

            const tempoFormatado =
                String(minutos).padStart(2, "0") +
                ":" +
                String(segundos).padStart(2, "0");

            const linha =
                document.createElement("div");

            linha.classList.add("ranking-item");

		if (index === 0) {
   		 linha.classList.add("primeiro");
		} else if (index === 1) {
    		linha.classList.add("segundo");
		} else if (index === 2) {
   		 linha.classList.add("terceiro");
		}

            linha.innerHTML = `
                <span>${index + 1}º</span>
                <span>${jogador.jogador_1} & ${jogador.jogador_2}</span>
                <span>${tempoFormatado}</span>
            `;

            lista.appendChild(linha);
        });

    })
    .catch(error => {

        console.error(error);

    });