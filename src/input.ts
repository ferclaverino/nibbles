export function setupInputHandling(onDirectionChange: (direction: { x: number; y: number }) => void) {
    window.addEventListener('keydown', e => {
        let newDirection: { x: number; y: number } | null = null;
        switch (e.key) {
            case 'ArrowUp':
                newDirection = { x: 0, y: -1 };
                break;
            case 'ArrowDown':
                newDirection = { x: 0, y: 1 };
                break;
            case 'ArrowLeft':
                newDirection = { x: -1, y: 0 };
                break;
            case 'ArrowRight':
                newDirection = { x: 1, y: 0 };
                break;
        }

        if (newDirection) {
            onDirectionChange(newDirection);
        }
    });
}
