import cn from 'clsx';
import type {HTMLAttributes, ReactNode} from "react";
import styles from './Button.module.scss'

interface Props extends HTMLAttributes<HTMLButtonElement> {
    children: ReactNode; // Union Type
    variant?: 'primary' | 'secondary' | 'gray'
    isCircle?: boolean
}

export function Button(props: Props) {
    const {children, variant = 'primary', isCircle, ...rest} = props;
    return (
        <button {...rest} 
                className={ cn(styles.button, styles[variant], { [styles.circle]: isCircle}, rest.className) }>
            {children}
        </button>
    )
}
