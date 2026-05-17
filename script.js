async function buscarCuriosidade() {

    try {

        document.getElementById("curiosidade").innerHTML =
        "Carregando curiosidade...";

        // Busca curiosidade da API
        const resposta = await fetch(
            "https://catfact.ninja/fact"
        );

        const dados = await resposta.json();

        // Traduz automaticamente
        const traducao = await fetch(
            `https://api.mymemory.translated.net/get?q=${dados.fact}&langpair=en|pt`
        );

        const dadosTraduzidos = await traducao.json();

        // Mostra texto traduzido
        document.getElementById("curiosidade").innerHTML =
        dadosTraduzidos.responseData.translatedText;

    } catch (erro) {

        document.getElementById("curiosidade").innerHTML =
        "Erro ao carregar curiosidade.";
    }
}

buscarCuriosidade();