import React, { Component } from 'react';
import Loading from '../pages/Login';
import { getUser } from '../services/userAPI';

export default class Index extends Component {
  constructor() {
    super();

    this.state = {
      user: '',
      isLoading: true,
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    const userName = await getUser();
    this.setState({
      user: userName.name,
      isLoading: false,
    });
  }

  render() {
    const { isLoading, user } = this.state;

    // if (isLoading) {
    //   return <Loading />;
    // }
    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">{user}</p>
      </header>
    );
  }
}
