import React, { Component } from 'react'
import APIManager from '../module/APIManager'


class TripDetail extends Component {

    state = {
        date: '',
        gear: '',
        waterName: '',
        waterAccess: '',
        fish: '',
        season: '',
        loadingStatus: true
    }

    componentDidMount() {
        console.log("AnimalDetail: ComponentDidMount");
        APIManager.get(`${this.props.tripId}?_expand=location&_expand=season`)
            .then((trip) => {
                this.setState({
                    waterName: trip.location.waterName,
                    date: trip.date,
                    gear: trip.gear,
                    waterAccess: trip.location.gear,
                    fish: trip.location.fish,
                    season: trip.season.season,
                    loadingStatus: false
                });
            });
    }

    render() {
        return (
        <h1>{this.state.waterName}</h1>

        )
    }

}

export default TripDetail