import React from 'react'
import { Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import Kiesvragen from './kiesVragen'

class Vragenkiezen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vragen: [],
            gekozenVraag: [],
            aantalVragenGeweest: 0,
            aantalRondenGeweest: 0
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
        };
    }

    startVraagButton() {
        if(this.state.gekozenCategorieen.length <= 12 ) {
            var data = {
                Type: "startvraag",
                vraag: this.state.gekozenVraag
            };
            this.props.webSocket.send(JSON.stringify(data));
        }else {
            console.log("Er zijn al 12 vragen geweest, er moet een nieuwe ronde worden gestart.");
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

    render() {
        return (
            <div className="App">
                <h1>Ronde</h1>
                <h2>Kies hieronder drie categorieën:</h2>
                <div>
                    <form>
                        {this.state.vragen.map((item, index) =>
                            <Kiesvragen webSocket={this.props.webSocket} text={item} />
                        )}
                    </form>
                </div>
                <br />
                <Button bsStyle="primary" onClick={() => this.startVraagButton()}>Start vraag</Button>
                <Button bsStyle="primary" onClick={() => this.stopVraagButton()}>Stoppen</Button>
            </div>
        );
    }
}

module.exports = Vragenkiezen;