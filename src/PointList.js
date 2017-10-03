import React, { Component } from 'react'

class PointList extends Component {
  render() {
    const points = this.props.mapPoints.map( (point, index) => {
      return (
        <li key={index}>
          <h2>{point.title}</h2>
        </li>
      )
    })
    return (
      <div className="pointList">
        <ul>
          {points}
        </ul>
      </div>
    )
  }
}

export default PointList