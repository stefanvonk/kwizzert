import React from 'react'
import './../App.css';
import { Button, FormControl } from 'react-bootstrap';
import { browserHistory } from 'react-router';

var teams = {
    teamnamen: ["team1", "team2", "team3"]
};

class Teamsaccepteren extends React.Component {
    constructor(props) {
        super(props);
        this.state = {teams};
    }

    componentDidMount() {
        var socketKwizmeestert = new WebSocket("ws:localhost:3000/");
        socketKwizmeestert.onopen = function (event) {};

        socketKwizmeestert.onmessage = function incoming(message) {
            var data = JSON.parse(message.data);
            if(data.type === "teamaangemeld") {
                teams.teamnamen.push(data.teamnaam);
            }
        };
        this.setState(teams);
    }

    componentWillUnmount() {

    }

    startButton() {
        teams.teamnamen.push("team2");
        this.setState(teams.teamnamen);
    }

    teamAccepteren(){

        // socketKwizmeestert.send(JSON.stringify(data));
    }

    teamWeigeren(){

        // socketKwizmeestert.send(JSON.stringify(data));
    }

    render() {
        var teamtoevoegen = function() {
            var button1 = JSON.stringify(<Button bsStyle="Success" onClick={(e) => this.teamAccepteren(e)}>Starten</Button>);
            var button2 = JSON.stringify(<Button bsStyle="Danger" onClick={(e) => this.teamWeigeren(e)}>Starten</Button>);
            return "<div><h2>" + "</h2>" + button1 + button2 + "</div>";
        };

        var teamToevoegen = function() {
            console.log("test1");
            this.state.teams.teamnamen.forEach(function (teams123) {
                console.log("test1");
                return "<h2>" + teams123 + "</h2>";
            });
            console.log("test3");
        };

        return (
            <div className="App">
                <h1>Teams</h1>
                {this.state.teams.teamnamen}
                {teamToevoegen}
                <Button bsStyle="primary" onClick={(e) => this.startButton(e)}>Starten</Button>
            </div>
        );
    }
}

module.exports = Teamsaccepteren;