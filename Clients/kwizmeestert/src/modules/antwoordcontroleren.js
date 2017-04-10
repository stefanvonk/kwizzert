import React from 'react'
import { Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';

var data = {
    Type: "antwoordgecontroleerd",
    teamnaam: "",
    goedgekeurd: true
};

class AntwoordControleren extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teamantwoorden: []
        };

        this.props.webSocket.onopen = function (event) {};
    }

    componentDidMount() {
        var that = this;
        this.props.webSocket.onmessage = function incoming(message) {
            var data = JSON.parse(message.data);
            if(data.Type === "ontvangstantwoorden") {
                that.onChangeTeamAntwoorden(data.teamantwoorden);
            }
        };
    }

    onChangeTeamAntwoorden(teamantwoorden){
        this.setState({
            teamantwoorden: teamantwoorden
        });
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
                    {this.state.teamantwoorden.map((teamantwoord, index) =>
                        <div>
                            Team: "{teamantwoord.teamnaam}" Antwoord: "{teamantwoord.huidigAntwoord}"
                            <Button bsStyle="success" onClick={() => this.antwoordAccepteren(teamantwoord)}>Goedkeuren</Button>
                            <Button bsStyle="danger" onClick={() => this.antwoordWeigeren(teamantwoord)}>Foutkeuren</Button>
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

module.exports = AntwoordControleren;