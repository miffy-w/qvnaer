import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from "../serviceWorker";
import 'normalize.css/normalize.css';
import store from './store/store';
import './index.css';
import App from './App.jsx';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

if(process.env.NODE_ENV === 'production'){
    serviceWorker.register();
}else{
    serviceWorker.unregister();
}