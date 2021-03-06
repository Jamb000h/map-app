import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Point from './Point'

class SimpleMap extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mapPoints: this.props.mapPoints,
      mode: this.props.mode
    }
    
  }

  static defaultProps = {
    center: {lat: 60.192059, lng: 24.945831}, // Helsinki
    zoom: 11
  };

  componentWillReceiveProps = nextProps => {
    this.setState({
      mapPoints: nextProps.mapPoints,
      mode: nextProps.mode
    })
  }

  handleNewMapPoint = event => {
    this.props.onNewMapPoint(event)
  }

  handleEditMapPoint = (event, index) => {
    this.props.onEditMapPoint(event, index)
  }

  fetchPlaces = (map, maps) => {
    console.log('Fetch from Google API starting')
    var helsinki = new maps.LatLng(60.192059,24.945831);

    var request = {
      location: helsinki,
      radius: '500',
      query: 'restaurant'
    };

    var callback = function(data) {
      console.log('This is from Google API: ', data)
    }

    var service = new maps.places.PlacesService(map);
    service.textSearch(request, callback);
  }

  render() {
    const points = 
      this.state.mapPoints.length > 0 ?
      this.state.mapPoints.map( (point, index) => {
        return (
        <Point
          key={index}
          lat={point.latitude}
          lng={point.longitude}
          data={point}
          onMarkerClick={ event => {
            this.state.mode === 'edit' ? this.handleEditMapPoint(event, index) : null
            }
          }
        />
        )
      }) : null

    return (
      <div className="mapWrapper">
        <GoogleMapReact
          onGoogleApiLoaded={({map, maps}) => this.fetchPlaces(map, maps)}
          yesIWantToUseGoogleMapApiInternals={true}
          bootstrapURLKeys={{
            key: process.env.REACT_APP_GOOGLE_MAPS_APIKEY
          }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onChildMouseDown={() => {}}
          onClick={ event => {
              this.state.mode === 'edit' ? this.handleNewMapPoint(event) : null
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