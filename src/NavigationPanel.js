import React, { Component } from 'react'

class NavigationPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mode: this.props.mode
    }
  }

  componentWillReceiveProps = nextProps => {
    this.setState({
      mode: nextProps.mode
    })
  }

  handleToggleEditMode = event => {
    this.props.onToggleEditMode(event)
  }
  
  render() {

    return (
      <div className="navigationPanel">
        <label>
          Edit mode
          <input
            type="checkbox"
            checked={this.state.mode === 'edit' ? true : false}
            onChange={this.handleToggleEditMode}
          />
        </label>
      </div>
    )
  }
}

export default NavigationPanel