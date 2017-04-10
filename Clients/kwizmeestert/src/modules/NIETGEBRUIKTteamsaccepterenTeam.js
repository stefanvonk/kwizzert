import React from 'react'
import { Button } from 'react-bootstrap';

class TeamsaccepterenTeam extends React.Component {
    constructor(props) {
        super(props);

    }

    teamAccepteren(teamnaam){
        data.teamnaam = teamnaam;
        data.geaccepteerd = true;
        console.log(data);
        this.props.webSocket.send(JSON.stringify(data));
    }

    teamWeigeren(teamnaam){
        data.teamnaam = teamnaam;
        data.geaccepteerd = false;
        console.log(data);
        this.props.webSocket.send(JSON.stringify(data));
    }

    render() {
        return (
            <div>
                <h2>{this.props.text}</h2>
                <Button bsStyle="success" onClick={() => this.teamAccepteren(this.props.text)}>Accepteren</Button>
                <Button bsStyle="danger" onClick={() => this.teamWeigeren(this.props.text)}>Weigeren</Button>
            </div>
        );
    }
}

module.exports = TeamsaccepterenTeam;