import {createSlice, type PayloadAction} from '@reduxjs/toolkit'
import type { IGameStore } from './game.types'
import {
    createInitialGameState, endTurnAction,
    playCardAction,
} from './game.utils'

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
    },
})

// For dispatching actions from components
export const {
    startGame,
    endTurn,
    playCard,
} = gameSlice.actions

// Without exporting the reducer, the store cannot connect to your game slice
export const gameReducer = gameSlice.reducer
