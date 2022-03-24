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
const listSecretWords = ["css", "canvas", "html", "javascript"];
const wordsList = document.querySelector(".words-list");
const output = document.querySelector(".output");

const configGame = {};
let activeSymbol = [];
let life = 0;
let isGameOver = false;

const paintCoords = [
    {moveX: canvas.width / 2, moveY: canvas.height, x: canvas.width / 2, y: 80},
    {moveX: canvas.width / 2, moveY: 80, x: canvas.width - 20, y: 80},
    {moveX: canvas.width - 90, moveY: 80, x: canvas.width / 2, y: 100},
    {moveX: canvas.width - 50, moveY: 80, x: canvas.width - 50, y: 110},
    {moveX: canvas.width - 50, moveY: 110, x: canvas.width - 50, y: 120, radius: 10, arc: true},
    {moveX: canvas.width - 50, moveY: 130, x: canvas.width - 50, y: 170},
    {moveX: canvas.width - 50, moveY: 140, x: canvas.width - 30, y: 150},
    {moveX: canvas.width - 50, moveY: 140, x: canvas.width - 70, y: 150},

    {moveX: canvas.width - 50, moveY: 170, x: canvas.width - 70, y: 190},
    {moveX: canvas.width - 50, moveY: 170, x: canvas.width - 30, y: 190},
];

// PAINT GALLOWS 
function paintSceleton(coords, count) {
    clearWindow();
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

    if (count == 10) {
        gameOver(configGame);
        return;
    }
}

function clearWindow() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function paintLine(moveX, moveY, x, y) {
    ctx.moveTo(moveX, moveY);
    ctx.lineTo(x, y);
}

function paintArc(moveX, moveY, x, y, radius) {
    ctx.moveTo(moveX, moveY);
    ctx.arc(x, y, radius, 30, Math.PI * 2, true);
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

function clickOnListWord(event) {
    const {target} = event;

    if (!target.closest(".words-item")) return;

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
        console.log(life);
        paintSceleton(paintCoords, life);
    }

    target.classList.add("words-item_active");
    
    if (!isGameOver && wordGuessed(configGame)) 
        hasGuessWord(configGame.outputBox);
}

function wordGuessed({secretWord, outputBox}) {
    for (let i = 0; i < secretWord.length; i++) { 
        if (secretWord[i] != outputBox.children[i].innerHTML) 
            return false;
    }

    return true;
}

function hasGuessWord(outputBox) {
    activeSymbol = [];

    for (let item of document.querySelectorAll(".words-item")) {
        item.classList.remove("words-item_active");
    }

    outputBox.remove();
    createFormToSecretWord(listSecretWords, configGame);
}

function gameOver( {secretWord, outputBox} ) {
    isGameOver = true;

    for (let i = 0; i < secretWord.length; i++) {
        outputBox.children[i].innerHTML = secretWord[i];
    }

    wordsList.removeEventListener("click", clickOnListWord);
    life = 0;    

    setTimeout(() => {
        clearWindow();
        hasGuessWord(configGame.outputBox);
        wordsList.addEventListener("click", clickOnListWord);
    }, 2000)     
}


wordsList.addEventListener("click", clickOnListWord);
createFormToSecretWord(listSecretWords, configGame);