import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Kwizstarten from './modules/kwizstarten'
import App from './modules/App'
import Teamsaccepteren from './modules/teamsaccepteren'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

ReactDOM.render(
      <Router history={browserHistory}>
        <Route path="/kwizmeestert/" component={App}>
          <IndexRoute component={Kwizstarten}/>
          <Route path="/kwizmeestert/teamsaccepteren" component={Teamsaccepteren}/>
        </Route>
      </Router>,
  document.getElementById('root')
);