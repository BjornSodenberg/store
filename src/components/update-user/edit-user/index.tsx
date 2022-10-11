import { useEffect, useState } from 'react';
import cn from 'classnames';

import CircularProgress from '@mui/material/CircularProgress';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { UiInput } from 'uikit/UiInput';

import { LemonIcom, DiamondIcon } from 'uikit/icons';
import Comment from '@mui/icons-material/Comment';
import PersonIcon from '@mui/icons-material/Person';

import { writeToHistory } from 'utils/firebase';
import { getHistoryByEmail } from 'utils/firebase';
import { updateEmployer } from 'store/users/reducers';

import { User } from '../types';

import './styles.css'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AnalyticsSender } from 'utils/analytics';
import { RootState } from 'store';

type Props = {
    user: User;
    updateUser: (upd: User) => void;
}

const EditUserForm = (props: Props) => {
    const { user } = props;
    const analyticsSender = new AnalyticsSender();

    const dispatch = useDispatch();
    const [lemons, setLemons] = useState<string>('');
    const [comment, setComment] = useState<string>('');
    const [diamonds, setDiamonds] = useState<string>();
    const [error, setError] = useState<string>('');
    const [activeType, setType]  = useState<string>('lemons');
    const [historyData, setHistory] = useState<any>();
    const [isLoading, setLoading] = useState<boolean>();
    const [sendEmail, setSendEmail] = useState<boolean>(false);
    const admin = useSelector((state: RootState) => state.admin);

    useEffect(() => {
        async function history () {
            setLoading(true);
            let result;
            try {
                result = await getHistoryByEmail(user.email, "desc", 3);
            } catch(e) {
                console.log(e)
            }
            setHistory(result);
            setLoading(false);
        }

        history();
    }, [user]);

    const updateLemons = (e: any) => {
        e.preventDefault();
        if (!comment && !lemons) {
            setError('Введите количество лимонов и комментарий');
            return;
        }

        if (!lemons) {
            setError('Введите число');
            return;
        }

        if (!comment) {
            setError('Введите комментарий');
            return;
        }

        const newValue = lemons ? user.lemons + parseInt(lemons): user.lemons;
        if (newValue < 0) {
            setError('У пользователя нет столько лимонов');
            return;
        } else {
            let upd = {...user, lemons: newValue};
            dispatch(updateEmployer(upd));
            props.updateUser(upd);
            writeToHistory(
                lemons,
                admin.email,
                user.email,
                parseInt(lemons) > 0 ? 'increase' : 'decrease',
                'lemons',
                comment
            );
            if (parseInt(lemons) > 0){
                analyticsSender.sendAccrualLenons(parseInt(lemons))
            } else {
                analyticsSender.sendSpendingLemons(parseInt(lemons))
            }
            setError('');
            setLemons('');
        }

        if (sendEmail) {
            sendNotification();
        }
    }

    const updateDiamonds = () => {
        if (!diamonds) {
            setError('Введите число');
            return;
        }
        const upd: User = user;
        const newValue = diamonds ? user.diamonds + parseInt(diamonds): user.diamonds;
        if (newValue < 0) {
            setError('У пользователя нет столько алмазов');
            return;
        } else {
            upd.diamonds = newValue;
            dispatch(updateEmployer(upd));
            props.updateUser(upd);
            writeToHistory(
                diamonds,
                admin.email,
                user.email,
                parseInt(lemons) > 0 ? 'increase' : 'decrease',
                'diamonds',
                comment
            );
            if (parseInt(diamonds) > 0) {
                analyticsSender.sendAccrualDiamons(parseInt(diamonds));
            } else {
                analyticsSender.sendSpendingDiamons(parseInt(diamonds));
            }
            setError('');
            setDiamonds('');
        }

        if (sendEmail) {
            sendNotification();
        }
    }

    const sendNotification = () => {
        const mailto = `mailto:${user.email}?subject=Testing out mailto!&body=${comment}`;
        window.location.href = mailto;
    }

    const RenderItem = () => {
        if (!historyData) {
            return (
                <p>Последних операций нет</p>
            )
        }
        return (
            <div>
                <ul>
                    {
                        historyData.map((item: any) => (
                            <li className='transaction-item' id='first'>           
                                <div>
                                    <LemonIcom 
                                        sx={{fontSize:"small"}}
                                        className={
                                            cn(
                                                item.count > 0 ? 'lemons-icon-t': 'lemons-icon-t-n',
                                            )
                                        }
                                    />
                                    <span className={
                                        cn(
                                            item.count > 0 ? 'lemons-icon-t': 'lemons-icon-t-n',
                                        )
                                    }>{item.count}</span>
                                    <span className='lemons-comment-t'>{item.comment}</span>
                                </div>
                                <span className='transaction-date'>{item.created}</span>
                            </li>
                        ))
                    }
                </ul>
                <Link
                    to={`/history/?email=${user.email}`}
                >
                    <button 
                        className="show-more"
                    >
                        Показать больше
                    </button>
                </Link>
            </div>
        )
        
    }   

    return (
        <div className='user'>
            <div className='user-info'>
                <h3 className='user-info-header'>
                    <PersonIcon sx={{marginRight: '8px'}}/>
                    {user?.email.split('@')[0].toUpperCase()}
                </h3>
                <div className='balance'>
                    <div className='lemons-container'>
                        <LemonIcom className="lemons-icon-info"/><span className='lemons-text-info'> {user?.lemons}</span>
                        {
                            lemons && (
                                parseInt(lemons) > 0 ? <span className='l-info positive'> +{lemons}</span> : <span className='l-info negative'> {lemons}</span>
                            )
                        }
                    </div>
                    <div className='diamonds-container'>
                        <DiamondIcon className='diamonds-icon-info'/>
                        <span className='diamonds-text-info'> {user?.diamonds}</span>
                        {
                            diamonds && (
                                parseInt(diamonds) > 0 ? <span className='l-info positive'> +{diamonds}</span> : <span className='l-info negative'> {diamonds}</span>
                            )
                        }
                    </div>
                </div>
                <div className='last-transactions'>
                    <h3>Последние транзакции</h3>
                    {
                        isLoading ? 
                            <CircularProgress /> :
                            <RenderItem />
                    }
                </div>
                
            </div>
            <div className='user-wallet'>
                
                <div className='transactions-type'>
                    <LemonIcom 
                        className={activeType === 'lemons' ? 'transactions-type-item active-item': 'transactions-type-item'}
                        onClick={() => setType('lemons')}
                    />
                    <DiamondIcon 
                        className={activeType === 'diamonds' ? 'transactions-type-item active-item': 'transactions-type-item'}
                        onClick={() => setType('diamonds')}
                    />
                </div>
                <div className='transactions-form'>
                    {
                        activeType === 'lemons' ? (
                            <div>
                                <h2 className='user-wallet-header'>Операции с лимонами</h2>
                                <p className='description'>
                                    Здесь вы можете производить начисление или вычитание <span>лимонов</span> у сотрудника.
                                </p>
                                <form onSubmit={updateLemons} className="user-wallet-form">
                                    <UiInput
                                        icon={<LemonIcom />}
                                        type="number"
                                        placeholder="100"
                                        onChange={setLemons}
                                        value={lemons || ''}
                                        tooltipText="Отрицательное число для вычитания, положительное для добавления."
                                    />
                                    <UiInput
                                        icon={<Comment />}
                                        type="text"
                                        list="suggestions"
                                        placeholder="Покупка в магазине мерча"
                                        value={comment}
                                        onChange={setComment}
                                        tooltipText="Краткое и ёмкое описание транзакции для отображения в истории."
                                    />
                                    <FormControlLabel
                                        sx={{
                                            marginBottom: '14px',
                                            color: '#F4B73F'
                                        }}
                                        control={
                                            <Checkbox 
                                                sx={{
                                                    color: '#F4B73F',
                                                    '&.Mui-checked': {
                                                        color: '#F4B73F',
                                                    },
                                                  }}
                                                checked={sendEmail}
                                                onChange={() => setSendEmail(!sendEmail)}
                                            />
                                        } 
                                        label="Уведомить о начислении" 
                                    />
                                    <button type='submit' className='wallet-button'>Отправить</button>
                                </form>
                            </div>
                        ) : (
                            <div>
                                <h2 className='user-wallet-header'>Операции с алмазами</h2>
                                <p className='description'>
                                    Здесь вы можете производить начисление или вычитание <span>алмазов</span> у сотрудника.
                                </p>
                                <form onSubmit={updateLemons} className="user-wallet-form">
                                    <UiInput
                                        icon={<DiamondIcon />}
                                        type="number"
                                        placeholder="100"
                                        onChange={setDiamonds}
                                        value={diamonds || ''}
                                        tooltipText="Отрицательное число для вычитания, положительное для добавления."
                                    />
                                    <UiInput
                                        icon={<Comment />}
                                        type="text"
                                        list="suggestions"
                                        placeholder="Покупка в магазине мерча"
                                        value={comment}
                                        onChange={setComment}
                                        tooltipText="Краткое и ёмкое описание транзакции для отображения в истории."
                                    />
                                    <FormControlLabel
                                        sx={{
                                            marginBottom: '14px',
                                            color: '#F4B73F'
                                        }}
                                        control={
                                            <Checkbox 
                                                sx={{
                                                    color: '#F4B73F',
                                                    '&.Mui-checked': {
                                                        color: '#F4B73F',
                                                    },
                                                  }}
                                                checked={sendEmail}
                                                onChange={() => setSendEmail(!sendEmail)}
                                            />
                                        } 
                                        label="Уведомить о начислении" 
                                    />
                                    <button onClick={updateDiamonds} className='wallet-button'>Отправить</button>
                                </form>
                            </div>
                        )
                    }
                    {
                        error && (
                            <p className='error'>{error}</p>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default EditUserForm;
