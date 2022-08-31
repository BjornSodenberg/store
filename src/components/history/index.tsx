import { ChangeEvent, useEffect, useState } from 'react';
import qs from 'query-string';
import { useDispatch } from 'react-redux';

import { HistoryHeader } from './history-header';
import { HistoryItem } from './history-item';
import CircularProgress from '@mui/material/CircularProgress';
import NavigationWrapper from '../wrapper';

import { HistoryService } from 'utils/history';

import { fetchEmployess } from 'store/users/reducers';

import styles from './styles.module.css';
import { DocumentData } from '@firebase/firestore';

export const History = () => {
    // получение емейла из поисковой строки
    const queryString = qs.parse(window.location.search)?.['email']?.toString();
    const [userEmail, setUserEmail] = useState<string>(queryString || '');
    const dispatch = useDispatch();
    
    const [historyData, setHistoryData] = useState<DocumentData[]>();
    const [lastVisibleDoc, setLastVisibleDoc] = useState<DocumentData>();

    const history = new HistoryService();

    // todo оптимизировать если пользователи уже есть в сторе
    // todo убрать ts-ignore
    useEffect(() => {
            // @ts-ignore
            dispatch(fetchEmployess());
    }, []);

    useEffect(() => {
        async function basicHistory () {
            const result = await history.getHistory();
            setHistoryData(result.data);
            setLastVisibleDoc(result.lastVisible);
        }

        async function historyByEmail () {
            const result = await history.getHistoryByEmail(userEmail);
            setHistoryData(result.data);
            setLastVisibleDoc(result.lastVisible);
        }

        if (queryString === userEmail) {
            historyByEmail();
        } else {
            basicHistory();
        }

    }, [userEmail]);

    const getHistoryWithProps = async (
        date?: {dateStart: string; dateEnd: string;}
    ) => {
        let result;

        if (userEmail && !date) {
            result = await history.getHistoryByEmail(userEmail);
        } else if (userEmail && date) {
            result = await history.getHistoryByDateAndEmail(userEmail, date.dateStart, date.dateEnd);
        } else if (!userEmail && date) {
            result = await history.getHistoryByDate(date.dateStart, date.dateEnd);
        }

        setHistoryData(result?.data);
        setLastVisibleDoc(result?.lastVisible);
    }

    const loadMore = async () => {
        if (lastVisibleDoc) {
            const result = await history.loadMore(
                lastVisibleDoc
            );

            if (historyData) {
                setHistoryData([
                    ...historyData,
                    ...result?.data
                ]);
            } else {
                setHistoryData([
                    ...result?.data
                ]);
            }

            setLastVisibleDoc(result?.lastVisible);
        }
    }

    const onSelectChange = async (event: ChangeEvent<HTMLSelectElement>) => {
        const result = await history.getHistory(
            event.target.value === "desc" ? "desc" : "asc"
        );

        setHistoryData(result?.data);
        setLastVisibleDoc(result?.lastVisible);
    }

    return (
        <NavigationWrapper path="history">
            <div
                className={styles['history-root']}
            >
                <div className={styles['history-content']}>
                    <HistoryHeader 
                        userEmail={userEmail}
                        setUserEmail={setUserEmail}
                        getHistoryWithProps={getHistoryWithProps}
                    />
                    <div className={styles['history-list']}>
                        <select 
                            className={styles['history-order-select']}
                            onChange={(event) => onSelectChange(event)}
                        >
                            <option value="desc">Сначала новые</option>
                            <option value="asc">Сначала старые</option>
                        </select>
                        {
                            historyData ? historyData.map((item: any) => {
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
                        <button
                            className={styles['history__load-more']}
                            onClick={loadMore}
                        >
                            Показать больше
                        </button>
                    </div>
                </div>
            </div>   
        </NavigationWrapper>
    )
}
