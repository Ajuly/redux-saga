import React from 'react';
import Login from './components/Login';
import Logout from './components/Logout';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';
import store from './store';

import { Route,Redirect,Switch} from 'react-router-dom'

import { ConnectedRouter} from 'react-router-redux'
import createHistory from 'history/createHashHistory'
const history = createHistory();
ReactDOM.render((
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/logout" component={Logout}/>
                <Redirect to="/login"/>
            </Switch>
        </ConnectedRouter>
    </Provider>
),document.querySelector('#root'));