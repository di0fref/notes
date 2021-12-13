import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-quill/dist/quill.bubble.css';
import './index.css';
// import "./print.css"
import App from './App';

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root'),
);