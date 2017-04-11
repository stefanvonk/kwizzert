import React from 'react'
import { Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';

let data = {
    Type: "antwoordgecontroleerd",
    teamnaam: "",
    goedgekeurd: true
};

class AntwoordControleren extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teamantwoorden: [],
            huidigevraag: "",
            huidigantwoord: ""
        };
        this.props.onMeldingChange("");
        this.props.webSocket.onopen = function (event) {};
    }

    componentDidMount() {
        const that = this;
        this.props.webSocket.onmessage = function incoming(message) {
            const data = JSON.parse(message.data);
            if(data.Type === "ontvangstantwoorden") {
                that.onChangeTeamAntwoorden(data.teamantwoorden, data.huidigevraag, data.huidigantwoord);
            }
        };
    }

    onChangeTeamAntwoorden(teamantwoorden, huidigevraag, huidigantwoord){
        this.setState({
            teamantwoorden: teamantwoorden,
            huidigevraag: huidigevraag,
            huidigantwoord: huidigantwoord
        });
    }

    onChangeControle(teamantwoord) {
        let index = this.state.teamantwoorden.indexOf(teamantwoord);
        this.state.teamantwoorden.splice(index, 1);
        this.setState({
            teamantwoorden: this.state.teamantwoorden
        });
    }

    antwoordAccepteren(teamantwoord){
        data.teamnaam = teamantwoord.teamnaam;
        data.goedgekeurd = true;
        this.onChangeControle(teamantwoord);
        this.props.webSocket.send(JSON.stringify(data));
    }

    antwoordWeigeren(teamantwoord){
        data.teamnaam = teamantwoord.teamnaam;
        data.goedgekeurd = false;
        this.onChangeControle(teamantwoord);
        this.props.webSocket.send(JSON.stringify(data));
    }

    volgendeVraagButton() {
        if(this.props.gesteldeVragen % 12 === 0) {
            browserHistory.push('/kwizmeestert/rondestarten');
        } else if(this.state.teamantwoorden.length === 0) {
            let data = {
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
                    <h2><b>Vraag:</b> {this.state.huidigevraag}</h2>
                    <h2><b>Antwoord:</b> {this.state.huidigantwoord}</h2>
                    <br />
                    {this.state.teamantwoorden.map((teamantwoord, index) =>
                        <div>
                            Team: "{teamantwoord.teamnaam}" Antwoord: "{teamantwoord.huidigAntwoord}"<br />
                            <Button bsStyle="success" onClick={() => this.antwoordAccepteren(teamantwoord)}>Goedkeuren</Button>
                            <Button bsStyle="danger" onClick={() => this.antwoordWeigeren(teamantwoord)}>Foutkeuren</Button>
                            <br /><br />
                        </div>
                    )}
                </div>
                <br />
                <Button bsStyle="primary" onClick={() => this.volgendeVraagButton()}>Volgende vraag</Button>
                <div>
                    <br />
                    Melding: {this.props.melding}
                </div>
            </div>
        );
    }
}

module.exports = AntwoordControleren;