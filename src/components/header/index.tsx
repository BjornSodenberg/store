import NotificationsIcon from '@mui/icons-material/Notifications';
import PasswordIcon from '@mui/icons-material/Password';
import LogoutIcon from '@mui/icons-material/Logout';
import {ReactComponent as Logo} from '../../assets/logo2.svg';
import { Avatar } from '../avatar';
import ReceiptIcon from '@mui/icons-material/Receipt';
import HistoryIcon from '@mui/icons-material/History';
import style from './style.module.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header  = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className={style.header}>
            <Logo className={style.logo}/>
            <div className={style.userProfile}>
                <Link className={style.iconContainer} to="/history">
                    <HistoryIcon sx={{fontSize: 32, color: '#fff'}}/>
                </Link>
                <div className={style.iconContainer}>
                    <ReceiptIcon sx={{fontSize: 32, color: '#fff'}}/>
                    <div className={style.iconCounter}>
                        <span>99</span>
                    </div>
                </div>
                <Avatar toggleOpen={toggleOpen}/>
                <div className={`${style.dropdown} ${isOpen ? style.open : ''}`}>
                    <div className={style.userInfo}>
                        <Avatar toggleOpen={toggleOpen}/>
                        <div className={style.userData}>
                            <p className={style.userName}>Екатерина Карабанцева</p>
                            <span className={style.userStatus}>Администратор</span>
                        </div>      
                    </div>
                    <ul className={style.dropdownList}>
                        <li className={style.dropdownItem}>
                            <PasswordIcon sx={{color: '#fff'}}/>
                            <a href="/">Сменить пароль</a>
                        </li>
                        <li className={style.dropdownItem}>
                            <LogoutIcon sx={{color: '#fff'}}/>
                            <a href="/">Выйти</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header;
