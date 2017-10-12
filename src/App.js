import React, { Component } from 'react';
import './App.css';
import SimpleMap from './SimpleMap'
import PointList from './PointList'
import NavigationPanel from './NavigationPanel'
import PointModal from './PointModal'
import axios from 'axios'

const apiURL = 'http://ec2-34-253-186-58.eu-west-1.compute.amazonaws.com:3000'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      mode: 'view',
      pointModal: false,
      pointModalIndex: null
    }
  }

  componentDidMount = () => {
    console.log("Fetch starting")
    axios.get(apiURL + '/points')
    .then( newData => {
      console.log("Fetched this: ", newData.data)
      this.setState( prevState => ({
        data: newData.data
      }))
    })
    .catch( error => {
      console.log("Could not get points: ", error)
    })
  }

  onNewMapPoint = event => {
    const newPoint = {
      "title": "The Restaurant " + Math.random(),
      "latitude": event.lat,
      "longitude": event.lng
    }
    axios.post(apiURL + '/points', newPoint)
    .then( data => {
      this.setState( prevState => ({
        data: [...prevState.data, data.data]
      }))
    })
    .catch( error => {
      console.log("Could not add point: ", error)
    })
  }

  onEditMapPoint = (event, index) => {
    this.setState( prevState => ({
      pointModal: true,
      pointModalIndex: index,
      pointModalMode: 'edit'
    }))
  }

  onRemovePoint = (uuid) => {
    console.log('Removing point with UUID ', uuid)
    axios.delete(apiURL + '/points/' + uuid)
    .then( data => {
      this.setState( prevState => ({
        data: prevState.data.filter( item => {
          return item.uuid !== uuid
        }),
        pointModal: false,
        pointModalIndex: null
      }))
      console.log('Removed point with UUID ', uuid)
    })
    .catch( error => {
      console.log("Could not remove point: ", error)
    })
  }

  onModalClose = () => {
    this.setState( prevState => ({
      pointModal: false,
      pointModalIndex: null
    }))
  }

  onToggleEditMode = event => {
    const mode = event.target.checked ? 'edit' : 'view'
    this.setState( prevState => ({
      mode: mode
    }))
  }

  render() {
    
    const pointModal = this.state.pointModal ? 
    <PointModal
      data={this.state.data[this.state.pointModalIndex]}
      mode={this.state.pointModalMode}
      onRemovePoint={this.onRemovePoint}
      onModalClose={this.onModalClose}
    /> : null;

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
