import PasswordIcon from '@mui/icons-material/Password';
import LogoutIcon from '@mui/icons-material/Logout';
import {ReactComponent as Logo} from '../../assets/logo2.svg';
import { Avatar } from '../avatar';
import ReceiptIcon from '@mui/icons-material/Receipt';
import HistoryIcon from '@mui/icons-material/History';
import LoginIcon from '@mui/icons-material/Login';
import style from './style.module.css'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RootState } from 'store';
import { useSelector } from 'react-redux';

import { getDocs , collection, query, where } from '@firebase/firestore';
import { cloudDatabase } from 'utils/firebase';

const Header  = () => {
    const [isOpen, setIsOpen] = useState(false);
    const isLogin = useSelector((state: RootState) => state.admin.isLogin);
    const adminEmail = useSelector((state: RootState) => state.admin.email);

    const [countTransactions, setCountTransactions] = useState(0);

    useEffect(() => {
        async function getCountTransactions () {
            const transactionsRef = collection(cloudDatabase, "transactions")
            const q = query(transactionsRef, where("id", ">", "0"));
            const querySnapshot = await getDocs(q);
            setCountTransactions(querySnapshot.size); 
        }

        getCountTransactions();
    }, []);

    const getTransactionsCount = () => {
        return countTransactions > 0 ? countTransactions : ''
    }

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
                <Link className={style.iconContainer} to="/transactions">
                    <ReceiptIcon sx={{fontSize: 32, color: '#fff'}}/>
                    <div className={style.iconCounter}>
                        <span>{getTransactionsCount()}</span>
                    </div>
                </Link>
                {
                    isLogin ? (
                        <div>
                            <Avatar toggleOpen={toggleOpen}/>
                            <div className={`${style.dropdown} ${isOpen ? style.open : ''}`}>
                                <div className={style.userInfo}>
                                    <Avatar toggleOpen={toggleOpen}/>
                                    <div className={style.userData}>
                                        <p className={style.userName}>{adminEmail}</p>
                                        <span className={style.userStatus}>Администратор</span>
                                    </div>      
                                </div>
                                <ul className={style.dropdownList}>
                                    {/* <li className={style.dropdownItem}>
                                        <PasswordIcon sx={{color: '#fff'}}/>
                                        <a href="/">Сменить пароль</a>
                                    </li> */}
                                    {/* <li className={style.dropdownItem}>
                                        <LogoutIcon sx={{color: '#fff'}}/>
                                        <a href="/">Выйти</a>
                                    </li> */}
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <Link 
                            to={'login'}
                            className={style.loginButton}
                            replace
                        >
                            <LoginIcon />
                        </Link>
                    )
                }
            </div>
        </div>
    )
}

export default Header;
