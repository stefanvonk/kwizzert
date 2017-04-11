import React from 'react';

class AchterafKwiz extends React.Component {
    render() {
        return (
            <div className="App">
                <h1>Einde kwiz.</h1>
                <table>
                    <th>
                        <td>Teamnaam</td>
                        <td>Punten</td>
                    </th>
                    {this.props.scorelijst.forEach((score) =>
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