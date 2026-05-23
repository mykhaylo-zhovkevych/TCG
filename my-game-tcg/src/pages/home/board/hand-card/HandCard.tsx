import type {GameDeckCard} from "@/store/game/game.types.ts";
import cn from "clsx";
import {type CSSProperties} from "react";
import { motion } from "framer-motion";
import { getStyleRotation } from "@/pages/home/board/hand-card/handcard.logic.ts.tsx";

interface Props {
    card: GameDeckCard
    onClick: () => void
    isDisabled?: boolean
    isHidden?: boolean
    index: number
    arrayLength: number
    style?: CSSProperties
}
export function HandCard({card, onClick, isDisabled, isHidden, index, arrayLength, style}: Props) {

    return (
        <motion.button
            className={cn('h-[8.5rem] w-24 shadow inline-block -ml-7 rounded-lg cursor-pointer will-change-auto p-px')}
                style={style}
                disabled={isDisabled}
                onClick={onClick}
                {...getStyleRotation(index, arrayLength, !isHidden)}

            >
            {(
                <img src={ isHidden ? '/assets/cards/cover.png' : card.imageUrl}
                     alt={card.name}
                     draggable={false}
                     className='h-full w-full object-cover block' />
            )}
        </motion.button>
    )
}

export default HandCard
