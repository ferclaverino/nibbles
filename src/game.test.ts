import { describe, it, expect } from 'vitest';
import { createInitialState, update, setDirection } from './game';

describe('game logic', () => {
    it('should create a valid initial state', () => {
        const state = createInitialState();
        expect(state.gameOver).toBe(false);
        expect(state.score).toBe(0);
        expect(state.snake.length).toBe(1);
    });

    it('should move the snake', () => {
        let state = createInitialState();
        state = setDirection(state, { x: 1, y: 0 });
        state = update(state);
        expect(state.snake[0]).toEqual({ x: 11, y: 10 });
    });

    it('should grow the snake when it eats food', () => {
        let state = createInitialState();
        state.food = { x: 11, y: 10 };
        state = setDirection(state, { x: 1, y: 0 });
        state = update(state);
        expect(state.snake.length).toBe(2);
        expect(state.score).toBe(1);
    });

    it('should end the game when the snake hits a wall', () => {
        let state = createInitialState();
        state.snake = [{ x: 0, y: 0 }];
        state = setDirection(state, { x: -1, y: 0 });
        state = update(state);
        expect(state.gameOver).toBe(true);
    });

    it('should end the game when the snake hits itself', () => {
        let state = createInitialState();
        state.snake = [{ x: 10, y: 10 }, { x: 11, y: 10 }];
        state = setDirection(state, { x: 1, y: 0 });
        state = update(state);
        expect(state.gameOver).toBe(true);
    });
});
