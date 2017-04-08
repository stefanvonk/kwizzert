import React from 'react'

var data = {
    Type: "teamgeaccepteerd",
    teamnaam: "",
    geaccepteerd: true
};

class KiesCategorieen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isGoing: true
        };
    }

    handleChange(catname){
        console.log(catname);
        // this.state.categorieen.push(catname);
        // this.setState({
        //     categorieen: that.state.categorieen
        // });
    }

    render() {
        return (
            <label>
                {this.props.text}
                <input
                    name="categorieen"
                    type="checkbox"
                    onChange={() => this.handleChange(this.props.text)} />
            </label>
        );
    }
}

module.exports = KiesCategorieen;