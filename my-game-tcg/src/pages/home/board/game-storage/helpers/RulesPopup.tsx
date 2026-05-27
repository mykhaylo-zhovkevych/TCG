import {Button} from "@/components/ui/button/Button.tsx";

type RulesPopupProps = {
    onClose: () => void;
}

export function RulesPopup({onClose}: RulesPopupProps) {
    return (
        <div className='fixed h-screen w-screen overflow-hidden z-10'>
            <div className='flex flex-col h-screen items-center justify-center
                gap-2 rounded-lg shadow backdrop-blur-sm top-10 bg-transparent '>
                <h2>Game Rules</h2>
                <p>...</p>
                <Button variant='primary' onClick={onClose}> Close</Button>
            </div>
        </div>
    )
}

export default { RulesPopup }