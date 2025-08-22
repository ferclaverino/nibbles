import { GameState, setDirection } from './game';

export function setupInputHandling(state: GameState, onDirectionChange: (newState: GameState) => void) {
    window.addEventListener('keydown', e => {
        let newDirection: { x: number; y: number } | null = null;
        switch (e.key) {
            case 'ArrowUp':
                if (state.direction.y === 0) newDirection = { x: 0, y: -1 };
                break;
            case 'ArrowDown':
                if (state.direction.y === 0) newDirection = { x: 0, y: 1 };
                break;
            case 'ArrowLeft':
                if (state.direction.x === 0) newDirection = { x: -1, y: 0 };
                break;
            case 'ArrowRight':
                if (state.direction.x === 0) newDirection = { x: 1, y: 0 };
                break;
        }

        if (newDirection) {
            onDirectionChange(setDirection(state, newDirection));
        }
    });
}
