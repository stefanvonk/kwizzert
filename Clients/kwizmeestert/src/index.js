import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import kwizstarten from './modules/kwizstarten'
import teamsaccepteren from './modules/teamsaccepteren'
import { Router, Route, browserHistory } from 'react-router'

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/kwizmeestert/" component={kwizstarten}/>
    <Route path="/kwizmeestert/teamsaccepteren" component={teamsaccepteren}/>
  </Router>,
  document.getElementById('root')
);


