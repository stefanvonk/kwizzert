import React from 'react'
import { Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';

class Vragenkiezen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vragen: [],
            gekozenVraag: null,
            vraagActief: "",
            vraagGesteld: false
        };
        this.props.onMeldingChange("");
        this.props.webSocket.onopen = function (event) {};
    }

    componentDidMount() {
        const that = this;
        this.props.webSocket.onmessage = function incoming(message) {
            const data = JSON.parse(message.data);
            if(data.Type === "ontvangstvragen") {
                that.onChangeVragen(data.vragen);
            }
            // else if(data.Type === "12vragengeweest") {
            //     browserHistory.push('/kwizmeestert/rondestarten');
            // }
        };
    }

    onChangeVragen(vragen) {
        this.setState({
            vragen: vragen
        });
    }

    onChangeVraagActief() {
        this.setState({
            vraagActief: "De vraag is gestart.",
            vraagGesteld: true
        });
    }

    startVraagButton() {
        if(this.state.gekozenVraag !== null ) {
            if(this.state.vraagGesteld === false) {
                let data = {
                    Type: "startvraag",
                    vraag: this.state.gekozenVraag
                };
                this.props.webSocket.send(JSON.stringify(data));
                this.onChangeVraagActief();
                this.props.onGesteldeVragenChange();
            } else {
                this.props.onMeldingChange("Er is al een vraag gesteld.");
            }
        } else {
            this.props.onMeldingChange("Er moet een vraag worden aangevinkt om te starten.");
        }
    }

    stopVraagButton() {
        if(this.state.gekozenVraag !== null ) {
            let data = {
                Type: "stopvraag",
            };
            this.props.webSocket.send(JSON.stringify(data));
            browserHistory.push('/kwizmeestert/antwoordcontroleren');
        } else {
            this.props.onMeldingChange("Er moet een vraag gestart zijn voordat u deze kunt stoppen.");
        }
    }

    handleChangeVraag(vraag){
        this.setState({
            gekozenVraag: vraag
        });
    }

    render() {
        return (
            <div className="App">
                <h1>Vraag kiezen</h1>
                <h2>Kies hieronder een vraag:</h2>
                <div>
                    <form>
                        <ul>
                            {this.state.vragen.map((item, index) =>
                                <li>
                                    <label>
                                        {item.name}
                                        <input
                                            name="vragen"
                                            type="radio"
                                            onChange={() => this.handleChangeVraag(item)} />
                                        <br />
                                    </label>
                                </li>
                            )}
                        </ul>
                    </form>
                </div>
                <br />
                <b>{this.state.vraagActief}</b>
                <br />
                <br />
                <Button bsStyle="primary" onClick={() => this.startVraagButton()}>Start vraag</Button>
                <Button bsStyle="primary" onClick={() => this.stopVraagButton()}>Vraag stoppen</Button>
                <div>
                    <br />
                    Melding: {this.props.melding}
                </div>
            </div>
        );
    }
}

module.exports = Vragenkiezen;