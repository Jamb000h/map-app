import React, { Component } from 'react';

class Point extends Component {
  handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    event.target.nextSibling.style.display = event.target.nextSibling.style.display === 'block' ? 'none' : 'block';
  }
  render () {
    return (
      <div className="map-marker" onClick={this.handleClick} data-id={this.props.key}>
        <img src={require('./mapPointMarker.png')} className="mapPointMarker" />
        <div className="map-marker-popup" data-id={this.props.key}>
          <h3>{this.props.data.title}</h3>
          <p>{this.props.data.description}</p>
        </div>
      </div>
    )
  }
}

export default Point;