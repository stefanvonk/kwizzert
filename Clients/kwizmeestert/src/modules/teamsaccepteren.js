import React from 'react'
import { Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';
const Loader = require('react-loader');

let data = {
    Type: "teamgeaccepteerd",
    teamnaam: "",
    geaccepteerd: true
};

class Teamsaccepteren extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teams: [],
            aantalTeams: 0,
            loaded: false
        };
        this.props.onMeldingChange("");
        this.props.webSocket.onopen = function (event) {};
    }

    componentDidMount() {
        const that = this;
        this.props.webSocket.onmessage = function incoming(message) {
            const data = JSON.parse(message.data);
            if(data.Type === "teamaangemeld") {
                that.onChangeTeamnaam(data.teamnaam);
            }
        };
    }

    onChangeTeamnaam(teamnaam) {
        this.state.teams.push(teamnaam);
        this.setState({
            teams: this.state.teams,
            loaded: true
        });
    }

    onClickTeam(teamnaam, geaccepteerd) {
        let index = this.state.teams.indexOf(teamnaam);
        this.state.teams.splice(index, 1);
        this.setState({
            teams: this.state.teams
        });
        if(geaccepteerd) {
            let aantal = this.state.aantalTeams + 1;
            this.setState({
                aantalTeams: aantal
            });
        }
    }

    teamAccepteren(teamnaam){
        data.teamnaam = teamnaam;
        data.geaccepteerd = true;
        this.onClickTeam(teamnaam, true);
        this.props.webSocket.send(JSON.stringify(data));
    }

    teamWeigeren(teamnaam){
        data.teamnaam = teamnaam;
        data.geaccepteerd = false;
        this.onClickTeam(teamnaam, false);
        this.props.webSocket.send(JSON.stringify(data));
    }

    startButton() {
        if(this.state.aantalTeams >= 2) {
            if (this.state.teams.length === 0) {
                let data = {
                    Type: "startkwiz"
                };
                this.props.webSocket.send(JSON.stringify(data));
                browserHistory.push('/kwizmeestert/rondestarten');
            } else {
                this.props.onMeldingChange("Alle teams moeten worden geaccepteerd of geweigerd.");
            }
        } else {
            this.props.onMeldingChange("Er moeten minimaal 2 teams zijn geaccepteerd voordat er een kwiz kan worden gestart.");
        }
    }

    render() {
        return (
            <div className="App">
                <h1>Teams</h1>
                <Loader loaded={this.state.loaded}>
                </Loader>
                <div>
                    {this.state.teams.map((item, index) =>
                        <div>
                            <div>
                                <h2>{item}</h2>
                                <Button bsStyle="success" onClick={() => this.teamAccepteren(item)}>Accepteren</Button>
                                <Button bsStyle="danger" onClick={() => this.teamWeigeren(item)}>Weigeren</Button>
                            </div>
                        </div>
                    )}
                </div>
                <br />
                <Button bsStyle="primary" onClick={() => this.startButton()}>Starten</Button>
                <div>
                    <br />
                    Melding: {this.props.melding}
                </div>
            </div>
        );
    }
}

module.exports = Teamsaccepteren;