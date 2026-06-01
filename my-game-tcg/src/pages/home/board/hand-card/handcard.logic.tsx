import type {MotionProps} from "framer-motion";

// Make the cards fan out around the middle card
export const getStyleRotation = (
    index: number,
    total: number,
    isPlayer?: boolean
) : MotionProps => {
    const middle = (total - 1) / 2
    const rotate = (index - middle) * 10
    const distanceFromMiddle = Math.abs (index - middle )
    const translateY = Math.pow(distanceFromMiddle, 2) * 7

    const baseY = isPlayer ? translateY : -translateY

    return {
        initial: {
            scale: 1,
        },
        // Every time props/state changes
        animate: {
            scale: 1,
            zIndex: 0,
            rotate: rotate,
            y: baseY,
        },
        whileHover: {
            scale: isPlayer ? 1.3 : 1,
            zIndex: 0,
            y: isPlayer ? baseY - 105 : baseY,
        },
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 20,
        },
    }
}