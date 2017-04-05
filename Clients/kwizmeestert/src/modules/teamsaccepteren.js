import React from 'react'
import './../App.css';
import { Button, FormControl } from 'react-bootstrap';
import { browserHistory } from 'react-router';

// socketKwizmeestert.onopen = function (event) {};

export default React.createClass({
    handleClick() {
        // socketKwizmeestert.send(JSON.stringify(data));
        console.log("het werkt")
    },

    render() {
        return (
            <div className="App">
                <h1>Teams</h1>
                <Button bsStyle="primary" onClick={(e) => this.handleClick(e)}>Starten</Button>
            </div>
        );
    }
})