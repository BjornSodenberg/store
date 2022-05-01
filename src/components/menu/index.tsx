import wallet from '../../assets/wallet.svg'
import human from '../../assets/human.svg';
import deleteUser from '../../assets/del-human.svg';
import transfer from '../../assets/transfer.svg';
import history from '../../assets/history.svg';

import MenuItem from './menu-item';
import './styles.css'

type Props = {
    clickedItem?: string;
}

const Menu = (props: Props) => {
    return (
        <ul className='menu'>
            <MenuItem to="/user-wallet" icon={wallet} label="Баланс сотрудника" onClicked={props.clickedItem === 'wallet' ? true : false}/>
            <MenuItem to="/create-new-user" icon={human} label="Добавить сотрудника" onClicked={props.clickedItem === 'add' ? true : false}/>
            <MenuItem to="/delete-user" icon={deleteUser} label="Удалить сотрудника" onClicked={props.clickedItem === 'delete' ? true : false}/>
            <MenuItem to="/transfer" icon={transfer} label="Перевод валюты" onClicked={props.clickedItem === 'transfer' ? true : false}/>
            <MenuItem to="/history" icon={history} label="История операций" onClicked={props.clickedItem === 'history' ? true : false}/>
        </ul>
    )
}

export default Menu;
