"use strict";

/* ============================================================
   PROJETO CLIMATIZAÇÃO
   SCRIPT PRINCIPAL
============================================================ */


/* ============================================================
   CONFIGURAÇÕES
============================================================ */

const CONFIG = {

    // Número demonstrativo.
    // Quando o cliente passar o WhatsApp real,
    // alteramos somente este número.
    whatsapp: "5500000000000",

    nomeEmpresa: "ClimaTech",

    prazoResposta: "Em breve nossa equipe entrará em contato.",

    chaveOrcamentos: "climaTechOrcamentos",

    chaveClientes: "climaTechClientes",

    chaveAgendamentos: "climaTechAgendamentos",

    chaveServicos: "climaTechServicos",

    chaveProdutos: "climaTechProdutos",

    chaveOrdensServico: "climaTechOrdensServico",

    chaveVendas: "climaTechVendas"

};


/* ============================================================
   UTILITÁRIOS
============================================================ */

function gerarId(prefixo = "ID") {

    const agora = Date.now();

    const aleatorio =
        Math.floor(
            Math.random() * 10000
        );

    return `${prefixo}-${agora}-${aleatorio}`;

}


function obterDataHora() {

    const agora = new Date();

    return agora.toLocaleString(
        "pt-BR"
    );

}


function salvarDados(chave, dados) {

    try {

        localStorage.setItem(
            chave,
            JSON.stringify(dados)
        );

        return true;

    } catch (erro) {

        console.error(
            "Erro ao salvar dados:",
            erro
        );

        return false;

    }

}


function carregarDados(chave) {

    try {

        const dados =
            localStorage.getItem(chave);

        if (!dados) {

            return [];

        }

        return JSON.parse(dados);

    } catch (erro) {

        console.error(
            "Erro ao carregar dados:",
            erro
        );

        return [];

    }

}


