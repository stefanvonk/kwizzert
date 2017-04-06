import React from 'react'
import './../App.css';
import { Button, FormControl } from 'react-bootstrap';
import { browserHistory } from 'react-router';

var socketKwizmeestert = new WebSocket("ws:localhost:3000/");
socketKwizmeestert.onopen = function (event) {};

var teams = {
    teamnamen: ["team1"]
};

socketKwizmeestert.onmessage = function incoming(message) {
    var data = JSON.parse(message.data);
    if(data.type === "teamaangemeld") {
        teams.teamnamen.push(data.teamnaam);
    }
};

class Teamsaccepteren extends React.Component {
    constructor(props) {
        super(props);
        console.log(teams);
        this.setState = {
            teams
        };
        console.log(this.state);
    }



    handleClick() {
        // socketKwizmeestert.send(JSON.stringify(data));
        // console.log("het werkt");
        // teams.teamnamen.push("team2");
        // this.setState(function() {
        //     return {
        //         teams
        //     };
        // });
        // console.log(this.state);
    }

    render() {
        return (
            <div className="App">
                <h1>Teams</h1>
                {this.state}
                <Button bsStyle="primary" onClick={(e) => this.handleClick(e)}>Starten</Button>
            </div>
        );
    }
}

module.exports = Teamsaccepteren;

