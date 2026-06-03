import type {GameDeckCard, IGameCard, PlayerType} from "@/store/game/game.types.ts";
import BoardCard from "@/pages/home/board/board-card/BoardCard.tsx";
import {isManaCard} from "@/types/card.type.ts";
import {useAppDispatch, useAppSelector} from "@/store/hooks.ts";
import {attackCard, attackHero, clearHeldCard, evolveCard, holdCard, returnCard} from "@/store/game/game.slice.ts";

interface GBCProps {
    deck: GameDeckCard[]
    owner: PlayerType
}

const canAttackTarget = (attacker: IGameCard | undefined, target: IGameCard): boolean => {
    return Boolean(attacker?.isCanAttack && attacker.attack >= target.health);
}

export function GridBoardCard({deck, owner,}: GBCProps) {
    const dispatch = useAppDispatch();
    const playerDeck = useAppSelector((state) => state.game.player.deck);
    const isPlayerBoard = owner === 'player';
    const pendingAction = useAppSelector((state) => state.game.pendingAction);
    const heldAttacker = playerDeck.find((card): card is IGameCard => !isManaCard(card) && card.isHeld);

    const handleClick = (card: IGameCard) => {
        if (!isPlayerBoard) {
            return;
        }

        if (pendingAction === 'evolve') {
            dispatch(evolveCard(card.id));
            return;
        }

        if (card.isCanAttack) {
            return;
        }

        dispatch(returnCard(card.id));
    };

    const handleDoubleClick = (card: IGameCard) => {
        if (!card.isCanAttack || !isPlayerBoard) {
            return;
        }

        dispatch(attackHero({attackerId: card.id, attackerType: 'player',}));
        dispatch(clearHeldCard());
    };

    const handleCardHold = (attackerCard?: IGameCard, targetCard?: IGameCard) => {
        if (!targetCard) {
            if (!attackerCard) {
                return;
            }
            if (!isPlayerBoard) {
                return;
            }
            if (!attackerCard.isCanAttack) {
                return;
            }

            dispatch(holdCard(attackerCard.id));
            return;
        }

        if (!attackerCard) {
            return;
        }

        if (!canAttackTarget(attackerCard, targetCard)) {
            return;
        }

        dispatch(attackCard({
            attackerId: attackerCard.id,
            attackerType: 'player',
            targetId: targetCard.id,
        }));

        dispatch(clearHeldCard());
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
                        onHold={() => isPlayerBoard ? handleCardHold(card) : handleCardHold(heldAttacker, card)}
                        isAttackTarget={!isPlayerBoard && canAttackTarget(heldAttacker, card)}
                    />
                ))}
        </div>
    );
}