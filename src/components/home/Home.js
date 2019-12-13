import React, { Component } from 'react'

class Home extends Component {


  handleNewTripButton = (evt) => {
    evt.preventDefault()
    if (this.props.authenticated()) {
      this.props.history.push("/tripform")
    } else {
      window.alert('Please register or log in.')
    }

  }

  handleNewLocationButton = (evt) => {
    evt.preventDefault()
    if (this.props.authenticated()) {
      this.props.history.push("/locationform")
    } else {
      window.alert('Please register or log in.')
    }

  }

  render() {
    return (
      <>
        <h1>
          Waterlogged
      </h1>
        <p>
          Waterlogged is your new one stop shop for keeping track of past and future fly-fishing trips. Get started by choosing an option below!
      </p>
        <button
          onClick={this.handleNewTripButton}
        >Add Trip from Existing Location</button>
        <button
          onClick={this.handleNewLocationButton}
        >Add New Location</button>
      </>
    )
  }
}

export default Home