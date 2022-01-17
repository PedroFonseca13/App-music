import React, { Component } from 'react';
import './Loading.css';

export default class Loading extends Component {
  render() {
    return (
      <div className="container">
        <div className="c-loader" />
        <h1>Carregando...</h1>
      </div>
    );
  }
}
