import React, { Component } from 'react';
import './../App.css';
import { browserHistory } from 'react-router';

const webSocket = new WebSocket("ws:localhost:3000/");

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            webSocket: webSocket,
            melding: ""
        }
    }

    onMeldingChange(melding) {
        this.setState({
            melding: melding
        });
    }

    render() {
        const { children } = this.props;
        return (
            <div>
                { children && React.cloneElement(children, { webSocket:this.state.webSocket, melding: this.state.melding, onMeldingChange: this.onMeldingChange.bind(this) }) }
            </div>
        )
    }
}

export default App;
