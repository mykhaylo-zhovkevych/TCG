import {useRef, useState} from "react";
import {Button} from "@/components/ui/button/Button.tsx";
import {Pause, Play} from "lucide-react";

export function AudioPlayer() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const secondAudioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [clickCount, setClickCount] = useState(0);

    const handleTripleClick = () => {
        setClickCount((previousCount) => {
            let next = previousCount + 1;
            if (next === 3) {
                secondAudioRef.current?.play();
                setTimeout(() => {
                    secondAudioRef.current?.pause()
                    if (secondAudioRef.current)
                        secondAudioRef.current.currentTime = 0;
                }, 3000);
                next = 0;
            }
            return next;
        })
    }

    const handlePlayPause = () => {
        if (!audioRef.current) return null
        if (!secondAudioRef.current) return null
        handleTripleClick()
        if (isPlaying) {
            audioRef.current.pause()
        } else {
            audioRef.current.play()
        }
        setIsPlaying((previous) => !previous)
    }

    return <Button
        className='absolute right-3 bottom-12 z-20'
        variant='gray'
        isCircle
        aria-label={`Toggle music. Click ${3 - clickCount} more time${clickCount === 2 ? '' : 's'} for triple click action.`}
        onClick={handlePlayPause}
    >
        <audio ref={audioRef} loop className='opacity-0'>
               <source src='/assets/music/mondamusic-lofi-chill.mp3' type="audio/mp3" />
                Your browser does not support the audio playing audio.
         </audio>
        <audio ref={secondAudioRef} className="opacity-0">
            <source src="/assets/music/nazh.m4a" type="audio/mp4" />
            Your browser does not support the audio playing audio.
        </audio>
        {isPlaying ? <Pause /> : <Play />}
    </Button>

}

export default AudioPlayer