function escaparTexto(texto) {

    if (
        texto === null ||
        texto === undefined
    ) {

        return "";

    }

    return String(texto)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* ============================================================
   MENU MOBILE
============================================================ */

function configurarMenu() {

    const botaoMenu =
        document.getElementById(
            "botaoMenu"
        );

    const navegacao =
        document.getElementById(
            "navegacao"
        );


    if (
        !botaoMenu ||
        !navegacao
    ) {

        return;

    }


    botaoMenu.addEventListener(
        "click",
        () => {

            const aberto =
                navegacao.classList.toggle(
                    "aberto"
                );


            document.body.classList.toggle(
                "menu-aberto",
                aberto
            );


            botaoMenu.setAttribute(
                "aria-expanded",
                String(aberto)
            );


            botaoMenu.textContent =
                aberto
                    ? "✕"
                    : "☰";

        }
    );


    const links =
        navegacao.querySelectorAll(
            "a"
        );


    links.forEach(
        link => {

            link.addEventListener(
                "click",
                () => {

                    navegacao.classList.remove(
                        "aberto"
                    );

                    document.body.classList.remove(
                        "menu-aberto"
                    );

                    botaoMenu.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    botaoMenu.textContent =
                        "☰";

                }
            );

        }
    );

}


/* ============================================================
   ANO DO RODAPÉ
============================================================ */

function atualizarAno() {

    const elemento =
        document.getElementById(
            "anoAtual"
        );


    if (!elemento) {

        return;

    }


    elemento.textContent =
        new Date().getFullYear();

}


/* ============================================================
   WHATSAPP
============================================================ */

function criarLinkWhatsApp(mensagem) {

    const numero =
        CONFIG.whatsapp.replace(
            /\D/g,
            ""
        );


    return (
        "https://wa.me/" +
        numero +
        "?text=" +
        encodeURIComponent(
            mensagem
        )
    );

}


/* ============================================================
   CONFIGURAR WHATSAPP
============================================================ */

function configurarWhatsApp() {

    const mensagemPadrao =
        `Olá! Gostaria de saber mais sobre os serviços de ${CONFIG.nomeEmpresa}.`;


    const link =
        criarLinkWhatsApp(
            mensagemPadrao
        );


    const linkWhatsApp =
        document.getElementById(
            "linkWhatsApp"
        );


    const whatsappFlutuante =
        document.getElementById(
            "whatsappFlutuante"
        );


    if (linkWhatsApp) {

        linkWhatsApp.href =
            link;

        linkWhatsApp.target =
            "_blank";

        linkWhatsApp.rel =
            "noopener noreferrer";

    }


    if (whatsappFlutuante) {

        whatsappFlutuante.href =
            link;

        whatsappFlutuante.target =
            "_blank";

        whatsappFlutuante.rel =
            "noopener noreferrer";

    }

}


/* ============================================================
   FORMULÁRIO DE ORÇAMENTO
============================================================ */

function configurarFormularioOrcamento() {

    const formulario =
        document.getElementById(
            "formularioOrcamento"
        );


    if (!formulario) {

        return;

    }


    formulario.addEventListener(
        "submit",
        evento => {

            evento.preventDefault();


            const nome =
                document.getElementById(
                    "nome"
                )?.value.trim();


            const telefone =
                document.getElementById(
                    "telefone"
                )?.value.trim();


            const tipoAtendimento =
                document.getElementById(
                    "tipoAtendimento"
                )?.value;


            const cidade =
                document.getElementById(
                    "cidade"
                )?.value.trim();


            const mensagem =
                document.getElementById(
                    "mensagem"
                )?.value.trim();


            if (
                !nome ||
                !telefone ||
                !tipoAtendimento ||
                !cidade ||
                !mensagem
            ) {

                alert(
                    "Preencha todos os campos do orçamento."
                );

                return;

            }


            /* =================================================
               CRIAÇÃO DO ORÇAMENTO
            ================================================= */

            const orcamento = {

                id: gerarId("ORC"),

                data: obterDataHora(),

                nome:
                    escaparTexto(
                        nome
                    ),

                telefone:
                    escaparTexto(
                        telefone
                    ),

                tipoAtendimento:
                    escaparTexto(
                        tipoAtendimento
                    ),

                cidade:
                    escaparTexto(
                        cidade
                    ),

                mensagem:
                    escaparTexto(
                        mensagem
                    ),

                status:
                    "Novo",

                origem:
                    "Site"

            };


            /* =================================================
               SALVA NO SISTEMA
            ================================================= */

            const orcamentos =
                carregarDados(
                    CONFIG.chaveOrcamentos
                );


            orcamentos.push(
                orcamento
            );


            salvarDados(
                CONFIG.chaveOrcamentos,
                orcamentos
            );


            /* =================================================
               CADASTRA CLIENTE
            ================================================= */

            cadastrarClienteAutomaticamente(
                orcamento
            );


            /* =================================================
               MENSAGEM DO WHATSAPP
            ================================================= */

            const mensagemWhatsApp =
                `Olá! Gostaria de solicitar um orçamento.

Nome: ${nome}

WhatsApp: ${telefone}

Serviço: ${tipoAtendimento}

Cidade: ${cidade}

Descrição:
${mensagem}

Número do orçamento: ${orcamento.id}`;


            const link =
                criarLinkWhatsApp(
                    mensagemWhatsApp
                );


            /* =================================================
               ABRE WHATSAPP
            ================================================= */

            window.open(
                link,
                "_blank",
                "noopener,noreferrer"
            );


            /* =================================================
               LIMPA FORMULÁRIO
            ================================================= */

            formulario.reset();


            /* =================================================
               CONFIRMAÇÃO
            ================================================= */

            alert(
                `Solicitação registrada com sucesso!\n\n` +
                `Número: ${orcamento.id}\n\n` +
                `${CONFIG.prazoResposta}`
            );

        }
    );

}


/* ============================================================
   CADASTRO AUTOMÁTICO DE CLIENTE
============================================================ */

function cadastrarClienteAutomaticamente(
    orcamento
) {

    const clientes =
        carregarDados(
            CONFIG.chaveClientes
        );


    const telefone =
        orcamento.telefone;


    const clienteExistente =
        clientes.find(
            cliente =>
                cliente.telefone ===
                telefone
        );


    if (clienteExistente) {

        clienteExistente.nome =
            orcamento.nome;

        clienteExistente.cidade =
            orcamento.cidade;

        clienteExistente.atualizadoEm =
            obterDataHora();


        salvarDados(
            CONFIG.chaveClientes,
            clientes
        );


        return;

    }


    const novoCliente = {

        id: gerarId("CLI"),

        nome:
            orcamento.nome,

        telefone:
            orcamento.telefone,

        cidade:
            orcamento.cidade,

        criadoEm:
            obterDataHora(),

        atualizadoEm:
            obterDataHora(),

        origem:
            "Site"

    };


    clientes.push(
        novoCliente
    );


    salvarDados(
        CONFIG.chaveClientes,
        clientes
    );

}


/* ============================================================
   BOTÕES DE PRODUTO
============================================================ */

function configurarProdutos() {

    const botoes =
        document.querySelectorAll(
            ".botao-produto"
        );


    botoes.forEach(
        botao => {

            botao.addEventListener(
                "click",
                () => {

                    const produto =
                        botao.dataset.produto ||
                        "produto";


                    const mensagem =
                        `Olá! Gostaria de saber mais sobre:

${produto}

Gostaria de receber informações e orçamento.`;


                    const link =
                        criarLinkWhatsApp(
                            mensagem
                        );


                    window.open(
                        link,
                        "_blank",
                        "noopener,noreferrer"
                    );

                }
            );

        }
    );

}


/* ============================================================
   MÁSCARA DE TELEFONE
============================================================ */

function configurarTelefone() {

    const campo =
        document.getElementById(
            "telefone"
        );


    if (!campo) {

        return;

    }


    campo.addEventListener(
        "input",
        () => {

            let valor =
                campo.value.replace(
                    /\D/g,
                    ""
                );


            if (
                valor.length > 11
            ) {

                valor =
                    valor.substring(
                        0,
                        11
                    );

            }


            if (
                valor.length <= 10
            ) {

                valor =
                    valor.replace(
                        /^(\d{2})(\d)/,
                        "($1) $2"
                    );

                valor =
                    valor.replace(
                        /(\d{4})(\d)/,
                        "$1-$2"
                    );

            } else {

                valor =
                    valor.replace(
                        /^(\d{2})(\d)/,
                        "($1) $2"
                    );

                valor =
                    valor.replace(
                        /(\d{5})(\d)/,
                        "$1-$2"
                    );

            }


            campo.value =
                valor;

        }
    );

}


/* ============================================================
   NAVEGAÇÃO SUAVE
============================================================ */

function configurarNavegacao() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    links.forEach(
        link => {

            link.addEventListener(
                "click",
                evento => {

                    const destino =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !destino ||
                        destino === "#"
                    ) {

                        return;

                    }


                    const elemento =
                        document.querySelector(
                            destino
                        );


                    if (!elemento) {

                        return;

                    }


                    evento.preventDefault();


                    const alturaCabecalho =
                        document.querySelector(
                            ".cabecalho"
                        )?.offsetHeight ||
                        0;


                    const posicao =
                        elemento.getBoundingClientRect()
                            .top +
                        window.scrollY -
                        alturaCabecalho -
                        10;


                    window.scrollTo({

                        top:
                            posicao,

                        behavior:
                            "smooth"

                    });

                }
            );

        }
    );

}


