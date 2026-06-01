import {motion} from 'framer-motion'
import {type ReactNode, useEffect} from "react";
import styles from '@/components/ui/button/Button.module.scss'

interface NProps {
    children: ReactNode
    onClose: () => void
    duration?: number
}

export function Notification({children, onClose}: NProps) {
    useEffect(() => {

    }, [onClose]);

    return (
        <div className='fixed left-0 w-full h-full rounded-lg shadow backdrop-blur-sm bg-transparent z-20 flex justify-center'>
            <motion.button
                type="button"
                className={`${styles.primary} rounded-lg text-white py-2 px-4 w-max cursor-pointer h-fit m-auto`}
                onClick={onClose}
                initial={{y: -200, opacity: 0}}
                animate={{scale: 1, rotate: 0, y: 0, opacity: 1}}
                transition={{type: 'spring', stiffness: 150, damping: 20, mass: 1}}
            >
                {children}
            </motion.button>
        </div>
    )
}

export default Notification
