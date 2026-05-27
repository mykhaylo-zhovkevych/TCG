import {Button} from "@/components/ui/button/Button.tsx";
import {useAppDispatch} from "@/store/hooks.ts";

export function EndTurnButton() {
    const dispatch = useAppDispatch();

    const handleEndTurnClick = () => {
        dispatch(() => {});
    }

    return <Button className='absolute top-[49%] right-2 z-10' variant='secondary' onClick={handleEndTurnClick}>
        End Turn
    </Button>

}
export default EndTurnButton;