//['3', '4', '940', '4444'];

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let resp = [];
let readLines = 0;
let testCases;

rl.on('line', (line) => {
    if (readLines === 0) {
        testCases = parseInt(line);
        resp.push(line);
    } else {
        resp.push(line);
    }
    if (resp.length - 1 === testCases) {
        main();
        rl.close();
    }
    readLines++;
});

const main = async () => {
    init(parseInt(resp.shift()), 1);
};

const init = (i, j) => {
    if (i === 0) return;

    let numero = parseInt(resp.shift());
    let casas = getQuantidadeCasas(numero);

    let [a, b] = (getAeB(0, casas, numero, 0, 0));

    process.stdout.write(`Case #${j}: ${a} ${b}\n`)

    return init(--i, ++j);
};

const getQuantidadeCasas = (numero) => {
    const a = (numero, i) => {
        if (numero < 1)
            return i;
        return a(numero / 10, ++i);
    }
    return (a(numero, 0));
};

const getAeB = (j, casas, numero, a, b) => {
    if (j == casas)
        return [a, b];
    let casa = numero % 10;
    let potencia = Math.pow(10, j);
    if (casa == 4) {
        a += 3 * potencia;
        b += 1 * potencia;
    } else {
        a += casa * potencia;
    }
    numero = parseInt(numero / 10);
    return getAeB(++j, casas, numero, a, b);
};