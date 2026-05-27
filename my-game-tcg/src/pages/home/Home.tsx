import {useState, useTransition} from "react";
import {Button} from "@/components/ui/button/Button.tsx";
import {useAppDispatch, useAppSelector} from "@/store/hooks.ts";
import {startGame} from '@/store/game/game.slice'
import {Heading} from "@/components/ui/heading/Heading.tsx";
import GameBoard from "@/pages/home/board/GameBoard.tsx";
import Loader from "@/components/ui/loader/Loader.tsx";
import {GameStateProvider} from "@/pages/home/board/game-storage/GameStateProvider.tsx";


function Home() {
    const dispatch = useAppDispatch();
    const isGameOver = useAppSelector((state) => state.game.isGameOver);

    const [isGameVisible, setIsGameVisible] = useState(false);
    const [isPending, startTransition] = useTransition();

    const handleStartClick = () => {
        dispatch(startGame());
        startTransition(() => {
            setIsGameVisible(true);

        })
    }

    if (!isGameVisible) {
        return (
            <main>
                <div className='flex items-center justify-center flex-col gap-4 h-screen'>
                    <Heading>TGC Game</Heading>
                    <Button variant="primary" onClick={handleStartClick}>
                        {isPending ? <Loader />  :  "Start"}
                    </Button>
                </div>
            </main>
        )
    }

    if (isGameVisible) {
        return (
            <main>
                {/*A local storage for the global hooks*/}
                <GameStateProvider>
                    <GameBoard />
                </GameStateProvider>
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
