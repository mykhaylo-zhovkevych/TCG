import type { GameDeckCard, IGameCard, IGameManaCard, IGameStore, IHero, PlayerType } from "./game.types.ts";
import {type ICard, type IManaCard, isManaCard} from "@/types/card.type.ts";
import {CARDS, UTIL_CARDS} from "@/constants/game/cards.constants.ts";
import {INITIAL_HEALTH, INITIAL_MANA, MAX_MANA} from "@/constants/game/game.constants.ts";

const createGameCard = (card: ICard, index: number): IGameCard => ({
    ...card,
    id: index + 1,
    isOnBoard: false,
    isCanAttack: false,
})

const createGameManaCard = (mCard: IManaCard, index: number): IGameManaCard => ({
    ...mCard,
    id: index + 1,
    isUsed: false,
})

function shuffleDeck<T>(deck: T[]): T[] {
    const copy = [...deck];

    for (let i = copy.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1))

        const tmp = copy[i]
        copy[i] = copy[randomIndex]
        copy[randomIndex] = tmp
    }

    return copy
}

function isValidRandomized(deck: GameDeckCard[]): boolean {
    const nonManaCards = deck.filter((card) => !isManaCard(card));

    for (let i = 0; i < nonManaCards.length; i += 5) {
        const block = nonManaCards.slice(i, i + 5);

        const nameCounts: Record<string, number> = {};

        for (const card of block) {
            const baseName = getCardBaseName(card.name)
            if (nameCounts[baseName] === undefined) {
                nameCounts[baseName] = 1;
            } else {
                nameCounts[baseName] = nameCounts[baseName] + 1;
            }
            if (nameCounts[baseName] >= 3 ){
                return false;
            }
        }

        const hasBasicCard = block.some((card) => card.stage === 'Basic');

        if (!hasBasicCard) {
            return false;
        }
    }
    return true;
}

function getCardBaseName(name: string): string {
    return name.split(' - ')[0];
}

function checkRandomized(deck: GameDeckCard[] ) {

    let input = shuffleDeck([...deck]);
    while (!isValidRandomized(input)) {
        input = shuffleDeck([...deck])
    }
    return input;
}

function createDeck(): GameDeckCard[] {
    const manaCards = UTIL_CARDS.map(createGameManaCard)
    const cards = CARDS.map((card, index) => createGameCard(card, index + UTIL_CARDS.length))
    const initial = shuffleDeck([...manaCards, ...cards]);

    return checkRandomized(initial);
}

export const createInitialGameState = (): IGameStore => ({
    isGameOver: false,
    currentTurn: 'player',
    turnActions: {
        isMainActionUsed: false,
        isOptionalActionUsed: false,
    },
    player: createInitialHero(),
    opponent: createInitialHero(),
})

// TODO: Figure out if the player/opponent game start has influence to game

const createInitialHero = (): IHero => ({
    deck: createDeck(),
    health: INITIAL_HEALTH,
    mana: INITIAL_MANA,
})

export const getNextTurn = (currentTurn: PlayerType): PlayerType => {
    return currentTurn === 'player' ? 'opponent' : 'player';
}

export const getNewMana = (newTurn: PlayerType,  currentMana: number): number => {
    return newTurn === 'player' ? Math.min(currentMana + 1, MAX_MANA) : currentMana;
}

export const resetAttack = (deck: GameDeckCard[]): GameDeckCard[] =>
    deck.map((card) => {
        if (isManaCard(card)) {
            return card;
        }

        return {
            ...card,
            isCanAttack: card.isOnBoard,
        };
    });


export const getCardById = (cardId: number, deck: GameDeckCard[]): GameDeckCard | undefined => deck.find((card) => card.id === cardId);