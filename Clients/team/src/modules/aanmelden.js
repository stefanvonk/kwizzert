import React from 'react';
import { Button } from 'react-bootstrap';

class Aanmelden extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            teamNaam: "",
            code: ""
        }

        this.props.webSocket.onopen = function (event) {};
    }

    onChangeTeamName(e) {
        this.setState({
            teamNaam: e.target.value,
        });
    }

    onChangeCode(e) {
        this.setState({
            code: e.target.value,
        });
    }

    handleClick() {
        this.props.onTeamNaamChange(this.state.teamNaam);
        this.props.onCodeChange(this.state.code);

        if (this.state.teamNaam !== "" && this.state.code !== "") {
            this.props.webSocket.send(
                JSON.stringify({
                    Type: "aanmeldenteam",
                    code: this.state.code,
                    teamnaam: this.state.teamNaam
                })
            );
        }
        this.props.onMeldingChange(".....");
    }

    render() {
        return (
            <div className="App">
                <h1>Aanmelden bij quiz.</h1>
                <div>
                    <h3>Teamnaam:</h3>
                    <input value={this.state.teamNaam} onChange= {(e) => this.onChangeTeamName(e)}/>
                </div>
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
                    Melding: {this.props.melding}
                </div>
            </div>
        );
    }
}

export default Aanmelden;