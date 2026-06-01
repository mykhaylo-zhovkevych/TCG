import type {GameDeckCard, IGameCard} from "@/store/game/game.types.ts";
import BoardCard from "@/pages/home/board/board-card/BoardCard.tsx";
import {isManaCard} from "@/types/card.type.ts";
import {useAppDispatch} from "@/store/hooks.ts";
import {returnCard} from "@/store/game/game.slice.ts";

interface GBProps {
    deck: GameDeckCard[]
}

export function GridBoardCard({deck}: GBProps) {
    const dispatch = useAppDispatch();

    return <div className="flex items-center justify-center gap-2">
        {deck.filter((card): card is IGameCard => !isManaCard(card) && card.isOnBoard)
            .map(card => (
                <BoardCard
                    key={card.id}
                    card={card}
                    onClick={card.isCanAttack ? () => console.log("attack") : () => dispatch(returnCard(card.id)) }
                />
            ))}
    </div>
}