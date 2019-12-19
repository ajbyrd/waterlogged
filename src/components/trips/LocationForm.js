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
        if (this.state.waterName === "" || this.state.waterAccess === "" || this.state.fish === "") {
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
                .then(() => this.props.history.push("/locations"))
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
            .then(() => this.props.history.push("/locations"))
    }


    componentDidMount() {

        if (!this.props.isNew) {
            APIManager.get("locations", this.props.match.params.locationId)
                .then(location => {
                    this.setState({
                        userId: JSON.parse(localStorage.getItem("credentials")).userId,
                        waterName: location.waterName,
                        waterAccess: location.waterAccess,
                        fish: location.fish
                    })
                })
        }
    }

    render() {
        return (
            <form class="pa4 black-80">
                <div class="measure">
                    <label class="f6 b db mb2">
                        Water Name
                            <input
                            class="input-reset ba b--black-20 pa2 mb2 db w-100"
                            name="waterName"
                            id="waterName"
                            type="text"
                            onChange={this.handleFieldChange}
                            required
                            value={this.state.waterName}
                        />
                    </label>
                    <label class="f6 b db mb2">
                        Water Access
                            <input
                            class="input-reset ba b--black-20 pa2 mb2 db w-100"
                            name="waterAccess"
                            id="waterAccess"
                            type="text"
                            onChange={this.handleFieldChange}
                            required
                            value={this.state.waterAccess}
                        />
                    </label>
                    <label class="f6 b db mb2">
                        Fish Species
                            <textarea
                            class="input-reset ba b--black-20 pa2 mb2 db w-100"
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
                        onClick={this.props.isNew ? this.createLocation : this.updateExistingLocation}
                    >Add Location
                </button>
                </div>
            </form>
        )
    }


}

export default LocationForm