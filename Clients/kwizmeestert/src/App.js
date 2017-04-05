import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Link} from 'react-router'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
          <button onClick={maakVerbinding("startkwiz")}>
              Activeer socket
          </button>
          <p>
              <Link to="/kwizmeestert/kwizstarten">Start kwiz</Link>
          </p>
      </div>
    );
  }
}

export default App;

function maakVerbinding(tekst) {
    var exampleSocket = new WebSocket("ws:localhost:3000/", "protocolOne");
    exampleSocket.onopen = function (event) {
        exampleSocket.send(tekst);
    };
}