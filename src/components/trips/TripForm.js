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
        seasons: []
    }

    componentDidMount() {
        APIManager.getAll("locations")
        .then(results => {
            this.setState({locations: results,
                            locationId: results[0].id
            })
        })
        APIManager.getAll("seasons")
        .then(r => {
            this.setState({ seasons: r,
                seasonId: r[0].id })
        })
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
                    />
                </label>
                
                            <label>Select Location
                        <select as="select" id="locationId" onChange={this.handleFieldChange}>
                        {this.state.locations.map(location => (
                            <option key={`select-option-${location.id}`} value={location.id}>{location.waterName}</option>
                        ))}
                        </select>
                        </label>
                    
                        <label >Select Season
                        <select id="seasonId" onChange={this.handleFieldChange}>
                        {this.state.seasons.map(season => (
                            <option key={`select-option-${season.id}`} value={season.id}>{season.season}</option>
                        ))}
                        </select>
                        </label>
                <button
                    type="button"
                    disabled={this.state.loadingStatus}
                    onClick={this.createTrip}
                >Log Trip
                </button>
            </form>
        </>
    )
    }
}

export default TripForm