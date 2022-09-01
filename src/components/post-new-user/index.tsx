import { useState } from "react";
import { UiInput } from "uikit/UiInput";

import { postNewUser } from '../../utils/firebase';
import { isEmail } from "../../utils/is-email";
import NavigationWrapper from "../wrapper";
import PersonIcon from '@mui/icons-material/Person';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

import './styles.css'
import { Link } from "react-router-dom";

type Response = {
    code: number;
    message: string;
}

const PostForm = () => {
    const [value, setValue] = useState<string>('');
    const [status, setStatus] = useState<Response>();
    const [loading, setLoading] = useState<boolean>(false);

    const onSubmit = async () => {
        if (value) {
            if (!isEmail(value)) {
                setStatus({
                    code: 0,
                    message: 'Введите корректный email'
                });
                return;
            }
            setLoading(true);
            const result = await postNewUser(value);
            setLoading(false);
            setStatus(result);
        }
    }
    
    return (
        <NavigationWrapper path="add">
            <div className="new-user-wrapper">
                <div className="new-user-input">
                    <h1>Новый сотрудник</h1>
                    <div className="new-user__form">
                        <UiInput 
                            icon={<PersonIcon />}
                            onChange={setValue}
                            value={value}
                            placeholder="steve@jobs.com"
                            type="email"
                        />
                        <button 
                            type="button" 
                            onClick={onSubmit}
                            className="new-user-submit"
                            disabled={loading}
                        >
                            Записать
                        </button>
                    </div>
                    
                    {
                        status && (
                            status.code === 200 ? (
                                <p className="positive">
                                    Сотрудник {' '} 
                                    <Link 
                                        to={`/user-wallet/?email=${value}`}
                                        className="new-user__user-email"
                                    >
                                        {value}
                                    </Link>  {' '}
                                    успешно добавлен.
                                </p>
                            ) : (
                                <p className="negative">{status.message}</p>
                            )
                        )
                    }
                </div>
                
            </div>
        </NavigationWrapper>
    )
}

export default PostForm;
