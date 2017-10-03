import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Point from './Point'

class SimpleMap extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mapPoints: this.props.mapPoints
    }
  }

  static defaultProps = {
    center: {lat: 60.192059, lng: 24.945831},
    zoom: 11
  };

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
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {points}
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;