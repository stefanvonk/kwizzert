import React from 'react'

class ActieveVraag extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vraagNummer: 0,
            rondeNummer: 0,
            vraag: "Wachten op vraag...",
            categorie: "...",
            teams: []
        };

        this.props.webSocket.onopen = function (event) {};
    }

    componentDidMount() {
        let that = this;
        this.props.webSocket.onmessage = function incoming(message) {
            var data = JSON.parse(message.data);
            if(data.Type === "scorebordvraag") {
                that.onChangeVraagNummer(data.vraagnummer);
                that.onChangeRondeNummer(data.rondenummer);
                that.onChangeVraag(data.vraag);
                that.onChangeCategorie(data.categorie);
            } else if(data.Type === "scorebordteamnaam") {
                that.onNewTeam(data.teamnaam);
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

    onChangeVraag(vraag) {
        this.setState({
            vraag: vraag
        });
    }

    onChangeCategorie(categorie) {
        this.setState({
            categorie: categorie
        });
    }

    onNewTeam(teamnaam) {
        this.setState({
            teams: this.state.teams.push(teamnaam)
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
                <h3>
                    Vraag: {this.state.vraag}
                </h3>
                <h3>
                    Categorie: {this.state.categorie}
                </h3>
                <h3>Teams met antwoord</h3>
                <div>
                    {this.state.teams.map((team) =>
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