import { useEffect, useState } from 'react';
import { DataSnapshot } from "@firebase/database-types";
import { getUsers } from '../../utils/firebase';
import { isEmail } from "../../utils/is-email";
import { deleteUser } from '../../utils/firebase';
import NavigationWrapper from "../wrapper";
import PersonIcon from '@mui/icons-material/Person';

import './styles.css'
import { UiInput } from 'uikit/UiInput';

type Response = {
    code: number;
    message: string;
}

const DeleteUser = () => {
    const [value, setValue] = useState<string>('');
    const [status, setStatus] = useState<Response>();
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<DataSnapshot>();
    const [accept, setAccept] = useState<boolean>(false);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const result = await getUsers();
                setData(result);
            } catch (e) {
                console.log(e);
            }
        }
        fetchUsers();
    }, []);

    const onSubmit = async (event: any) => {
        event.preventDefault();
        if (value) {
            if (!isEmail(value)) {
                setStatus({
                    code: 0,
                    message: 'Введите корректный email'
                });
                return;
            }

            if (!accept) {
                setStatus({
                    code: 0,
                    message: 'Подтвердите удаление'
                });
                return;
            }

            const user = Array.prototype.find.call(data, (item) => (
                item.email === value
            ));

            setLoading(true);
            const result = await deleteUser(user);
            setLoading(false);

            setStatus(result);
            setValue('');
            setAccept(false);
        }
    }

    return (
        <NavigationWrapper path="delete">
            <div className="delete-user-wrapper">
                <div className='delete-user__form'>
                    <h1>Удалить сотрудника</h1>
                    <p className='delete-user__description'>
                        При удалении сотрудника из&nbsp;базы, он&nbsp;потеряет доступ к&nbsp;магазину мерча store.zarplata.ru. О чем будет уведомлен с&nbsp;помощью блокирующего всплывающего окна, при попытке воспользоваться магазином.
                    </p>
                    <form onSubmit={onSubmit} className='delete-wrapper'>
                        <UiInput 
                            icon={<PersonIcon />}
                            onChange={setValue}
                            value={value}
                            placeholder="steve@jobs.com"
                            type="email"
                            list="suggestions"
                        />
                        <button
                            type='submit'
                            className="button remove-button"
                            disabled={loading}
                        >
                            Удалить
                        </button>
                        <datalist id="suggestions">
                            {
                                data && Array.prototype.map.call(data, (item => (
                                    <option value={item.email} key={item.id} />
                                )))
                            }
                        </datalist>
                    </form>
                    <div className='accept-checkbox'>
                        <input 
                            type="checkbox" 
                            id="accept" 
                            name="accept" 
                            value="accepted" 
                            checked={accept}
                            onChange={(e) => setAccept(e.target.checked)}
                        /> Подтверждаю удаление сотрудника из базы.
                    </div>
                    
                    {
                        status && (
                            status.code === 200 ? (
                                <p className="positive">{status.message}</p>
                            ) : (
                                <p className="negative">{status.message}</p>
                            )
                        )
                    }
                </div>
            </div>
        </NavigationWrapper>
    )
}

export default DeleteUser;
