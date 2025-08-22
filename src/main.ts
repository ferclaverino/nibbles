import './style.css';

const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;
const scoreElement = document.getElementById('score')!;
const restartButton = document.getElementById('restartButton') as HTMLButtonElement;

const gridSize = 20;
let score = 0;

let snake = [
    { x: 10, y: 10 },
];

let food = {
    x: Math.floor(Math.random() * gridSize),
    y: Math.floor(Math.random() * gridSize),
};

let direction = { x: 0, y: 0 };
let gameOver = false;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const segment of snake) {
        ctx.fillStyle = 'lime';
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    }

    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

function update() {
    if (gameOver) {
        restartButton.hidden = false;
        return;
    }

    if (direction.x === 0 && direction.y === 0) {
        return;
    }

    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
        gameOver = true;
        return;
    }

    for (const segment of snake) {
        if (head.x === segment.x && head.y === segment.y) {
            gameOver = true;
            return;
        }
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreElement.textContent = `Score: ${score}`;
        food = {
            x: Math.floor(Math.random() * gridSize),
            y: Math.floor(Math.random() * gridSize),
        };
    } else {
        snake.pop();
    }
}

function restartGame() {
    snake = [{ x: 10, y: 10 }];
    food = {
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize),
    };
    direction = { x: 0, y: 0 };
    score = 0;
    scoreElement.textContent = `Score: ${score}`;
    gameOver = false;
    restartButton.hidden = true;
}

function gameLoop() {
    update();
    draw();
    setTimeout(gameLoop, 100);
}

window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
});

restartButton.addEventListener('click', restartGame);

gameLoop();
