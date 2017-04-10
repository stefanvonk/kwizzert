import React from 'react'

class BeoordelingVraag extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vraagNummer: 0,
            rondeNummer: 0,
            teams: []
        };

        this.props.webSocket.onopen = function (event) {};
    }

    componentDidMount() {
        let that = this;
        this.props.webSocket.onmessage = function incoming(message) {
            var data = JSON.parse(message.data);
            if(data.Type === "scorebordteamgegevens") {
                that.onChangeVraagNummer(data.vraagnummer);
                that.onChangeRondeNummer(data.rondenummer);
                that.onChangeTeams(data.teams);
            } else if(data.Type === "scorebordgecontroleerdantwoord") {
                that.controleerAntwoord(data.teamnaam, data.goedgekeurd);
            }
        };
    }

    onChangeVraagNummer(vraagNummer) {
        this.setState({
            vraagNummer: vraagNummer
        });
    }

    onChangeRondeNummer(rondeNummer) {
        this.setState({
            rondeNummer: rondeNummer
        });
    }

    onChangeTeams(teams) {
        this.setState({
            teams: teams
        });
    }

    controleerAntwoord(teamnaam, goedgekeurd) {
        this.state.teams.forEach(function (team, index) {
            if (team.teamnaam === teamnaam) {
                this.setState({
                    teams: (this.state.teams[index].antwoordGoed = goedgekeurd)
                })
            }
        });
    }

    render() {
        return (
            <div className="App">
                <div>
                    Rondenr: {this.state.rondeNummer}
                </div>
                <div>
                    Vraagnr: {this.state.vraagNummer}
                </div>
                <table>
                    <th>
                        <td>Teamnaam</td>
                        <td>Antwoord</td>
                        <td></td>
                        <td>Rondepunten</td>
                        <td>Vragen goed</td>
                    </th>
                    {this.state.teams.forEach((team) =>
                        <tr>
                            <td>{team.teamnaam}</td>
                            <td>{team.antwoord}</td>
                            <td>{team.antwoordGoed}</td>
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