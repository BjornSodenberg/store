import NavigationWrapper from '../components/wrapper';
import './styles.css'

function App() {
    return (
        <NavigationWrapper path="/">
            <div className='main-content'>
                <h1>Зарплата.store</h1>
                <p>Выберите операцию в меню слева</p>
            </div>
        </NavigationWrapper>
    );
}

export default App;
