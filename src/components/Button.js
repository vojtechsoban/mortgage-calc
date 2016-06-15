import React, { Component } from 'react';

export default class Button extends Component {

  onClick(e) {
    e.preventDefault();
    console.log(`clicked by ${this.props.text}`)
    this.props.onClick();
  }

  render() {
    return (
      <a href="#" onClick={::this.onClick}>{this.props.text}</a>
   );
  }
}

