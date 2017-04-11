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
            geaccepteerdeTeams: [],
            scorelijst: []
        }
    }

    componentDidMount() {
        let that = this;
        webSocket.onmessage = function incoming(message) {
            let data = JSON.parse(message.data);
            switch (data.Type) {
                case "scorebordvraag":
                    that.onChangeTeams([]);
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
                case "scorelijst":
                    browserHistory.push('/scorebord/achterafKwiz');
                    that.onChangeScorelijst(data.scorelijst);
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

    onChangeScorelijst(scorelijst) {
        this.setState({
            scorelijst: scorelijst
        });
    }

    onNewTeam(teamnaam) {
        let found = false;
        for (let i = 0; i < this.state.teams.length && !found; i++) {
            if (this.state.teams[i] === teamnaam) {
                found = true;
            }
        }
        if(!found) {
            this.state.teams.push(teamnaam);
            this.setState({
                teams: this.state.teams
            });
        }
    }

    onNewGeaccepteerdTeam(teamnaam) {
        this.state.geaccepteerdeTeams.push(teamnaam);
        this.setState({
            geaccepteerdeTeams: this.state.geaccepteerdeTeams
        });
    }

    controleerAntwoord(teamnaam, goedgekeurd) {
        let that = this;
        this.state.teams.forEach(function (team, index) {
            if (team.teamnaam === teamnaam) {
                that.state.teams[index].antwoordGoed = goedgekeurd;
                that.setState({
                    teams: that.state.teams
                })
            }
        });
    }


        render() {
        const {children} = this.props
        return (
            <div>
                { children && React.cloneElement(children, {
                    scorelijst: this.state.scorelijst,
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
