import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import kwizstarten from './modules/kwizstarten'
import teamsaccepteren from './modules/teamsaccepteren'
import { Router, Route, browserHistory } from 'react-router'

ReactDOM.render(
    // <App />,
  <Router history={browserHistory}>
    <Route path="/" component={App}/>
      <Route path="/kwizmeestert" component={App}/>
    <Route path="/kwizmeestert/kwizstarten" component={kwizstarten}/>
    <Route path="/kwizmeestert/teamsaccepteren" component={teamsaccepteren}/>
  </Router>,
  document.getElementById('root')
);