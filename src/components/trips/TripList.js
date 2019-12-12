import React, { Component } from 'react'
import TripCard from './TripCard'
import APIManager from '../module/APIManager'


const loggedInUserId = () => JSON.parse(localStorage.getItem("credentials")).userId

class TripList extends Component {
    state = {
        trips: []
    }

    componentDidMount() {
        APIManager.getAll(`trips?userId=${loggedInUserId()}&_expand=location&_expand=season`)
            .then((trips) => {
                this.setState({ trips: trips })
            })
    }

    deleteTrip = (id) => {
        APIManager.delete(id)
            .then(() => {
                APIManager.getAll(`trips?userId=${loggedInUserId()}&_expand=location&_expand=season`)
                    .then((newTrips) => {
                        this.setState({
                            trips: newTrips
                        })
                    })
            })
    }

    render() {
        return (
            <>
                <section>
                    <button type="button"
                        onClick={() => { this.props.history.push("/tripform") }}>
                        New Trip
                    </button>
                </section>
                <div>
                    {this.state.trips.map(trip =>
                        <TripCard
                            key={trip.id}
                            trip={trip}
                            deleteTrip={this.deleteTrip}
                            {...this.props}
                        />
                    )}

                </div>

            </>
        )
    }

}

export default TripList