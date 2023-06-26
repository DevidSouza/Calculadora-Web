let tela = document.getElementById('tela');
let resultado = document.getElementById('resultado');
let calc_corpo = document.getElementById('calc-area-bt');
let numeroes_e_operadores = '1234567890/+-x.'
let operad_aritimeticos = '/+-x';
let letras = 'abcdefghijklmnopqrstuvwyz'
let numeros = '1234567890'


// FUNÇÃO QUE CLICA NOS BOTÕES DA CALCULADORA CAPTURADOS PELO EVENTO 'KEYDOWN'
document.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        e.preventDefault()
        document.getElementById('bt-igual').click()
    }
    else {
        if (numeroes_e_operadores.includes(e.key)) {
            insere_digito(e.key)
        }
        if (e.key == 'Backspace') {
            del()
        }
    }
})

function variaveis_uteis() {
    let conteudo_tela = tela.textContent;
    let conteudo_resultado = resultado.textContent;
    let variaveis = {
        'conteudo_tela': conteudo_tela,
        'conteudo_resultado': conteudo_resultado,
        'ultimo_caracter_tela': conteudo_tela[conteudo_tela.length - 1]
    };
    return variaveis;
}

function insere_digito(digito) {
    tela.style.color = 'black';
    tela.style.fontSize = '2em';

    // INSTACIANDO OBJETO VARIAVEIS DA FUNÇÃO 'VARIAVEIS_UTEIS()'
    let v_u = variaveis_uteis();

    if ((v_u.conteudo_tela == '') && (operad_aritimeticos.includes(digito))) {
        return;
    }

    if ((v_u.conteudo_tela == '') && (digito == '.')) {
        digito = '0.';
    }

    if ((trata_sinal_igual(v_u.conteudo_tela))) {
        // INSERE EXPRESSÃO NA PARTE SUPERIOR DA TELA
        resultado.innerHTML = v_u.conteudo_tela;

        tela.innerHTML = '';
        // RETIRA SINAL DE IGUAL E ESPAÇO DA PARTE INFERIOR DA TELA
        if (operad_aritimeticos.includes(digito)) {
            tela.innerHTML = v_u.conteudo_tela.replace('= ', '')
        }
        if (digito == '.') {
            digito = '0.';
        }
    }

    // TROCA DÍGITO DA TELA PELO DÍGITO ATUAL, CASO O ÚNICO DÍGITO DA TELA SEJA '0'
    if ((v_u.conteudo_tela == '0') && (numeros.includes(digito))) {
        tela.innerHTML = '';
    }


    if (trata_zero(v_u.conteudo_tela)) {
        if (!operad_aritimeticos.includes(digito)){
            tela.innerHTML = v_u.conteudo_tela.substring(0, v_u.conteudo_tela.length - 1) + digito;
            return;
        }
    }

    if (trata_operad_aritimeticos(digito)) {
        if ((v_u.ultimo_caracter_tela == '.')) {
        }
        tela.innerHTML = v_u.conteudo_tela.substring(0, v_u.conteudo_tela.length - 1) + digito;
        return;
    }

    if (trata_ponto(digito, v_u.conteudo_tela)) {
        return;
    }

    tela.innerHTML += digito;
}

function trata_zero(expressao) {
    let v_u = variaveis_uteis()
    if (v_u.ultimo_caracter_tela == '0') {
        // IMPEDE QUE O ZERO SE REPITA ENTRE UM OPERADOR E UM NUMERO DE 1 À 9
        return nao_repete_zero(expressao);
    }
}

function trata_sinal_igual(expressao) {
    // INSTACIANDO OBJETO VARIAVEIS DA FUNÇÃO 'VARIAVEIS_UTEIS'
    let v_u = variaveis_uteis();
    if (expressao.includes('= ')) {
        return true;
    }

    for (letra in letras) {
        if (expressao.includes(letras[letra])) {
            return true;
        }
    }
}

function trata_operad_aritimeticos(digito) {
    let v_u = variaveis_uteis();
    let digito_tratado = false;

    // IMPEDE QUE OPERADORES ARITIMÉTICOS SE REPITAM MAIS DE UMA VEZ SEGUIDA
    // E TROCA O OPERADOR, CASO O ATUAL SEJA DIFERENTE
    if (operad_aritimeticos.includes(digito)) {
        if (operad_aritimeticos.includes(v_u.ultimo_caracter_tela)) {
            digito_tratado = true;
        };

        // IMPEDE QUE '.' E OPERADORES FIQUEM UM DO LADO DO OUTRO
        if ((v_u.ultimo_caracter_tela == '.')) {
            digito_tratado = true;
        };
    };
    return digito_tratado;
};

function trata_ponto(digito, expressao) {
    let v_u = variaveis_uteis()
    if (digito == '.') {
        // IMPEDE QUE O '.' SE REPITA MAIS DE UMA VEZ SEGUIDA
        if (v_u.ultimo_caracter_tela == '.') {
            return true;
        }
        // IMPEDE QUE O '.' SE REPIDA ANTES DE UM OPERADOR ARITIMÉTICO (/-+X)
        if (numeros.includes(v_u.ultimo_caracter_tela)) {
            if (expressao.includes(digito)) {
                return true;
            }
        }
        // IMPEDE QUE O '.' SEJA INSERIDO, CASO O ÚLTIMO CARATCTER DA
        // TELA (EXPRESSÃO ATUAL) SEJA UM OPERADOR ARITIMÉTICO (-+/X)
        if (operad_aritimeticos.includes(v_u.ultimo_caracter_tela)) {
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
    let v_u = variaveis_uteis();
    let expressao = v_u.conteudo_tela
    if (expressao.includes('= ') || (expressao == '')) {
        return;
    }

    // EXCLUE OPERADOR ARITIMÉTICO, CASO SEJA O ÚLTIMO NA EXPRESSÃO
    if (operad_aritimeticos.includes(v_u.ultimo_caracter_tela)) {
        expressao = expressao.substring(0, expressao.length - 1)
    }

    let expressao_executada = String(eval(x_para_asterisco(expressao)))

    if (expressao_executada == 'Infinity') {
        tela.innerHTML = ''
        insere_digito('Não é possível dividir por zero')
        tela.style.color = 'red';
        tela.style.fontSize = '18px';
        return
    }

    // INSERE EXPRESSÃO NA PARTE SUPERIOR DA TELA
    resultado.innerHTML = expressao;

    tela.innerHTML = '';
    insere_digito(`= ${expressao_executada}`);
}

function x_para_asterisco(expressao) {
    let expressao_atualizada = ''
    for (indice in expressao) {
        if (expressao[indice] == 'x') {
            expressao_atualizada += expressao[indice].replace('x', '*');
            continue;
        }
        expressao_atualizada += expressao[indice];
    }
    return expressao_atualizada;
}

function nao_repete_zero(expressao) {
    let expressao_invertida = [];
    for (indice in expressao) {
        expressao_invertida.unshift(expressao[indice]);
    }
    for (indice in expressao_invertida) {
        if (operad_aritimeticos.includes(expressao_invertida[indice])) {
            if (expressao_invertida[indice - 1] == '0') {
                return true;
            }
        }
    }
}
