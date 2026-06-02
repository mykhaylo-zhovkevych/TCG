import type {IGameCard, IGameStore, ITurnActions, PlayerType} from "@/store/game/game.types.ts";
import {
    checkRandomized,
    getCardById,
    getCurrentDeck,
    getNewMana,
    getNextTurn,
    resetAttack
} from "@/store/game/game.utils.ts";
import {MAX_MANA} from "@/constants/game/game.constants.ts";
import {isManaCard} from "@/types/card.type.ts";

export const attackCardAction = (store: IGameStore, attackerId: number, targetId: number, attackerType: PlayerType) => {
    const isAttackerPlayer = attackerType === 'player';
    const attackerOwner = isAttackerPlayer ? store.player : store.opponent;
    const targetOwner = isAttackerPlayer ? store.opponent : store.player;

    const attacker = getCardById(attackerId, attackerOwner.deck);
    const target = getCardById(targetId, targetOwner.deck);

    if (!attacker || !target || isManaCard(attacker) || isManaCard(target) || !attacker.isCanAttack || attacker.attack < target.health) {
        return {};
    }

    target.health -= attacker.attack;
    attacker.isCanAttack = false;

    if (target.health <= 0){
        targetOwner.deck = targetOwner.deck.filter(card => card.id !== targetId);
    }

    return { player: store.player, opponent: store.opponent, turnActions: {
        ...store.turnActions, isMainActionUsed: true, mainActionType: 'attack-card',
        }
    };
}

export const attackHeroAction = (store: IGameStore, attackerId: number, attackerType: PlayerType): Partial<IGameStore> => {
    const isAttackerPlayer = attackerType === 'player';
    const attackerOwner = isAttackerPlayer ? store.player : store.opponent;
    const opponent = store[isAttackerPlayer ? 'opponent' : 'player'];

    const attacker = getCardById(attackerId, attackerOwner.deck);

    if (attacker && !isManaCard(attacker) && attacker.isCanAttack) {
        opponent.health -= attacker.attack;
        attacker.isCanAttack = false;

        if (opponent.health <= 0) {
            store.isGameOver = true;
        }
    }
    return { player: store.player, opponent: store.opponent, isGameOver: store.isGameOver, turnActions: {
        ...store.turnActions, isMainActionUsed: true, mainActionType: 'attack-hero',
        },
    };
}

export const playCardAction = ( store: IGameStore, cardId: number ): Partial<IGameStore> => {
    const isPlayerTurn = store.currentTurn === 'player';
    const currentPlayer = store.currentTurn === 'player' ? store.player : store.opponent;

    const currentCard = currentPlayer.deck.find(card => card.id === cardId);

    let nextTurnActions = {
        ...store.turnActions,
    };

    if (currentCard && isManaCard(currentCard)) {
        if (store.turnActions.isOptionalActionUsed) {
            return {};
        }

        currentCard.isUsed = true;
        currentPlayer.mana = Math.min(currentPlayer.mana + currentCard.amount, MAX_MANA);

        nextTurnActions = {
            ...nextTurnActions,
            isOptionalActionUsed: true,

        };
    }

    if (currentCard && !isManaCard(currentCard) && currentPlayer.mana >= currentCard?.mana) {

        if (store.turnActions.isMainActionUsed) {
            return {};
        }

        currentCard.isOnBoard = true;
        currentPlayer.mana -= currentCard.mana

        nextTurnActions = {
            ...nextTurnActions,
            isMainActionUsed: true,
        };
    }
    return {
        turnActions: nextTurnActions,
        ...(isPlayerTurn ? {player: currentPlayer} : {opponent: currentPlayer}),
    };
}


export const returnCardAction = (store: IGameStore, cardId: number): Partial<IGameStore> => {
    if (store.turnActions.isMainActionUsed && !store.turnActions.isOptionalActionUsed) {
        return {};
    }
    const isPlayerTurn = store.currentTurn === 'player';
    const currentPlayer = isPlayerTurn ? store.player : store.opponent;
    const currentCard = currentPlayer.deck.find((card): card is IGameCard => card.id === cardId && !isManaCard(card));

    if (currentCard && currentCard.isOnBoard ) {
        currentCard.isOnBoard = false;
        currentPlayer.mana += currentCard.mana
    }

    return isPlayerTurn ? { player: currentPlayer, turnActions: {...store.turnActions, isMainActionUsed: true} } : { opponent: currentPlayer, turnActions: {...store.turnActions, isMainActionUsed: true}};

}


export const reshuffleCardAction = (store: IGameStore): Partial<IGameStore> => {
    if (store.turnActions.isMainActionUsed) {
        return {};
    }

    if (store.player.mana >= 3) {
        store.player.mana -= 3;

        const currentPlayerDeck = getCurrentDeck(store.player);
        const reshuffledDeck = checkRandomized(currentPlayerDeck);
        const nextTurnActions: ITurnActions = {
            ...store.turnActions,
            isMainActionUsed: true,
            mainActionType: 'shuffle-cards',
        };

        return {
            turnActions: nextTurnActions,
            player: {
                ...store.player,
                deck: reshuffledDeck,
            }
        };
    } else {
        return {};
    }
}

export const evolveCurrentCardAction = () => {

}

export const endTurnAction= (store: IGameStore): Partial<IGameStore> => {
    const newTurn = getNextTurn(store.currentTurn);
    //const newTurn = 'player';

    const newPlayerMana = getNewMana('player', store.player.mana)
    const newOpponentMana = getNewMana('opponent', store.opponent.mana)

    return {
        currentTurn: newTurn,
        turnActions: {
            isMainActionUsed: false,
            isOptionalActionUsed: false,
        },
        player: {
            ...store.player,
            mana: newPlayerMana,
            deck: resetAttack(store.player.deck),
        },
        opponent: {
            ...store.opponent,
            mana: newOpponentMana,
            deck: resetAttack(store.opponent.deck),
        }
    }
}

export function shuffleDeck<T>(deck: T[]): T[] {
    const copy = [...deck];

    for (let i = copy.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1))

        const tmp = copy[i]
        copy[i] = copy[randomIndex]
        copy[randomIndex] = tmp
    }

    return copy
}
