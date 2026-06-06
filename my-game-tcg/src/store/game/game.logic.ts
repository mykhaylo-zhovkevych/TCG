import type {IGameCard, IGameStore, ITurnActions, PlayerType} from "@/store/game/game.types.ts";
import {
    checkRandomized, findEvolutionHelperCard,
    getCardById,
    getCurrentDeck,
    getNewMana,
    getNextTurn,
    resetAttack
} from "@/store/game/game.utils.ts";
import {EVOLUTION_BOOST_MULTIPLIER, MAX_MANA} from "@/constants/game/game.constants.ts";
import {isManaCard} from "@/types/card.type.ts";

export const attackCardAction = (store: IGameStore, attackerId: number, targetId: number, attackerType: PlayerType) => {
    if (store.turnActions.isMainActionUsed) {
        return {};
    }

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

    if (target.health <= 0) {
        targetOwner.deck = targetOwner.deck.filter(card => card.id !== targetId);
    }

    return { player: store.player, opponent: store.opponent, turnActions: {
        ...store.turnActions, isMainActionUsed: true, mainActionType: 'attack-card',
        }
    };
}

export const attackHeroAction = (store: IGameStore, attackerId: number, attackerType: PlayerType): Partial<IGameStore> => {
    if (store.turnActions.isMainActionUsed) {
        return {};
    }

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

export const evolveCardAction = (store: IGameStore, cardId: number): Partial<IGameStore> => {
    if (store.pendingAction !== 'evolve' || store.turnActions.isMainActionUsed) {
        return {};
    }

    const player = store.player;
    const cardToEvolve = player.deck.find((card): card is IGameCard => (card.id === cardId && !isManaCard(card)));

    if (!cardToEvolve || !cardToEvolve.isOnBoard) {
        return {};
    }

    const helperCard = findEvolutionHelperCard(player.deck, cardToEvolve);

    if (!helperCard) {
        return {};
    }

    cardToEvolve.name = helperCard.name;
    cardToEvolve.description = helperCard.description;
    cardToEvolve.imageUrl = helperCard.imageUrl;
    cardToEvolve.mana = helperCard.mana;
    cardToEvolve.stage = helperCard.stage;
    cardToEvolve.attack = Math.ceil(cardToEvolve.attack * EVOLUTION_BOOST_MULTIPLIER);
    cardToEvolve.health = Math.ceil(cardToEvolve.health * EVOLUTION_BOOST_MULTIPLIER);

    return {
        player: {...player, deck: player.deck.filter((card) => card.id !== helperCard.id)},
        pendingAction: null,
        turnActions: {
            ...store.turnActions,
            isMainActionUsed: true,
            mainActionType: 'evolve-card',
        },
    };
}

export const endTurnAction= (store: IGameStore): Partial<IGameStore> => {
    const newTurn = getNextTurn(store.currentTurn);

    const newPlayerMana = getNewMana('player', store.player.mana)
    const newOpponentMana = getNewMana('opponent', store.opponent.mana)

    return {
        currentTurn: newTurn,
        pendingAction: null,
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

export const opponentTurnAction = (store: IGameStore): Partial<IGameStore> => {
    if (store.currentTurn !== 'opponent' || store.isGameOver) {
        return {};
    }
    const opponent = store.opponent;
    const manaCard = opponent.deck.find(card => isManaCard(card) && !card.isUsed);

    if (manaCard && !store.turnActions.isOptionalActionUsed) {
        Object.assign(store, playCardAction(store, manaCard.id));
    }

    function chance(probability: number): boolean {
        return Math.random() < probability;
    }
    function getOpponentAttackerCards(store: IGameStore): IGameCard[] {
        return store.player.deck.filter((card): card is IGameCard => !isManaCard(card) && card.isOnBoard && card.isCanAttack);
    }
    function getMyAttackerCards(store: IGameStore): IGameCard[] {
        return store.opponent.deck.filter((card): card is IGameCard => !isManaCard(card) && card.isOnBoard && card.isCanAttack);
    }
    function getRandomMove(num: number): number {
        return Math.round(Math.random() + num);
    }

    const playableCard = opponent.deck.find(card => !isManaCard(card) && !card.isOnBoard && opponent.mana >= card.mana);

    if (playableCard && !store.turnActions.isMainActionUsed && chance(0.8)) {
        if(getRandomMove(2) >= 3) {
            Object.assign(store, playCardAction(store, playableCard.id));
        }
    }

    // Happens only when opponent doenst have mana
    const myAttackers = getMyAttackerCards(store);
    const attacker = myAttackers[0];

    if (myAttackers.length > 0 && !store.turnActions.isMainActionUsed) {
        const totalAttack = myAttackers.reduce((sum, card) => sum + card.attack, 0);
        const opponentCards = getOpponentAttackerCards(store);

        const killableTarget = opponentCards.find(oc => attacker.attack >= oc.health);

        if (killableTarget && chance(0.6))  {
            Object.assign(store, attackCardAction(store, attacker.id, killableTarget.id, 'opponent'));

        } else if (getRandomMove(1) >= 2) {
            store.player.health -= totalAttack;
            myAttackers.forEach(card => {
                card.isCanAttack = false;
            });

            if (store.player.health <= 0) {
                store.isGameOver = true;
            }

            store.turnActions = {
                ...store.turnActions,
                isMainActionUsed: true,
                mainActionType: 'attack-hero',
            };
        }
    }

    return endTurnAction(store);
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