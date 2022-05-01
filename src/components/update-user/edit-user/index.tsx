import { User } from '../types';
import { updateUser } from '../../../utils/firebase';
import { useState } from 'react';

import './styles.css'

type Props = {
    user: User;
    updateUser: () => void;
}

const EditUserForm = (props: Props) => {
    const { user } = props;
    const [lemons, setLemons] = useState<string>();
    const [diamonds, setDiamonds] = useState<string>();
    const [error, setError] = useState<string>('');

    const updateLemons = () => {
        if (!lemons) {
            setError('Введите число');
            return;
        }
        const upd: User = user;
        const newValue = lemons ? user.lemons + parseInt(lemons): user.lemons;
        if (newValue < 0) {
            setError('У пользователя нет столько лимонов');
            return;
        } else {
            upd.lemons = newValue;
            updateUser(upd);
            props.updateUser();
            setError('');
            setLemons('');
        }
    }

    const updateDiamonds = () => {
        if (!diamonds) {
            setError('Введите число');
            return;
        }
        const upd: User = user;
        const newValue = diamonds ? user.diamonds + parseInt(diamonds): user.diamonds;
        if (newValue < 0) {
            setError('У пользователя нет столько алмазов');
            return;
        } else {
            upd.diamonds = newValue;
            updateUser(upd);
            props.updateUser();
            setError('');
            setLemons('');
        }
    }

    return (
        <div className='user'>
            <div className='user-info'>
                <h2>Информация о сотруднике</h2>
                <p>ID: {user?.id}</p>
                <p>Email: {user?.email}</p>
                <p>
                    Лимонов: {user?.lemons}
                    {
                        lemons && (
                            parseInt(lemons) > 0 ? <span className='l-info positive'> +{lemons}</span> : <span className='l-info negative'> {lemons}</span>
                        )
                    }
                </p>
                <p>Алмазов: {user?.diamonds}</p>
            </div>
            <div className='user-wallet'>
                <p className='user-wallet-header'>Начисление валюты</p>
                <div className='buttons'>
                    <p className='description'>Отрицательное число для вычитания, положительное для добавления.</p>
                    <div className='lemons'>
                        <input 
                            type="number" 
                            className='wallet-input'
                            placeholder='100'
                            onChange={(e) => setLemons(e.target.value)}
                            value={lemons}
                        />
                        <button onClick={updateLemons} className='button wallet-button'>🍋</button>
                    </div>
                    <div className='diamonds'>
                        <input 
                            type="number" 
                            className='wallet-input'
                            placeholder='100'
                            onChange={(e) => setDiamonds(e.target.value)}
                            value={diamonds}
                        />
                        <button onClick={updateDiamonds} className='button wallet-button'>💎</button>
                    </div>
                    {
                        error && (
                            <p className='error'>{error}</p>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default EditUserForm;
