import React from 'react'
import './../App.css';
import { Button } from 'react-bootstrap';
// import { browserHistory } from 'react-router';

import TeamsaccepterenTeam from './teamsaccepterenTeam';

const socketKwizmeestert = new WebSocket("ws:localhost:3000/");
socketKwizmeestert.onopen = function (event) {};

class Teamsaccepteren extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teams: ["team1"]
        };
    }

    componentDidMount() {
        var that = this;
        socketKwizmeestert.onmessage = function incoming(message) {
            var data = JSON.parse(message.data);
            if(data.type === "teamaangemeld") {
                that.state.teams.push(message.teamnaam);
                that.setState({
                    teams: this.that.state.teams
                });
            }
        };
    }

    startButton() {
        if(this.state.teams.length >= 2) {
            var data = {
                type: "startkwiz"
            };
            socketKwizmeestert.send(JSON.stringify(data));
        }else {
            console.log("Er moeten zich minimaal 2 teams aanmelden.");
        }
    }

    render() {
        return (
            <div className="App">
                <h1>Teams</h1>
                <div>
                    {this.state.teams.map((item, index) =>
                        <div>
                            <TeamsaccepterenTeam text={item}/>
                        </div>
                    )}
                </div>
                <br />
                <Button bsStyle="primary" onClick={() => this.startButton()}>Starten</Button>
            </div>
        );
    }
}

module.exports = Teamsaccepteren;