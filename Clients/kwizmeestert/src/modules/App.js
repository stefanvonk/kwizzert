import React, { Component } from 'react';
import './../App.css';
import { browserHistory } from 'react-router';

const webSocket = new WebSocket("ws:localhost:3000/");

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gekozenCategorieen: [],
            webSocket: webSocket
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
        console.log(this.state.gekozenCategorieen + "eerste");
    }

    render() {
        const { children } = this.props;
        return (
            <div>
                { children && React.cloneElement(children, { webSocket:this.state.webSocket, gekozenCategorieen:this.handleChangeCategorieen.bind(this) }) }
            </div>
        )
    }
}

export default App;
