import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-quill/dist/quill.bubble.css';
import './index.css';
import "./print.css"
import App from './App';
import { Provider } from 'react-redux';

ReactDOM.render(
    <BrowserRouter>

        {/*<Auth0Provider*/}
        {/*    domain={process.env.REACT_APP_AUTH0_DOMAIN}*/}
        {/*    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}*/}
        {/*    redirectUri={window.location.origin}*/}
        {/*    cacheLocation="localstorage">*/}
            <App/>
        {/*</Auth0Provider>*/}
    </BrowserRouter>,
    document.getElementById('root'),
);
