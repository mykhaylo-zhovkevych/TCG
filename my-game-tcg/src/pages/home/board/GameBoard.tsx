import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/store/hooks.ts";
import {playCard, startGame, opponentTurn} from "@/store/game/game.slice.ts";
import {PlayerInfo} from "@/pages/home/board/player-info/PlayerInfo.tsx";
import HandCard from "@/pages/home/board/hand-card/HandCard.tsx";
import {GridBoardCard} from "@/pages/home/board/board-card/GridBoardCard.tsx";
import {PlayerMana} from "@/pages/home/board/player-info/PlayerMana.tsx";
import {MAX_MANA} from "@/constants/game/game.constants.ts";
import type {GameDeckCard, IGameCard} from "@/store/game/game.types.ts";
import {isManaCard} from "@/types/card.type.ts";
import {EndTurnButton} from "@/pages/home/board/board-button/EndTurnButton.tsx";
import {useGameState} from "@/pages/home/board/game-storage/GameStateProvider.tsx";
import {RulesPopup} from "@/pages/home/board/game-storage/helpers/RulesPopup.tsx";
import Notification from "@/components/ui/notification/Notification.tsx";
import EvolveButton from "@/pages/home/board/board-button/EvolveButton.tsx";
import ReshuffleButton from "@/pages/home/board/board-button/ReshuffleButton.tsx";

const isCardInHand = (card: GameDeckCard): boolean => {
    return isManaCard(card) ? !card.isUsed : !card.isOnBoard;
}
const isGameCard = (card: GameDeckCard): card is IGameCard => {
    return !isManaCard(card);
}

const GAME_OVER_NOTICE = `╔═════════════╗
║             GAME OVER                     ║
╚═════════════╝`;

function GameBoard() {

    const dispatch = useAppDispatch();
    const player = useAppSelector((state ) => state.game.player);
    const opponent = useAppSelector((state ) => state.game.opponent);
    const isGameOver = useAppSelector((state) => state.game.isGameOver);
    const currentTurn = useAppSelector((state) => state.game.currentTurn);
    const [isGameOverNoticeVisible, setIsGameOverNoticeVisible] = useState(false);

    // Redux manages a state
    useEffect(() => {
        if (isGameOver) {
            setIsGameOverNoticeVisible(true);
        }
        if (currentTurn !== 'opponent') {
            return;
        }
        const timer = window.setTimeout(() => {
            dispatch(opponentTurn());
        }, 700);
        return () => window.clearTimeout(timer);
    }, [isGameOver, currentTurn, dispatch]);

    const isCardClicked = (cardId: number) => {
        dispatch(playCard(cardId));
    }

    const closeGameOverNotice = () => {
        setIsGameOverNoticeVisible(false);
        dispatch(startGame());
    };
    const { showRules, closeRules } = useGameState();

    return (
    <div className='relative h-screen overflow-hidden grid grid-rows-2'>
        <section>
                <div>
                    <PlayerInfo hero={opponent} typePlayer={'opponent'} />
                    <div className="-mt-14 h-40 flex items-center justify-center gap-2">
                        {opponent.deck
                            .filter(isCardInHand)
                            .slice(0, 5)
                            .map((card, index, array) => (
                                <HandCard
                                    key={card.id}
                                    card={card}
                                    onClick={() => isCardClicked(card.id)}
                                    index={index}

                                    arrayLength={array.length}
                                    isDisabled={true}
                                    isHidden={true}
                                />
                            ))}
                    </div>
                </div>

                {/* playerfield */}
                <div className='pt-36 scale-110' >
                    <GridBoardCard deck={opponent.deck.filter(isGameCard)} owner='opponent'/>
                </div>
            </section>

            <EndTurnButton/>
            <EvolveButton/>
            <ReshuffleButton />

            <section>
                <div className='pt-6 scale-110'>
                    <GridBoardCard deck={player.deck.filter(isGameCard)} owner='player'/>
                </div>

            {/* Player Deck */}
            <div>
                <PlayerInfo hero={player} typePlayer={'player'} />
                <PlayerMana currentMana={player.mana} maxMana={MAX_MANA} />

                {/*<AudioPlayer></AudioPlayer>*/}
                <div className="absolute inset-x-0 -bottom-10 flex items-center justify-center gap-2">
                    {player.deck
                        .filter(isCardInHand)
                        .slice(0, 5)
                        .map((card, index, array) => (
                            <HandCard
                                key={card.id}
                                card={card}
                                onClick={() => isCardClicked(card.id)}
                                index={index}

                                arrayLength={array.length}
                                isDisabled={!isManaCard(card) && player.mana < card.mana}
                                isHidden={false}
                            />
                        ))}
                </div>
            </div>
        </section>
        {showRules && <RulesPopup onClose={closeRules} /> }
        {isGameOverNoticeVisible && (<Notification onClose={closeGameOverNotice}>{GAME_OVER_NOTICE}</Notification>)}
        </div>
    );
}

export default GameBoard
