import type { IGameCard } from "@/store/game/game.types.ts";
import { motion } from "framer-motion";
import cn from 'clsx';
import {useRef} from "react";

const HOLD_TO_ATTACK_DELAY = 3000;

interface BCProps {
    card: IGameCard
    onOneClick?: () => void
    onDoubleClick?: () => void
    onHold?: () => void
    isDisabled?: boolean
    isAttackTarget?: boolean
}

export function BoardCard({card, onOneClick, onDoubleClick, onHold, isDisabled, isAttackTarget}: BCProps) {
    const singleClickRef = useRef<number | null>(null);
    const holdRef = useRef<number | null>(null);

    const clearHold = () => {
        if (holdRef.current) {
            window.clearTimeout(holdRef.current);
            holdRef.current = null;
        }
    };

    const handlePointerDown = () => {
        if (!onHold || isDisabled) {
            return;
        }

        clearHold();

        holdRef.current = window.setTimeout(() => {
            onHold();
            holdRef.current = null;
        }, HOLD_TO_ATTACK_DELAY);
    };

    const handleClick = () => {
        if (singleClickRef.current) {
            window.clearTimeout(singleClickRef.current);
        }

        singleClickRef.current = window.setTimeout(() => {
            onOneClick?.();
            singleClickRef.current = null;
        }, 220);
    };

    const handleDoubleClick = () => {
        if (singleClickRef.current) {
            window.clearTimeout(singleClickRef.current);
            singleClickRef.current = null;
        }

        onDoubleClick?.();
    };

    return (
        <motion.button
            className={cn(
                'h-[11.3rem] w-32 rounded-lg shadow inline-block overflow-hidden mx-1 p-px',
                {'shadow-green-600': card.isCanAttack && !card.isHeld && !isAttackTarget, 'shadow-yellow-400 ring-2 ring-yellow-300': card.isHeld,
                    'shadow-red-600 ring-2 ring-red-500': isAttackTarget,
                },
            )}
            disabled={isDisabled}
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
            onPointerDown={handlePointerDown}
            initial={{scale: 0.9}}
            transition={{type: 'spring', stiffness: 300, damping: 20, mass: 1}}
            whileHover={{scale: 1.1, zIndex: 10, y: -10,}}
            whileTap={{scale: 0.98}}
        >
            <img
                alt={card.name}
                src={card.imageUrl}
                draggable={false}
                className="h-full w-full object-cover block"
            />
        </motion.button>
    )
}

export default BoardCard