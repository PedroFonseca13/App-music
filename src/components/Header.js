import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
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
        {' '}
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <header data-testid="header-component" className="header">
              <div className="logo">
                <h1>TrybeTunes</h1>
              </div>
              <div className="user">
                <p data-testid="header-user-name">{user}</p>
              </div>
            </header>
            <nav className="nav">
              <Link to="/search" data-testid="link-to-search" className="nav-link">
                Search
              </Link>
              <Link to="/favorites" data-testid="link-to-favorites" className="nav-link">
                Favorites
              </Link>
              <Link to="/profile" data-testid="link-to-profile" className="nav-link">
                Profile
              </Link>
            </nav>
          </>
        )}
      </>
    );
  }
}
