import cn from 'classnames';
import { Link } from 'react-router-dom';

import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PaidIcon from '@mui/icons-material/Paid';
import {LemonIcom} from 'uikit/icons';

import styles from '../styles.module.css';

export const HistoryItem = ({doc}: any) => {
    const OPERATION_TYPES = {
        increase: 'increase',
        decrease: 'decrease',
    }

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
