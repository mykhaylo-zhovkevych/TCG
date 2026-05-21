import Badge from '@/components/ui/Badge.tsx'
import {MAX_MANA} from "@/constants/game/game.constants.ts";

export function ManaBadge({ currentMana }: { currentMana: number }) {
    return (
        <Badge
            value={currentMana}
            maxValue={MAX_MANA}
            variant='mana'
            color='blue'
        />
    )
}

export default ManaBadge
