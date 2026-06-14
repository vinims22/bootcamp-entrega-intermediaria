const SUPABASE_URL = "https://tszbsyhbxsabxboqzswk.supabase.co";
const SUPABASE_KEY = "sb_publishable_JfVvPWXZjf0Hpa0huDEA2w_HKFKZmYT";

const banco = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let curiosidadeAtual = "";

async function buscarCuriosidade() {
    try {

        document.getElementById("curiosidade").innerHTML =
            "Carregando curiosidade...";

        const resposta = await fetch(
            "https://catfact.ninja/fact"
        );

        const dados = await resposta.json();

        const traducao = await fetch(
            `https://api.mymemory.translated.net/get?q=${dados.fact}&langpair=en|pt`
        );

        const dadosTraduzidos = await traducao.json();

        curiosidadeAtual =
            dadosTraduzidos.responseData.translatedText;

        document.getElementById("curiosidade").innerHTML =
            curiosidadeAtual;

    } catch (erro) {

        document.getElementById("curiosidade").innerHTML =
            "Erro ao carregar curiosidade.";

        console.error(erro);
    }
}

async function salvarCuriosidade() {

    if (!curiosidadeAtual) {

        alert("Gere uma curiosidade antes de salvar.");
        return;
    }

    const { error } = await banco
        .from("curiosidades")
        .insert([
            {
                curiosidade: curiosidadeAtual
            }
        ]);

    if (error) {

        alert("Erro ao salvar curiosidade.");
        console.error(error);
        return;
    }

    alert("Curiosidade salva com sucesso!");

    listarCuriosidades();
}

async function listarCuriosidades() {

    const { data, error } = await banco
        .from("curiosidades")
        .select("*")
        .order("created_at", {
            ascending: false
        });

    if (error) {

        document.getElementById(
            "curiosidadesSalvas"
        ).innerHTML =
            "Erro ao carregar curiosidades.";

        console.error(error);
        return;
    }

    if (data.length === 0) {

        document.getElementById(
            "curiosidadesSalvas"
        ).innerHTML =
            "Nenhuma curiosidade salva ainda.";

        return;
    }

    document.getElementById(
        "curiosidadesSalvas"
    ).innerHTML = data
        .map(item => `• ${item.curiosidade}`)
        .join("<br><br>");
}

async function apagarCuriosidades() {

    const confirmar = confirm(
        "Tem certeza que deseja apagar todas as curiosidades?"
    );

    if (!confirmar) {
        return;
    }

    const { error } = await banco
        .from("curiosidades")
        .delete()
        .neq("id", 0);

    if (error) {

        alert("Erro ao apagar curiosidades.");

        console.error(error);

        return;
    }

    alert("Curiosidades apagadas com sucesso!");

    listarCuriosidades();
}

buscarCuriosidade();
listarCuriosidades();
