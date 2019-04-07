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
    if (resp.length - 1 === testCases * 2) {
        main();
        rl.close();
    }
    readLines++;
});

const main = () => {
    init(parseInt(resp.shift()), 1);
}

class Obj {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.mult = x * y;
    }
}

const init = (i, j) => {
    if (i === 0) return;

    const n = resp.shift().split(' ')[0];
    const input = resp.shift().split(' ');

    const allPrime = primeFactorsTo(n);

    let somePrime = [];

    for (let f = 0; f < allPrime.length; f++) {
        for (let b = 0; b < input.length; b++) {
            if (input[b] % allPrime[f] === 0) {
                if (!somePrime.includes(allPrime[f]))
                    somePrime.push(allPrime[f]);
            }
        }
    }

    const allMult = [].concat(...somePrime.map(
        (v, i) => somePrime.slice(i).map(w => new Obj(v, w)))
    );

    let indexList = [];

    for (let k = 0; k < input.length; k++) {
        indexList.push(allMult.findIndex(e => e.mult == input[k]));
    }

    let primeNumberList = [];

    for (let k = 0; k < indexList.length - 1; k++) {
        if (allMult[indexList[k]].x === allMult[indexList[k + 1]].x || allMult[indexList[k]].x === allMult[indexList[k + 1]].y) {
            if (k === 0) primeNumberList.push(allMult[indexList[k]].y)
            if (k === indexList.length - 1) primeNumberList.push(allMult[indexList[k + 1]].y)
            primeNumberList.push(allMult[indexList[k]].x)
        }
        else {
            if (k === 0) primeNumberList.push(allMult[indexList[k]].x)
            primeNumberList.push(allMult[indexList[k]].y)
        }
        if (k === indexList.length - 2) {
            if (primeNumberList[k + 1] === allMult[indexList[k + 1]].x)
                primeNumberList.push(allMult[indexList[k + 1]].y)
            else
                primeNumberList.push(allMult[indexList[k + 1]].x)
        }
    }

    primeNumberList = primeNumberList.filter((e, i) => primeNumberList.indexOf(e) >= i).sort((a, b) => a - b);

    const letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

    let mapa = {};

    primeNumberList.forEach((key, i) => mapa[key] = letras[i]);

    let result = '';

    indexList.forEach(e => {

        let mult = allMult[e];

        if (result === '')
            result += mapa[mult.x] + mapa[mult.y];
        else {
            if (result.slice(-1) == mapa[mult.x]) {
                result += mapa[mult.y];
            } else {
                result += mapa[mult.x];
            }
        }
    });

    console.log(`Case #${j}: ${result}`)

    return init(--i, ++j);
}

const primeFactorsTo = (max) => {
    var store = [], i, j, primes = [];
    for (i = 2; i <= max; ++i) {
        if (!store[i]) {
            primes.push(i);
            for (j = i << 1; j <= max; j += i) {
                store[j] = true;
            }
        }
    }
    return primes;
}