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

  render() {
    return (
      <>
        <h1>
          Waterlogged
      </h1>
        <p>
          Waterlogged is your new one stop shop for keeping track of past and future fly-fishing trips. Get started by clicking the button below!
      </p>
        <button
          onClick={this.handleNewTripButton}
        >Add Trip</button>
      </>
    )
  }
}

export default Home