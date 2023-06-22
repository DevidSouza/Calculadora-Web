let tela = document.getElementById('tela');
let resultado = document.getElementById('resultado');
let calc_corpo = document.getElementById('calc-area-bt');


calc_corpo.addEventListener('click', (e) => {
    let conteudo_tela = tela.textContent;
    let conteudo_resultado = resultado.textContent;
    let ultimo_caracter_tela = conteudo_tela[conteudo_tela.length - 1];
    let texto_do_botao = e.target.textContent;
    let caracters_especiais = '/+-x__'

    if (conteudo_tela.length == 1) {
        return
    }

    if ((ultimo_caracter_tela !== '.') && (texto_do_botao == '.')) {
        tela.innerHTML = '';
        tela.innerHTML = conteudo_tela + '0' + texto_do_botao;
        return;
    }

    if ((conteudo_tela == '') && (caracters_especiais.includes(texto_do_botao))) {
        return;
    }

    if (caracters_especiais.includes(ultimo_caracter_tela)) {
        if (conteudo_resultado.includes('=')) {
            resultado.innerHTML = ''
            conteudo_resultado = ''
        };
        tela.innerHTML = '';
        resultado.innerHTML = conteudo_resultado + conteudo_tela;
    }
})


function digita_numero(numero) {
    tela.style.color = 'black';
    let conteudo_tela = tela.textContent;
    let caracters_especiais = './+-x';

    if (conteudo_tela.includes('=')) {
        tela.innerHTML = ''
        if (caracters_especiais.includes(numero)){
            conteudo_tela = conteudo_tela.replace('=', '') + numero;
            tela.innerHTML = conteudo_tela
            resultado.innerHTML = ''
            return
        }

        resultado.innerHTML = conteudo_tela
    }

    // FUNÇÃO QUE IMPEDE A REPETIÇÃO DE OPERADORES ARITIMÉTICOS NO FINAL DA TELA
    // E PERMITE QUE APENAS UM "." ESTEJA NA OPERAÇÃO
    if (trata_caracteres(numero, conteudo_tela, caracters_especiais)) {
        return;
    }

    tela.innerHTML += numero;
}


function trata_caracteres(caracter, conteudo_tela, carac_especial) {
    if ((conteudo_tela == '') && (carac_especial.includes(caracter))) {
        return true;
    }
    else {
        let ultimo_caracter_da_tela = conteudo_tela[conteudo_tela.length - 1]
        if ((carac_especial.includes(ultimo_caracter_da_tela)) && (carac_especial.includes(caracter))) {

            tela.innerHTML = '';
            tela.innerHTML = conteudo_tela.substring(0, conteudo_tela.length - 1) + caracter;
            return true;
        };
    };

    // IMPEDE QUE O '.' SE REPITA ANTES DE UM CARACTER ESPECIAL (/-+X)
    if (conteudo_tela.includes('.')) {

        if (caracter == '.') {
            tela.innerHTML = conteudo_tela.substring(0, conteudo_tela.length);
            return true;
        }
    }
}


function del() {
    let conteudo_da_tela = tela.textContent
    tela.innerHTML = conteudo_da_tela.substring(0, conteudo_da_tela.length - 1)
}


function limpa() {
    tela.innerHTML = ''
    resultado.innerHTML = ''
}


function ce() {
    tela.innerHTML = ''
}

function calcular() {
    let expressao = '';
    let conteudo_tela = resultado.textContent + tela.textContent;
    let caracters_especiais = '/-+x.';

    for (carac in conteudo_tela) {
        expressao += conteudo_tela[carac].replace('x', '*')
    }

    if (conteudo_tela.length == 1 || conteudo_tela == ''){
        return
    }

    if (caracters_especiais.includes(conteudo_tela[conteudo_tela.length - 1])) {
        expressao = expressao.substring(0, expressao.length - 1)
    }

    if (String(eval(expressao)) == 'Infinity'){
        tela.style.fontSize = '20px';
        tela.style.color = 'red';
        tela.innerHTML = '= Não é possível dividir por zero';
        return;
    }
    
    resultado.innerHTML = conteudo_tela;
    tela.innerHTML = '= ' + eval(expressao);
    
}