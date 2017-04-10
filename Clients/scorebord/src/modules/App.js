import React, { Component } from 'react';
import './App.css';
import { browserHistory } from 'react-router'

const webSocket = new WebSocket("ws:localhost:3000/");

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            webSocket: webSocket,
            code: "",
            rondenummer: 0,
            vraagnummer: 0,
            vraag: "",
            categorie: "",
            teams: [],
            geaccepteerdeTeams: []
        }
    }

    componentDidMount() {
        let that = this;
        webSocket.onmessage = function incoming(message) {
            let data = JSON.parse(message.data);
            console.log("message komt binnen van type: " + data.Type);
            switch (data.Type) {
                case "scorebordvraag":
                    that.onRondenummerChange(data.rondenummer);
                    that.onVraagnummerChange(data.vraagnummer);
                    that.onVraagChange(data.vraag);
                    that.onCategorieChange(data.categorie);
                    browserHistory.push('/scorebord/actieveVraag');
                    break;
                case "scorebordteamnaam":
                    that.onNewTeam(data.teamnaam);
                    break;
                case "scorebordgeaccepteerd":
                    if(data.melding === "geaccepteerd"){
                        browserHistory.push('/scorebord/voorafKwiz');
                    }
                    else{
                        that.onMeldingChange(data.melding);
                    }
                    break;
                case "geaccepteerdteam":
                    that.onNewGeaccepteerdTeam(data.teamnaam);
                    break;
                case "scorebordteamgegevens":
                    browserHistory.push('/scorebord/beoordelingVraag');
                    that.onChangeTeams(data.teamgegevens);
                    break;
                case "scorebordgecontroleerdantwoord":
                    that.controleerAntwoord(data.teamnaam, data.goedgekeurd);
                    break;
            }
        };
    }

    onRondenummerChange(rondenummer) {
        this.setState({
            rondenummer: rondenummer
        });
    }

    onVraagnummerChange(vraagnummer) {
        this.setState({
            vraagnummer: vraagnummer
        });
    }

    onVraagChange(vraag) {
        this.setState({
            vraag: vraag
        });
    }

    onCategorieChange(categorie) {
        this.setState({
            categorie: categorie
        });
    }

    onCodeChange(code) {
        this.setState({
            code: code
        });
    }

    onChangeTeams(teams) {
        this.setState({
            teams: teams
        });
    }

    onNewTeam(teamnaam) {
        this.state.teams.push(teamnaam);
        this.setState({
            teams: this.state.teams
        });
    }

    onNewGeaccepteerdTeam(teamnaam) {
        this.state.geaccepteerdeTeams.push(teamnaam);
        this.setState({
            geaccepteerdeTeams: this.state.geaccepteerdeTeams
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
        const {children} = this.props
        return (
            <div>
                { children && React.cloneElement(children, {
                    teams: this.state.teams,
                    categorie: this.state.categorie,
                    vraag: this.state.vraag,
                    vraagnummer: this.state.vraagnummer,
                    rondenummer: this.state.rondenummer,
                    webSocket: this.state.webSocket,
                    code: this.state.code,
                    geaccepteerdeTeams: this.state.geaccepteerdeTeams,
                    onCodeChange: this.onCodeChange.bind(this)
                }) }
            </div>
        )
    }
}

export default App;
