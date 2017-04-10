import React from 'react'
import { Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';

var data = {
    Type: "antwoordgecontroleerd",
    teamnaam: "",
    goedgekeurd: true
};

class Teamsaccepteren extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teams: [],
            antwoorden: [],
            gecontroleerd: []
        };

        this.props.webSocket.onopen = function (event) {};
    }

    componentDidMount() {
        var that = this;
        this.props.webSocket.onmessage = function incoming(message) {
            var data = JSON.parse(message.data);
            if(data.Type === "ontvangstantwoorden") {
                that.state.teams.push(data.teamantwoorden[0]);
                that.state.antwoorden.push(data.teamantwoorden[1]);
                that.setState({
                    teams: that.state.teams,
                    antwoorden: that.state.antwoorden
                });
            }
        };
    }

    antwoordAccepteren(teamnaam){
        data.teamnaam = teamnaam;
        data.goedgekeurd = true;
        this.state.gecontroleerd.push(teamnaam);
        this.setState({
            gecontroleerd: this.state.gecontroleerd
        });
        console.log(data);
        this.props.webSocket.send(JSON.stringify(data));
    }

    antwoordWeigeren(teamnaam){
        data.teamnaam = teamnaam;
        data.goedgekeurd = false;
        this.state.gecontroleerd.push(teamnaam);
        this.setState({
            gecontroleerd: this.state.gecontroleerd
        });
        console.log(data);
        this.props.webSocket.send(JSON.stringify(data));
    }

    volgendeVraagButton() {
        // deze moet nog aangepast worden of er echt als teams zijn geaccepteerd
        if(this.state.gecontroleerd.length === this.state.teamnaam.length) {
            var data = {
                Type: "volgende"
            };
            this.props.webSocket.send(JSON.stringify(data));
            browserHistory.push('/kwizmeestert/vragenkiezen');
        }else {
            this.props.onMeldingChange("Alle antwoorden moeten worden beoordeeld.");
        }
    }

    render() {
        return (
            <div className="App">
                <h1>Antwoorden van teams</h1>
                <div>
                    {this.state.teams.map((item, index) =>
                        <div>
                            Team: "{this.state.teams}" Antwoord: "{this.state.antwoorden}"
                            <Button bsStyle="success" onClick={() => this.antwoordAccepteren(item)}>Goedkeuren</Button>
                            <Button bsStyle="danger" onClick={() => this.antwoordWeigeren(item)}>Foutkeuren</Button>
                        </div>
                    )}
                </div>
                <br />
                <Button bsStyle="primary" onClick={() => this.volgendeVraagButton()}>Volgende vraag</Button>
                <div>
                    Melding: {this.props.melding}
                </div>
            </div>
        );
    }
}

module.exports = Teamsaccepteren;