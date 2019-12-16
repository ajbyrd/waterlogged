import React, { Component } from 'react'
import APIManager from '../module/APIManager'


class LocationEditForm extends Component {

    state = {
        waterName: '',
        waterAccess: '',
        fish: '',
        loadingStatus: true
    }

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
      }

      updateExistingLocation = evt => {
          evt.preventDefault()
          this.setState({ loadingStatus: true })
          const editedLocation = {
              id: this.props.match.params.locationId,
              waterName: this.state.waterName,
              waterAccess: this.state.waterAccess,
              fish: this.state.fish
          }
          APIManager.put("locations", editedLocation.id, editedLocation)
          .then(() => this.props.history.push("/futuretrips"))
      }

      componentDidMount() {
          APIManager.get(this.props.match.params.locationId)
          .then(location => {
              this.setState({
                  waterName: location.waterName,
                  waterAccess: location.waterAccess,
                  fish: location.fish,
                  loadingStatus: false
              })
          })
      }

      render() {
        return (
            <form>
                <label>
                    Water Name
                            <input
                        name="waterName"
                        id="waterName"
                        type="text"
                        onChange={this.handleFieldChange}
                        required
                        value={this.state.waterName}
                    />
                </label>
                <label>
                    Water Access
                            <input
                        name="waterAccess"
                        id="waterAccess"
                        type="text"
                        onChange={this.handleFieldChange}
                        required
                        value={this.state.waterAccess}
                    />
                </label>
                <label>
                    Fish Species
                            <textarea
                        name="fish"
                        id="fish"
                        type="text"
                        onChange={this.handleFieldChange}
                        required
                        value={this.state.fish}
                    />
                </label>
                <button
                    type="button"
                    disabled={this.state.loadingStatus}
                    onClick={this.updateExistingLocation}
                >Edit Location
                </button>
            </form>
        )
    }

}

export default LocationEditForm