import { Link } from 'react-router-dom';
import './styles.css'

type Props = {
    label: string;
    icon: string;
    to: string;
    onClicked: boolean;
}

const MenuItem = (props: Props) => {
    return (
        <li className={props.onClicked ? 'menu-item visit' : 'menu-item'}>
            <Link to={props.to} className='link'>
                <div className='link-wrapper'>
                    <img src={props.icon} alt={props.icon} className='link-icon'/>
                    <span className='link-label'>{props.label}</span>
                </div>
            </Link>
        </li>
    )
}

export default MenuItem;
