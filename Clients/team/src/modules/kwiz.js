import React from 'react';

class Kwiz extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            teamNaam: "",
            huidigeVraag: "Wachten op vraag...",
            huidigAntwoord: ""
        }

        this.props.webSocket.onopen = function (event) {
        };
    }

    onChangeHuidigAntwoord(e) {
        this.setState({
            huidigAntwoord: e.target.value,
        });
    }
    handleClick() {
        if (this.state.huidigAntwoord !== "") {
            this.props.webSocket.send(
                JSON.stringify({
                    type: "ontvangstantwoord",
                    antwoord: this.state.huidigAntwoord
                })
            );
        }
        this.props.onMeldingChange(".....");
    }

        render() {
            return (
                <div className="App">
                    <h1>{this.state.huidigeVraag}</h1>
                    <div>
                        <h3>Antwoord:</h3>
                        <input value={this.state.huidigAntwoord} onChange= {(e) => this.onChangeHuidigAntwoord(e)}/>
                    </div>
                    <div>
                        <Button bsStyle="primary" onClick={() => this.handleClick()}>Aanmelden</Button>
                    </div>
                    <div>
                        Melding: {this.props.melding}
                    </div>
                </div>
            );
        }
}

export default Kwiz;
