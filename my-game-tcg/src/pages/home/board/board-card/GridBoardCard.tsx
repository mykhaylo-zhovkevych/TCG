import type {GameDeckCard, IGameCard, PlayerType} from "@/store/game/game.types.ts";
import BoardCard from "@/pages/home/board/board-card/BoardCard.tsx";
import {isManaCard} from "@/types/card.type.ts";
import {useAppDispatch} from "@/store/hooks.ts";
import {attackHero, returnCard} from "@/store/game/game.slice.ts";

interface GBCProps {
    deck: GameDeckCard[]
    owner: PlayerType
}

export function GridBoardCard({deck, owner}: GBCProps) {
    const dispatch = useAppDispatch();
    const isPlayerBoard = owner === 'player';

    const handleClick = (card: IGameCard) => {
        if (card.isCanAttack || !isPlayerBoard) {
            return;
        }

        dispatch(returnCard(card.id));
    };

    const handleDoubleClick = (card: IGameCard) => {
        if (!card.isCanAttack || !isPlayerBoard) {
            return;
        }

        dispatch(attackHero({
            attackerId: card.id,
            attackerType: 'player',
        }));
    };

    return (
        <div className="flex items-center justify-center gap-2">
            {deck
                .filter((card): card is IGameCard => !isManaCard(card) && card.isOnBoard)
                .map((card) => (
                    <BoardCard
                        key={card.id}
                        card={card}
                        onOneClick={() => handleClick(card)}
                        onDoubleClick={() => handleDoubleClick(card)}
                    />
                ))}
        </div>
    );
}