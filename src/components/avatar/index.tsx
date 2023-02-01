import AccountIcon from '../../assets/account-icon.png'
import styles from './styles.module.css';

type Props = {
    toggleOpen: any;
}

export const Avatar = ({toggleOpen}: Props) => {
    return (
        <div className={styles.avatarContainer}>
            <img 
                src={AccountIcon} 
                alt="account-icon" 
                className={styles.accountIcon}
                onClick={toggleOpen}
            />
            <span className={styles.online}></span>
        </div>
    )
}
