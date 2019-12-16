import React, { Component } from 'react'
import APIManager from '../module/APIManager';


class TripForm extends Component {

    state = {
        date: '',
        gear: '',
        isFuture: false,
        isPast: false,
        isPrivate: false,
        locationId: '',
        seasonId: '',
        locations: [],
        seasons: [],
        loadingStatus: false
    }

    componentDidMount() {

        if(!this.props.isNew) {
        APIManager.get("trips", this.props.match.params.tripId)
        .then(trip => {
            console.log(trip)
            this.setState({
                userId: JSON.parse(localStorage.getItem("credentials")).userId,
                date: trip.date,
                gear: trip.gear,
                isFuture: trip.isFuture,
                isPast: trip.isPast,
                isPrivate: trip.isPrivate,
                locationId: Number(trip.locationId),
                seasonId: Number(trip.seasonId),
                loadingStatus: false
            })
        })
        APIManager.getAll("locations")
            .then(results => {
                this.setState({
                    locations: results,
                    locationId: results[0].id
                })
            })
        APIManager.getAll("seasons")
            .then(r => {
                this.setState({
                    seasons: r,
                    seasonId: r[0].id
                })
            })
        } else {
            APIManager.getAll("locations")
            .then(results => {
                this.setState({
                    locations: results,
                    locationId: results[0].id
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
                isFuture: this.state.isFuture,
                isPast: this.state.isPast,
                isPrivate: this.state.isPrivate,
                locationId: Number(this.state.locationId),
                seasonId: Number(this.state.seasonId)
            }

            APIManager.post("trips", trip)
                .then(() => {
                    if (this.state.isFuture === true) {
                        this.props.history.push("/futuretrips")
                    } else {
                        this.props.history.push("/pasttrips")
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
            isFuture: this.state.isFuture,
            isPast: this.state.isPast,
            isPrivate: this.state.isPrivate,
            locationId: Number(this.state.locationId),
            seasonId: Number(this.state.seasonId)
        }
        APIManager.put("trips", this.props.match.params.tripId, editedTrip)
        .then(() => {
            if (this.state.isFuture === true) {
                this.props.history.push("/futuretrips")
            } else {
                this.props.history.push("/pasttrips")
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
                        Future Trip?
                        <input
                            name="isFuture"
                            id="isFuture"
                            type="checkbox"
                            checked={this.state.isFuture}
                            onChange={this.handleCheckbox}
                            value={this.state.isFuture}
                        />
                    </label>
                    <label>
                        Past Trip?
                        <input
                            name="isPast"
                            id="isPast"
                            type="checkbox"
                            checked={this.state.isPast}
                            onChange={this.handleCheckbox}
                            value={this.state.isPast}
                        />
                    </label>
                    <label>
                        Make private?
                        <input
                            name="isPrivate"
                            id="isPrivate"
                            type="checkbox"
                            checked={this.state.isPrivate}
                            onChange={this.handleCheckbox}
                            value={this.state.isPrivate}
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
                        <select id="seasonId" onChange={this.handleFieldChange} >
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