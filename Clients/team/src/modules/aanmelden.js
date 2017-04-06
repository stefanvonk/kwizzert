import React from 'react';
import { Button } from 'react-bootstrap';

class Aanmelden extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            teamName: "",
            code: ""
        }
    }

    onChangeTeamName(e) {
        this.setState({
            teamName: e.target.value,
        });
    }

    onChangeCode(e) {
        this.setState({
            code: e.target.value,
        });
    }

    handleClick(e) {
        // Send something in socket.
    }

    render() {
        return (
            <div className="App">
                <div>
                    <h3>Teamnaam: {this.state.teamName}</h3>
                    <input value={this.state.teamName} onChange= {(e) => this.onChangeTeamName(e)}/>
                </div>
                <div>
                    <h3>Code: {this.state.code}</h3>
                    <input value={this.state.code} onChange= {(e) => this.onChangeCode(e)}/>
                </div>
                    <div>
                        <Button bsStyle="primary" onClick={(e) => this.handleClick(e)}>Starten</Button>
                    </div>
            </div>
        );
    }
}

export default Aanmelden;