import React, { Component } from 'react';

export default class Button extends Component {

  onClick() {
    console.log('click');
  }

  render() {
    return (
      <a href="#" onClick={this.onClick}>{this.props.text}</a>
   );
  }
}

