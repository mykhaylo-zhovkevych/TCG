import {createSlice, type PayloadAction} from '@reduxjs/toolkit'
import type {AttackerCardPayload, AttackHeroPayload, IGameStore} from './game.types'
import {isManaCard} from "@/types/card.type.ts";
import {
    createInitialGameState,
} from './game.utils'
import {
    attackCardAction,
    attackHeroAction,
    endTurnAction,
    playCardAction,
    reshuffleCardAction,
    returnCardAction,
} from "@/store/game/game.logic.ts";

const initialState: IGameStore = createInitialGameState()

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        startGame: () => ({
            ...createInitialGameState(),
        }),

        endTurn: (state) => {
            Object.assign(state, endTurnAction(state))
        },
        playCard: (state, action: PayloadAction<number>) => {
            Object.assign(state, playCardAction(state, action.payload))
        },
        returnCard: (state, action: PayloadAction<number>) => {
            Object.assign(state, returnCardAction(state, action.payload))
        },
        holdCard: (state, action: PayloadAction<number>) => {
            state.player.deck.forEach((card) => {
                if (!isManaCard(card)) {
                    card.isHeld = card.id === action.payload && card.isOnBoard && card.isCanAttack;
                }
            });
        },
        clearHeldCard: (state) => {
            state.player.deck.forEach((card) => {
                if (!isManaCard(card)) {
                    card.isHeld = false;
                }
            });
        },
        reshuffleCard: (state) => {
            Object.assign(state, reshuffleCardAction(state))
        },
        attackCard: (state, action: PayloadAction<AttackerCardPayload> ) => {
            Object.assign(state, attackCardAction(state,
                action.payload.attackerId,
                action.payload.targetId,
                action.payload.attackerType),
            )
        },
        attackHero: (state, action: PayloadAction<AttackHeroPayload>) => {
            Object.assign(state, attackHeroAction(state,
                action.payload.attackerId,
                action.payload.attackerType),
            )
        }
    }
})

// For dispatching actions from components
export const {
    startGame,
    endTurn,
    playCard,
    returnCard,
    holdCard,
    clearHeldCard,
    reshuffleCard,
    attackCard,
    attackHero,
} = gameSlice.actions

// Without exporting the reducer, the store cannot connect to your game slice
export const gameReducer = gameSlice.reducer
