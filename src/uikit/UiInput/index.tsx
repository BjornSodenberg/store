import { useState } from "react";
import cn from 'classnames';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import styles from './styles.module.css'

type Props = {
    icon: React.ReactNode;
    list?: string;
    placeholder?: string;
    type?: string;
    tooltipText?: string;
    onChange: (value: string) => void;
    value: string;
}

export const UiInput = (props: Props) => {
    const {icon, list, placeholder, type, value, onChange, tooltipText} = props;
    const [isFocus, setFocus] = useState<boolean>(false);
    const [displayTooltip, setDisplayTooltip] = useState<boolean>(false);

    return (
        <div className={styles['ui-input__container']}>
            <div
                className={
                    cn(
                        styles['ui-input__icon'],
                        {[styles['ui-input__icon-focused']]: isFocus}
                    )
                }
            >
                {icon}
            </div>
            <input
                type={type || 'text'}
                list={list}
                className={
                    cn(
                        styles['ui-input'],
                        { [styles['ui-input-focused']]: isFocus}
                    )
                }
                placeholder={placeholder}
                value={value}
                onFocus={() => setFocus(true)}
                onBlur={() => { value ? setFocus(true) : setFocus(false)}}
                onChange={(e) => onChange(e.target.value)}
            />
            <span 
                className={styles['ui-input__tooltip']}
                onMouseEnter={() => setDisplayTooltip(!displayTooltip)}
                onMouseLeave={() => setDisplayTooltip(!displayTooltip)}
            >
                {
                    tooltipText && <HelpOutlineIcon />
                }
                <div className={
                        cn(
                            styles['ui-input__tooltip-text'],
                            {[styles['show']]: displayTooltip}
                        )
                    }
                >
                    {tooltipText}
                </div>
            </span>
        </div>
    )   
}
