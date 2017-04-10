import React from 'react';
import { Button, FormControl } from 'react-bootstrap';
import { browserHistory } from 'react-router';

var data = {
    Type: "startkwizavond",
    code: ""
};

class Kwizstarten extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            typed: ""
        }
        this.props.onMeldingChange("");
        this.props.webSocket.onopen = function (event) {};
    }

    componentDidMount() {
        let that = this;
        this.props.webSocket.onmessage = function incoming(message) {
            var data = JSON.parse(message.data);
            if(data.Type === "kwizavondgestart") {
                if(data.geaccepteerd){
                    browserHistory.push('/kwizmeestert/teamsaccepteren');
                } else {
                    that.props.onMeldingChange("De code bestaat al.");
                }
            }
        };
    }

    onChangeCode() {
        this.setState({
            typed: event.target.value
        });
    }

    handleClick() {
        data.code = this.state.typed;
        if (this.state.typed != "") {
            this.props.webSocket.send(JSON.stringify(data));
        } else {
            this.props.onMeldingChange("U moet een code intypen.");
        }
    }

    render() {
        return (
            <div className="App">
                <h1>Kwizavond starten</h1>
                <FormControl className="width80" type="text" onChange= {(e) => this.onChangeCode(e)}/>
                <Button bsStyle="primary" onClick={(e) => this.handleClick(e)}>Starten</Button>
                <div>
                    <br />
                    Melding: {this.props.melding}
                </div>
            </div>
        );
    }
}

module.exports = Kwizstarten;