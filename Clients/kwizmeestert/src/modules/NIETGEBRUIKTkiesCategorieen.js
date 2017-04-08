import React from 'react'

class KiesCategorieen extends React.Component {
    constructor(props) {
        super(props);
    }

    handleChangeCategorieen(catnaam) {
        this.props.gekozenCategorieen.push(catnaam);
        this.setState({
            gekozenCategorieen: this.props.gekozenCategorieen
        });
    }

    render() {
        return (
                <label>
                    {this.props.text}
                    <input
                        name="categorieen"
                        type="checkbox"
                        onChange={() => this.props.gekozenCategorieen.handleChangeCategorieen(this.props.text)} />
                </label>
        );
    }
}

module.exports = KiesCategorieen;