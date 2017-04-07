import React from 'react'
import { Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';

class Rondestarten extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teams: []
        };

        this.props.webSocket.onopen = function (event) {};
    }

    render() {
        return (
            <div className="App">
                <h1>Ronde</h1>
                <div>
                </div>
                <br />
                <Button bsStyle="primary" onClick={() => this.startButton()}>Ronde starten</Button>
            </div>
        );
    }
}

module.exports = Rondestarten;