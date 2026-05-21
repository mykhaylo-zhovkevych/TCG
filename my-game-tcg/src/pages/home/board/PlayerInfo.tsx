import type {IHero, PlayerType} from "@/store/game/game.types.ts";
import cn from 'clsx'
import {ManaBadge} from "@/pages/home/board/player-info/ManaBadge.tsx";
import {HealthBadge} from "@/pages/home/board/player-info/HealthBadge.tsx";

interface Props {
    hero: Omit<IHero, 'deck'>
    typePlayer: PlayerType
}

export function PlayerInfo({ hero, typePlayer }: Props) {
    const isPlayer = typePlayer === 'player'

    return (
        <div className={cn(
            'absolute left-3 flex flex-col gap-2 rounded-lg px-4 py-3 shadow backdrop-blur-sm',
            isPlayer ? 'bottom-10 bg-transparent text-green-600' : 'top-10 bg-transparent text-red-600'
        )}>
            {/*TODO: add hero img*/}
            <h1 className="text-lg font-bold uppercase tracking-wide">
                {isPlayer ? 'Player' : 'Opponent'}
            </h1>
            <HealthBadge currentHealth={hero.health} />
            {!isPlayer && <ManaBadge currentMana={hero.mana} />}
        </div>
    )
}

export default PlayerInfo