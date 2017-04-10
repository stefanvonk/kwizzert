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
                    <th>
                        <td>Teamnaam</td>
                        <td>Antwoord</td>
                        <td></td>
                        <td>Rondepunten</td>
                        <td>Vragen goed</td>
                    </th>
                    {this.props.teams.forEach((team) =>
                        <tr>
                            <td>{team.teamnaam}</td>
                            <td>{team.antwoord}</td>
                            {/*<td>{team.antwoordGoed}</td>*/}
                            <td>{team.rondepunten}</td>
                            <td>{team.vragengoed}</td>
                        </tr>
                    )}
                </table>
            </div>
        );
    }
}

module.exports = BeoordelingVraag;