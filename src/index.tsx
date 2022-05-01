import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import './index.css';
import App from './app';
import UpdateUserForm from './components/update-user';
import reportWebVitals from './reportWebVitals';
import PostForm from './components/post-new-user';
import DeleteUser from './components/delete-user';

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="user-wallet" element={<UpdateUserForm />} />
            <Route path="create-new-user" element={<PostForm />} />
            <Route path="delete-user" element={<DeleteUser />} />
        </Routes>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
