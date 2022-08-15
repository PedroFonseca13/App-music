import React from 'react';
import { Link } from 'react-router-dom';
import './navigation.css';

const navigation = () => (
  <div className="navigation position-fixed">
    <nav className="nav-container">
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
  </div>
);

export default navigation;
