import type { ICard } from '@/types/card.type'

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

export interface IGameCard extends ICard {
    id: number;
    isOnBoard: boolean;
    isCanAttack: boolean;
}

export interface IHero {
    deck: IGameCard[]
    health: number;
    mana: number;
}

export interface IGameStore {
    isGameOver: boolean
    currentTurn: PlayerType
    player: IHero
    opponent: IHero
}
