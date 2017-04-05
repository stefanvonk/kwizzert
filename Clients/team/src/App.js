import React, { Component } from 'react';
import './App.css';
import { Button } from 'react-bootstrap'

class App extends Component {
  render() {
    return (
      <div className="App">
          <h1>Welkom bij de Kwizzert!!!</h1>
          <h3>Voer de code in die je van je kwizmeestert krijgt.</h3>
          <Button bsStyle="primary">Primary</Button>
      </div>
    );
  }
}

export default App;
