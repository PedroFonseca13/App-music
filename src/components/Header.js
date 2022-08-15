import React, { Component } from 'react';
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
          <header data-testid="header-component py-4" className="header position-fixed">
            <div className="header-container container">
              <div className="logo">
                <h1>TrezeTunes</h1>
              </div>
              <UserContainer />
            </div>
          </header>
        ) }
      </>
    );
  }
}
