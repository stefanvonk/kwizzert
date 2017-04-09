import React from 'react';
import { Button } from 'react-bootstrap';

class AchterafKwiz extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            scorelijst: []
        }

        this.props.webSocket.onopen = function (event) {};
    }

    componentDidMount(){
        let that = this;
        webSocket.onmessage = function incoming(message) {
            let data = JSON.parse(message.data);
            switch(data.Type) {
                case "scorelijst":
                    that.onChangeScorelijst(data.scorelijst)
                    break;
            }
        };
    }

    onChangeScorelijst(scorelijst) {
        this.setState({
            scorelijst: scorelijst
        });
    }

    render() {
        return (
            <div className="App">
                <h1>Einde kwiz.</h1>
                <table>
                    <th>
                        <td>Teamnaam</td>
                        <td>Punten</td>
                    </th>
                    {this.state.scorelijst.forEach((score) =>
                        <tr>
                            <td>{score.teamnaam}</td>
                            <td>{score.rondepunten}</td>
                        </tr>
                    )}
                </table>
            </div>
        );
    }
}

export default AchterafKwiz;