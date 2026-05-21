import type {ICard} from "@/types/card.type.ts";
import cn from "clsx";
import {type CSSProperties, useState} from "react";
import { motion } from "framer-motion";

interface Props {
    card: ICard
    onClick: () => void
    isDisabled?: boolean
    isHidden?: boolean
    style?: CSSProperties
    hoverDirection?: 'up' | 'down'
}
// Apply custom styles passed from the parent component
export function HandCard({card, onClick, isDisabled, isHidden, style, hoverDirection}: Props) {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const hoverY = hoverDirection === 'up' ? -100 : 100

    return (
        <motion.button
            className={cn('h-36 w-24 shadow inline-block -ml-7 rounded-lg cursor-pointer will-change-auto', {
                'bg-yellow-300': isHidden,
                'opacity-50': isDisabled,
            })}
                style={style}
                disabled={isDisabled}
                onClick={onClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                initial={{ scale: 1, zIndex: 0, y: 0}}
                animate={isHovered ? { scale: 1.2, zIndex: 10, y: hoverY} : {scale: 1, zIndex: 0, y: 0}}
                transition={{type: 'spring', stiffness: 300, damping: 20}}
            >
            {!isHidden && (
                <img src={card.imageUrl} alt={card.name} draggable={false} />
            )}
        </motion.button>
    )
}

export default HandCard
