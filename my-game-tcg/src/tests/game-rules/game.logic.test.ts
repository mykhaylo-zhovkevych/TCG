import { describe, expect, it } from "vitest";
import { endTurnAction } from "@/store/game/game.logic"
import type { IGameStore } from "@/store/game/game.types"

describe("endTurnAction", ()=> {
    it("changes the player turn to the opposite side", () => {
        // Arrange
        const state: IGameStore = {
            isGameOver: false,
            currentTurn: "player",

            turnActions: {
                isMainActionUsed: true,
                isOptionalActionUsed: true,
            },

            pendingAction: "evolve",

            player: {
                health: 60,
                mana: 4,
                deck: [],
            },

            opponent: {
                health: 60,
                mana: 7,
                deck: [],
            },
        };
        // Act
        const result = endTurnAction(state);

        // Assert
        expect(result.currentTurn).toBe("opponent");

        expect(result.turnActions).toEqual({
            isMainActionUsed: false,
            isOptionalActionUsed: false,
        });

        expect(result.pendingAction).toBeNull();
        expect(result.player?.mana).toBe(5);
        expect(result.opponent?.mana).toBe(7);
    });
});
