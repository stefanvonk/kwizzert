import React from 'react'
import { Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';

import TeamsaccepterenTeam from './teamsaccepterenTeam'

class Teamsaccepteren extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teams: ["team1", "team2"]
        };

        this.props.webSocket.onopen = function (event) {};
    }

    componentDidMount() {
        var that = this;
        this.props.webSocket.onmessage = function incoming(message) {
            var data = JSON.parse(message.data);
            if(data.type === "teamaangemeld") {
                that.state.teams.push(message.teamnaam);
                that.setState({
                    teams: that.state.teams
                });
            }
        };
    }

    startButton() {
        if(this.state.teams.length >= 2) {
            var data = {
                type: "startkwiz"
            };
            this.props.webSocket.send(JSON.stringify(data));
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
                            <TeamsaccepterenTeam webSocket={this.props.webSocket} text={item} />
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