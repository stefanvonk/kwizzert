import React from 'react';
import './../App.css';
import { Button, FormControl } from 'react-bootstrap';

var socketKwizmeestert = new WebSocket("ws:localhost:3000/", "protocolOne");
socketKwizmeestert.onopen = function (event) {};

var data = {
    type: "startkwizavond",
    code: ""
};

socketKwizmeestert.onmessage = function incoming(message) {
    var data = JSON.parse(message.data);
    if(data.type === "kwizavondgestart") {
        console.log("We zitten in de if")
    }
};

export default React.createClass({
    onChangeCode() {
        this.setState({typed: event.target.value});
    },

    handleClick() {
        data.code = this.state.typed;
        if (this.state.typed != '') {
            socketKwizmeestert.send(JSON.stringify(data));
        }
    },

    render() {
        return (
            <div className="App">
                <h1>Kwizavond starten</h1>
                <FormControl className="width80" type="text" onChange= {(e) => this.onChangeCode(e)}/>
                <Button bsStyle="primary" onClick={(e) => this.handleClick(e)}>Starten</Button>
            </div>
        );
    }
})