import React, { Component } from 'react';

export default class Button extends Component {

  onClick(e) {
    e.preventDefault();
    this.props.onClick();
  }

  render() {
    return (
      <a href="#" onClick={::this.onClick}>{this.props.text} {this.props.clicked}</a>
   );
  }
}

