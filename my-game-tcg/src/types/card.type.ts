export enum EnumTypeCard {
    Basic = 'Basic',
    Stage1 = 'Stage 1',
    Stage2 = 'Stage 2',
}

export interface ICard {
    type?: 'playCard';
    name: string;
    stage: EnumTypeCard;
    mana: number;
    attack: number;
    health: number;
    description: string;
    imageUrl: string;
}

export interface IManaCard {
    type: 'mana';
    name: string;
    imageUrl: string;
    amount: number;
}

// If type property exist
export const isManaCard = (card: ICard | IManaCard): card is IManaCard => 'type' in card && card.type === 'mana'