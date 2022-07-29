import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { MIN_LENGTH_INPUT_FORM } from '../CONST';
import { createUser } from '../services/userAPI';

import Loading from '../components/Loading';
import '../style/Login.css';

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
      <main data-testid="page-login" className="page-login-container container">
        <form className="form-login">
          <label htmlFor="inputName">
            <h2>Login</h2>
            <input
              type="text"
              id="inputName"
              name="inputName"
              value={ inputName }
              onChange={ this.handleChange }
              data-testid="login-name-input"
              placeholder="Nome"
              className="inputName-container"
            />
          </label>
          <button
            type="button"
            disabled={ inputName.length < MIN_LENGTH_INPUT_FORM }
            onClick={ this.validateLogin }
            className="button-container"
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
