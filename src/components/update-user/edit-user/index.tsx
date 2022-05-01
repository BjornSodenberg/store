import { User } from '../types';
import { updateUser } from '../../../utils/firebase';
import { useState } from 'react';

type Props = {
    user: User;
}

const EditUserForm = (props: Props) => {
    const { user } = props;
    const [value, setValue] = useState<string>();

    const updateLemons = () => {
        const upd: User = user;
        upd.lemons = value ? user.lemons + parseInt(value): user.lemons;
        updateUser(upd);
    }

    const updateDiamonds = () => {
        const upd: User = user;
        upd.diamonds = value ? user.diamonds + parseInt(value): user.diamonds;
        updateUser(upd);
    }

    return (
        <div>
            <p>Редактирование профиля</p>
            <div>
                <p>ID: {user?.id}</p>
                <p>Email: {user?.email}</p>
                <p>Lemons: {user?.lemons}</p>
                <p>Diamonds: {user?.diamonds}</p>
            </div>
            <div>
                <input type="text" onChange={(e) => setValue(e.target.value)}/>
                <button onClick={updateLemons}>🍋</button>
                <button onClick={updateDiamonds}>💎</button>
            </div>
        </div>
    )
}

export default EditUserForm;
