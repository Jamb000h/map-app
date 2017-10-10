import React, { Component } from 'react';

class Point extends Component {
  handleMarkerHover = (event) => {
    console.log("Marker")
    event.target.nextSibling.style.display = event.target.nextSibling.style.display === 'block' ? 'none' : 'block'
  }

  renderDates = (value, index) => {
    if(value.time === '00:00' && this.props.data.closingHours[index].time === '00:00') {
      return <td key={index}>24h</td>
    } 
    return <td key={index}>{value.time} - {this.props.data.closingHours[index].time}</td>
  }

  render () {

    return (
      <div className="map-marker">
        <img
          src={require('./mapPointMarker.png')}
          className="mapPointMarker"
          onClick={this.props.onMarkerClick}
          onMouseOver={this.handleMarkerHover}
          onMouseLeave={this.handleMarkerHover}
          onTouchStart={this.handleMarkerHover}
          onTouchCancel={this.handleMarkerHover}
          alt="Marker" />
        <div className="map-marker-popup">
          <h3>{this.props.data.title}</h3>
          <p>
            {this.props.data.address}
          </p>
          <br />
          <table>
            <thead>
              <tr>
                <td>Mon</td>
                <td>Tue</td>
                <td>Wed</td>
                <td>Thu</td>
                <td>Fri</td>
                <td>Sat</td>
                <td>Sun</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                {this.props.data.openingHours ? this.props.data.openingHours.map(this.renderDates) : <td>No data available</td>}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default Point;