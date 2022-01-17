import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { MIN_LENGTH_INPUT_FORM } from '../CONST';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      inputName: '',
      isLoading: false,
      isRedirect: false,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  validateLogin = async () => {
    const { inputName } = this.state;
    this.setState({ isLoading: true });
    await createUser({ name: inputName });
    this.setState({ isLoading: false, isRedirect: true });
  };

  render() {
    const { inputName, isLoading, isRedirect } = this.state;

    if (isLoading) {
      return <Loading />;
    }
    return (
      <main data-testid="page-login">
        <form>
          <label htmlFor="inputName">
            Nome
            <input
              type="text"
              id="inputName"
              name="inputName"
              value={ inputName }
              onChange={ this.handleChange }
              data-testid="login-name-input"
            />
          </label>
          <button
            type="button"
            disabled={ inputName.length < MIN_LENGTH_INPUT_FORM }
            onClick={ this.validateLogin }
            data-testid="login-submit-button"
          >
            Entrar
          </button>
          { isRedirect && <Redirect to="/search" /> }
        </form>
      </main>
    );
  }
}
