import React from 'react'
import './../App.css';
import { Button } from 'react-bootstrap';

const socketKwizmeestert = new WebSocket("ws:localhost:3000/");
socketKwizmeestert.onopen = function (event) {};

var data = {
    type: "teamgeaccepteerd",
    teamnaam: "",
    geaccepteerd: true
};

class TeamsaccepterenTeam extends React.Component {
    teamAccepteren(teamnaam){
        data.teamnaam = teamnaam;
        data.geaccepteerd = true;
        console.log(data);
        socketKwizmeestert.send(JSON.stringify(data));
    }

    teamWeigeren(teamnaam){
        data.teamnaam = teamnaam;
        data.geaccepteerd = false;
        console.log(data);
        socketKwizmeestert.send(JSON.stringify(data));
    }

    render() {
        return (
            <div>
                <h2>{this.props.text}</h2>
                <Button bsStyle="Success" onClick={() => this.teamAccepteren(this.props.text)}>Accepteren</Button>
                <Button bsStyle="Danger" onClick={() => this.teamWeigeren(this.props.text)}>Weigeren</Button>
            </div>
        );
    }
}

module.exports = TeamsaccepterenTeam;