import React from 'react';
import { Button } from 'react-bootstrap';

class Kwiz extends React.Component {
    constructor(props) {
        super(props);
        this.props.webSocket.onopen = function (event) {
        };
    }

    handleClick() {
        if (this.props.huidigAntwoord !== "") {
            this.props.webSocket.send(
                JSON.stringify({
                    Type: "ontvangstantwoord",
                    code: this.props.code,
                    antwoord: this.props.huidigAntwoord
                })
            );
            this.props.onMeldingChange("Het antwoord is verzonden.");
        } else {
            this.props.onMeldingChange("Het antwoord moet worden ingevuld worden ingevuld.");
        }

    }

        render() {
            return (
                <div className="App">
                    <h1>{this.props.huidigeVraag}</h1>
                    <div>
                        <h3>Antwoord:</h3>
                        <input value={this.props.huidigAntwoord} onChange= {(e) => this.props.onChangeHuidigAntwoord(e)}/>
                    </div>
                    <br />
                    <div>
                        <Button bsStyle="primary" onClick={() => this.handleClick()}>Antwoorden</Button>
                    </div>
                    <br />
                    <div>
                        Melding: {this.props.melding}
                    </div>
                </div>
            );
        }
}

export default Kwiz;
