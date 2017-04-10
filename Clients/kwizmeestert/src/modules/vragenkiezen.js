import React from 'react'
import { Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';

class Vragenkiezen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vragen: [],
            gekozenVraag: ""
        };

        this.props.webSocket.onopen = function (event) {};
    }

    componentDidMount() {
        let that = this;
        this.props.webSocket.onmessage = function incoming(message) {
            var data = JSON.parse(message.data);
            if(data.Type === "ontvangstvragen") {
                that.state.vragen.push(data.vragen);
                that.setState({
                    vragen: that.state.vragen
                });
            }
            if(data.Type === "12vragengeweest") {
                browserHistory.push('/kwizmeestert/rondestarten');
            }
        };
    }

    startVraagButton() {
        if(this.state.gekozenVraag !== "" ) {
            var data = {
                Type: "startvraag",
                vraag: this.state.gekozenVraag
            };
            this.props.webSocket.send(JSON.stringify(data));
        }else {
            this.props.onMeldingChange("Er moet een vraag worden aangevinkt om te starten.");
        }
    }

    stopVraagButton() {
        var data = {
            Type: "stopvraag",
        };
        this.props.webSocket.send(JSON.stringify(data));
        console.log("De kwiz is gestopt!");
        browserHistory.push('/kwizmeestert/antwoordcontroleren');
    }

    handleChangeVraag(vraag){
        this.setState({
            gekozenVraag: vraag
        });
        console.log(this.state.gekozenVraag);
    }

    render() {
        return (
            <div className="App">
                <h1>Ronde</h1>
                <h2>Kies hieronder een vraag:</h2>
                <div>
                    <form>
                        {this.state.vragen.map((item, index) =>
                            <label>
                                {item.question}
                                <input
                                    name="vragen"
                                    type="radio"
                                    onChange={() => this.handleChangeVraag(item)} />
                            </label>
                        )}
                    </form>
                </div>
                <br />
                <Button bsStyle="primary" onClick={() => this.startVraagButton()}>Start vraag</Button>
                <Button bsStyle="primary" onClick={() => this.stopVraagButton()}>Stoppen</Button>
                <div>
                    Melding: {this.props.melding}
                </div>
            </div>
        );
    }
}

module.exports = Vragenkiezen;