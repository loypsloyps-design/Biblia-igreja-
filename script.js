// ==========================================
// BÍBLIA DA IGREJA
// SISTEMA DE LEITURA E PROJEÇÃO
// ==========================================


let biblia = {};

let modoCapitulo = false;

let versiculoAtual = null;


// ==========================================
// ELEMENTOS
// ==========================================

const livro =
    document.getElementById("livro");

const capitulo =
    document.getElementById("capitulo");

const versiculo =
    document.getElementById("versiculo");

const btnMostrar =
    document.getElementById("btnMostrar");

const btnCapitulo =
    document.getElementById("btnCapitulo");

const btnAnterior =
    document.getElementById("btnAnterior");

const btnProximo =
    document.getElementById("btnProximo");

const btnProjetar =
    document.getElementById("btnProjetar");

const referencia =
    document.getElementById("referencia");

const textoVersiculo =
    document.getElementById("textoVersiculo");

const listaVersiculos =
    document.getElementById("listaVersiculos");


// ==========================================
// CARREGAR BÍBLIA
// ==========================================

async function carregarBiblia() {

    console.log("Carregando Bíblia...");

    try {

        const resposta =
            await fetch("biblia.json");

        if (!resposta.ok) {

            throw new Error(
                "Erro HTTP " + resposta.status
            );
        }

        biblia =
            await resposta.json();

        console.log(
            "Bíblia carregada com sucesso!"
        );

        console.log(
            "Livros:",
            Object.keys(biblia).length
        );


        carregarLivros();


    } catch (erro) {

        console.error(
            "Erro ao carregar a Bíblia:",
            erro
        );

        alert(
            "Não foi possível carregar a Bíblia.\n\n" +
            "Verifique se o arquivo biblia.json " +
            "está na pasta principal."
        );
    }
}


// ==========================================
// CARREGAR LIVROS
// ==========================================

function carregarLivros() {

    livro.innerHTML =
        '<option value="">Selecione um livro</option>';


    Object.keys(biblia).forEach(
        nomeLivro => {

            const opcao =
                document.createElement("option");

            opcao.value =
                nomeLivro;

            opcao.textContent =
                nomeLivro;

            livro.appendChild(opcao);

        }
    );


    console.log(
        "Livros carregados:",
        Object.keys(biblia).length
    );
}


// ==========================================
// ESCOLHER LIVRO
// ==========================================

livro.addEventListener(
    "change",
    function () {

        const livroSelecionado =
            livro.value;


        capitulo.innerHTML =
            '<option value="">Selecione o capítulo</option>';


        versiculo.innerHTML =
            '<option value="">Selecione o versículo</option>';


        limparLeitura();


        if (!livroSelecionado) {

            return;
        }


        const livroBiblia =
            biblia[livroSelecionado];


        Object.keys(livroBiblia).forEach(
            numeroCapitulo => {

                const opcao =
                    document.createElement("option");

                opcao.value =
                    numeroCapitulo;

                opcao.textContent =
                    "Capítulo " +
                    numeroCapitulo;

                capitulo.appendChild(opcao);

            }
        );

    }
);


// ==========================================
// ESCOLHER CAPÍTULO
// ==========================================

capitulo.addEventListener(
    "change",
    function () {

        const livroSelecionado =
            livro.value;

        const capituloSelecionado =
            capitulo.value;


        versiculo.innerHTML =
            '<option value="">Selecione o versículo</option>';


        limparLeitura();


        if (
            !livroSelecionado ||
            !capituloSelecionado
        ) {

            return;
        }


        const dadosCapitulo =
            biblia
            [livroSelecionado]
            [capituloSelecionado];


        Object.keys(dadosCapitulo).forEach(
            numeroVersiculo => {

                const opcao =
                    document.createElement("option");

                opcao.value =
                    numeroVersiculo;

                opcao.textContent =
                    "Versículo " +
                    numeroVersiculo;

                versiculo.appendChild(opcao);

            }
        );

    }
);


// ==========================================
// MOSTRAR VERSÍCULO
// ==========================================

btnMostrar.addEventListener(
    "click",
    function () {

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


        mostrarVersiculo(
            livroSelecionado,
            capituloSelecionado,
            versiculoSelecionado
        );

    }
);


// ==========================================
// MOSTRAR VERSÍCULO
// ==========================================

function mostrarVersiculo(
    nomeLivro,
    numeroCapitulo,
    numeroVersiculo
) {

    const texto =
        biblia
        [nomeLivro]
        [numeroCapitulo]
        [numeroVersiculo];


    if (!texto) {

        textoVersiculo.textContent =
            "Texto não encontrado.";

        return;
    }


    modoCapitulo = false;

    versiculoAtual =
        Number(numeroVersiculo);


    referencia.textContent =
        `${nomeLivro} ${numeroCapitulo}:${numeroVersiculo}`;


    textoVersiculo.textContent =
        texto;


    listaVersiculos.classList.remove(
        "ativo"
    );


    versiculo.value =
        numeroVersiculo;

}


