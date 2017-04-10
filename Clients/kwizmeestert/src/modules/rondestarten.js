import React from 'react'
import { Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';

class Rondestarten extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categorieen: [],
            gekozenCategorieen: []
        };
        this.props.onMeldingChange("");
        this.props.webSocket.onopen = function (event) {};
    }

    componentDidMount() {
        let that = this;
        this.props.webSocket.onmessage = function incoming(message) {
            var data = JSON.parse(message.data);
            if(data.Type === "ontvangstcategorieen") {
                that.onChangeCategorieen(data.categorieen);

            }
        };
    }

    onChangeCategorieen(categorieen) {
        this.state.categorieen.push(categorieen);
        this.setState({
            categorieen: this.state.categorieen
        });
    }

    handleChangeCategorieen(catnaam) {
        if(this.state.gekozenCategorieen.includes(catnaam)){
            let index = this.state.gekozenCategorieen.indexOf(catnaam);
            this.state.gekozenCategorieen.splice(index, 1);
            this.setState({
                gekozenCategorieen: this.state.gekozenCategorieen
            });
        } else{
            this.state.gekozenCategorieen.push(catnaam);
            this.setState({
                gekozenCategorieen: this.state.gekozenCategorieen
            });
        }
    }

    startRondeButton() {
        if(this.state.gekozenCategorieen.length === 3) {
            var data = {
                Type: "startronde",
                categorieen: this.state.gekozenCategorieen
            };
            this.props.webSocket.send(JSON.stringify(data));
            browserHistory.push('/kwizmeestert/vragenkiezen');
        }else {
            this.props.onMeldingChange("Er moeten 3 categorieën gekozen zijn.");
        }
    }

    stopKwizButton() {
        var data = {
            Type: "stopkwiz"
        };
        this.props.webSocket.send(JSON.stringify(data));
        browserHistory.push('/kwizmeestert/');
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
                                onChange={() => this.handleChangeCategorieen(item)} />
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