import type { IGameCard, IGameStore, IHero, PlayerType } from "./game.types.ts";
import {CARDS} from "@/constants/game/cards.constants.ts";

const INITIAL_HEALTH = 25;
const INITIAL_MANA = 10;
const MAX_MANA = 6;

function createDeck(): IGameCard[] {
    return CARDS.map((card, index) => ({
        ...card,
        id: index + 1,
        isOnBoard: false,
        isCanAttack: false,
    }))
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

export const resetAttack = (deck: IGameCard[]) => deck.map((card) => ({
    ...card,
    isCanAttack: card.isOnBoard
}))


export const getCardById = (cardId: number, deck: IGameCard[]): IGameCard | undefined => deck.find((card) => card.id === cardId);
