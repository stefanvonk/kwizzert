import React, { Component } from 'react';
import './App.css';
import { browserHistory } from 'react-router';

const webSocket = new WebSocket("ws:localhost:3000/");

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            teamNaam: "",
            melding: "",
            code: "",
            webSocket: webSocket,
            huidigeVraag: "Wachten op vraag..."
        }
    }

    componentDidMount(){
        let that = this;
        webSocket.onmessage = function incoming(message) {
            let data = JSON.parse(message.data);
            console.log(data.Type);
            if(data.Type === "teamgeaccepteerd") {
                that.onMeldingChange(data.melding);
                if(data.melding === "geaccepteerd"){
                    browserHistory.push('/team/kwiz');
                }
            } else if(data.Type === "ontvangstvraag") {
                that.onHuidigeVraagChange(data.vraag);
            } else if(data.Type === "afbrekenvraag") {
                that.onHuidigeVraagChange("Wachten op vraag...");
            } else if(data.Type === "kwizgestopt") {
                console.log("komt in kwizgestopt");
                browserHistory.push('/team/kwizgesloten');
            }
        };
    }

    onMeldingChange(melding) {
        this.setState({
            melding: melding
        });
    }

    onTeamNaamChange(teamNaam) {
        this.setState({
            teamNaam: teamNaam
        });
    }

    onHuidigeVraagChange(huidigeVraag){
        this.setState({
            huidigeVraag: huidigeVraag
        })
    }

    onCodeChange(code) {
        this.setState({
            code: code
        })
    }

    render() {
      const { children } = this.props
      return (
          <div>
              { children && React.cloneElement(children, { webSocket:this.state.webSocket, code: this.state.code, melding: this.state.melding, huidigeVraag:this.state.huidigeVraag, onTeamNaamChange: this.onTeamNaamChange.bind(this), onMeldingChange: this.onMeldingChange.bind(this), onCodeChange: this.onCodeChange.bind(this)}) }
          </div>
      )
  }
}

export default App;
