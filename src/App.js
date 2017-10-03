import React, { Component } from 'react';
import './App.css';
import SimpleMap from './SimpleMap'
import PointList from './PointList'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: require('./mockData.json')
    }
  }
  render() {
    return (
      <div className="App">
        <SimpleMap mapPoints={this.state.data} />
        <PointList mapPoints={this.state.data} />
      </div>
    );
  }
}

export default App;
