import React, { Component } from 'react';
import './App.css';

const webSocket = new WebSocket("ws:localhost:3000/");

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            webSocket: webSocket,
        }
    }

    componentDidMount(){
        let that = this;
        webSocket.onmessage = function incoming(message) {
            let data = JSON.parse(message.data);
            if(data.Type === "...") {
                //DoeIets
            }
        };
    }

    render() {
        const { children } = this.props
        return (
            <div>
                { children && React.cloneElement(children, { webSocket:this.state.webSocket}) }
            </div>
        )
    }
}

export default App;
