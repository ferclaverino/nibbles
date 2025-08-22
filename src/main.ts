import './style.css';
import { createInitialState, update, GameState } from './game';
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

setupInputHandling(gameState, (newState) => {
    gameState = newState;
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