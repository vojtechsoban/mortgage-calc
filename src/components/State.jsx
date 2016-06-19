import React, {Component} from 'react';

export default class State extends Component {
    render() {
        return (
            <div>
                <p>
                    clicked={this.props.clicked}
                </p>
            </div>
        )
    }
}