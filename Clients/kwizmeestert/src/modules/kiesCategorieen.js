import React from 'react'
import { FormControl } from 'react-bootstrap';

var data = {
    Type: "teamgeaccepteerd",
    teamnaam: "",
    geaccepteerd: true
};

class KiesCategorieen extends React.Component {
    constructor(props) {
        super(props);

    }

    handleChange(catname){
        console.log("Hij komt in de handleChange.")
        // this.state.categorieen.push(catname);
        // this.setState({
        //     categorieen: that.state.categorieen
        // });
    }

    render() {
        return (
            <div>
                <FormControl>
                    <label>
                        <input name={this.props.text} type="checkbox" onChange={() => this.handleChange(this.props.text)} />
                    </label>
                    <br />
                </FormControl>
            </div>
        );
    }
}

module.exports = KiesCategorieen;