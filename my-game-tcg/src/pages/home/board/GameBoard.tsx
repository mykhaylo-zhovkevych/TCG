import {useAppDispatch, useAppSelector} from "@/store/hooks.ts";
import {playCard} from "@/store/game/game.slice.ts";
import {PlayerInfo} from "@/pages/home/board/PlayerInfo.tsx";
import {getStyleRotation} from "@/pages/home/board/hand-card/handcard.logic.ts.tsx";
import HandCard from "@/pages/home/board/hand-card/HandCard.tsx";

function GameBoard() {

    const dispatch = useAppDispatch();
    const player = useAppSelector((state ) => state.game.player);
    const opponent = useAppSelector((state ) => state.game.opponent);

    const isCardClicked = (cardId: number) => {
        //console.log('Clicked player card index:', index);
        dispatch(playCard(cardId));
    }

    return (
        <div className='relative h-screen overflow-hidden'>
            <div>
                <PlayerInfo player={opponent} typePlayer={'opponent'} />
                <div className="-mt-14 flex items-center justify-center">
                    {opponent.deck
                        .filter(card => !card.isOnBoard)
                        .slice(0, 5)
                        .map((card, index, array) => (
                            <HandCard
                                key={card.id}
                                card={card}
                                onClick={() => isCardClicked(card.id)}
                                isDisabled={card.isOnBoard}
                                isHidden={!card.isOnBoard}
                                style={getStyleRotation(index, array.length)}
                                hoverDirection="down"
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
                                className="h-60 w-40 rounded-lg shadow inline-block overflow-hidden mx-1 p-px"
                                key={card.id}
                            >
                                <img alt={card.name} src={card.imageUrl} draggable={false} className='h-full w-full object-cover block' />
                            </button>
                        ))}
                </div>

                <hr />

                <div className="min-h-56 flex items-center justify-center gap-2">
                    {player.deck
                        .filter(card => card.isOnBoard)
                        .map(card => (
                            <button
                                className="h-60 w-40 rounded-lg shadow inline-block overflow-hidden mx-1 p-px"
                                key={card.id}
                            >
                                <img alt={card.name} src={card.imageUrl} draggable={false} className='h-full w-full object-cover block'/>
                            </button>
                        ))}
                </div>
            </section>


            {/* Player Deck */}
            <div>
                <PlayerInfo player={player} typePlayer={'player'}></PlayerInfo>

                <div className="absolute inset-x-0 -bottom-14 flex items-center justify-center">
                    {player.deck
                        .filter(card => !card.isOnBoard)
                        .slice(0, 5)
                        .map((card, index, array) => (
                            <HandCard
                                key={card.id}
                                card={card}
                                onClick={() => isCardClicked(card.id)}
                                isDisabled={card.isOnBoard}
                                isHidden={card.isOnBoard}
                                style={getStyleRotation(index, array.length, true)}
                                hoverDirection="up"
                            />
                        ))}
                </div>
            </div>
        </div>
    );
}

export default GameBoard