// ==========================================
// LER CAPÍTULO INTEIRO
// ==========================================

btnCapitulo.addEventListener(
    "click",
    function () {

        const nomeLivro =
            livro.value;

        const numeroCapitulo =
            capitulo.value;


        if (
            !nomeLivro ||
            !numeroCapitulo
        ) {

            alert(
                "Selecione o livro e o capítulo."
            );

            return;
        }


        mostrarCapitulo(
            nomeLivro,
            numeroCapitulo
        );

    }
);


// ==========================================
// MOSTRAR CAPÍTULO
// ==========================================

function mostrarCapitulo(
    nomeLivro,
    numeroCapitulo
) {

    const dadosCapitulo =
        biblia
        [nomeLivro]
        [numeroCapitulo];


    modoCapitulo = true;


    referencia.textContent =
        `${nomeLivro} ${numeroCapitulo}`;


    textoVersiculo.textContent =
        "";


    listaVersiculos.innerHTML =
        "";


    Object.entries(
        dadosCapitulo
    ).forEach(
        ([numero, texto]) => {

            const item =
                document.createElement("div");


            item.className =
                "versiculo-item";


            item.dataset.versiculo =
                numero;


            item.innerHTML =
                `<span class="numero-versiculo">
                    ${numero}
                </span>
                ${texto}`;


            item.addEventListener(
                "click",
                function () {

                    selecionarVersiculo(
                        nomeLivro,
                        numeroCapitulo,
                        numero
                    );

                }
            );


            listaVersiculos.appendChild(
                item
            );

        }
    );


    listaVersiculos.classList.add(
        "ativo"
    );


    listaVersiculos.scrollTop = 0;

}


// ==========================================
// SELECIONAR VERSÍCULO
// ==========================================

function selecionarVersiculo(
    nomeLivro,
    numeroCapitulo,
    numeroVersiculo
) {

    versiculoAtual =
        Number(numeroVersiculo);


    versiculo.value =
        numeroVersiculo;


    referencia.textContent =
        `${nomeLivro} ${numeroCapitulo}:${numeroVersiculo}`;


    const texto =
        biblia
        [nomeLivro]
        [numeroCapitulo]
        [numeroVersiculo];


    textoVersiculo.textContent =
        texto;


    document
        .querySelectorAll(
            ".versiculo-item"
        )
        .forEach(
            item => {

                item.classList.remove(
                    "selecionado"
                );

            }
        );


    const itemSelecionado =
        document.querySelector(
            `.versiculo-item[data-versiculo="${numeroVersiculo}"]`
        );


    if (itemSelecionado) {

        itemSelecionado.classList.add(
            "selecionado"
        );

        itemSelecionado.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }

}


// ==========================================
// CAPÍTULO ANTERIOR
// ==========================================

btnAnterior.addEventListener(
    "click",
    function () {

        navegarCapitulo(-1);

    }
);


// ==========================================
// PRÓXIMO CAPÍTULO
// ==========================================

btnProximo.addEventListener(
    "click",
    function () {

        navegarCapitulo(1);

    }
);


// ==========================================
// NAVEGAR ENTRE CAPÍTULOS
// ==========================================

function navegarCapitulo(direcao) {

    const nomeLivro =
        livro.value;


    if (!nomeLivro) {

        return;
    }


    const capitulos =
        Object.keys(
            biblia[nomeLivro]
        );


    let indiceAtual =
        capitulos.indexOf(
            capitulo.value
        );


    if (indiceAtual === -1) {

        indiceAtual = 0;

    } else {

        indiceAtual += direcao;

    }


    // ======================================
    // SE CHEGOU AO FINAL DO LIVRO
    // ======================================

    if (
        indiceAtual >= capitulos.length
    ) {

        const livros =
            Object.keys(biblia);


        const indiceLivro =
            livros.indexOf(nomeLivro);


        if (
            indiceLivro <
            livros.length - 1
        ) {

            const proximoLivro =
                livros[indiceLivro + 1];


            livro.value =
                proximoLivro;


            carregarCapitulosDoLivro(
                proximoLivro
            );


            const primeiroCapitulo =
                Object.keys(
                    biblia[proximoLivro]
                )[0];


            capitulo.value =
                primeiroCapitulo;


            carregarVersiculosDoCapitulo(
                proximoLivro,
                primeiroCapitulo
            );


            mostrarCapitulo(
                proximoLivro,
                primeiroCapitulo
            );

        }

        return;

    }


    // ======================================
    // SE VOLTOU ANTES DO PRIMEIRO
    // ======================================

    if (indiceAtual < 0) {

        const livros =
            Object.keys(biblia);


        const indiceLivro =
            livros.indexOf(nomeLivro);


        if (indiceLivro > 0) {

            const livroAnterior =
                livros[indiceLivro - 1];


            livro.value =
                livroAnterior;


            carregarCapitulosDoLivro(
                livroAnterior
            );


            const capitulosAnterior =
                Object.keys(
                    biblia[livroAnterior]
                );


            const ultimoCapitulo =
                capitulosAnterior[
                    capitulosAnterior.length - 1
                ];


            capitulo.value =
                ultimoCapitulo;


            carregarVersiculosDoCapitulo(
                livroAnterior,
                ultimoCapitulo
            );


            mostrarCapitulo(
                livroAnterior,
                ultimoCapitulo
            );

        }

        return;

    }


    // ======================================
    // CAPÍTULO NORMAL
    // ======================================

    const novoCapitulo =
        capitulos[indiceAtual];


    capitulo.value =
        novoCapitulo;


    carregarVersiculosDoCapitulo(
        nomeLivro,
        novoCapitulo
    );


    mostrarCapitulo(
        nomeLivro,
        novoCapitulo
    );

}


