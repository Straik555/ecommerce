//Core
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'

//Component
import App from './App';

//Style
import "antd/dist/antd.css"

ReactDOM.render(
    <Router>
        <App />
    </Router>,
  document.getElementById('root')
);


