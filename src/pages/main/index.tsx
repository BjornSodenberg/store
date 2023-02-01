//@ts-nocheck
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import NavigationWrapper from 'components/wrapper';
import { LemonIcom, DiamondIcon } from 'uikit/icons';
import PersonIcon from '@mui/icons-material/Person';
import { fetchEmployess } from 'store/users/reducers';
import styles from './styles.module.css';
import cn from 'classnames';
import { useEffect, useState } from 'react';

import { getDocs , collection, query } from '@firebase/firestore';
import { cloudDatabase } from 'utils/firebase';
import timestamp from 'time-stamp';
import { Chart } from 'components/charts';

const mounth = [
    'январь',
    'февраль',
    'марь',
    'апрель',
    'май',
    'июнь',
    'июль',
    'август',
    'сентябрь',
    'октябрь',
    'ноябрь',
    'декабрь',
]

function Main() {
    const {totalLemons, totalDiamonds, totalEmployees} = useSelector((state: RootState) => state.employees);
    const dispatch = useDispatch();
    const [data, setData] = useState<any[]>();

    useEffect(() => {
        async function analytics () {
            const q = query(collection(cloudDatabase, "analytics"));
            const querySnapshot = await getDocs(q);
            let docs = [];
            querySnapshot.forEach(doc => {
                docs.push(doc.data());
            });
            setData(docs);
        }
        // @ts-ignore
        dispatch(fetchEmployess());
        analytics();
    }, []);

    const dataChart = [
        {
            name: "сентябрь",
            value: 500,
        },
        {
            name: "октябрь",
            value: 155,
        },
        {
            name: "ноябрь",
            value: 200,
        },
        {
            name: "декабрь",
            value: 700,
        },
    ]

    const getCountTransactionsByMounth = () => {
        const result = data?.filter(el => (
            el.type === 'transactions/accept'
        ));

        const res = [];

        if (result) {
            const regex = /-(\d{2})-/;
    
            for (let i = 0; i < result.length; i++) {
                if (res[parseInt(result[i].date.match(regex)[1])]) {
                    res[parseInt(result[i].date.match(regex)[1])] += 1;
                } else {
                    res[parseInt(result[i].date.match(regex)[1])] = 1;
                }
            }
        }

        const t = res.map((el,index) => ({
            name: mounth[index-1],
            value: el
        }));

        return t;
    }

    const getAccuralLemonsByMounth = () => {
        const result = data?.filter(el => (
            el.type === 'lemons/accrual'
        ));

        const res = [];

        if (result) {
            const regex = /-(\d{2})-/;
    
            for (let i = 0; i < result.length; i++) {
                if (res[parseInt(result[i].date.match(regex)[1])]) {
                    res[parseInt(result[i].date.match(regex)[1])] += result[i].count;
                } else {
                    res[parseInt(result[i].date.match(regex)[1])] = result[i].count;
                }
            }
        }

        const t = res.map((el,index) => ({
            name: mounth[index-1],
            value: el
        }));

        return t;
    }

    const getSpendLemonsByMounth = () => {
        const result = data?.filter(el => (
            el.type === 'lemons/spend'
        ));

        const res = [];

        if (result) {
            const regex = /-(\d{2})-/;
    
            for (let i = 0; i < result.length; i++) {
                if (res[parseInt(result[i].date.match(regex)[1])]) {
                    res[parseInt(result[i].date.match(regex)[1])] += result[i].count;
                } else {
                    res[parseInt(result[i].date.match(regex)[1])] = result[i].count;
                }
            }
        }

        const t = res.map((el,index) => ({
            name: mounth[index-1],
            value: el
        }));

        return t;
    }

    return (
        <div>
            <NavigationWrapper path="/">
                <div className={styles.mainContent}>
                    <div className={styles.medium}>
                        <h3 className={styles.title}>Общее количество</h3>
                        <div className={styles.totalCount}>
                            <div className={styles.totalWrapper}>
                                <span className={cn(
                                        styles.totalIcon,
                                        styles.lemons
                                    )}><LemonIcom /></span>
                                <div className={styles.totalContainer}>
                                    <span className={cn(
                                        styles.totalTitle,
                                    )}>Лимоны</span>
                                    <span className={styles.totalValue}>{totalLemons}</span>
                                </div>
                            </div>
                            <div className={styles.totalWrapper}>
                                <span className={cn(
                                        styles.totalIcon,
                                        styles.diamonds
                                    )}><DiamondIcon /></span>
                                <div className={styles.totalContainer}>
                                    <span className={styles.totalTitle}>Алмазы</span>
                                    <span className={styles.totalValue}>{totalDiamonds}</span>
                                </div>
                            </div>
                            <div className={styles.totalWrapper}>
                                <span className={cn(
                                        styles.totalIcon,
                                        styles.employees
                                    )}><PersonIcon/></span>
                                <div className={styles.totalContainer}>
                                    <span className={styles.totalTitle}>Сотрудники</span>
                                    <span className={styles.totalValue}>{totalEmployees}</span>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div className={styles.medium}>
                        <h3 className={styles.title}>Обработано заявок</h3>
                        <Chart data={getCountTransactionsByMounth().filter(el => el)}/>
                    </div>
                    <div className={styles.medium}>
                        <h3 className={styles.title}>Начислено лимонов</h3>
                        <Chart data={getAccuralLemonsByMounth().filter(el => el)}/>
                    </div>
                    <div className={styles.medium}>
                        <h3 className={styles.title}>Потрачено лимонов</h3>
                        <Chart data={getSpendLemonsByMounth().filter(el => el)}/>
                    </div>
                </div>
            </NavigationWrapper>
        </div>
        
    );
}

export default Main;
