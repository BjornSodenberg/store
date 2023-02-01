import NavigationWrapper from "../wrapper";
import { useEffect, useState } from 'react';
import { DataSnapshot } from "@firebase/database-types";
import { getUsers, transfer } from '../../utils/firebase';
import PersonIcon from '@mui/icons-material/Person';

import './styles.css';
import { UiInput } from "uikit/UiInput";
import { LemonIcom } from "uikit/icons";

type User = {
    id: number;
    email: string;
    diamonds: number;
    lemons: number;
}
type Response = {
    code: number;
    message: string;
}

const TransferPage = () => {
    const [data, setData] = useState<DataSnapshot>();
    const [value, setValue] = useState<string>('');
    const [from, setFrom] = useState<string>('');
    const [to, setTo] = useState<string>('');
    const [status, setStatus] = useState<Response>();

    const [userFrom, setUserFrom] = useState<User>();
    const [userTo, setUserTo] = useState<User>();

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

    useEffect(() => {
        if (data && from) {
            setUserFrom(Array.prototype.find.call(data, (item) => (
                item.email === from
            )));
        }

        if (data && to) {
            setUserTo(Array.prototype.find.call(data, (item) => (
                item.email === to
            )));
        }
    }, [from, to]);

    const onSubmit = async (event: any) => {
        event.preventDefault();
        if (userFrom && userTo && value) {
            const result = await transfer(userFrom, userTo, parseInt(value))
            setStatus(result);
        }
    }

    return (
        <NavigationWrapper path="transfer">
            <div className="transfer-wrapper">
                <div className="transfer__content">
                    <h1>Лимонный поток</h1>
                    <form onSubmit={onSubmit}>
                        <div className="transfer-from">
                            <p className="label">От кого:</p>
                            <div className="transfer-from__info">
                                <UiInput 
                                    type="text" 
                                    list="suggestions"
                                    placeholder="steve@jobs.com"
                                    value={from}
                                    onChange={setFrom}
                                    icon={<PersonIcon />}
                                />
                                <div className="user-transfer-info">
                                    {
                                        userFrom && (
                                            <p className="lemons-count">В кошельке {userFrom.lemons} лимонов</p>
                                        )
                                    }
                                </div>
                                <datalist id="suggestions">
                                    {
                                        data && Array.prototype.map.call(data, (item => (
                                            <option value={item.email} key={item.id}/>
                                        )))
                                    }
                                </datalist>
                            </div>
                            
                        </div>

                        <div className="transfer-to">
                            <p className="label">Кому:</p>
                            <UiInput 
                                type="text" 
                                list="suggestions"
                                placeholder="steve@wozniak.com"
                                value={to}
                                onChange={setTo}
                                icon={<PersonIcon />}
                            />
                            <datalist id="suggestions">
                                {
                                    data && Array.prototype.map.call(data, (item => (
                                        <option value={item.email} key={item.id}/>
                                    )))
                                }
                            </datalist>
                        </div>

                        <div className="transfer-sum">
                            <p className="label sum">Сумма перевода:</p>
                            <UiInput 
                                type="number"
                                placeholder="100"
                                value={value}
                                onChange={setValue}
                                icon={<LemonIcom />}
                            />
                        </div>
                        
                        <button 
                            type="submit"
                            className="submit-transfer"
                        >
                            Перевести
                        </button>
                    </form>
                    {
                        status && (
                            <p className={status.code === 200 ? 'positive status' : 'negative status'}>{status.message}</p>
                        )
                    }
                </div>
            </div>
        </NavigationWrapper>
    );
}

export default TransferPage;
