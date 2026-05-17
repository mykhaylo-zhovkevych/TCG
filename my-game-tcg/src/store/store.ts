import { configureStore } from '@reduxjs/toolkit'
import { gameReducer } from './game/game.slice'

// Central space where Redux keeps the state
export const store = configureStore({
    reducer: {
        game: gameReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
