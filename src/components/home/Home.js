import React, { Component } from 'react'
import brookTrout from './Brook_trout_DuaneRavenArt.png'

class Home extends Component {


  handleNewTripButton = (evt) => {
    evt.preventDefault()
    if (this.props.authenticated()) {
      this.props.history.push("/trips/new")
    } else {
      window.alert('Please register or log in.')
    }

  }

  handleNewLocationButton = (evt) => {
    evt.preventDefault()
    if (this.props.authenticated()) {
      this.props.history.push("/locations/new")
    } else {
      window.alert('Please register or log in.')
    }

  }

  render() {
    return (
      <>
        <section className="mw5 mw7-ns center bg-light-gray pa3 ph5-ns">
          <p>
            Waterlogged is your new one stop shop for keeping track of past and future fly-fishing trips. Get started by choosing an option below!
        </p>
          <div className="tc">
            <button
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              onClick={this.handleNewTripButton}
            >Add Trip from Existing Location</button>
            <button
              className="b ph3 pv2 input-reset ba ml3 b--black bg-transparent grow pointer f6 dib"
              onClick={this.handleNewLocationButton}
            >Add New Location</button>
          </div>
        </section>
        <footer className="tc-l cover" id='footer-pic'>
          <img className="w-70" src={brookTrout}></img>
        </footer>

      </>
    )
  }
}

export default Home