import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Loading from '../pages/Loading';

export default class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
    };
  }

  render() {
    const { previewUrl, trackId, trackName } = this.props;
    const { isLoading } = this.state;
    if (isLoading) return <Loading />;
    return (
      <div key={ trackId }>
        <h4>{ trackName }</h4>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento

          <code>audio</code>
          .
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string,
  returnedAlbums: PropTypes.string,
  trackName: PropTypes.string,
  trackId: PropTypes.string,
}.isRequired;
