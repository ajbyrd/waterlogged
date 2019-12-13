import React, { Component } from 'react'
import TripCard from './TripCard'
import APIManager from '../module/APIManager'


const loggedInUserId = () => JSON.parse(localStorage.getItem("credentials")).userId

class FutureTripList extends Component {
    state = {
        trips: []
    }

    componentDidMount() {
        APIManager.getAll(`trips?userId=${loggedInUserId()}&_expand=location&_expand=season`)
            .then((trips) => {
                const futureTrips = trips.filter(trip => {
                    let future = false
                    if (trip.isFuture === true) {
                        future = true
                    }
                    return future
                })
                this.setState({ trips: futureTrips })
            })
    }

    deleteTrip = (id) => {
        APIManager.delete(id)
            .then(() => {
                APIManager.getAll(`trips?userId=${loggedInUserId()}&_expand=location&_expand=season`)
                    .then((newTrips) => {
                        const newFutureTrips = newTrips.filter(trip => {
                            let future = false
                            if (trip.isFuture === true) {
                                future = true
                            }
                            return future
                        })
                        this.setState({
                            trips: newFutureTrips
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
                        Plan Future Trip
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

export default FutureTripList