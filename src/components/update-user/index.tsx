import { useEffect, useState } from 'react';

import qs from 'query-string';

import EditUserForm from './edit-user';
import NavigationWrapper from '../wrapper';

import EmailIcon from '@mui/icons-material/Email';

import { User } from './types'

import './styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployess } from 'store/users/reducers';
import { RootState } from 'store';

const UpdateUserForm = () => {
    const queryString = qs.parse(window.location.search)?.['email']?.toString();
    const dispatch = useDispatch();
    const employees = useSelector((state: RootState) => state.employees)

    const [user, setUser] = useState<User>();
    const [value, setValue] = useState<string>(queryString || '');
    const [isFocus, setFocus] = useState<boolean>();

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchEmployess());
    }, []);

    useEffect(() => {
        if (queryString && value) {
            const user = Array.prototype.find.call(
                Object.values(employees.entities), 
                (item: User) => item.email === value
            );
    
            user && setUser(user);
        } 
    }, [queryString, employees, value])

    const onClick = (event: any) => {
        event.preventDefault();
        const user = Array.prototype.find.call(
            Object.values(employees.entities), 
            (item: User) => item.email === value
        );
        window.history.pushState({}, '', `?email=${user.email}`)
        user && setUser(user);
    }

    const updateUserInfo = (upd: User) => {
        setUser(upd);
    }
    
    return (
        <NavigationWrapper path="wallet">
            <div className='main-content update-user'>
                <h2 className='updateUserHeader'>Поиск сотрудника</h2>
                <form onSubmit={onClick} className='search-wrapper'>
                    <EmailIcon className={isFocus ? 'search-icon active-text': 'search-icon'}/>
                    <input
                        type="text"
                        list="suggestions"
                        className={isFocus ? 'search search-active': 'search'}
                        placeholder='steve@jobs.com'
                        value={value}
                        onFocus={() => setFocus(true)}
                        onBlur={() => { value ? setFocus(true) : setFocus(false)}}
                        onChange={(e) => setValue(e.target.value)}
                    />
                    <datalist id="suggestions">
                        {
                            employees.entities && Array.prototype.map.call(Object.values(employees.entities), (item => (
                                <option value={item.email} key={item.id}/>
                            )))
                        }
                    </datalist>
                    <button type='submit' className={isFocus ? 'button active': 'button'}>
                        <span className='buttonSearchText'>Найти</span>
                    </button>
                </form>
            </div>
            <div className='edit-container'>
                {
                    value && 
                    user && 
                    <EditUserForm 
                        user={user} 
                        key={user.id} 
                        updateUser={updateUserInfo}
                    />
                }
            </div>
        </NavigationWrapper>
    )
}

export default UpdateUserForm;

// pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
