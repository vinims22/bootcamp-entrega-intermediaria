test("API retorna curiosidade", async () => {

    const resposta = await fetch(
        "https://catfact.ninja/fact"
    );

    const dados = await resposta.json();

    expect(dados.fact).toBeDefined();
});