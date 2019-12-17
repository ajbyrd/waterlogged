import React, { Component } from 'react'
import APIManager from '../module/APIManager';


class TripForm extends Component {

    state = {
        date: '',
        gear: '',
        isComplete: false,
        locationId: '',
        seasonId: '',
        locations: [],
        seasons: [],
        seasonName: '',
        waterName: '',
        loadingStatus: false
    }

    componentDidMount() {

        if(!this.props.isNew) {
        APIManager.get("trips", this.props.match.params.tripId)
        .then(trip => {
            this.setState({
                userId: JSON.parse(localStorage.getItem("credentials")).userId,
                date: trip.date,
                gear: trip.gear,
                isComplete: trip.isComplete,
                locationId: Number(trip.locationId),
                seasonId: Number(trip.seasonId),
                loadingStatus: false
            })
        })
        APIManager.getAll("locations")
            .then(results => {
                this.setState({
                    locations: results,
                    locationId: this.state.locationId
                })
            })
        APIManager.getAll("seasons")
            .then(r => {
                this.setState({
                    seasons: r,
                    seasonId: this.state.seasonId
                })
            })
        } else {
            APIManager.getAll("locations")
            .then(results => {
                this.setState({
                    locations: results,
                    locationId: results[0].id,
                })
            })
        APIManager.getAll("seasons")
            .then(r => {
                this.setState({
                    seasons: r,
                    seasonId: r[0].id
                })
            })
        }
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange)
    }

    createTrip = evt => {
        evt.preventDefault()
        if (this.state.gear === "" || this.state.date === "") {
            window.alert("Please complete all fields")
        } else {
            this.setState({ loadingStatus: true })
            const userId = JSON.parse(localStorage.getItem("credentials")).userId
            const trip = {
                userId: Number(userId),
                date: this.state.date,
                gear: this.state.gear,
                isComplete: this.state.isComplete,
                locationId: Number(this.state.locationId),
                seasonId: Number(this.state.seasonId)
            }

            APIManager.post("trips", trip)
                .then(() => {
                    if (this.state.isComplete === true) {
                        this.props.history.push("/pasttrips")
                    } else {
                        this.props.history.push("/futuretrips")
                    }
                })
        }

    }

    updateExistingTrip = evt => {
        evt.preventDefault()
        this.setState({ loadingStatus: true })
        const userId = JSON.parse(localStorage.getItem("credentials")).userId
        const editedTrip = {

            id: this.props.match.params.tripId,
            userId: Number(userId),
            date: this.state.date,
            gear: this.state.gear,
            isComplete: this.state.isComplete,
            locationId: Number(this.state.locationId),
            seasonId: Number(this.state.seasonId)
        }
        APIManager.put("trips", this.props.match.params.tripId, editedTrip)
        .then(() => {
            if (this.state.isComplete === true) {
                this.props.history.push("/pasttrips")
            } else {
                this.props.history.push("/futuretrips")
            }
        })
    }





    handleCheckbox = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.checked
        this.setState(stateToChange)
    }


    render() {
        return (
            <>
                <form>
                    <label>
                        Completed Trip?
                        <input
                            name="isComplete"
                            id="isComplete"
                            type="checkbox"
                            checked={this.state.isComplete}
                            onChange={this.handleCheckbox}
                            value={this.state.isComplete}
                        />
                    </label>
                    <label>
                        Date
                    <input
                            name="date"
                            id="date"
                            type="date"
                            onChange={this.handleFieldChange}
                            required
                            value={this.state.date}
                        />
                    </label>
                    <label>
                        Gear
                    <textarea
                            name="gear"
                            id="gear"
                            type="text"
                            onChange={this.handleFieldChange}
                            required
                            value={this.state.gear}
                        />
                    </label>

                    <label>Select Location
                        <select as="select" id="locationId" onChange={this.handleFieldChange} value={this.state.locationId}>
                            {this.state.locations.map(location => (
                                <option key={`select-option-${location.id}`} value={location.id}>{location.waterName}</option>
                            ))}
                        </select>
                    </label>

                    <label >Select Season
                        <select id="seasonId" onChange={this.handleFieldChange} value={this.state.seasonId} >
                            {this.state.seasons.map(season => (
                                <option key={`select-option-${season.id}`} value={season.id}>{season.season}</option>
                            ))}
                        </select>
                    </label>
                    <button
                        type="button"
                        disabled={this.state.loadingStatus}
                        onClick={this.props.isNew ? this.createTrip : this.updateExistingTrip}
                    >Log Trip
                </button>
                </form>
            </>
        )
    }
}

export default TripForm