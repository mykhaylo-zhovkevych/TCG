import type {PropsWithChildren} from "react";

export function Heading({children}: PropsWithChildren) {
    return <h1 className='text-3xl font-bild text-white'>{children}</h1>
}