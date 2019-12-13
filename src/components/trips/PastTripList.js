import React, { Component } from 'react'
import TripCard from './TripCard'
import APIManager from '../module/APIManager'


const loggedInUserId = () => JSON.parse(localStorage.getItem("credentials")).userId

class PastTripList extends Component {
    state = {
        trips: []
    }

    componentDidMount() {
        APIManager.getAll(`trips?userId=${loggedInUserId()}&_expand=location&_expand=season`)
            .then((trips) => {
                const pastTrips = trips.filter(trip => {
                    let past = false
                    if (trip.isPast === true) {
                        past = true
                    }
                    return past
                })
                this.setState({ trips: pastTrips })
            })
    }

    deleteTrip = (id) => {
        APIManager.delete(id)
            .then(() => {
                APIManager.getAll(`trips?userId=${loggedInUserId()}&_expand=location&_expand=season`)
                    .then((newTrips) => {
                        const newPastTrips = newTrips.filter(trip => {
                            let past = false
                            if (trip.isPast === true) {
                                past = true
                            }
                            return past
                        })
                        this.setState({
                            trips: newPastTrips
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
                        Add Past Trip
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

export default PastTripList