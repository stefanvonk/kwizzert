import React from 'react'

class VoorafKwiz extends React.Component {
    render() {
        return (
            <div className="App">
                <div>
                    Code: {this.props.code}
                </div>
                <h1>Geaccepteerde teams:</h1>
                <div>
                    {this.props.geaccepteerdeTeams.map((team, index) =>
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