import { createContext, useContext, useState } from "react";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [selectedGame, setSelectedGame] = useState(null);

    return (
        <GameContext.Provider value={{ selectedGame, setSelectedGame }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => useContext(GameContext);
