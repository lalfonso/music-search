import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Detail from './components/Detail/Detail'
import PageNotFound from './components/PageNotFound/404'
import Music from './components/Music/Music';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/" exact component={Music} />
          <Route path="/detail/:artist/:album" component={Detail} />
          <Route path="/404" component={PageNotFound} />
          <Redirect to="/404" />
        </Switch>

      </div>
    );
  }
}

export default App;
