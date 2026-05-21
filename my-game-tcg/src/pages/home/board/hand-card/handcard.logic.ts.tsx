import type { CSSProperties } from 'react'

// Make the cards fan out around the middle card
export const getStyleRotation = (
    index: number,
    total: number,
    isPlayer?: boolean
) : CSSProperties => {
    const middle = (total - 1) / 2
    const rotate = (index - middle) * 10

    const distanceFromMiddle = Math.abs (index - middle )
    const translateY = Math.pow(distanceFromMiddle, 2) * 7

    return {
        transform: `rotate(${isPlayer ? rotate : -rotate}deg) 
            translateY(${isPlayer ? translateY : -translateY}px)`,
    }
}
