import {useState} from "react";
import {Button} from "@/components/ui/button/Button.tsx";
import {useAppDispatch, useAppSelector} from "@/store/hooks.ts";
import {startGame} from '@/store/game/game.slice'
import {Heading} from "@/components/ui/heading/Heading.tsx";
import GameBoard from "@/pages/home/board/GameBoard.tsx";


function Home() {
    const dispatch = useAppDispatch();
    const isGameOver = useAppSelector((state) => state.game.isGameOver);

    const [isGameVisible, setIsGameVisible] = useState(false);

    const handleStartClick = () => {
        dispatch(startGame());
        setIsGameVisible(true);
    }

    if (!isGameVisible) {
        return (
            <main>
                <div className='flex items-center justify-center flex-col gap-4 h-screen'>
                    <Heading>TGC Game</Heading>
                    <Button variant="primary" onClick={handleStartClick}>Start</Button>
                </div>
            </main>
        )
    }

    if (isGameVisible) {
        return (
            <main>
                <div>
                    <GameBoard />
                </div>
            </main>
        )
    }

    if (isGameOver) {
        return (
            <main>
                <div>Game over</div>
                <Button variant="primary" onClick={handleStartClick}>Restart</Button>
            </main>
        )
    }
}

export default Home
