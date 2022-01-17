import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';
import './Header.css';

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
  };

  render() {
    const { user, isLoading } = this.state;

    return (
      <>
        <header data-testid="header-component" className="header">
          <div className="logo">
            <h1>TrybeTunes</h1>
          </div>
          <div className="user">
            {isLoading ? (
              <Loading />
            ) : (
              <p data-testid="header-user-name">{user}</p>
            )}
          </div>
        </header>
        <nav>
          <Link to="/search" data-testid="link-to-search">Search</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          <Link to="/profile" data-testid="link-to-profile">Profile</Link>
        </nav>
      </>
    );
  }
}
