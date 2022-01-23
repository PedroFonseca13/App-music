import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      returnedAlbums: [],
      singerOrBand: '',
      albumName: '',
      albumImage: '',
    };
  }

  componentDidMount() {
    this.fetchAlbum();
  }

  fetchAlbum = async () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const music = await getMusics(id);
    const filteredMusic = music.filter((song) => song.trackName !== undefined);
    this.setState({ isLoading: true });
    this.setState({
      returnedAlbums: [...filteredMusic],
      singerOrBand: music[0].artistName,
      albumName: music[0].collectionName,
      albumImage: music[0].artworkUrl100,
      isLoading: false,
    });
  };

  render() {
    const { isLoading, returnedAlbums, singerOrBand, albumName, albumImage } = this.state;
    if (isLoading) return <Loading />;
    return (
      <div data-testid="page-album">
        <Header />
        <h2 data-testid="artist-name">{singerOrBand}</h2>
        <h4 data-testid="album-name">{albumName}</h4>
        <img src={ albumImage } alt={ albumName } />

        <section>
          {returnedAlbums.map((music) => (
            <MusicCard
              key={ music.trackId }
              music={ music }
            />
          ))}
        </section>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.number),
  }),
}.isRequired;

// Pra compreender a função fetchAlbum, eu precisei ver as mentorias do rod.
// Fiz consulta a algumas pessoas do meu grupo do projeto para tirar as duvidas.
// Consultei o PR do aluno Carlos Rosa, [escolha aleatoria], para buscar uma logica diferente da que eu estava usando.
