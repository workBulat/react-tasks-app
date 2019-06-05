import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Add from './Add';
import Login from './Login';
import Edit from './Edit';
import Header from './Header';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import {reducer} from './store';


import thunk from 'redux-thunk';

const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Header />
            <Route path="/" exact component={App} />
            <Route path="/add/" component={Add} />
            <Route path="/login/" component={Login} />
            <Route path="/edit/" component={Edit} />
        </Router>
    </Provider>,
    document.getElementById('root')
);