import React, { Component } from 'react';
import './App.css';
import SimpleMap from './SimpleMap'
import PointList from './PointList'
import NavigationPanel from './NavigationPanel'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: require('./mockData.json'),
      editMode: false
    }
  }

  onNewMapPoint = event => {
    const newPoint = {
      "title": "The Restaurant " + Math.random(),
      "latitude": event.lat,
      "longitude": event.lng,
      "type": "Restaurant",
      "description": "This is a restaurant.",
      "address": "Postikatu 1 A 1",
      "city": "Helsinki",
      "services": [
        "Lunch",
        "Dinner",
        "Catering",
        "Drinks",
        "Snacks"
      ],
      "openingHours": [
        {
          "day": "monday",
          "time": "00:00"
        },
        {
          "day": "tuesday",
          "time": "02:00"
        },
        {
          "day": "wednesday",
          "time": "00:00"
        },
        {
          "day": "thursday",
          "time": "04:00"
        },
        {
          "day": "friday",
          "time": "05:00"
        },
        {
          "day": "saturday",
          "time": "06:00"
        },
        {
          "day": "sunday",
          "time": "07:00"
        }
      ],
      "closingHours": [
        {
          "day": "monday",
          "time": "00:00"
        },
        {
          "day": "tuesday",
          "time": "12:00"
        },
        {
          "day": "wednesday",
          "time": "00:00"
        },
        {
          "day": "thursday",
          "time": "21:30"
        },
        {
          "day": "friday",
          "time": "22:00"
        },
        {
          "day": "saturday",
          "time": "09:00"
        },
        {
          "day": "sunday",
          "time": "11:59"
        }
      ],
      "tags": [
        "Helsinki",
        "Restaurant",
        "24/7",
        "Lunch",
        "Dinner",
        "Catering",
        "Drinks",
        "Snacks"
      ]
    }
    this.setState( prevState => ({
      data: [...prevState.data, newPoint]
    }))
  }

  onModeChange = event => {
    const editMode = event.target.checked === true ? true : false
    console.log(editMode)
    this.setState( prevState => ({
      editMode: editMode
    }))
  }

  render() {
    return (
      <div className="App">
        <NavigationPanel onModeChange={this.onModeChange}/>
        <SimpleMap 
          mapPoints={this.state.data}
          onNewMapPoint={this.onNewMapPoint}
          editMode={this.state.editMode}
        />
        <PointList mapPoints={this.state.data} />
      </div>
    );
  }
}

export default App;
