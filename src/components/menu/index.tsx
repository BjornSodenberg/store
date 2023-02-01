import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import HistoryIcon from '@mui/icons-material/History';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptIcon from '@mui/icons-material/Receipt';

import { getDocs , collection, query, where } from '@firebase/firestore';
import { cloudDatabase } from 'utils/firebase';

import MenuItem from './menu-item';
import './styles.css'
import { useEffect, useState } from 'react';

type Props = {
    clickedItem?: string;
}

const Menu = (props: Props) => {
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
        return countTransactions > 0 ? `(${countTransactions})` : ''
    }

    return (
        <div>
            <ul className='menu'>
                <MenuItem
                    to="/"
                    icon={DashboardIcon}
                    label="Обзорная панель"
                    onClicked={props.clickedItem === '/' ? true : false}
                />
                <MenuItem
                    to="/transactions"
                    icon={ReceiptIcon}
                    label={`Транзакции ${getTransactionsCount()}`}
                    onClicked={props.clickedItem === 'transactions' ? true : false}
                />
            </ul>
            <div className="store-tools">
                <span className="store-tools__text">УПРАВЛЕНИЕ</span>
            </div>
            <ul className='menu'>
                
                <MenuItem
                    to="/user-wallet"
                    icon={AccountBalanceWalletIcon}
                    label="Баланс сотрудника"
                    onClicked={props.clickedItem === 'wallet' ? true : false}
                />
                <MenuItem
                    to="/create-new-user"
                    icon={PersonAddAlt1Icon}
                    label="Добавить сотрудника"
                    onClicked={props.clickedItem === 'add' ? true : false}
                />
                <MenuItem 
                    to="/delete-user" 
                    icon={PersonRemoveIcon} 
                    label="Удалить сотрудника" 
                    onClicked={props.clickedItem === 'delete' ? true : false} 
                />
                <MenuItem 
                    to="/transfer" 
                    icon={SyncAltIcon} 
                    label="Перевод валюты" 
                    onClicked={props.clickedItem === 'transfer' ? true : false} 
                />
                <MenuItem 
                    to="/history" 
                    icon={HistoryIcon} 
                    label="История операций" 
                    onClicked={props.clickedItem === 'history' ? true : false} 
                />
            </ul>
        </div>
    )
}

export default Menu;
