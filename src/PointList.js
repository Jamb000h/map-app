import React, { Component } from 'react'

class PointList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mapPoints: this.props.mapPoints
    }
  }

  componentWillReceiveProps = nextProps => {
    this.setState({
      mapPoints: nextProps.mapPoints
    })
  }
  
  render() {
    const points = 
    this.state.mapPoints.length > 0 ? this.state.mapPoints.map( (point, index) => {
      return (
        <li key={index}>
          <h2>{point.title}</h2>
        </li>
      )
    }) : null
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