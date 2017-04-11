import React, { Component } from 'react';
import './../App.css';

const webSocket = new WebSocket("ws:localhost:3000/");

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            webSocket: webSocket,
            melding: "",
            gesteldeVragen: 0
        }
    }

    onMeldingChange(melding) {
        this.setState({
            melding: melding
        });
    }

    onGesteldeVragenChange() {
        this.state.gesteldeVragen++;
        this.setState({
            gesteldeVragen: this.state.gesteldeVragen
        });
    }

    render() {
        const { children } = this.props;
        return (
            <div>
                { children && React.cloneElement(children, { webSocket:this.state.webSocket,  melding: this.state.melding, gesteldeVragen:this.state.gesteldeVragen, onMeldingChange: this.onMeldingChange.bind(this), onGesteldeVragenChange: this.onGesteldeVragenChange.bind(this) }) }
            </div>
        )
    }
}

export default App;