/* ============================================================
   ANIMAÇÃO AO ENTRAR NA TELA
============================================================ */

function configurarAnimacoes() {

    const elementos =
        document.querySelectorAll(
            ".servico-card, .produto-card, .contato-card, .agendamento-card, .destaque-card"
        );


    if (
        !("IntersectionObserver" in window)
    ) {

        return;

    }


    const observador =
        new IntersectionObserver(
            entradas => {

                entradas.forEach(
                    entrada => {

                        if (
                            entrada.isIntersecting
                        ) {

                            entrada.target.style.opacity =
                                "1";

                            entrada.target.style.transform =
                                "translateY(0)";

                            observador.unobserve(
                                entrada.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.10
            }
        );


    elementos.forEach(
        elemento => {

            elemento.style.opacity =
                "0";

            elemento.style.transform =
                "translateY(20px)";

            elemento.style.transition =
                "opacity 0.6s ease, transform 0.6s ease";


            observador.observe(
                elemento
            );

        }
    );

}


/* ============================================================
   ESTRUTURA INICIAL DO SISTEMA
   PREPARAÇÃO PARA O ADMINISTRATIVO
============================================================ */

function inicializarEstruturaSistema() {

    const chaves = [

        CONFIG.chaveOrcamentos,

        CONFIG.chaveClientes,

        CONFIG.chaveAgendamentos,

        CONFIG.chaveServicos,

        CONFIG.chaveProdutos,

        CONFIG.chaveOrdensServico,

        CONFIG.chaveVendas

    ];


    chaves.forEach(
        chave => {

            if (
                localStorage.getItem(
                    chave
                ) === null
            ) {

                salvarDados(
                    chave,
                    []
                );

            }

        }
    );

}


/* ============================================================
   DADOS DEMONSTRATIVOS
   NÃO SÃO EXIBIDOS NO SITE.
   SERVIRÃO COMO BASE PARA O ADMINISTRATIVO.
============================================================ */

function criarDadosDemonstrativos() {

    const servicos =
        carregarDados(
            CONFIG.chaveServicos
        );


    if (
        servicos.length === 0
    ) {

        const servicosIniciais = [

            {
                id: gerarId("SER"),
                nome: "Instalação",
                categoria: "Climatização",
                ativo: true
            },

            {
                id: gerarId("SER"),
                nome: "Manutenção preventiva",
                categoria: "Manutenção",
                ativo: true
            },

            {
                id: gerarId("SER"),
                nome: "Manutenção corretiva",
                categoria: "Manutenção",
                ativo: true
            },

            {
                id: gerarId("SER"),
                nome: "Higienização",
                categoria: "Limpeza",
                ativo: true
            },

            {
                id: gerarId("SER"),
                nome: "Limpeza técnica",
                categoria: "Limpeza",
                ativo: true
            }

        ];


        salvarDados(
            CONFIG.chaveServicos,
            servicosIniciais
        );

    }


    const produtos =
        carregarDados(
            CONFIG.chaveProdutos
        );


    if (
        produtos.length === 0
    ) {

        const produtosIniciais = [

            {
                id: gerarId("PROD"),
                nome: "Ar-condicionado Split",
                categoria: "Climatização",
                preco: 0,
                estoque: 0,
                ativo: true
            },

            {
                id: gerarId("PROD"),
                nome: "Ar-condicionado Inverter",
                categoria: "Climatização",
                preco: 0,
                estoque: 0,
                ativo: true
            },

            {
                id: gerarId("PROD"),
                nome: "Equipamento comercial",
                categoria: "Climatização",
                preco: 0,
                estoque: 0,
                ativo: true
            }

        ];


        salvarDados(
            CONFIG.chaveProdutos,
            produtosIniciais
        );

    }

}


/* ============================================================
   CONSOLE DE DESENVOLVIMENTO
============================================================ */

function mostrarStatusSistema() {

    console.log(
        "===================================="
    );

    console.log(
        "CLIMATECH — SISTEMA INICIALIZADO"
    );

    console.log(
        "Site público: OK"
    );

    console.log(
        "Orçamentos: OK"
    );

    console.log(
        "Clientes: OK"
    );

    console.log(
        "Estrutura administrativa: PREPARADA"
    );

    console.log(
        "PDV: ESTRUTURA PREPARADA"
    );

    console.log(
        "===================================="
    );

}


/* ============================================================
   INICIALIZAÇÃO
============================================================ */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        inicializarEstruturaSistema();

        criarDadosDemonstrativos();

        configurarMenu();

        atualizarAno();

        configurarWhatsApp();

        configurarFormularioOrcamento();

        configurarProdutos();

        configurarTelefone();

        configurarNavegacao();

        configurarAnimacoes();

        mostrarStatusSistema();

    }
);