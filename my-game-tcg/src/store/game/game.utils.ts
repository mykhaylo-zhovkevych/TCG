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

function createDeck(): GameDeckCard[] {
    const manaCards = UTIL_CARDS.map(createGameManaCard)
    const cards = CARDS.map((card, index) => createGameCard(card, index + UTIL_CARDS.length))

    return shuffleDeck([...manaCards, ...cards])
}

export const createInitialHero = (): IHero => ({
    deck: createDeck(),
    health: INITIAL_HEALTH,
    mana: INITIAL_MANA,
})

export const createInitialGameState = (): IGameStore => ({
    isGameOver: false,
    currentTurn: 'player',
    player: createInitialHero(),
    opponent: createInitialHero(),
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
