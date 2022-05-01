import { useEffect, useState } from 'react';
import { DataSnapshot } from "@firebase/database-types";
import { User } from './types'
import { getUsers } from '../../utils/firebase';
import EditUserForm from './edit-user';
import NavigationWrapper from '../wrapper';
import search from '../../assets/search.svg';

import './styles.css';

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

    const onClick = (event: any) => {
        event.preventDefault();
        const user = Array.prototype.find.call(
            data, 
            (item: User) => item.email === value
        );

        user && setUser(user);
    }

    const updateUserInfo = async () => {
        try {
            const result = await getUsers();
            setData(result);
        } catch (e) {
            console.log(e);
        }
    }
    
    return (
        <NavigationWrapper path="wallet">
            <div className='main-content'>
                <h1>Поиск сотрудника</h1>
                <form onSubmit={onClick} className='search-wrapper'>
                    <button type='submit' className="button"><img src={search} alt="search"></img></button>
                    <input
                        type="text"
                        list="suggestions"
                        className='search'
                        placeholder='steve@jobs.com'
                        
                        onChange={(e) => setValue(e.target.value)}
                    />
                    <datalist id="suggestions">
                        {
                            data && Array.prototype.map.call(data, (item => (
                                <option value={item.email} key={item.id}/>
                            )))
                        }
                    </datalist>
                </form>
                {
                    value && user && <EditUserForm user={user} key={user.id} updateUser={updateUserInfo}/>
                }
            </div>
        </NavigationWrapper>
    )
}

export default UpdateUserForm;

// pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
