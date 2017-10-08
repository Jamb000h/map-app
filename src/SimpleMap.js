import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Point from './Point'

class SimpleMap extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mapPoints: this.props.mapPoints,
      editMode: this.props.editMode
    }
  }

  static defaultProps = {
    center: {lat: 60.192059, lng: 24.945831}, // Helsinki
    zoom: 11
  };

  componentWillReceiveProps = nextProps => {
    this.setState({
      mapPoints: nextProps.mapPoints,
      editMode: nextProps.editMode
    })
  }

  handleNewMapPoint = event => {
    this.props.onNewMapPoint(event)
  }

  handleChildClick = event => {
    console.log("cheers");
  }

  render() {
    const points = 
      this.state.mapPoints.map( (point, index) => {
        return (
        <Point
          key={index}
          lat={point.latitude}
          lng={point.longitude}
          data={point}
        />
        )
      })

    return (
      <div className="mapWrapper">
        <GoogleMapReact
          bootstrapURLKeys={{
            key: 'AIzaSyBivuF4JYT0fg7cFCa-Ork7fvMiMVq6ujU '
          }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onChildMouseDown={() => {}}
          onChildClick={this.handleChildClick}
          onClick={ (event) => {
            console.log("asd")
              this.state.editMode ? this.handleNewMapPoint(event) : undefined
            }
          }
        >
          {points}
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;