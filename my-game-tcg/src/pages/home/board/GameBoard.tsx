import {useAppDispatch, useAppSelector} from "@/store/hooks.ts";
import {playCard} from "@/store/game/game.slice.ts";
import {PlayerInfo} from "@/pages/home/board/PlayerInfo.tsx";
import HandCard from "@/pages/home/board/hand-card/HandCard.tsx";
import {GridBoardCard} from "@/pages/home/board/board-card/GridBoardCard.tsx";
import {PlayerMana} from "@/pages/home/board/player-info/PlayerMana.tsx";
import {MAX_MANA} from "@/constants/game/game.constants.ts";

function GameBoard() {

    const dispatch = useAppDispatch();
    const player = useAppSelector((state ) => state.game.player);
    const opponent = useAppSelector((state ) => state.game.opponent);

    const isCardClicked = (cardId: number) => {
        //console.log('Clicked player card index:', index);
        dispatch(playCard(cardId));
    }

    return (
        <div className='relative h-screen overflow-hidden grid grid-rows-2'>
            <section>
                <div>
                    <PlayerInfo hero={opponent} typePlayer={'opponent'} />
                    <div className="-mt-14 h-40 flex items-center justify-center gap-2">
                        {opponent.deck
                            .filter(card => !card.isOnBoard)
                            .slice(0, 5)
                            .map((card, index, array) => (
                                <HandCard
                                    key={card.id}
                                    card={card}
                                    onClick={() => isCardClicked(card.id)}
                                    index={index}

                                    arrayLength={array.length}
                                    isDisabled={!card.isOnBoard}
                                    isHidden={!card.isOnBoard}
                                />
                            ))}
                    </div>
                </div>

                {/* playerfield */}
                <div className='pt-36' >
                    <GridBoardCard deck={opponent.deck} />
                </div>
            </section>

            <section>
                <div className='pt-6'>
                    <GridBoardCard deck={player.deck} />
                </div>

            {/* Player Deck */}
            <div>
                <PlayerInfo hero={player} typePlayer={'player'} />
                <PlayerMana currentMana={player.mana} maxMana={MAX_MANA} />

                <div className="absolute inset-x-0 -bottom-10 flex items-center justify-center gap-2">
                    {player.deck
                        .filter(card => !card.isOnBoard)
                        .slice(0, 5)
                        .map((card, index, array) => (
                            <HandCard
                                key={card.id}
                                card={card}
                                onClick={() => isCardClicked(card.id)}
                                index={index}

                                arrayLength={array.length}
                                isDisabled={card.isOnBoard}
                                isHidden={card.isOnBoard}
                            />
                        ))}
                </div>
            </div>
        </section>
        </div>

    );
}

export default GameBoard
