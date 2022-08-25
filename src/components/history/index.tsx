import { useEffect, useState } from "react";
import qs from 'query-string';
import HistoryIcon from '@mui/icons-material/History';
import { getHistory, getHistoryByEmail, getSizeHistory } from "../../utils/firebase"
import NavigationWrapper from '../wrapper';
import styles from './styles.module.css';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CircularProgress from '@mui/material/CircularProgress';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PaidIcon from '@mui/icons-material/Paid';
import {LemonIcom} from 'uikit/icons';
import cn from 'classnames';
import { Link } from "react-router-dom";
import { Pagination } from "@mui/material";
import { UiInput } from "uikit/UiInput";
import PersonIcon from '@mui/icons-material/Person';
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployess } from 'store/users/reducers';
import { RootState } from 'store';

const OPERATION_TYPES = {
    increase: 'increase',
    decrease: 'decrease',
}

export const History = () => {
    const queryString = qs.parse(window.location.search)?.['email']?.toString();
    const employees = useSelector((state: RootState) => state.employees);
    const dispatch = useDispatch();
    const [data, setData] = useState<any>();
    const [page, setPage] = useState<number>(1);
    const [historySize, setHistorySize] = useState<number>();

    const [userEmail, setUserEmail] = useState<string>(queryString || '');

    useEffect(() => {
            // @ts-ignore
            dispatch(fetchEmployess());
    }, []);

    useEffect(() => {
        async function historySize () {
            const count = await getSizeHistory();
            setHistorySize(count);
        }

        historySize();
    }, [])

    useEffect(() => {
        async function history () {
            const result = await getHistory();
            setData(result);
        }

        async function historyByEmail () {
            const result = await getHistoryByEmail(userEmail);
            setData(result);
        }

        if (queryString === userEmail) {
            historyByEmail();
        } else {
            history();
        }
    }, [userEmail]);

    // const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    //     setPage(value);
    // };

    const onSubmit = async (e: any) => {
        e.preventDefault();
        if (userEmail) {
            const result = await getHistoryByEmail(userEmail);
            setData(result);
        }
    }

    return (
        <NavigationWrapper path="history">
            <div
                className={styles['history-root']}
            >
                <div className={styles['history-content']}>
                    <div className={styles['history-header']}>
                        <h1
                            className={styles['history-title']}
                        >
                            <HistoryIcon />
                            История операций
                        </h1>
                        <div className={styles['history-header__tools']}>
                            <form onSubmit={onSubmit}>      
                                <UiInput
                                    icon={<PersonIcon />}
                                    type="text"
                                    list="suggestions"
                                    placeholder="steve@jobs.ru"
                                    onChange={setUserEmail}
                                    value={userEmail}
                                    tooltipText="Поиск сотрудника по почте."
                                />
                                <datalist id="suggestions">
                                    {
                                        employees.entities && Array.prototype.map.call(Object.values(employees.entities), (item => (
                                            <option value={item.email} key={item.id}/>
                                        )))
                                    }
                                </datalist>
                                <button type='submit' className='button active'>
                                    <span className='buttonSearchText'>Найти</span>
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className={styles['history-list']}>
                        {
                            data ? data.map((item: any) => {
                                return (
                                    <HistoryItem doc={item}/>
                                )
                            }) : 
                            <CircularProgress 
                                sx={{
                                    color: '#F4B73F',
                                    alignSelf: 'center'
                                }}
                            />
                        }
                    </div>

                    
                </div>
                
            </div>   
        </NavigationWrapper>
    )
}


//todo move this component outside
const HistoryItem = ({doc}: any) => {
    return (
        <div className={styles['history-container']} key={doc.created}>
            <div className={styles['history-container__left']}>
                {
                    doc.operation === OPERATION_TYPES.increase ?
                    <PaidIcon className={styles['history-icon']}/> :
                    <ShoppingBagIcon className={styles['history-icon']}/>
                }
                <div className={styles['history-container__info']}>
                    <p>
                        <Link 
                            to={`/user-wallet/?email=${doc.to}`}
                            className={styles['history-link']}
                        >{doc.to}</Link>
                    </p>
                    <div className={styles['history-from-root']}>
                        <p
                            className={styles['history-from']}
                        >
                            <SensorOccupiedIcon 
                                sx={{
                                    'fontSize': '10px',
                                    'marginRight': '4px'
                                }}
                            />
                            {doc.from}
                        </p>
                        <p
                            className={styles['history-timestamp']}
                        >
                            <CalendarMonthIcon 
                                sx={{
                                    'fontSize': '10px',
                                    'marginRight': '4px'
                                }}
                            />
                            {doc.created}
                        </p>
                    </div>   
                </div>
            </div>
            <div className={styles['history-container__middle']}>
                <span className={styles['history-container__comment']}>
                    {doc.comment}
                </span>
                
            </div>
            <div className={styles['history-container__right']}>
                <p className={
                    cn(
                        doc.operation === OPERATION_TYPES.increase ? 'positive' : 'negative',
                        styles['history-coins']
                    )
                }>
                    <span>{doc.operation === OPERATION_TYPES.increase ? '+' : ''}{doc.count}</span>
                    <LemonIcom className={
                        cn (
                            doc.operation === OPERATION_TYPES.increase ? 'positive' : 'negative',
                        )
                    }/>
                </p>
                
            </div>
        </div>
    )
}
