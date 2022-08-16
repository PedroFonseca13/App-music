import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Navigation from '../components/navigation';
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
      <>
        <Header />
        <main className="search">
          <Navigation />
          <div className="search-container">
            <form className="form-search">
              <label htmlFor="searchInput">
                <input
                  type="text"
                  name="searchInput"
                  id="searchInput"
                  value={ searchInput }
                  onChange={ this.handleChange }
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
            </form>
            { isLoading && <Loading /> }
            { returnAlbums.length > ZERO && (
              <div className="results-container container">
                <p>{ `Resultado de álbuns de: ${singerOrBand}` }</p>
                <ul className="album-container">
                  { returnAlbums.map(
                    ({ artistName, artworkUrl100, collectionId, collectionName }) => (
                      <li key={ collectionId } className="album-card">
                        <Link
                          to={ `/album/${collectionId}` }
                          data-testid={ `link-to-album-${collectionId}` }
                        >
                          <p>{ artistName }</p>
                          <p>{ collectionName }</p>
                          <img src={ artworkUrl100 } alt={ collectionName } />
                        </Link>
                      </li>
                    ),
                  ) }
                </ul>
              </div>
            ) }
            { searchFound && returnAlbums.length === ZERO ? (
              <p className="not-found">
                Nenhum álbum foi encontrado.
                <span>😢</span>
              </p>
            ) : (
              ''
            ) }
          </div>
        </main>
      </>
    );
  }
}

// Nenhum álbum foi encontrado.
// < span >😢</ >
