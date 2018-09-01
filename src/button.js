import React, { Component } from 'react';

class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0
        }
    }

    handleKlik = () => {
        this.setState({
            counter: this.state.counter + 1
        });
        //this.setState((prevState) => {
        //    return {
        //        counter: prevState.counter + 1
        //    }
        //});
    }

    render() {
        return (
            <button onClick={this.handleKlik}>
                {this.state.counter}
            </button>
        )
    }
}

export default Button;
