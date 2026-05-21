import type {IHero, PlayerType} from "@/store/game/game.types.ts";
import cn from 'clsx'

interface Props {
    player: Omit<IHero, 'deck'>
    typePlayer: PlayerType
}

export function PlayerInfo({ player, typePlayer }: Props) {
    const isPlayer = typePlayer === 'player'

    return (
        <div className={cn(
            'absolute left-3',
            isPlayer ? 'bottom-10' : 'top-10'
        )}>
            <h1>{isPlayer ? 'Player' : 'Opponent'}</h1>
            <p>HP: {player.health}</p>
            <p>Mana: {player.mana}</p>
        </div>
    )
}