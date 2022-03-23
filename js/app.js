// Create canvas
const boxCanvas = document.querySelector(".box-canvas");
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

canvas.width = boxCanvas.offsetWidth;
canvas.height = boxCanvas.offsetHeight;
boxCanvas.append(canvas);

//получение переменных из css
const root = getComputedStyle(document.querySelector(":root"));
//console.log(root.getPropertyValue("--white-color"));

// Main Game
const listWords = ["apple", "lock", "book", "changer"];

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

function paintSceletor() {
    ctx.fillStyle = root.getPropertyValue("--white-color");
    ctx.strokeStyle = root.getPropertyValue("--white-color");
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let item of paintCoords) {
        if (item.arc) paintArc(item.moveX, item.moveY, item.x, item.y);
        else paintLine(item.moveX, item.moveY, item.x, item.y);
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

paintSceletor();