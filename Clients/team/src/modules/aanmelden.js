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

        if (this.state.teamNaam !== "" && this.state.code !== "") {
            this.props.webSocket.send(
                JSON.stringify({
                    type: "aanmeldenteam",
                    code: this.state.code,
                    teamnaam: this.state.teamNaam
                })
            );
        }
    }

    render() {
        return (
            <div className="App">
                <div>
                    <h3>Teamnaam:</h3>
                    <input value={this.state.teamNaam} onChange= {(e) => this.onChangeTeamName(e)}/>
                </div>
                <div>
                    <h3>Code:</h3>
                    <input value={this.state.code} onChange= {(e) => this.onChangeCode(e)}/>
                </div>
                    <div>
                        <Button bsStyle="primary" onClick={() => this.handleClick()}>Starten</Button>
                    </div>
            </div>
        );
    }
}

export default Aanmelden;