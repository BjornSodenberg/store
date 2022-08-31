import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import NavigationWrapper from '../components/wrapper';
import { LemonIcom, DiamondIcon } from 'uikit/icons';
import PersonIcon from '@mui/icons-material/Person';
import { fetchEmployess } from 'store/users/reducers';
import styles from './styles.module.css';
import cn from 'classnames';
import { useEffect } from 'react';

function App() {
    const {totalLemons, totalDiamonds, totalEmployees} = useSelector((state: RootState) => state.employees);
    const dispatch = useDispatch();
    useEffect(() => {
        // @ts-ignore
        dispatch(fetchEmployess());
    }, []);
    return (
        <div>
            <NavigationWrapper path="/">
                <div className={styles.mainContent}>
                    <div className={styles.medium}>
                        <h3 className={styles.title}>Карточка статистики</h3>
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
                    <div className={styles.small}>
                        
                    </div>
                    <div className={styles.small}></div>
                    <div className={styles.small}></div>
                </div>
            </NavigationWrapper>
        </div>
        
    );
}

export default App;
