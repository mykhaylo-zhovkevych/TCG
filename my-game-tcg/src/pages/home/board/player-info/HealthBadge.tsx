import Badge from '@/components/ui/Badge.tsx'
import {INITIAL_HEALTH} from "@/constants/game/game.constants.ts";

export function HealthBadge({ currentHealth }: { currentHealth: number }) {
    return (
        <Badge
            value={currentHealth}
            maxValue={INITIAL_HEALTH}
            variant='health'
            color='red'
        />
    )
}

export default HealthBadge
