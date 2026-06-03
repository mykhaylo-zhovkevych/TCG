import {Button} from "@/components/ui/button/Button.tsx";
import {useAppDispatch, useAppSelector} from "@/store/hooks.ts";
import {startEvolveMode} from "@/store/game/game.slice.ts";

export function EvolveButton() {
    const dispatch = useAppDispatch();
    const pendingAction = useAppSelector((state) => state.game.pendingAction);
    const isEvolveModeActive = pendingAction === 'evolve';

    const handleEvolveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(startEvolveMode());
    };

    return <Button
        className='absolute top-[29%] right-2 z-10 disabled:cursor-not-allowed disabled:opacity-50 data-[active=true]:ring-2 data-[active=true]:ring-white'
        variant='secondary'
        onClick={handleEvolveClick}
    >
        {isEvolveModeActive ? 'Choose Card' : 'Evolve Card'}
    </Button>

}
export default EvolveButton;