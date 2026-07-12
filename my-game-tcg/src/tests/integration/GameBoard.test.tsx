import {
    cleanup,
    fireEvent,
    render,
    screen,
    waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { afterEach, describe, expect, it, vi } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import GameBoard from "@/pages/home/board/GameBoard";
import { GameStateProvider } from "@/pages/home/board/game-storage/GameStateProvider";
import { gameReducer } from "@/store/game/game.slice";
import type { IGameStore } from "@/store/game/game.types";

// Controllleabe test state
function createTestGameState(
    overrides: Partial<IGameStore> = {},
): IGameStore {
    return {
        isGameOver: false,
        currentTurn: "player",
        turnActions: {
            isMainActionUsed: false,
            isOptionalActionUsed: false,
        },

        pendingAction: null,

        player: {
            health: 42,
            mana: 4,
            deck: [],
        },

        opponent: {
            health: 51,
            mana: 7,
            deck: [],
        },

        ...overrides,
    };
}

// Redux state
function renderGameBoard( gameState: IGameStore = createTestGameState(),
    ) {
        const store = configureStore({
            reducer: {
                game: gameReducer,
            },
            preloadedState: {
                game: gameState,
        },
    });

    const result = render(
        <Provider store={store}>
            <GameStateProvider>
                <GameBoard />
            </GameStateProvider>
        </Provider>
        );

    return {
        store,
        ...result,
    };
}

// Reset the testing environment
afterEach(() => {
    cleanup();
    vi.useRealTimers();
})

describe("GameBoard Integration", () => {
    it("changes the current turn when the player clicks End Turn", () => {
        vi.useFakeTimers();

        const { store } = renderGameBoard();
        expect(store.getState().game.currentTurn).toBe("player");

        fireEvent.click(screen.getByRole("button", { name: /end turn/i }));
        expect(store.getState().game.currentTurn).toBe("opponent");
    });

    it("shows game over and start a new game when clicked", async () => {
       const gameState = createTestGameState({
           isGameOver: true,
       });
       const { store } = renderGameBoard(gameState);

       const gameOverNotice = await screen.findByRole("button", { name: /game over/i});
       fireEvent.click(gameOverNotice);

       // Check if there is no button in after fireEvent
       await waitFor(() => {
           expect(screen.queryByRole("button", {
               name: /game over/i
           })
           ).not.toBeInTheDocument();
       });
       expect(store.getState().game.isGameOver).toBe(false);
    });
})
