import {useAppSelector} from "@/store/hooks.ts";

function GameBoard() {

    // Make the cards fan out around the middle card
    const calcRotationOpponent = (index: number, total: number) => {
        const middle = (total - 1) / 2
        return -(index - middle) * 15
    }
    const calcRotationPlayer = (index: number, total: number) => {
        const middle = (total - 1) / 2
        return (index - middle) * 15
    }

    const player = useAppSelector((state ) => state.game.player);
    const opponent = useAppSelector((state ) => state.game.opponent);

    return (
        <div className='relative h-screen overflow-hidden'>
            <div>
                <div>
                    <h1>Opponent</h1>
                    <p>Health: {opponent.health}</p>
                    <p>Mana: {opponent.mana}</p>
                </div>

                <div className="-mt-44 flex items-center justify-center">
                    {opponent.deck
                        .filter(card => !card.isOnBoard)
                        .slice(0, 5)
                        .map((card, index, array) => (
                            <button
                                className="h-36 w-24 -ml-6 rounded-lg bg-yellow-300 shadow inline-block"
                                style={{
                                    transform: `rotate(${calcRotationOpponent(
                                        index,
                                        array.length
                                    )}deg)`,
                                }}
                                key={card.id}
                            />
                        ))}
                </div>
            </div>

            {/* playerfield */}
            <section className="mt-44 flex flex-col items-center justify-center gap-8">
                <div className="min-h-56 flex items-center justify-center gap-2">
                    {opponent.deck
                        .filter(card => card.isOnBoard)
                        .map(card => (
                            <button
                                className="h-60 w-40 rounded-lg shadow inline-block"
                                key={card.id}
                            >
                                <img alt={card.name} src={card.imageUrl} />
                            </button>
                        ))}
                </div>

                <hr />

                <div className="min-h-56 flex items-center justify-center gap-2">
                    {player.deck
                        .filter(card => card.isOnBoard)
                        .map(card => (
                            <button
                                className="h-60 w-40 rounded-lg shadow inline-block mx-1"
                                key={card.id}
                            >
                                <img alt={card.name} src={card.imageUrl} />
                            </button>
                        ))}
                </div>
            </section>

            {/* Player Deck */}
            <div>
                <div className="absolute left-3 bottom-10">
                    <h1>Player</h1>
                    <p>Health: {player.health}</p>
                    <p>Mana: {player.mana}</p>
                </div>

                <div className="absolute inset-x-0 -bottom-14 flex items-center justify-center">
                    {player.deck
                        .filter(card => !card.isOnBoard)
                        .slice(0, 5)
                        .map((card, index, array) => (
                            <button
                                className="h-36 w-24 -ml-6 rounded-lg bg-yellow-300 shadow inline-block"
                                style={{
                                    transform: `rotate(${calcRotationPlayer(
                                        index,
                                        array.length
                                    )}deg)`,
                                }}
                                key={card.id}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
}

export default GameBoard