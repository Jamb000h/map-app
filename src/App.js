import React, { Component } from 'react';
import './App.css';
import SimpleMap from './SimpleMap'
import NavigationPanel from './NavigationPanel'
import PointModal from './PointModal'
import axios from 'axios'

const apiURL = process.env.REACT_APP_APIURL

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      mode: 'view',
      pointModal: false,
      pointModalIndex: null,
      pointModalEvent: null,
      pointModalCoords: null,
      navigationVisible: true
    }
  }

  componentDidMount = () => {
    console.log("Fetch from custom API starting")
    axios.get(apiURL + '/points')
    .then( newData => {
      console.log("Fetched this from custom API: ", newData.data)
      this.setState( prevState => ({
        data: newData.data
      }))
    })
    .catch( error => {
      console.log("Could not get points: ", error)
    })
  }

  onNewMapPoint = event => {
    this.setState( prevState => ({
      pointModal: true,
      pointModalIndex: null,
      pointModalMode: 'new',
      pointModalCoords: {lat: event.lat, lng: event.lng},
      navigationVisible: false
    }))
  }

  addNewMapPoint = data => {
    axios.post(apiURL + '/points', data)
    .then( data => {
      this.setState( prevState => ({
        data: [...prevState.data, data.data],
        pointModal: false,
        pointModalIndex: null,
        pointModalMode: null,
        pointModalEvent: null,
        pointModalCoords: null,
        navigationVisible: true
      }))
    })
    .catch( error => {
      console.log("Could not add point: ", error)
      this.setState( prevState => ({
        pointModal: false,
        pointModalIndex: null,
        pointModalMode: null,
        pointModalEvent: null,
        pointModalCoords: null,
        navigationVisible: true
      }))
    })
  }

  onEditMapPoint = (event, index) => {
    this.setState( prevState => ({
      pointModal: true,
      pointModalIndex: index,
      pointModalMode: 'edit',
      navigationVisible: false
    }))
  }

  onRemovePoint = uuid => {
    console.log('Removing point with UUID ', uuid)
    axios.delete(apiURL + '/points/' + uuid)
    .then( data => {
      this.setState( prevState => ({
        data: prevState.data.filter( item => {
          return item.uuid !== uuid
        }),
        pointModal: false,
        pointModalIndex: null,
        pointModalMode: null,
        pointModalEvent: null,
        pointModalCoords: null,
        navigationVisible: true
      }))
      console.log('Removed point with UUID ', uuid)
    })
    .catch( error => {
      console.log("Could not remove point: ", error)
      this.setState( prevState => ({
        pointModal: false,
        pointModalIndex: null,
        pointModalMode: null,
        pointModalEvent: null,
        pointModalCoords: null,
        navigationVisible: true
      }))
    })
  }
  
  updateMapPoint = data => {
    console.log(data)
     axios.patch(apiURL + '/points/' + data.uuid, data)
    .then( data => {
      this.setState( prevState => ({
        data: [...prevState.data, data.data],
        pointModal: false,
        pointModalIndex: null,
        pointModalMode: null,
        pointModalEvent: null,
        pointModalCoords: null,
        navigationVisible: true
      }))
    })
  }

  onCancelAddPoint = () => {
    this.setState( prevState => ({
      pointModal: false,
      pointModalIndex: null,
      pointModalMode: null,
      pointModalEvent: null,
      pointModalCoords: null,
      navigationVisible: true
    }))
  }

  onModalClose = () => {
    this.setState( prevState => ({
      pointModal: false,
      pointModalIndex: null,
      pointModalMode: null,
      pointModalEvent: null,
      pointModalCoords: null,
      navigationVisible: true
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
      data={this.state.data ? this.state.data[this.state.pointModalIndex] : null}
      mode={this.state.pointModalMode}
      coords={this.state.pointModalCoords}
      addNewMapPoint={this.addNewMapPoint}
      onRemovePoint={this.onRemovePoint}
      updateMapPoint={this.updateMapPoint}
      onCancelAddPoint={this.onCancelAddPoint}
      onModalClose={this.onModalClose}
    /> : null;

    const navigationPanel = this.state.navigationVisible ?
    <NavigationPanel
      onToggleEditMode={this.onToggleEditMode}
      mode={this.state.mode} 
    />
    : null

    return (
      <div className="App">

        {pointModal}

       {navigationPanel}

        <SimpleMap 
          mapPoints={this.state.data}
          onNewMapPoint={this.onNewMapPoint}
          onEditMapPoint={this.onEditMapPoint}
          mode={this.state.mode}
        />

      </div>
    );
  }
}

export default App;
