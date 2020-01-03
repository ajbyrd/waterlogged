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
                this.setState({ locations: locations })
            })
    }

    deleteLocation = (id) => {
        APIManager.delete("locations", id)
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
                <section className="cf">
                    <div className="add-button">
                        <button
                            className="b ph3 pv2 input-reset ba ml3 b--black bg-transparent grow pointer f6 dib"
                            type="button"
                            onClick={() => { this.props.history.push("/locations/new") }}>
                            Add Location
                    </button>
                    </div>
                    <div className="container-cards">
                        {this.state.locations.map(water =>
                            <LocationCard
                                key={water.id}
                                water={water}
                                deleteLocation={this.deleteLocation}
                                {...this.props}
                            />
                        )}
                    </div>
                </section>

            </>
        )
    }

}

export default LocationList