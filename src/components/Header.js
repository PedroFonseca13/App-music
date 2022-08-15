import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserContainer from './UserContainer';
import Loading from './Loading';
import './Header.css';

export default class Index extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    this.setState({
      isLoading: false,
    });
  };

  render() {
    const { isLoading } = this.state;

    return (
      <>
        { ' ' }
        { isLoading ? (
          <Loading />
        ) : (
          <>
            <header data-testid="header-component py-4" className="header">
              <div className="header-container container">
                <div className="logo">
                  <h1>TrezeTunes</h1>
                </div>
                <UserContainer />
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
        ) }
      </>
    );
  }
}
