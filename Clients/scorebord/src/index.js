import React from 'react';
import ReactDOM from 'react-dom';
import App from './modules/App';
import './index.css';
import InlogScherm from './modules/inlogScherm'
import VoorafKwiz from './modules/voorafKwiz'
import AchterafKwiz from './modules/achterafKwiz'
import BeoordelingVraag from './modules/beoordelingVraag'
import ActieveVraag from './modules/actieveVraag'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/scorebord" component={App}>
            <IndexRoute component={InlogScherm}/>
            <Route path="/scorebord/voorafKwiz" component={VoorafKwiz}/>
            <Route path="/scorebord/achterafKwiz" component={AchterafKwiz}/>
            <Route path="/scorebord/beoordelingVraag" component={BeoordelingVraag}/>
            <Route path="/scorebord/actieveVraag" component={ActieveVraag}/>
        </Route>
    </Router>,
    document.getElementById('root')
);
