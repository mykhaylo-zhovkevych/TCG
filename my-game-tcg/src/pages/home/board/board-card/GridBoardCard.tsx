import type {IGameCard} from "@/store/game/game.types.ts";
import BoardCard from "@/pages/home/board/board-card/BoardCard.tsx";

interface Props {
    deck: IGameCard[]
}

export function GridBoardCard({deck}: Props) {
    return <div className="flex items-center justify-center gap-2">
        {deck.filter(card => card.isOnBoard)
            .map(card => (
                <BoardCard
                    key={card.id}
                    card={card}
                    onClick={() => console.log("attack")}
                />
            ))}
    </div>
}