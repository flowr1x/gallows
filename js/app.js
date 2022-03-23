// Create canvas
const boxCanvas = document.querySelector(".box-canvas");
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

canvas.width = boxCanvas.offsetWidth;
canvas.height = boxCanvas.offsetHeight;
boxCanvas.append(canvas);

//получение переменных из css
const root = getComputedStyle(document.querySelector(":root"));

// Main Game
const listWords = ["apple", "lock", "book", "changer"];
const wordsList = document.querySelector(".words-list");
const output = document.querySelector(".output");

let outputBox;
let secretWord;

// Paint Gallows
const paintCoords = [
    {moveX: canvas.width / 2, moveY: canvas.height, x: canvas.width / 2, y: 80},
    {moveX: canvas.width / 2, moveY: 80, x: canvas.width - 20, y: 80},
    {moveX: canvas.width - 90, moveY: 80, x: canvas.width / 2, y: 100},
    {moveX: canvas.width - 50, moveY: 80, x: canvas.width - 50, y: 110},
    {moveX: canvas.width - 50, moveY: 110, x: canvas.width - 50, y: 120, arc: true},
    {moveX: canvas.width - 50, moveY: 130, x: canvas.width - 50, y: 170},
    {moveX: canvas.width - 50, moveY: 140, x: canvas.width - 30, y: 150},
    {moveX: canvas.width - 50, moveY: 140, x: canvas.width - 70, y: 150},
    {moveX: canvas.width - 50, moveY: 140, x: canvas.width - 50, y: 170},
    {moveX: canvas.width - 50, moveY: 170, x: canvas.width - 70, y: 190},
    {moveX: canvas.width - 50, moveY: 170, x: canvas.width - 30, y: 190},
];

function paintSceleton(count) {
    if (count-1 > 10) {
        gameOver();
        return;
    }
    ctx.fillStyle = root.getPropertyValue("--white-color");
    ctx.strokeStyle = root.getPropertyValue("--white-color");
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    let i = 0;
    while (count > i) {
        const {moveX, moveY, x, y, arc} = paintCoords[i];

        if (arc) paintArc(moveX, moveY, x, y);
        else paintLine(moveX, moveY, x, y);
        i++;
    }
    ctx.stroke();
}

function paintLine(moveX, moveY, x, y) {
    ctx.moveTo(moveX, moveY);
    ctx.lineTo(x, y);
}

function paintArc(moveX, moveY, x, y) {
    ctx.moveTo(moveX, moveY); // 5
    ctx.arc(x, y, 10, 30, Math.PI * 2, true);
}


function gameOver() {

}

function randomWord(arr) {
    const rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
}

function selectWord() {
    const secretWord = randomWord(listWords).split("");
    
    const divBox = document.createElement("div");
    divBox.className = "output-box";
    secretWord.forEach(item => {
        let divItem = document.createElement("div");
        divItem.className = "output-item";
        divBox.append(divItem);
    })

    output.append(divBox);
    outputBox = divBox;

    return secretWord;
}

let activeSymbol = [];
wordsList.addEventListener("click", event => {
    const {target} = event;
    if (!target.closest(".words-item")) return;

    const symbol = target.innerHTML.toLowerCase();

    if (activeSymbol.includes(symbol)) return;
    activeSymbol.push(symbol);
    
    if (secretWord.includes(symbol)) {
        let pos = 0;
        while (~(pos = secretWord.indexOf(symbol, pos))) {
            outputBox.children[pos].innerHTML = symbol;
            pos++;
        }
    }
    target.classList.add("words-item_active");
});

function gameLoop() {
    secretWord = selectWord();
    console.log(secretWord);
}

gameLoop();