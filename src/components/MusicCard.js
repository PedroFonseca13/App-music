import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Loading from './Loading';
import { addSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      favSongs: false,
    };
  }

  componentDidMount() {
    this.fetchFavoriteMusic();
  }

  fetchFavoriteMusic = async () => {
    const { returnedAlbums } = this.props;
    this.setState({ isLoading: true });
    const test = await addSong(returnedAlbums);
    console.log(test);
    this.setState({ isLoading: false });
  }

  handleChange = () => {
    this.setState({ favSongs: true }, () => this.fetchFavoriteMusic());
  }

  render() {
    const { previewUrl, trackId, trackName } = this.props;
    const { isLoading, favSongs } = this.state;
    console.log(favSongs);
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
        <form className="check">
          <label htmlFor="favSongs">
            Favorita
            <input
              type="checkbox"
              name="favSongs"
              id="favSongs"
              data-testid={ `checkbox-music-${trackId}` }
              onChange={ () => this.handleChange() }
              checked={ favSongs }
            />
          </label>
        </form>
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


//Codigo concluido com a ajuda de Samuel de Alencar, do meu time do projeto [FRONTEND-STORE]