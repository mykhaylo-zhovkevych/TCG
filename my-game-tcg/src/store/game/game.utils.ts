import type { IGameCard, IGameStore, IHero, PlayerType } from "./game.types.ts";
import {CARDS} from "../../constants/game/cards.constants.ts";

const INITIAL_HEALTH = 25;
const INITIAL_MANA = 3;
const MAX_MANA = 6;

export function createDeck(): IGameCard[] {
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

export const endTurnAction= (store: IGameStore): Partial<IGameStore> => {
    const newTurn = getNextTurn(store.currentTurn);

    const newPlayerMana = getNewMana('player', store.player.mana)
    const newOpponentMana = getNewMana('opponent', store.opponent.mana)

    return {
        currentTurn: newTurn,
        player: {
            ...store.player,
            mana: newPlayerMana,
            deck: resetAttack(store.player.deck),
        },
        opponent: {
            ...store.opponent,
            mana: newOpponentMana,
            deck: resetAttack(store.opponent.deck),
        }
    }
}

export const playCardAction = ( store: IGameStore, cardId: number ): Partial<IGameStore> => {
    const isPlayerTurn = store.currentTurn === 'player';
    const currentPlayer = store.currentTurn === 'player' ? store.player : store.opponent;

    const currentCard = currentPlayer.deck.find(card => card.id === cardId);

    if(currentCard && currentPlayer.mana >= currentCard?.mana) {
        currentCard.isOnBoard = true;
        currentPlayer.mana -= currentCard.mana
    }
    return isPlayerTurn ? { player: currentPlayer } : { opponent: currentPlayer }
}
