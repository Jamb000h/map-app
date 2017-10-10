import React, { Component } from 'react';
import './App.css';
import SimpleMap from './SimpleMap'
import PointList from './PointList'
import NavigationPanel from './NavigationPanel'
import PointModal from './PointModal'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: require('./mockData.json'),
      mode: 'view',
      pointModal: false,
      pointModalIndex: null
    }
  }

  onNewMapPoint = event => {
    const newPoint = {
      "title": "The Restaurant " + Math.random(),
      "latitude": event.lat,
      "longitude": event.lng
    }
    this.setState( prevState => ({
      data: [...prevState.data, newPoint]
    }))
  }

  onEditMapPoint = (event, index) => {
    this.setState( prevState => ({
      pointModal: !prevState.pointModal,
      pointModalIndex: index
    }))
    /* FUNCTIONALITY FOR REMOVING A POINT
    this.setState( prevState => ({
      data: prevState.data.filter( (item, i) => {
        return i !== index
      })
    }))*/
  }

  onToggleEditMode = event => {
    const mode = event.target.checked ? 'edit' : 'view'
    this.setState( prevState => ({
      mode: mode
    }))
  }

  render() {
    
    const pointModal = this.state.pointModal ? <PointModal data={this.state.data[this.state.pointModalIndex]} /> : null;

    return (
      <div className="App">
        {pointModal}
        <NavigationPanel onToggleEditMode={this.onToggleEditMode} mode={this.state.mode} />
        <SimpleMap 
          mapPoints={this.state.data}
          onNewMapPoint={this.onNewMapPoint}
          onEditMapPoint={this.onEditMapPoint}
          mode={this.state.mode}
        />
        <PointList mapPoints={this.state.data} />
      </div>
    );
  }
}

export default App;
