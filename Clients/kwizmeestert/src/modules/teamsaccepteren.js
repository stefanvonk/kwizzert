import React from 'react'
import { Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';

var data = {
    Type: "teamgeaccepteerd",
    teamnaam: "",
    geaccepteerd: true
};

class Teamsaccepteren extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teams: []
        };

        this.props.webSocket.onopen = function (event) {};
    }

    componentDidMount() {
        var that = this;
        this.props.webSocket.onmessage = function incoming(message) {
            var data = JSON.parse(message.data);
            if(data.Type === "teamaangemeld") {
                that.state.teams.push(data.teamnaam);
                that.setState({
                    teams: that.state.teams
                });
            }
        };
    }

    teamAccepteren(teamnaam){
        data.teamnaam = teamnaam;
        data.geaccepteerd = true;
        this.props.webSocket.send(JSON.stringify(data));
    }

    teamWeigeren(teamnaam){
        data.teamnaam = teamnaam;
        data.geaccepteerd = false;
        this.props.webSocket.send(JSON.stringify(data));
    }

    startButton() {
        // deze moet nog aangepast worden of er echt als teams zijn geaccepteerd
        if(this.state.teams.length >= 2) {
            var data = {
                Type: "startkwiz"
            };
            this.props.webSocket.send(JSON.stringify(data));
            browserHistory.push('/kwizmeestert/rondestarten');
        }else {
            this.props.onMeldingChange("Er moeten zich minimaal 2 teams aanmelden.");
        }
    }

    render() {
        return (
            <div className="App">
                <h1>Teams</h1>
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
                    Melding: {this.props.melding}
                </div>
            </div>
        );
    }
}

module.exports = Teamsaccepteren;