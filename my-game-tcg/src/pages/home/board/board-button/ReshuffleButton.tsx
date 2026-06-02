import {Button} from "@/components/ui/button/Button.tsx";
import {useAppDispatch} from "@/store/hooks.ts";
import {reshuffleCard} from "@/store/game/game.slice.ts";

export function ReshuffleButton() {
    const dispatch = useAppDispatch();

    const handleReshuffleClick = () => {
        dispatch(reshuffleCard());
    }

    return <Button className='absolute top-[39%] right-2 z-10' variant='secondary' onClick={handleReshuffleClick}>
        Reshuffle
    </Button>

}
export default ReshuffleButton;
