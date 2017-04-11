import React from 'react';
import { Table } from 'react-bootstrap';

class BeoordelingVraag extends React.Component {
    render() {
        return (
            <div className="App">
                <div>
                    Rondenr: {this.props.rondenummer}
                </div>
                <div>
                    Vraagnr: {this.props.vraagnummer}
                </div>
                <Table striped bordered condensed hover>
                    <thead>
                        <tr>
                            <th>Teamnaam</th>
                            <th>Antwoord</th>
                            <th>Antwoord goed</th>
                            <th>Rondepunten</th>
                            <th>Vragen goed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.teams.map((team) =>
                            <BeoordelingTeam team={team}/>
                        )}
                    </tbody>
                </Table>
            </div>
        );
    }
}

class BeoordelingTeam extends React.Component {
    setAntwoordGoed(antwoordGoed) {
        if(antwoordGoed) {
            return "Goed";
        } else if (antwoordGoed == null){
            return "";
        } else{
            return "Fout";
        }
    }

    setVragenGoed(vragenGoed, antwoordGoed){
        if(antwoordGoed)
            vragenGoed++;
        return vragenGoed;
    }

    render() {
        return(
            <tr>
                <td>{this.props.team.teamnaam}</td>
                <td>{this.props.team.antwoord}</td>
                <td>{this.setAntwoordGoed(this.props.team.antwoordGoed)}</td>
                <td>{this.props.team.rondepunten}</td>
                <td>{this.setVragenGoed(this.props.team.vragengoed, this.props.team.antwoordGoed)}</td>
            </tr>
        )
    }
}

module.exports = BeoordelingVraag;