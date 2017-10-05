import React, { Component } from 'react';

// MAP API KEY AIzaSyBivuF4JYT0fg7cFCa-Ork7fvMiMVq6ujU 

class Point extends Component {
  handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    event.target.nextSibling.style.display = event.target.nextSibling.style.display === 'block' ? 'none' : 'block';
  }

  renderDates = (value, index) => {
    if(value.time === '00:00' && this.props.data.closingHours[index].time === '00:00') {
      return <td>24h</td>
    } 
    return <td>{value.time} - {this.props.data.closingHours[index].time}</td>
  }

  render () {

    const weekday = new Date().getDay()

    return (
      <div className="map-marker" data-id={this.props.key}>
        <img src={require('./mapPointMarker.png')} className="mapPointMarker" onClick={this.handleClick} />
        <div className="map-marker-popup" data-id={this.props.key}>
          <h3>{this.props.data.title}</h3>
          <p>
            {this.props.data.address}
          </p>
          <br />
          <table>
            <thead>
              <td>Mon</td>
              <td>Tue</td>
              <td>Wed</td>
              <td>Thu</td>
              <td>Fri</td>
              <td>Sat</td>
              <td>Sun</td>
            </thead>
            <tr>
              {this.props.data.openingHours.map(this.renderDates)}
            </tr>
          </table>
        </div>
      </div>
    )
  }
}

export default Point;