import type { ICard, IManaCard } from '@/types/card.type'

export type PlayerType = 'player' | 'opponent'

export type AttackerCardPayload = {
    attackerId: number,
    targetId: number,
    attackerType: PlayerType
}

export type AttackHeroPayload = {
    attackerId: number,
    attackerType: PlayerType
}

export type GameDeckCard = IGameCard | IGameManaCard;

export type MainActionType =
    | 'play-card'
    | 'attack-card'
    | 'attack-hero'
    | 'evolve-card'
    | 'shuffle-cards';

// Only one actions is allowed
export interface ITurnActions {
    isMainActionUsed: boolean;
    isOptionalActionUsed: boolean;
    mainActionType?: MainActionType;
}

export interface IGameCard extends ICard {
    id: number;
    isOnBoard: boolean;
    isCanAttack: boolean;
}

export interface IGameManaCard extends IManaCard {
    id: number;
    isUsed: boolean;
}

export interface IHero {
    deck: GameDeckCard[]
    health: number;
    mana: number;
}

export interface IGameStore {
    isGameOver: boolean
    currentTurn: PlayerType
    turnActions: ITurnActions
    player: IHero
    opponent: IHero
}