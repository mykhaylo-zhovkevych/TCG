import { describe, expect, it} from "vitest";

import {
    checkRandomized,
    findEvolutionHelperCard,
} from "@/store/game/game.utils.ts";
import type { IGameCard, IGameManaCard } from "@/store/game/game.types";
import { EnumTypeCard } from "@/types/card.type.ts";

function createCard(overrides: Partial<IGameCard> = {},
): IGameCard {
    return {
        id: 1,
        name: "Dragon - Basic",
        stage: EnumTypeCard.Basic,
        mana: 2,
        attack: 10,
        health: 20,
        description: "Test card",
        imageUrl: " ",
        isOnBoard: false,
        isCanAttack: false,
        isHeld: false,
        ...overrides,
    };
}

describe("findEvolutionHelperCard", () => {
    it("finds the next evolution belonging to the same card type", () => {
        // Arrange
        const basicDragon = createCard({
            id: 1,
            name: "Dragon - Basic",
            stage: EnumTypeCard.Basic,
            isOnBoard: true,
        });

        const dragonStage1 = createCard({
            id: 2,
            name: "Dragon - Stage 1",
            stage: EnumTypeCard.Stage1,
        });

        const wizardStage1 = createCard({
            id: 3,
            name: "Wizard - Stage 1",
            stage: EnumTypeCard.Stage1,
        });

        const deck = [
            basicDragon,
            wizardStage1,
            dragonStage1,
        ];

        // Act
        const result = findEvolutionHelperCard(
            deck,
            basicDragon,
        );

        // Assert
        expect(result).toBe(dragonStage1);
    });
});

describe("checkRandomized", () => {
    it("returns a valid shuffled deck of the cards having the same cards", () => {
        // Arrange
        const deck = [
            createCard({
            id: 1,
            name: "Dragon - Basic",
            stage: EnumTypeCard.Basic,
            }),
            createCard({
                id: 2,
                name: "Wizard - Stage 1",
                stage: EnumTypeCard.Stage1,
            }),

            createCard({
                id: 3,
                name: "Knight - Stage 1",
                stage: EnumTypeCard.Stage1,
            }),

            createCard({
                id: 4,
                name: "Fox - Stage 2",
                stage: EnumTypeCard.Stage2,
            }),
            {
                id: 5,
                type: "mana",
                name: "Mana",
                imageUrl: " ",
                amount: 1,
                isUsed: false,
            } satisfies IGameManaCard,
            createCard({
                id: 5,
                name: "Fox - Stage 2",
                stage: EnumTypeCard.Stage2,
            }),
            createCard({
                id: 6,
                name: "Wizard - Basic",
                stage: EnumTypeCard.Basic,
            }),
        ];

        // Act
        const result = checkRandomized(deck);

        // Assert
        expect(result).toHaveLength(7);

        const originalOrder = deck.map(card => card.id);
        const resultOrder = result.map(card => card.id);

        expect(resultOrder).not.toEqual(originalOrder);

    });
});
