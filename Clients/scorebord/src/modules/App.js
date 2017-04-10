import React, { Component } from 'react';
import './App.css';

const webSocket = new WebSocket("ws:localhost:3000/");

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            webSocket: webSocket,
            code: ""
        }
    }

    onCodeChange(code) {
        this.setState({
            code: code
        });
    }

    render() {
        const { children } = this.props
        return (
            <div>
                { children && React.cloneElement(children, { webSocket:this.state.webSocket, code:this.state.code, onCodeChange:this.onCodeChange.bind(this)}) }
            </div>
        )
    }
}

export default App;
