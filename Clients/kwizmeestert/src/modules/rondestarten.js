import React from 'react'
import { Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import KiesCategorieen from './kiesCategorieen'

class Rondestarten extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categorieen: []
        };

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
        if(this.state.teams.length >= 2) {
            var data = {
                Type: "startkwiz"
            };
            this.props.webSocket.send(JSON.stringify(data));
            browserHistory.push('/kwizmeestert/rondestarten');
        }else {
            console.log("Er moeten zich minimaal 2 teams aanmelden.");
        }
    }

    render() {
        return (
            <div className="App">
                <h1>Ronde</h1>
                <h2>Kies hieronder drie categorieën:</h2>
                <div>
                    {this.state.categorieen.map((item, index) =>
                        <div>
                            <KiesCategorieen webSocket={this.props.webSocket} text={item}/>
                        </div>
                    )}
                </div>
                <br />
                <Button bsStyle="primary" onClick={() => this.startRondeButton()}>Ronde starten</Button>
            </div>
        );
    }
}

module.exports = Rondestarten;