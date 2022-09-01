import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Main from 'pages/main';
import UpdateUserForm from 'components/update-user';
import PostForm from 'components/post-new-user';
import DeleteUser from 'components/delete-user';
import TransferPage from 'components/transfer-lemons';
import {History} from 'components/history';
import { Login } from 'components/login-page';
import { useSelector } from "react-redux";
import { RootState } from "store";
import './styles.css';
import { useCookies } from "react-cookie";

function App() {
    const isLogin = useSelector((state: RootState) => state.admin.isLogin);
    const [cookies] = useCookies(['auth-token']);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    isLogin || cookies["auth-token"] ? <Main /> : <Login />
                } />
                <Route path="user-wallet" element={<UpdateUserForm />} />
                <Route path="create-new-user" element={<PostForm />} />
                <Route path="delete-user" element={<DeleteUser />} />
                <Route path="transfer" element={<TransferPage />} />
                <Route path="history" element={<History />} />
                <Route path="login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
