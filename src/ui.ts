import { GameState } from './game';

export const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
export const ctx = canvas.getContext('2d')!;
export const scoreElement = document.getElementById('score')!;
export const restartButton = document.getElementById('restartButton') as HTMLButtonElement;
export const backgroundMusic = document.getElementById('backgroundMusic') as HTMLAudioElement;
export const muteButton = document.getElementById('muteButton') as HTMLButtonElement;

export function draw(state: GameState) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const segment of state.snake) {
        drawRoundedRect(segment.x * state.gridSize, segment.y * state.gridSize, state.gridSize, state.gridSize, 5, '#3498db');
    }

    drawRoundedRect(state.food.x * state.gridSize, state.food.y * state.gridSize, state.gridSize, state.gridSize, 5, '#e74c3c');

    scoreElement.textContent = `Score: ${state.score}`;

    if (state.gameOver) {
        restartButton.hidden = false;
        backgroundMusic.pause();
    } else {
        restartButton.hidden = true;
    }
}

function drawRoundedRect(x: number, y: number, width: number, height: number, radius: number, color: string) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fill();
}
