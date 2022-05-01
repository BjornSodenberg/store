import { useEffect, useState } from 'react';
import { DataSnapshot } from "@firebase/database-types";
import { User } from './types'
import { getUsers } from '../../utils/firebase';
import EditUserForm from './edit-user';

const UpdateUserForm = () => {
    const [data, setData] = useState<DataSnapshot>();
    const [user, setUser] = useState<User>();
    const [value, setValue] = useState<string>();

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

    const onClick = () => {
        const user = Array.prototype.find.call(
            data, 
            (item: User) => item.email === value
        );

        user && setUser(user);
    }

    return (
        <div>
            <p>Поиск сотрудника</p>
            <input
                type="text"
                list="suggestions"
                onChange={(e) => setValue(e.target.value)}
            />
            <datalist id="suggestions">
                {
                    data && Array.prototype.map.call(data, (item => (
                        <option value={item.email} key={item.id}/>
                    )))
                }
            </datalist>
            <button type='button' onClick={onClick}>Найти</button>
            {
                value && user && <EditUserForm user={user} key={user.id}/>
            }
        </div>
    )
}

export default UpdateUserForm;
