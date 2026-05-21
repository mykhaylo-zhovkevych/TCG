import cn from 'clsx'

interface Props {
    value: number
    maxValue: number
    variant: 'mana' | 'health'
    color: 'blue' | 'red'
}

export function Badge({ value, maxValue, color, variant }: Props) {
    return (
        <div
            className={cn('bg-gradient-to-t px-3.5 rounded-2xl shadow-lg w-max', {
                'from-[#141959] to-[#6d27b0]': variant === 'mana',
                'from-[#50c500] to-[#143803]': variant === 'health',
            }, {'text-blue-600' : color === 'blue', 'text-red-600' : color === 'red'})}
        >
            {value}/{maxValue}
        </div>
    )
}

export default Badge