export enum EnumTypeCard {
    Basic = 'Basic',
    Stage1 = 'Stage 1',
    Stage2 = 'Stage 2',
}

export interface ICard {
    name: string;
    stage: EnumTypeCard;
    mana: number;
    attack: number;
    health: number;
    description: string;
    imageUrl: string;
}