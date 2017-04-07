import React from 'react';
import { Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';

class KwizGesloten extends React.Component {
    handleClick() {
        browserHistory.push('/team');
    }

    render() {
        return (
            <div className="App">
                <h1>Kwiz is afgelopen</h1>
                <div>
                    <h3>Klik hier om opnieuw aan te melden:</h3>
                    <Button bsStyle="primary" onClick={() => this.handleClick()}>Aanmelden</Button>
                </div>
            </div>
        );
    }
}

export default KwizGesloten;
