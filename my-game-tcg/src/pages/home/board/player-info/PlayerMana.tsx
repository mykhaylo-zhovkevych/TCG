import Badge from '@/components/ui/Badge.tsx'
import cn from 'clsx'

interface Props {
    currentMana: number
    maxMana: number
}

export function PlayerMana({currentMana, maxMana}: Props) {
    return (
        <div className='flex items-center absolute right-3 bottom-3 shadow backdrop-blur-sm'>
            <Badge value={currentMana} maxValue={maxMana} variant="mana" color='blue' />

            <div className='flex items-center ml-2'>
                {new Array(maxMana).fill(0).map((_, index) => (
                    <div key={index} className={cn(
                        'w-6 h-6 bg-gradient-to-t from-sky-600 rounded-full mx-1 shadow-xl shadow-inner'
                        , index < currentMana ? 'to-sky-300': 'to-sky-900'
                    )}
                    />
                ))}
            </div>
        </div>
    )
}