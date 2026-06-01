import {Button} from "@/components/ui/button/Button.tsx";
import {useAppDispatch} from "@/store/hooks.ts";
import {endTurn} from "@/store/game/game.slice.ts";

export function EndTurnButton() {
    const dispatch = useAppDispatch();

    const handleEndTurnClick = () => {
        dispatch(endTurn());
    }

    return <Button className='absolute top-[49%] right-2 z-10' variant='secondary' onClick={handleEndTurnClick}>
        End Turn
    </Button>

}
export default EndTurnButton;