import React from 'react';
import { Table } from 'react-bootstrap';

class AchterafKwiz extends React.Component {
    render() {
        return (
            <div className="App">
                <h1>Einde kwiz.</h1>
                <Table striped bordered condensed hover>
                    <thead>
                        <tr>
                            <th>Teamnaam</th>
                            <th>Punten</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.props.scorelijst.map((score, index) =>
                        <tr>
                            <td>{score.teamnaam}</td>
                            <td>{score.rondepunten}</td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default AchterafKwiz;