import React from 'react'

var socketKwizmeestert = new WebSocket("ws:localhost:3000/", "protocolOne");
socketKwizmeestert.onopen = function (event) {};

var data = {
    type: "startkwizavond",
    code: ""
};

export default React.createClass({
    onChangeCode() {
        this.setState({typed: event.target.value});
    },

    handleClick() {
        data.code = this.state.typed;
        if(this.state.typed != ''){
            socketKwizmeestert.send(JSON.stringify(data));
        }
    },

    render() {
        return (
            <div className="kwizstarten">
                <h1>Kwizavond starten</h1>
                <input type="text" onChange= {(e) => this.onChangeCode(e)}/>
                <button onClick={(e) => this.handleClick(e)}>Starten</button>
            </div>
        );
    }
})