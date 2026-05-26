import type { IGameCard } from "@/store/game/game.types.ts";
import { motion } from "framer-motion";
import cn from 'clsx';

interface Props {
    card: IGameCard
    onClick?: () => void
    isDisabled?: boolean
}

export function BoardCard({ card, onClick, isDisabled }: Props) {
    return (
        <motion.button
            className={cn('h-[11.3rem] w-32 rounded-lg shadow inline-block overflow-hidden mx-1 p-px', {
            'cursor-pointer shadow-green-500': card.isCanAttack})
        }
            disabled={isDisabled}
            onClick={onClick}
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
