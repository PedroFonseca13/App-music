import React, { Component } from 'react';
import userImg from '../assets/imgs/Sample_User_Icon.png';
import { getUser } from '../services/userAPI';
import './userContainer.css';

export default class UserContainer extends Component {
  constructor() {
    super();

    this.state = {
      user: '',
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    const userName = await getUser();
    this.setState({
      user: userName.name,
    });
  };

  render() {
    const { user } = this.state;

    return (
      <div className="user-container">
        <div className="img-container">
          <img src={ userImg } alt="" />
        </div>
        <p
          className="user-name"
          data-testid="header-user-name"
        >
          { user }
        </p>
      </div>
    );
  }
}
