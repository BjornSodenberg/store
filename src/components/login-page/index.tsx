import { UiInput } from "uikit/UiInput";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PasswordIcon from '@mui/icons-material/Password';
import { useState } from "react";
import { adminLogin } from 'store/admin';
import { getAuth, signInWithEmailAndPassword} from '@firebase/auth';
import { useCookies } from 'react-cookie';

import './styles.css'
import { useDispatch } from "react-redux";

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const [cookies, setCookie, removeCookie] = useCookies(['auth-token']);


    const onSubmit = () => {
        const auth = getAuth();
        signInWithEmailAndPassword(
            auth, email, password
        ).then(
            (data) => {
                dispatch(adminLogin(email));
                data.user.getIdToken().then(
                    (data) => {
                        setCookie("auth-token", data);
                    }
                )
            }
        );
    }

    return (
        <div className="login__main">
            <div className="login__content">
                <h1>Вход</h1>
                <UiInput
                    type="email"
                    onChange={setEmail}
                    value={email}
                    icon={<AlternateEmailIcon />}
                />
                <UiInput
                    type="password"
                    onChange={setPassword}
                    value={password}
                    icon={<PasswordIcon />}
                />
                <button onClick={onSubmit} className="login__submit">
                    Войти
                </button>
            </div>
        </div>
    )
}
