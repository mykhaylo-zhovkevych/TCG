import {Button} from "@/components/ui/button/Button.tsx";
import {motion} from 'framer-motion';

type RProps = {
    onClose: () => void;
}

export function RulesPopup({onClose}: RProps) {
    return (
        <div className='fixed h-screen w-screen overflow-hidden z-10'>
            <div className='flex flex-col h-screen items-center justify-center
                gap-2 rounded-lg shadow backdrop-blur-sm top-10 bg-transparent '>
                <h2>Game Rules</h2>
                <p>Game ends when you defeat all opponent cards or the virtual opponent has no health.</p>

                <h2>Gameplay Rules</h2>
                <p>To retrieve a card from the playfield, use one mana card and single-click the card. Otherwise, wait for a mana card to appear in your deck.</p>
                <p>To attack the virtual opponent, double-click your attacking card.</p>
                <p>To attack opponent cards, hold the desired play card for 3 seconds and choose an opponent play card.</p>
                <motion.div
                    initial={{y: -200, opacity: 0}}
                    animate={{scale: 1, rotate: 0, y: 0, opacity: 1}}
                    whileHover={{scale: 1.08, y: -4}}
                    whileTap={{scale: 0.96}}
                    transition={{type: 'spring', stiffness: 150, damping: 20, mass: 1}}
                >
                    <Button variant='primary' onClick={onClose}>Close</Button>
                </motion.div>
            </div>
        </div>
    )
}

export default { RulesPopup }
