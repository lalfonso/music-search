import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Music from './components/Music/Music';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Music />
      </div>
    );
  }
}

export default App;
