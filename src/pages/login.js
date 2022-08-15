import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import { MIN_LENGTH_INPUT_FORM } from '../CONST';

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
      <main data-testid="page-login" className="main-login">
        <div
          className="d-flex justify-content-center align-items-center box-form"
        >
          <Form className="form rounded align-items-center">
            <h2 className="title text-light text-center">App de músicas</h2>
            <Form.Text className="text-light my-3 text-align-center">
              Ouça previas de suas músicas favoritas dentro do app de músicas.
            </Form.Text>
            <Form.Group className="" controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="Insert your name"
                name="inputName"
                value={ inputName }
                onChange={ this.handleChange }
                data-testid="login-name-input"
                className="inputName-container"
              />
            </Form.Group>
            <Button
              variant="success"
              type="submit"
              disabled={ inputName.length < MIN_LENGTH_INPUT_FORM }
              onClick={ this.validateLogin }
              className="mt-3 mx-auto d-flex button"
              data-testid="login-submit-button"
            >
              Entrar
            </Button>

            { isRedirect && <Redirect to="/search" /> }
          </Form>
        </div>

      </main>
    );
  }
}
