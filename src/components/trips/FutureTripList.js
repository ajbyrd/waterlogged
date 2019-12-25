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
                    let future = true
                    if (trip.isComplete === true) {
                        future = false
                    }
                    return future
                })
                this.setState({ trips: futureTrips })
            })
    }

    deleteTrip = (id) => {
        APIManager.delete("trips", id)
            .then(() => {
                APIManager.getAll(`trips?userId=${loggedInUserId()}&_expand=location&_expand=season`)
                    .then((newTrips) => {
                        const newFutureTrips = newTrips.filter(trip => {
                            let future = true
                            if (trip.isComplete === true) {
                                future = false
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
                <section className="add-button">
                    <button type="button"
                        className="b ph3 pv2 input-reset ba ml3 b--black bg-transparent grow pointer f6 dib"
                        onClick={() => { this.props.history.push("/trips/new") }}>
                        Plan Future Trip
                    </button>
                </section>
                <div className="container-cards">
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