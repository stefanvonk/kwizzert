import React, { Component } from 'react';
import './../App.css';
import { browserHistory } from 'react-router';

const webSocket = new WebSocket("ws:localhost:3000/");

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gekozenCategorieen: [],
            webSocket: webSocket,
            melding: ""
        }
    }

    // componentDidMount(){
    //     let that = this;
    //     webSocket.onmessage = function incoming(message) {
    //         let data = JSON.parse(message.data);
    //         if(data.Type === "teamgeaccepteerd") {
    //             that.onMeldingChange(data.melding);
    //         }
    //     };
    // }

    // onMeldingChange(melding) {
    //     this.setState({
    //         melding: melding
    //     });
    // }
    //
    // onTeamNaamChange(teamNaam) {
    //     this.setState({
    //         teamNaam: teamNaam
    //     });
    // }

    handleChangeCategorieen(catnaam) {
        this.state.gekozenCategorieen.push(catnaam);
        this.setState({
            gekozenCategorieen: this.state.gekozenCategorieen
        });
    }

    onMeldingChange(melding) {
        this.setState({
            melding: melding
        });
    }

    render() {
        const { children } = this.props;
        return (
            <div>
                { children && React.cloneElement(children, { gekozenCategorieen: this.state.gekozenCategorieen, webSocket:this.state.webSocket, melding: this.state.melding, handleChangeCategorieen:this.handleChangeCategorieen.bind(this), onMeldingChange: this.onMeldingChange.bind(this) }) }
            </div>
        )
    }
}

export default App;
