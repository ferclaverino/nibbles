export interface GameState {
    gridSize: number;
    score: number;
    gameStarted: boolean;
    snake: { x: number; y: number }[];
    food: { x: number; y: number };
    direction: { x: number; y: number };
    gameOver: boolean;
}

export function createInitialState(): GameState {
    return {
        gridSize: 20,
        score: 0,
        gameStarted: false,
        snake: [{ x: 10, y: 10 }],
        food: { x: 15, y: 15 },
        direction: { x: 0, y: 0 },
        gameOver: false,
    };
}

export function update(state: GameState): GameState {
    if (state.gameOver) {
        return state;
    }

    if (!state.gameStarted) {
        return state;
    }

    const head = { x: state.snake[0].x + state.direction.x, y: state.snake[0].y + state.direction.y };

    if (head.x < 0 || head.x >= state.gridSize || head.y < 0 || head.y >= state.gridSize) {
        return { ...state, gameOver: true };
    }

    for (const segment of state.snake) {
        if (head.x === segment.x && head.y === segment.y) {
            return { ...state, gameOver: true };
        }
    }

    const newSnake = [head, ...state.snake];

    if (head.x === state.food.x && head.y === state.food.y) {
        return {
            ...state,
            score: state.score + 1,
            snake: newSnake,
            food: {
                x: Math.floor(Math.random() * state.gridSize),
                y: Math.floor(Math.random() * state.gridSize),
            },
        };
    } else {
        newSnake.pop();
        return { ...state, snake: newSnake };
    }
}

export function setDirection(state: GameState, newDirection: { x: number; y: number }): GameState {
    if (!state.gameStarted) {
        return { ...state, gameStarted: true, direction: newDirection };
    }
    return { ...state, direction: newDirection };
}
