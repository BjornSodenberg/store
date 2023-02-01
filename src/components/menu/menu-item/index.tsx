import { Link } from 'react-router-dom';
import './styles.css'

type Props = {
    label: string;
    icon: any;
    to: string;
    onClicked: boolean;
}

const MenuItem = (props: Props) => {
    return (
        <li className={props.onClicked ? 'menu-item visit' : 'menu-item'}>
            <Link to={props.to} className='link'>
                <div className='link-wrapper'>
                    <props.icon sx={{ color: props.onClicked ? '#000': '#A9A6BD' }}></props.icon>
                    <span className='link-label'>{props.label}</span>
                </div>
            </Link>
        </li>
    )
}

export default MenuItem;
