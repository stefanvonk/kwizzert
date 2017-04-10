import React from 'react'

class BeoordelingVraag extends React.Component {
    render() {
        console.log(this.props.teams);
        return (
            <div className="App">
                <div>
                    Rondenr: {this.props.rondenummer}
                </div>
                <div>
                    Vraagnr: {this.props.vraagnummer}
                </div>
                <table>
                    <tr>
                        <th>Teamnaam</th>
                        <th>Antwoord</th>
                        <th></th>
                        <th>Rondepunten</th>
                        <th>Vragen goed</th>
                    </tr>
                    {this.props.teams.map((team) =>
                        <BeoordelingTeam team={team}/>
                    )}
                </table>
            </div>
        );
    }
}

class BeoordelingTeam extends React.Component {
    render() {
        return(
            <tr>
                <td>{this.props.team.teamnaam}</td>
                <td>{this.props.team.antwoord}</td>
                {/*<td>{this.props.team.antwoordGoed}</td>*/}
                <td>{this.props.team.rondepunten}</td>
                <td>{this.props.team.vragengoed}</td>
            </tr>
        )
    }
}

module.exports = BeoordelingVraag;