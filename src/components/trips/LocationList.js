import React, { Component } from 'react'
import LocationCard from './LocationCard'
import APIManager from '../module/APIManager'


const loggedInUserId = () => JSON.parse(localStorage.getItem("credentials")).userId

class LocationList extends Component {
    state = {
        locations: []
    }

    componentDidMount() {
        APIManager.getAll(`locations?userId=${loggedInUserId()}`)
        .then((locations) => {
            this.setState({ locations: locations})
        })
    }

    deleteLocation = (id) => {
        APIManager.delete(id)
        .then(() => {
            APIManager.getAll(`locations?userId=${loggedInUserId()}`)
            .then((newLocations) => {
                this.setState({
                    locations: newLocations
                })
            })
        })
    }


    render() {
        return (
            <>
                <section>
                    <button type="button"
                        onClick={() => { this.props.history.push("/locations/new") }}>
                        Add Location
                    </button>
                </section>
                <div>
                    {this.state.locations.map(location =>
                        <LocationCard
                            key={location.id}
                            location={location}
                            deleteLocation={this.deleteLocation}
                            {...this.props}
                        />
                    )}

                </div>

            </>
        )
    }

}

export default LocationList