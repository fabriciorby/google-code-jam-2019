//['2', '2', 'SE', '5', 'EESSSESE']

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

const init = (i, j) => {
    if (i === 0) return;

    let dim = resp.shift();

    let lydSteps = resp.shift();

    let mySteps = getMySteps(lydSteps);

    console.log(`Case #${j}: ${mySteps}`)

    return init(--i, ++j);
}

const getMySteps = (lydSteps) => {
    let mySteps = [];
    lydSteps.split("").forEach(e => {
        mySteps.push(e === 'S' ? 'E' : 'S');
    });
    return mySteps.join("");
}