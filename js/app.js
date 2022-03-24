// CREATE CANVAS AND CONTEXT 2D
const boxCanvas = document.querySelector(".box-canvas");
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

canvas.width = boxCanvas.offsetWidth;
canvas.height = boxCanvas.offsetHeight;
boxCanvas.append(canvas);

// GET VARIABLES TO CSS STYLE 
const root = getComputedStyle(document.querySelector(":root"));

// CONFIGURE GAME 
const listSecretWords = ["cock", "book", "apple", "orange"];
const wordsList = document.querySelector(".words-list");
const output = document.querySelector(".output");

let configGame = {};
let activeSymbol = [];
let life = 0;

const paintCoords = [
    {moveX: canvas.width / 2, moveY: canvas.height, x: canvas.width / 2, y: 80},
    {moveX: canvas.width / 2, moveY: 80, x: canvas.width - 20, y: 80},
    {moveX: canvas.width - 90, moveY: 80, x: canvas.width / 2, y: 100},
    {moveX: canvas.width - 50, moveY: 80, x: canvas.width - 50, y: 110},
    {moveX: canvas.width - 50, moveY: 110, x: canvas.width - 50, y: 120, radius: 10, arc: true},
    {moveX: canvas.width - 50, moveY: 130, x: canvas.width - 50, y: 170},
    {moveX: canvas.width - 50, moveY: 140, x: canvas.width - 30, y: 150},
    {moveX: canvas.width - 50, moveY: 140, x: canvas.width - 70, y: 150},
    {moveX: canvas.width - 50, moveY: 140, x: canvas.width - 50, y: 170},
    {moveX: canvas.width - 50, moveY: 170, x: canvas.width - 70, y: 190},
    {moveX: canvas.width - 50, moveY: 170, x: canvas.width - 30, y: 190},
];

// PAINT GALLOWS 
function paintSceleton(coords, count) {
    if (count > 10) {
        gameOver();
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = root.getPropertyValue("--white-color");
    ctx.strokeStyle = root.getPropertyValue("--white-color");
    ctx.lineWidth = 2;
    ctx.beginPath();

    let i = 0;
    while (count > i) {
        const {moveX, moveY, x, y, arc, radius = 0} = coords[i];

        if (arc) paintArc(moveX, moveY, x, y, radius);
        else paintLine(moveX, moveY, x, y); 
        i++;
    }

    ctx.stroke();
}

function paintLine(moveX, moveY, x, y) {
    ctx.moveTo(moveX, moveY);
    ctx.lineTo(x, y);
}

function paintArc(moveX, moveY, x, y, radius) {
    ctx.moveTo(moveX, moveY);
    ctx.arc(x, y, radius, 30, Math.PI * 2, true);
}

function gameOver() {

}

// WORK WITH FORM AND SYMBOL
function createFormToSecretWord(listWords, config) {
    const secretWord = getRandomSecretWord(listWords);
    
    const containerItems = document.createElement("div");
    containerItems.className = "output-box";

    secretWord.split("").forEach(item => {
        const outputItem = document.createElement("div");
        outputItem.className = "output-item";
        containerItems.append(outputItem);
    })

    output.append(containerItems);

    config.secretWord = secretWord;
    config.outputBox = containerItems;
}

function getRandomSecretWord(arr) {
    const rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
}

wordsList.addEventListener("click", event => {
    const {target} = event;

    if (!target.closest(".words-item")) {
        return;
    } 

    const symbol = target.innerHTML.toLowerCase();
    if (activeSymbol.includes(symbol)) {
        return;
    } 
    else {
        activeSymbol.push(symbol);
    }
    
    if (configGame.secretWord.includes(symbol)) {
        let pos = 0;
        while (~(pos = configGame.secretWord.indexOf(symbol, pos))) {
            configGame.outputBox.children[pos].innerHTML = symbol;
            pos++;
        }
    } else {
        life++;
        paintSceleton(paintCoords, life);
    }

    target.classList.add("words-item_active");

    if (guessWord(configGame)) {
        activeSymbol = [];

        for (let item of document.querySelectorAll(".words-item")) {
            item.classList.remove("words-item_active");
        }

        configGame.outputBox.remove();
        createFormToSecretWord(listSecretWords, configGame);
    }
});

function guessWord( {secretWord, outputBox} ) {
    for (let i = 0; i < secretWord.length; i++) { 
        if (secretWord[i] != outputBox.children[i].innerHTML) 
            return false;
    }
    return true;
}

function gameLoop() {
    createFormToSecretWord(listSecretWords, configGame);
}

gameLoop();