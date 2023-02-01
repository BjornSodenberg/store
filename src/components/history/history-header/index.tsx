import { useState } from 'react';
import dateFormat from 'dateformat';
import { useSelector } from 'react-redux';

import { UiDatePicker } from 'components/date-picker';
import { UiInput } from "uikit/UiInput";
import HistoryIcon from '@mui/icons-material/History';
import CloseIcon from '@mui/icons-material/Close';

import PersonIcon from '@mui/icons-material/Person';


import { RootState } from 'store';
import styles from '../styles.module.css';

type Props = {
    userEmail: string;
    setUserEmail: (value: string) => void;
    getHistoryWithProps: (date?: {dateStart: string; dateEnd: string;}) => void;
}

export const HistoryHeader = (props: Props) => {
    // запись данных для сортировки по дате
    const [dateRange, setDateRange] = useState<Array<Date | null>>([null, null]);
    const [startDate, endDate] = dateRange;

    const employees = useSelector((state: RootState) => state.employees);

    const onSubmit = async (e: any) => {
        e.preventDefault();

        let date = undefined;
        if (startDate && endDate) {
            date = {
                dateStart: dateFormat(startDate, 'yyyy-mm-dd'),
                dateEnd: dateFormat(endDate, 'yyyy-mm-dd')
            }
        }

        props.getHistoryWithProps(date);
        
    }

    return (
        <div className={styles['history-header']}>
            <h1
                className={styles['history-title']}
            >
                <HistoryIcon 
                    sx={{
                        marginRight: '8px',
                    }}
                />
                История операций
            </h1>
            
            <form onSubmit={onSubmit} className={styles['history-header__tools-form']}>
                <div className={styles['history-header__datepicker']}>
                    <UiDatePicker 
                        setDateRange={setDateRange}
                        startDate={startDate}
                        endDate={endDate}
                    />
                    <div onClick={() => setDateRange([null, null])}>
                        <CloseIcon  className={styles['history-header__close']}/>    
                    </div>
                </div>
                <div className={styles['history-header__datepicker']}>
                    <UiInput
                        icon={<PersonIcon />}
                        type="text"
                        list="suggestions"
                        placeholder="steve@jobs.ru"
                        onChange={props.setUserEmail}
                        value={props.userEmail}
                    />
                    <div onClick={() => props.setUserEmail("")}>
                        <CloseIcon  className={styles['history-header__close']}/>    
                    </div>
                </div>
                <datalist id="suggestions">
                    {
                        employees.entities && Array.prototype.map.call(Object.values(employees.entities), (item => (
                            <option value={item.email} key={item.id}/>
                        )))
                    }
                </datalist>
                <button type='submit' 
                    className={
                        styles['history-button']
                    }
                >
                    <span className='buttonSearchText'>Найти</span>
                </button>
            </form>
        </div>
    )
}
