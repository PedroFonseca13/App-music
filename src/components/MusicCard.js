import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      isChecked: false,
      favoriteSongsList: [],
    };
  }

  componentDidMount() {
    this.fetchFavoriteMusic();
  }

  fetchFavoriteMusic = async () => {
    this.setState({ isLoading: true });
    const listMusic = await getFavoriteSongs();
    this.setState({ isLoading: false, favoriteSongsList: listMusic }, () => {
      const { favoriteSongsList } = this.state;
      const { music: { trackId } } = this.props;
      const validate = favoriteSongsList.some((song) => (
        song.trackId === trackId
      ));
      if (validate) {
        this.setState({ isChecked: true });
      }
    });
  }

  fetchAddSong = async ({ target }, music) => {
    const { checked } = target;
    this.setState({ isLoading: true, isChecked: checked });

    if (checked) {
      await addSong(music);
    } else {
      await removeSong(music);
    }
    this.setState({ isLoading: false });
  }

  render() {
    const { music } = this.props;
    const { isLoading, isChecked } = this.state;

    if (isLoading) return <Loading />;

    return (
      <div key={ music.trackId }>
        <h4>{ music.trackName }</h4>
        <audio data-testid="audio-component" src={ music.previewUrl } controls>
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
              data-testid={ `checkbox-music-${music.trackId}` }
              onChange={ (event) => this.fetchAddSong(event, music) }
              checked={ isChecked }
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

// Codigo concluido com a ajuda de Samuel de Alencar
// do meu time do projeto [FRONTEND-STORE].

// Consultei o PR do aluno Carlos Rosa, [escolha aleatoria], para buscar uma logica diferente da que eu estava usando.

// Utilizei do metodo de Pair Programing com um amigo pessoal para realizar os requisitos da 8 e 9.
