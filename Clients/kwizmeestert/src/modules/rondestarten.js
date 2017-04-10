import React from 'react'
import { Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';

class Rondestarten extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categorieen: [],
        };
        this.props.onMeldingChange("");
        this.props.webSocket.onopen = function (event) {};
    }

    componentDidMount() {
        let that = this;
        this.props.webSocket.onmessage = function incoming(message) {
            var data = JSON.parse(message.data);
            if(data.Type === "ontvangstcategorieen") {
                that.state.categorieen.push(data.categorieen);
                that.setState({
                    categorieen: that.state.categorieen
                });
            }
        };
    }

    startRondeButton() {
        if(this.props.gekozenCategorieen.length === 3) {
            var data = {
                Type: "startronde",
                categorieen: this.props.gekozenCategorieen
            };
            this.props.webSocket.send(JSON.stringify(data));
            browserHistory.push('/kwizmeestert/vragenkiezen');
        }else {
            this.props.onMeldingChange("Er moeten 3 categorieën gekozen zijn.");
        }
    }

    stopKwizButton() {
        console.log("De kwiz is gestopt!")
    }

    render() {
        return (
            <div className="App">
                <h1>Ronde</h1>
                <h2>Kies hieronder drie categorieën:</h2>
                <div>
                    <form>
                        {this.state.categorieen.map((item, index) =>
                            <label>
                                {item}
                                <input
                                name="categorieen"
                                type="checkbox"
                                onChange={() => this.props.handleChangeCategorieen(item)} />
                                <br />
                            </label>
                        )}
                    </form>
                </div>
                <br />
                <Button bsStyle="primary" onClick={() => this.startRondeButton()}>Ronde starten</Button>
                <Button bsStyle="primary" onClick={() => this.stopKwizButton()}>Kwiz stoppen</Button>
                <div>
                    <br />
                    Melding: {this.props.melding}
                </div>
            </div>

        );
    }
}

module.exports = Rondestarten;