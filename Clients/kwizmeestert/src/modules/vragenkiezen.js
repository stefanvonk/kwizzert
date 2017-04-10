import React from 'react'
import { Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';

class Vragenkiezen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vragen: [],
            gekozenVraag: null,
            vraagActief: ""
        };
        this.props.onMeldingChange("");
        this.props.webSocket.onopen = function (event) {};
    }

    componentDidMount() {
        let that = this;
        this.props.webSocket.onmessage = function incoming(message) {
            var data = JSON.parse(message.data);
            if(data.Type === "ontvangstvragen") {
                that.onChangeVragen(data.vragen);
            }
            else if(data.Type === "12vragengeweest") {
                browserHistory.push('/kwizmeestert/rondestarten');
            }
        };
    }

    onChangeVragen(vragen) {
        this.setState({
            vragen: vragen
        });
    }

    onChangeVraagActief() {
        this.setState({
            vraagActief: "De vraag is gestart."
        });
    }

    startVraagButton() {
        if(this.state.gekozenVraag !== null ) {
            var data = {
                Type: "startvraag",
                vraag: this.state.gekozenVraag
            };
            this.props.webSocket.send(JSON.stringify(data));
            this.onChangeVraagActief()
        }else {
            this.props.onMeldingChange("Er moet een vraag worden aangevinkt om te starten.");
        }
    }

    stopVraagButton() {
        var data = {
            Type: "stopvraag",
        };
        this.props.webSocket.send(JSON.stringify(data));
        browserHistory.push('/kwizmeestert/antwoordcontroleren');
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
                        {this.state.vragen.map((item, index) =>
                            <label>
                                {item.name}
                                <input
                                    name="vragen"
                                    type="radio"
                                    onChange={() => this.handleChangeVraag(item)} />
                                <br />
                            </label>
                        )}
                    </form>
                </div>
                {this.state.vraagActief}
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