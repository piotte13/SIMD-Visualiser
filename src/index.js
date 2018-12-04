import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import {HashRouter, Switch, Route} from "react-router-dom";

ReactDOM.render(
    <HashRouter basename={process.env.PUBLIC_URL}>
        <Switch>
            <Route exact path='/' component={App}/>
            <Route path='/link/:code' component={App}/>
        </Switch>
    </HashRouter>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
