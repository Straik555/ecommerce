//Core
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'

//Redux
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {store, persistors} from './store';

//Component
import App from './App';

//Style
import "antd/dist/antd.css"

ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persistors}>
            <Router>
                <App />
            </Router>
        </PersistGate>
    </Provider>,
  document.getElementById('root')
);


