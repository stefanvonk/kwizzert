import React from 'react'
import './../App.css';
import { Button, FormControl } from 'react-bootstrap';
import { browserHistory } from 'react-router';

var socketKwizmeestert = new WebSocket("ws:localhost:3000/");
socketKwizmeestert.onopen = function (event) {};

var teams = {
    teamnamen: ["team1", "team2", "team3"]
};

var data = {
    type: "teamgeaccepteerd",
    teamnaam: "",
    geaccepteerd: true
};

class Teamsaccepteren extends React.Component {
    constructor(props) {
        super(props);
        this.state = {teams};
        var geselecteerdteam = {
            type: "teamgeaccepteerd",
            teamnaam: "",
            geaccepteerd: true
        };
    }

    componentDidMount() {
        socketKwizmeestert.onmessage = function incoming(message) {
            var data = JSON.parse(message.data);
            if(data.type === "teamaangemeld") {
                teams.teamnamen.push(data.teamnaam);
                var huidigitem = teams.teamnamen.length;

                var titel = document.createElement("H2");
                var textnode = document.createTextNode(teams.teamnamen[huidigitem]);
                titel.appendChild(textnode);
                document.getElementById("teams").appendChild(titel);

                var button1 = document.createElement("Button");
                button1.className = "Success";
                button1.onclick = (e) => this.teamAccepteren(e, teams.teamnamen[huidigitem]);
                var textnode = document.createTextNode("Accepteren");
                button1.appendChild(textnode);
                document.getElementById("teams").appendChild(button1);

                var button2 = document.createElement("Button");
                button2.className = "Danger";
                button2.onclick = (e) => this.teamWeigeren(e, teams.teamnamen[huidigitem]);
                var textnode = document.createTextNode("Weigeren");
                button2.appendChild(textnode);
                document.getElementById("teams").appendChild(button2);
            }
        };
        this.setState(teams);
    }

    componentWillUnmount() {

    }

    startButton() {
        teams.teamnamen.push("team2");
        this.setState(teams.teamnamen);

        // socketKwizmeestert.send(JSON.stringify(data));
    }

    teamAccepteren(item){
        console.log("teamAccepteren");
        data.teamnaam = item;
        socketKwizmeestert.send(JSON.stringify(data));
    }

    teamWeigeren(item){
        console.log("teamAccepteren");
        data.teamnaam = item;
        data.geaccepteerd = false;
        socketKwizmeestert.send(JSON.stringify(data));
    }

    render() {
        return (
            <div className="App">
                <h1>Teams</h1>
                <div id="teams">
                </div>
                <Button bsStyle="primary" onClick={(e) => this.startButton(e)}>Starten</Button>
            </div>
        );
    }
}

module.exports = Teamsaccepteren;