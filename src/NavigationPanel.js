import React, { Component } from 'react'

class NavigationPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editMode: this.props.editMode
    }
  }

  componentWillReceiveProps = nextProps => {
    this.setState({
      editMode: nextProps.editMode
    })
  }

  handleModeChange = event => {
    this.props.onModeChange(event)
  }
  
  render() {
    return (
      <div className="navigationPanel">
        <label>
          Edit mode
          <input
            type="checkbox"
            checked={this.props.editMode}
            onChange={this.handleModeChange}
          />
        </label>
      </div>
    )
  }
}

export default NavigationPanel