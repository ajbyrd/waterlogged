import React, { Component } from 'react'
import APIManager from '../module/APIManager'


class LocationForm extends Component {

    state = {
        waterName: '',
        waterAccess: '',
        fish: '',
        loadingStatus: false
    }


    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange)
    }

    createLocation = evt => {
        evt.preventDefault()
        if (this.state.waterName === "" || this.state.waterAccess === "" || this.state.fish === "" ) {
            window.alert("Please complete all fields")
        } else {
            this.setState({ loadingStatus: true })
            const userId = JSON.parse(localStorage.getItem("credentials")).userId
            const location = {
                userId: Number(userId),
                waterName: this.state.waterName,
                waterAccess: this.state.waterAccess,
                fish: this.state.fish
            }
            APIManager.post("locations", location)
            .then(() => this.props.history.push("/home"))
        }
    }

    updateExistingLocation = evt => {
        evt.preventDefault()
        this.setState({ loadingStatus: true })
        const userId = JSON.parse(localStorage.getItem("credentials")).userId
        const editedLocation = {

            id: this.props.match.params.locationId,
            userId: Number(userId),
            waterName: this.state.waterName,
            waterAccess: this.state.waterAccess,
            fish: this.state.fish
        }
        APIManager.put("locations", editedLocation.id, editedLocation)
        .then(() => this.props.history.push("/futuretrips"))
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
                    />
                </label>
                <button
                    type="button"
                    disabled={this.state.loadingStatus}
                    onClick={this.createLocation}
                >Add Location
                </button>
            </form>
        )
    }


}

export default LocationForm