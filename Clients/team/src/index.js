import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Aanmelden from './modules/aanmelden'
import Kwiz from './modules/kwiz'
import App from './modules/App'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/team" component={App}>
            <IndexRoute component={Aanmelden}/>
            <Route path="/team/kwiz" component={Kwiz}/>
        </Route>
    </Router>,
  document.getElementById('root')
);
