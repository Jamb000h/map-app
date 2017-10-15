import React, { Component } from 'react';
import axios from 'axios'

class PointModal extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: this.props.data || {
        title: '',
        type: 'restaurant',
        address: '',
        city: '',
        description: '',
        openingHours: {
          opensAtMonday: '00:00',
          closesAtMonday: '00:00',
          opensAtTuesday: '00:00',
          closesAtTuesday: '00:00',
          opensAtWednesday: '00:00',
          closesAtWednesday: '00:00',
          opensAtThursday: '00:00',
          closesAtThursday: '00:00',
          opensAtFriday: '00:00',
          closesAtFriday: '00:00',
          opensAtSaturday: '00:00',
          closesAtSaturday: '00:00',
          opensAtSunday: '00:00',
          closesAtSunday: '00:00'
        }
      },
      mode: this.props.mode,
      removeToggle: false,
      event: this.props.event || {},
      coords: this.props.coords === null ? 
        { lat: this.props.data.latitude, lng: this.props.data.longitude }
        : this.props.coords
    }
  }

  componentDidMount = () => {
    if(this.state.mode === 'new') {
     axios.get(
      'http://maps.googleapis.com/maps/api/geocode/json?latlng='
      + this.state.coords.lat + ',' + this.state.coords.lng
      + '&sensor=false'
    )
    .then( data => {
      if(this.state.data.address === '' && this.state.data.city === '') {
        const newData = this.state.data
        newData.address = data.data.results[0].formatted_address
        for (let component of data.data.results[0].address_components) {
          if(component.types[0] === 'locality') {
            newData.city = component.long_name
            break;
          }
        }
        this.setState( prevState => ({
          data: newData
        }))
      }
    })
    .catch (err => {
      console.log('Could not automatically fetch address')
    }) 
    }
  }

  handlePointTypeChange = event => {
    const data = this.state.data
    data.type = event.target.value
    this.setState( prevState => ({
      data: data
    }))
  }

  handleTextInputChange = (event, field) => {
    const data = this.state.data
    data[field] = event.target.value
    this.setState( prevState => ({
      data: data
    }))
  }

  handleDateChange = (event, field) => {
    const data = this.state.data
    data.openingHours = data.openingHours ? data.openingHours : []
    data.openingHours[field] = event.target.value
    this.setState( prevState => ({
      data: data
    }))
    console.log(this.state.data)
  }

  handleAddNewMapPoint = event => {
    event.preventDefault()
    const data = this.state.data
    data.latitude = this.state.coords.lat
    data.longitude = this.state.coords.lng
    this.setState( prevState => ({
      data: data
    }))
    this.props.addNewMapPoint(this.state.data)
  }

  handleUpdateMapPoint = event => {
    event.preventDefault()
    const data = this.state.data
    data.latitude = this.state.coords.lat
    data.longitude = this.state.coords.lng
    this.setState( prevState => ({
      data: data
    }))
    this.props.updateMapPoint(this.state.data)
  }

  handleRemovePoint = event => {
    this.props.onRemovePoint(this.state.data.uuid)
  }

  handleCancelAddPoint = event => {
    this.props.onCancelAddPoint()
  }

  handleModalClose = event => {
    this.props.onModalClose()
  }

  render () {

    const removeButton = 
      this.state.mode === 'edit' ?
        <span
          className="removeButton"
          onClick={this.handleRemovePoint}
        >
          Remove Point
        </span>
      : null

    const cancelButton = 
      <span
        className="cancelButton"
        onClick={this.handleCancelAddPoint}
      >
        Cancel
      </span>

    const addButton = 
      this.state.mode === 'new' ?
        <input type="submit"
          className="addButton"
          value="Add"
        />
      : null

    const updateButton = 
      this.state.mode === 'edit' ?
        <input type="submit"
          className="updateButton"
          value="Update"
        />
      : null

    const pointModalTitle =
      this.state.mode === 'new' ?
        'Add point'
      : 'Edit point'
    

    return (
    <div className="pointModal">
      <span
          className="closeModal"
          onClick={this.handleModalClose}
      >
        CLOSE
      </span>
      <form onSubmit={ this.state.mode === 'edit' ? this.handleUpdateMapPoint : this.handleAddNewMapPoint }>

        <p className="pointModalTitle">
          {pointModalTitle}
        </p>
        <p className="pointModalLatLng">
          Latitude: {this.state.coords.lat}<br />
          Longitude: {this.state.coords.lng}
        </p>

        <label htmlFor="type">Type</label>
        <select
          id="type"
          value={ this.state.data.type }
          onChange={ this.handlePointTypeChange }
        >
          <option value="restaurant">Restaurant</option>
          <option value="cinema">Cinema</option>
          <option value="bar">Bar</option>
        </select>

        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="address"
          value={ this.state.data.title }
          onChange={ event => this.handleTextInputChange(event, 'title') }
          required
        />

        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          value={ this.state.data.address }
          onChange={ event => this.handleTextInputChange(event, 'address') }
          required
        />

        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={ this.state.data.city }
          onChange={ event => this.handleTextInputChange(event, 'city') }
          required
        />

        <label htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          value={ this.state.data.description }
          onChange={ event => this.handleTextInputChange(event, 'description') }
        >
        </textarea>

        <p className="formTitle">Opening Times</p><p>(format: 01:01) - use 00:00 in both opening and closing time to indicate 24/7 for that particular day</p>
        <table className="openingTimes">
          <tbody>
            <tr>
              <td>
                <h3>Monday</h3>
                <label htmlFor="opensAtMonday">Opens</label>
                <input type="text" id="opensAtMonday" pattern="[0-9]{2}:[0-9]{2}"
                  value={ this.state.data.openingHours.opensAtMonday }
                  onChange={ event => this.handleDateChange(event, 'opensAtMonday')}
                  required
                />
                <label htmlFor="closesAtMonday">Closes</label>
                <input type="text" id="closesAtMonday" pattern="[0-9]{2}:[0-9]{2}"
                  value={ this.state.data.openingHours.closesAtMonday }
                  onChange={ event => this.handleDateChange(event, 'closesAtMonday')}
                  required  
                />
                  
              </td>
              <td>
                <h3>Tuesday</h3>
                <label htmlFor="opensAtTuesday">Opens</label>
                <input type="text" id="opensAtTuesday" pattern="[0-9]{2}:[0-9]{2}"
                  value={ this.state.data.openingHours.opensAtTuesday }
                  onChange={ event => this.handleDateChange(event, 'opensAtTuesday')}
                  required
                />
                <label htmlFor="closesAtTuesday">Closes</label>
                <input type="text" id="closesAtTuesday" pattern="[0-9]{2}:[0-9]{2}"
                  value={ this.state.data.openingHours.closesAtTuesday }
                  onChange={ event => this.handleDateChange(event, 'closesAtTuesday')}
                  required
                />
              </td>
              <td>
                <h3>Wednesday</h3>
                <label htmlFor="opensAtWednesday">Opens</label>
                <input type="text" id="opensAtWednesday" pattern="[0-9]{2}:[0-9]{2}"
                  value={ this.state.data.openingHours.opensAtWednesday }
                  onChange={ event => this.handleDateChange(event, 'opensAtWednesday')}
                  required
                />
                <label htmlFor="closesAtWednesday">Closes</label>
                <input type="text" id="closesAtWednesday" pattern="[0-9]{2}:[0-9]{2}"
                  value={ this.state.data.openingHours.closesAtWednesday }
                  onChange={ event => this.handleDateChange(event, 'closesAtWednesday')}
                  required
                />
              </td>
              <td>
                <h3>Thursday</h3>
                <label htmlFor="opensAtThursday">Opens</label>
                <input type="text" id="opensAtThursday" pattern="[0-9]{2}:[0-9]{2}"
                  value={ this.state.data.openingHours.opensAtThursday }
                  onChange={ event => this.handleDateChange(event, 'opensAtThursday')}
                  required
                />
                <label htmlFor="closesAtThursday">Closes</label>
                <input type="text" id="closesAtThursday" pattern="[0-9]{2}:[0-9]{2}"
                  value={ this.state.data.openingHours.closesAtThursday }
                  onChange={ event => this.handleDateChange(event, 'closesAtThursday')}
                  required
                />
              </td>
              <td>
                <h3>Friday</h3>
                <label htmlFor="opensAtFriday">Opens</label>
                <input type="text" id="opensAtFriday" pattern="[0-9]{2}:[0-9]{2}"
                  value={ this.state.data.openingHours.opensAtFriday }
                  onChange={ event => this.handleDateChange(event, 'opensAtFriday')}
                  required
                />
                <label htmlFor="closesAtFriday">Closes</label>
                <input type="text" id="closesAtFriday" pattern="[0-9]{2}:[0-9]{2}"
                  value={ this.state.data.openingHours.closesAtFriday }
                  onChange={ event => this.handleDateChange(event, 'closesAtFriday')}
                  required
                />
              </td>
              <td>
                <h3>Saturday</h3>
                <label htmlFor="opensAtSaturday">Opens</label>
                <input type="text" id="opensAtSaturday" pattern="[0-9]{2}:[0-9]{2}"
                  value={ this.state.data.openingHours.opensAtSaturday }
                  onChange={ event => this.handleDateChange(event, 'opensAtSaturday')}
                  required
                />
                <label htmlFor="closesAtSaturday">Closes</label>
                <input type="text" id="closesAtSaturday" pattern="[0-9]{2}:[0-9]{2}"
                  value={ this.state.data.openingHours.closesAtSaturday }
                  onChange={ event => this.handleDateChange(event, 'closesAtSaturday')}
                  required
                />
              </td>
              <td>
                <h3>Sunday</h3>
                <label htmlFor="opensAtSunday">Opens</label>
                <input type="text" id="opensAtSunday" pattern="[0-9]{2}:[0-9]{2}"
                  value={ this.state.data.openingHours.opensAtSunday }
                  onChange={ event => this.handleDateChange(event, 'opensAtSunday')}
                  required
                />
                <label htmlFor="closesAtSunday">Closes</label>
                <input type="text" id="closesAtSunday" pattern="[0-9]{2}:[0-9]{2}"
                  value={ this.state.data.openingHours.closesAtSunday }
                  onChange={ event => this.handleDateChange(event, 'closesAtSunday')}
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>
        {addButton}
        {updateButton}
        <div className="cancelRemoveWrapper">
          {cancelButton}
          {removeButton}
        </div>
      </form>
    </div>
    )
  }
}

export default PointModal;