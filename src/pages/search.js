import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import { MIN_LENGTH_INPUT_SEARCH, ZERO } from '../CONST';
import Loading from '../components/Loading';
import './search.css';

export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      searchInput: '',
      isLoading: false,
      returnAlbums: [],
      singerOrBand: '',
      searchFound: false,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  searchAlbum = async () => {
    const { searchInput } = this.state;
    this.setState({ isLoading: true });
    const albums = await searchAlbumsAPI(searchInput);
    this.setState((prevState) => ({
      isLoading: false,
      searchInput: '',
      returnAlbums: [...albums],
      singerOrBand: prevState.searchInput,
      searchFound: true,
    }));
  };

  render() {
    const {
      searchInput,
      isLoading,
      returnAlbums,
      singerOrBand,
      searchFound,
    } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <main>
          <form>
            <label htmlFor="searchInput">
              <input
                type="text"
                name="searchInput"
                id="searchInput"
                value={ searchInput }
                onChange={ this.handleChange }
                data-testid="search-artist-input"
                placeholder="Nome do Artista"
              />
            </label>
            <button
              type="button"
              data-testid="search-artist-button"
              onClick={ this.searchAlbum }
              disabled={ searchInput.length < MIN_LENGTH_INPUT_SEARCH }
            >
              Pesquisar
            </button>
            {isLoading && <Loading />}
            {returnAlbums.length > ZERO && (
              <p>{`Resultado de álbuns de: ${singerOrBand}`}</p>
            )}
          </form>
          <ul className="album-container">
            {returnAlbums.map((album) => (
              <li key={ album.collectionId } className="album-card">
                <Link
                  to={ `/album/${album.collectionId}` }
                  data-testid={ `link-to-album-${album.collectionId}` }
                >
                  <p>{album.artistName}</p>
                  <p>{album.collectionName}</p>
                  <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                </Link>
              </li>
            ))}
          </ul>
          {searchFound && returnAlbums.length === ZERO ? (
            <p>Nenhum álbum foi encontrado</p>
          ) : (
            ''
          )}
        </main>
      </div>
    );
  }
}
