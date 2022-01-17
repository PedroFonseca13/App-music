import React, { Component } from 'react';
import Header from '../components/Header';
import { MIN_LENGTH_INPUT_SEARCH } from '../CONST';

export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      searchInput: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const { searchInput } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
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
            disabled={ searchInput.length < MIN_LENGTH_INPUT_SEARCH }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}
