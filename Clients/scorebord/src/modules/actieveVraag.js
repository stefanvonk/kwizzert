import React from 'react'

class ActieveVraag extends React.Component {
    render() {
        return (
            <div className="App">
                <div>
                    Rondenr: {this.props.rondenummer}
                </div>
                <div>
                    Vraagnr: {this.props.vraagnummer}
                </div>
                <h3>
                    Vraag: {this.props.vraag}
                </h3>
                <h3>
                    Categorie: {this.props.categorie}
                </h3>
                <h3>Teams met antwoord</h3>
                <div>
                    {this.props.teams.map((team) =>
                        <div>
                            <h2>{team}</h2>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

module.exports = ActieveVraag;