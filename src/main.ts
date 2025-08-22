import './style.css';
import { createInitialState, update, setDirection, GameState } from './game';
import { draw, restartButton, muteButton, backgroundMusic } from './ui';
import { setupInputHandling } from './input';

let gameState = createInitialState();

function gameLoop() {
    gameState = update(gameState);
    draw(gameState);
    setTimeout(gameLoop, 100);
}

function restartGame() {
    gameState = createInitialState();
    backgroundMusic.currentTime = 0;
}

setupInputHandling((newDirection) => {
    const isMovingHorizontally = gameState.direction.x !== 0;
    const isMovingVertically = gameState.direction.y !== 0;

    if (isMovingHorizontally && newDirection.x !== 0) {
        return;
    }
    if (isMovingVertically && newDirection.y !== 0) {
        return;
    }

    gameState = setDirection(gameState, newDirection);
    if (gameState.gameStarted && !gameState.gameOver) {
        backgroundMusic.play();
    }
});

restartButton.addEventListener('click', restartGame);

muteButton.addEventListener('click', () => {
    backgroundMusic.muted = !backgroundMusic.muted;
    muteButton.textContent = backgroundMusic.muted ? 'Unmute' : 'Mute';
});

gameLoop();