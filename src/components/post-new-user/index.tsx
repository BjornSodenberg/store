import { useState } from "react";

import { postNewUser } from '../../utils/firebase';
import { isEmail } from "../../utils/is-email";
import NavigationWrapper from "../wrapper";

import './styles.css'

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
            setValue('');
        }
    }
    
    return (
        <NavigationWrapper path="add">
            <div className="new-user-wrapper">
                <h1>Новый сотрудник</h1>
                <div className="new-user-input">
                    <input 
                        type="email" 
                        onChange={(e) => setValue(e.target.value)}
                        className="new-user-input"
                        value={value}
                        placeholder="steve@jobs.com"
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
                            <p className="positive">{status.message}</p>
                        ) : (
                            <p className="negative">{status.message}</p>
                        )
                    )
                }
            </div>
        </NavigationWrapper>
    )
}

export default PostForm;
