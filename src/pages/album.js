import React, { Component } from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';

export default class Album extends Component {
  constructor() {
    super();
    this.state = {
      // returnAlbums,
      // singerOrBand,
    };
  }

  log = () => console.log(getMusics);

  render() {
    return (
      <div data-testid="page-album">
        <Header />
        <button type="button" onClick={ this.log }>
          Press
        </button>
      </div>
    );
  }
}
