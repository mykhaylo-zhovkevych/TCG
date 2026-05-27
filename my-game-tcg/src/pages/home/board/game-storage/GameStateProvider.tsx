import {createContext, type ReactNode, useContext, useState} from "react";

type GameState = {
    showRules: boolean;
    closeRules: () => void;
};

const GameStateContext = createContext<GameState | null>(null);

export function GameStateProvider({children}: {children: ReactNode}) {
    const [showRules, setShowRules] = useState(true);

    function closeRules() {
        setShowRules(false);
    }

    return (
        <GameStateContext.Provider value={{showRules, closeRules}}>
            {children}
        </GameStateContext.Provider>
    );
}

export function useGameState() {
    const context = useContext(GameStateContext);

    if (!context) {
        throw new Error ("useGameState must be used inside GameStateProvider");
    }

    return context;
}

export default GameStateProvider;