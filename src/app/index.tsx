import NavigationWrapper from '../components/wrapper';
import styles from './styles.module.css';

function App() {
    // await writeToHistory('11', 'yu.ognev@zarplata.ru','e.karabantseva@zarplata.ru', 'increase', 'lemon');
    return (
        <div>
            <NavigationWrapper path="/">
                <div className={styles.mainContent}>
                    <div className={styles.small}></div>
                    <div className={styles.small}></div>
                    <div className={styles.small}></div>
                    <div className={styles.small}></div>
                </div>
            </NavigationWrapper>
        </div>
        
    );
}

export default App;
