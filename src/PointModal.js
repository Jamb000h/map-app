import React, { Component } from 'react';

class PointModal extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: this.props.data
    }
  }

  handlePointTypeChange = event => {
    const data = this.state.data
    data.type = event.target.value
    this.setState( prevState => ({
      data: data
    }))
  }

  handleTextInputChange = event => {
    return;
  }

  render () {

    return (
    <div className="pointModal">
      <p className="pointModalTitle">
        Add, edit or remove point based on app state
      </p>
      <p className="pointModalLatLng">
        Point LatLng (smaller font)
      </p>
      <form>

        <label htmlFor="type">Type</label>
        <select
          id="type"
          value={ this.state.data.type ? this.state.data.type : 'restaurant' }
          onChange={ this.handlePointTypeChange }
        >
          <option value="restaurant">Restaurant</option>
          <option value="cinema">Cinema</option>
          <option value="bar">Bar</option>
        </select>

        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          value={ this.state.data.address ? this.state.data.address : '' }
        />

        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={ this.state.data.city ? this.state.data.city : '' }
        />

        <label htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          value={ this.state.data.description ? this.state.data.description : '' }
        >
        </textarea>
        
      </form>
    </div>
    )
  }
}

export default PointModal;