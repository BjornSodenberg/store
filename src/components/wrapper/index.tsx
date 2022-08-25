import Header from '../header';
import Menu from '../menu';
import './styles.css';

type Props = {
    children: React.ReactNode;
    path: string;
}

const NavigationWrapper = (props: Props) => {
    return (
        <div>
            <Header />
            <div className='wrapper'>
                
                <div className='left-menu'>
                    <Menu clickedItem={props.path}/> 
                </div>
                <div className='right-content'>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default NavigationWrapper;
