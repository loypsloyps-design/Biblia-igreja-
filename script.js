// ==========================================
// BÍBLIA DA IGREJA
// CARREGAMENTO DA BÍBLIA PELO JSON
// ==========================================

let biblia = {};


// ==========================================
// ELEMENTOS DA TELA
// ==========================================

const livro = document.getElementById("livro");
const capitulo = document.getElementById("capitulo");
const versiculo = document.getElementById("versiculo");

const btnMostrar = document.getElementById("btnMostrar");

const referencia = document.getElementById("referencia");
const textoVersiculo = document.getElementById("textoVersiculo");


// ==========================================
// CARREGAR BIBLIOTECA.JSON
// ==========================================

async function carregarBiblia() {

    try {

        const resposta = await fetch("./biblioteca.json");

        if (!resposta.ok) {
            throw new Error(
                "Não foi possível carregar o arquivo biblioteca.json"
            );
        }

        biblia = await resposta.json();

        console.log("Bíblia carregada com sucesso!");

        console.log(biblia);

    } catch (erro) {

        console.error(
            "Erro ao carregar a Bíblia:",
            erro
        );

        alert(
            "Não foi possível carregar a Bíblia. " +
            "Verifique se o arquivo biblioteca.json " +
            "está na pasta principal do projeto."
        );

    }

}


// ==========================================
// QUANDO ESCOLHER UM LIVRO
// ==========================================

livro.addEventListener("change", function () {

    const livroSelecionado = livro.value;

    capitulo.innerHTML =
        '<option value="">Selecione o capítulo</option>';

    versiculo.innerHTML =
        '<option value="">Selecione o versículo</option>';

    if (!livroSelecionado) {
        return;
    }


    // Procura o livro dentro do JSON

    const livroBiblia =
        biblia[livroSelecionado];

    if (!livroBiblia) {

        console.error(
            "Livro não encontrado no JSON:",
            livroSelecionado
        );

        return;
    }


    // Cria os capítulos existentes

    Object.keys(livroBiblia).forEach(
        numeroCapitulo => {

            const opcao =
                document.createElement("option");

            opcao.value =
                numeroCapitulo;

            opcao.textContent =
                "Capítulo " + numeroCapitulo;

            capitulo.appendChild(opcao);

        }
    );

});


// ==========================================
// QUANDO ESCOLHER UM CAPÍTULO
// ==========================================

capitulo.addEventListener("change", function () {

    const livroSelecionado =
        livro.value;

    const capituloSelecionado =
        capitulo.value;


    versiculo.innerHTML =
        '<option value="">Selecione o versículo</option>';


    if (
        !livroSelecionado ||
        !capituloSelecionado
    ) {
        return;
    }


    const livroBiblia =
        biblia[livroSelecionado];

    if (!livroBiblia) {
        return;
    }


    const capituloBiblia =
        livroBiblia[capituloSelecionado];

    if (!capituloBiblia) {
        return;
    }


    // Cria somente os versículos
    // que realmente existem no capítulo

    Object.keys(capituloBiblia).forEach(
        numeroVersiculo => {

            const opcao =
                document.createElement("option");

            opcao.value =
                numeroVersiculo;

            opcao.textContent =
                "Versículo " + numeroVersiculo;

            versiculo.appendChild(opcao);

        }
    );

});


// ==========================================
// BOTÃO MOSTRAR
// ==========================================

btnMostrar.addEventListener("click", function () {

    const livroSelecionado =
        livro.value;

    const capituloSelecionado =
        capitulo.value;

    const versiculoSelecionado =
        versiculo.value;


    if (
        !livroSelecionado ||
        !capituloSelecionado ||
        !versiculoSelecionado
    ) {

        alert(
            "Selecione o livro, capítulo e versículo."
        );

        return;

    }


    // Procura o texto

    const texto =
        biblia
        [livroSelecionado]
        [capituloSelecionado]
        [versiculoSelecionado];


    if (!texto) {

        textoVersiculo.textContent =
            "Texto não encontrado.";

        return;

    }


    // Mostra a referência

    referencia.textContent =
        `${livroSelecionado} ${capituloSelecionado}:${versiculoSelecionado}`;


    // Mostra o texto real

    textoVersiculo.textContent =
        texto;

});


// ==========================================
// INICIAR
// ==========================================

carregarBiblia();
