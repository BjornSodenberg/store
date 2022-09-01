import React from 'react';
import ReactDOM from 'react-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { store,persistor } from './store'
import { Provider } from 'react-redux'
import reportWebVitals from 'reportWebVitals';
import App from './app';
import './index.css'

ReactDOM.render(
  <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
