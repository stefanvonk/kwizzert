import React from 'react'

class VoorafKwiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teams: []
        };

        this.props.webSocket.onopen = function (event) {};
    }

    componentDidMount() {
        var that = this;
        this.props.webSocket.onmessage = function incoming(message) {
            var data = JSON.parse(message.data);
            if(data.Type === "geaccepteerdteam") {
                that.onNewTeam(data.teamnaam)
            }
        };
    }

    onNewTeam(teamnaam) {
        this.state.teams.push(teamnaam);
        this.setState({
            teams: this.state.teams
        });
    }

    render() {
        return (
            <div className="App">
                <div>
                    Code: {this.props.code}
                </div>
                <h1>Geaccepteerde teams:</h1>
                <div>
                    {this.state.teams.map((team, index) =>
                        <div>
                            <h2>{team}</h2>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

module.exports = VoorafKwiz;