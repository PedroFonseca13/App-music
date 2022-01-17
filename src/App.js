import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import album from './pages/album';
import favorites from './pages/favorites';
import login from './pages/login';
import notFound from './pages/notFound';
import profile from './pages/profile';
import profileEdit from './pages/profileEdit';
import search from './pages/search';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ login } />
          <Route exact path="/search" component={ search } />
          <Route exact path="/album/:id" component={ album } />
          <Route exact path="/favorites" component={ favorites } />
          <Route exact path="/profile" component={ profile } />
          <Route exact path="/profile/edit" component={ profileEdit } />
          <Route exact path="*" component={ notFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
