import type {IGameStore, PlayerType} from "@/store/game/game.types.ts";
import {getCardById, getNewMana, getNextTurn, resetAttack} from "@/store/game/game.utils.ts";

export const attackCardAction = (store: IGameStore, attackerId: number, targetId: number, attackerType: PlayerType) => {
    const isAttackerPlayer = attackerType === 'player';

    const attacker = getCardById(attackerId, isAttackerPlayer ? store.opponent.deck : store.player.deck);
    const target = getCardById(targetId, isAttackerPlayer ? store.opponent.deck : store.player.deck);

    if (attacker && target && attacker.isCanAttack) {
        target.health -= attacker.health;
        attacker.isCanAttack = false;

        if (target.health <= 0){
            if(isAttackerPlayer){
                store.opponent.deck = store.opponent.deck.filter(card => card.id !== targetId);
            }
            else {
                store.player.deck = store.opponent.deck.filter(card => card.id !== targetId);
            }
        }
    }
    return { player: store.player, opponent: store.opponent };
}

export const attackHeroAction = (store: IGameStore, attackerId: number, attackerType: PlayerType): Partial<IGameStore> => {

    const isAttackerPlayer = attackerType === 'player';
    const opponent = store[isAttackerPlayer ? 'opponent' : 'player'];

    const attacker = getCardById(attackerId, isAttackerPlayer ? store.opponent.deck : store.player.deck);

    if (attacker && attacker.isCanAttack) {
        opponent.health -= attacker.attack;
        attacker.isCanAttack = false;

        if (opponent.health <= 0) {
            store.isGameOver = true;
        }
    }
    return { player: store.player, opponent: store.opponent, isGameOver: store.isGameOver};
}

export const playCardAction = ( store: IGameStore, cardId: number ): Partial<IGameStore> => {
    const isPlayerTurn = store.currentTurn === 'player';
    const currentPlayer = store.currentTurn === 'player' ? store.player : store.opponent;

    const currentCard = currentPlayer.deck.find(card => card.id === cardId);

    if(currentCard && currentPlayer.mana >= currentCard?.mana) {
        currentCard.isOnBoard = true;
        currentPlayer.mana -= currentCard.mana
    }
    return isPlayerTurn ? { player: currentPlayer } : { opponent: currentPlayer }
}

export const endTurnAction= (store: IGameStore): Partial<IGameStore> => {
    const newTurn = getNextTurn(store.currentTurn);

    const newPlayerMana = getNewMana('player', store.player.mana)
    const newOpponentMana = getNewMana('opponent', store.opponent.mana)

    return {
        currentTurn: newTurn,
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


