import React, { Component } from 'react';

class Point extends Component {
  handleMarkerHover = (event) => {
    console.log("Marker")
    event.target.nextSibling.style.display = event.target.nextSibling.style.display === 'block' ? 'none' : 'block'
  }

  renderDates = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const openingHours = days.map( day => {
      const opensAt = 'opensAt'+day
      const closesAt = 'closesAt'+day
      if(this.props.data.openingHours[opensAt] === '00:00' && this.props.data.openingHours[closesAt] === '00:00') {
        return <td key={day}>24h</td>
      } 
      return <td key={day}>{this.props.data.openingHours[opensAt]} - {this.props.data.openingHours[closesAt]}</td>
    })
    return openingHours
  }

  render () {

    const openingHours = this.renderDates()

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
                {openingHours.length > 0 ? 
                openingHours
                 : <td>No data available</td>}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default Point;