// ==========================================
// CARREGAR CAPÍTULOS
// ==========================================

function carregarCapitulosDoLivro(
    nomeLivro
) {

    capitulo.innerHTML =
        '<option value="">Selecione o capítulo</option>';


    Object.keys(
        biblia[nomeLivro]
    ).forEach(
        numero => {

            const opcao =
                document.createElement("option");

            opcao.value =
                numero;

            opcao.textContent =
                "Capítulo " + numero;

            capitulo.appendChild(
                opcao
            );

        }
    );

}


// ==========================================
// CARREGAR VERSÍCULOS
// ==========================================

function carregarVersiculosDoCapitulo(
    nomeLivro,
    numeroCapitulo
) {

    versiculo.innerHTML =
        '<option value="">Selecione o versículo</option>';


    Object.keys(
        biblia
        [nomeLivro]
        [numeroCapitulo]
    ).forEach(
        numero => {

            const opcao =
                document.createElement("option");

            opcao.value =
                numero;

            opcao.textContent =
                "Versículo " + numero;

            versiculo.appendChild(
                opcao
            );

        }
    );

}


// ==========================================
// NAVEGAÇÃO PELO TECLADO
// ==========================================

document.addEventListener(
    "keydown",
    function (evento) {

        // Evita interferir quando estiver
        // digitando em algum campo

        if (
            evento.target.tagName ===
            "INPUT"
        ) {

            return;
        }


        if (
            evento.key === "ArrowLeft"
        ) {

            navegarCapitulo(-1);

        }


        if (
            evento.key === "ArrowRight"
        ) {

            navegarCapitulo(1);

        }


        if (
            evento.key === "ArrowUp"
        ) {

            navegarVersiculo(-1);

        }


        if (
            evento.key === "ArrowDown"
        ) {

            navegarVersiculo(1);

        }


        if (
            evento.key === "Escape"
        ) {

            sairDoTelao();

        }

    }
);


// ==========================================
// NAVEGAR ENTRE VERSÍCULOS
// ==========================================

function navegarVersiculo(
    direcao
) {

    const nomeLivro =
        livro.value;

    const numeroCapitulo =
        capitulo.value;


    if (
        !nomeLivro ||
        !numeroCapitulo
    ) {

        return;
    }


    const versiculos =
        Object.keys(
            biblia
            [nomeLivro]
            [numeroCapitulo]
        );


    let indice =
        versiculos.indexOf(
            versiculo.value
        );


    if (indice === -1) {

        indice = 0;

    } else {

        indice += direcao;

    }


    if (
        indice < 0 ||
        indice >= versiculos.length
    ) {

        return;
    }


    const novoVersiculo =
        versiculos[indice];


    selecionarVersiculo(
        nomeLivro,
        numeroCapitulo,
        novoVersiculo
    );

}


// ==========================================
// MODO TELÃO
// ==========================================

btnProjetar.addEventListener(
    "click",
    entrarNoTelao
);


function entrarNoTelao() {

    document.body.classList.add(
        "modo-telao"
    );


    if (
        document.documentElement.requestFullscreen
    ) {

        document.documentElement
            .requestFullscreen()
            .catch(
                erro => {

                    console.log(
                        "Tela cheia não permitida:",
                        erro
                    );

                }
            );

    }

}


// ==========================================
// SAIR DO TELÃO
// ==========================================

function sairDoTelao() {

    document.body.classList.remove(
        "modo-telao"
    );


    if (
        document.fullscreenElement
    ) {

        document.exitFullscreen()
            .catch(
                () => {}
            );

    }

}


// ==========================================
// LIMPAR LEITURA
// ==========================================

function limparLeitura() {

    referencia.textContent =
        "Selecione uma passagem";


    textoVersiculo.textContent =
        "O texto aparecerá aqui.";


    listaVersiculos.innerHTML =
        "";


    listaVersiculos.classList.remove(
        "ativo"
    );


    modoCapitulo = false;

    versiculoAtual = null;

}


// ==========================================
// INICIAR
// ==========================================

carregarBiblia();
