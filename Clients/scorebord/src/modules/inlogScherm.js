import React from 'react';
import { Button } from 'react-bootstrap';
import { browserHistory } from 'react-router'

class InlogScherm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            code: "",
            melding: ""
        }

        this.props.webSocket.onopen = function (event) {};
    }

    componentDidMount(){
        let that = this;
        this.props.webSocket.onmessage = function incoming(message) {
            let data = JSON.parse(message.data);
            switch(data.Type) {
                case "scorebordgeaccepteerd":
                    if(data.melding === "geaccepteerd"){
                        browserHistory.push('/scorebord/voorafKwiz');
                    }
                    else{
                        that.onMeldingChange(data.melding);
                    }
            }
        };
    }

    onMeldingChange(melding) {
        this.setState({
            melding: melding
        });
    }

    onChangeCode(e) {
        this.setState({
            code: e.target.value,
        });
    }

    handleClick() {
        this.props.onCodeChange(this.state.code);
        if (this.state.code !== "") {
            this.props.webSocket.send(
                JSON.stringify({
                    Type: "aanmeldenbeamer",
                    code: this.state.code
                })
            );
        } else {
            this.onMeldingChange("Er moet een correcte code worden ingevoerd.");
        }
    }

    render() {
        return (
            <div className="App">
                <h1>Aanmelden als scorebord bij quiz.</h1>
                <div>
                    <h3>Code:</h3>
                    <input value={this.state.code} onChange= {(e) => this.onChangeCode(e)}/>
                </div>
                <br />
                <div>
                    <Button bsStyle="primary" onClick={() => this.handleClick()}>Aanmelden</Button>
                </div>
                <br />
                <div>
                    {this.props.melding}
                </div>
            </div>
        );
    }
}

export default InlogScherm;