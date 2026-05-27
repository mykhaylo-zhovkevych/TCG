import {Button} from "@/components/ui/button/Button.tsx";
import {useAppDispatch} from "@/store/hooks.ts";

export function EvolveButton() {
    const dispatch = useAppDispatch();

    const handleEndTurnClick = () => {
        dispatch(() => {});
    }

    return <Button className='absolute top-[29%] right-2 z-10' variant='secondary' onClick={handleEndTurnClick}>
        EvolveButton
    </Button>

}
export default EvolveButton;