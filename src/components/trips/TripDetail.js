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
                    waterAccess: trip.location.waterAccess,
                    fish: trip.location.fish,
                    season: trip.season.season,
                    loadingStatus: false
                });
            });
    }

    render() {
        return (
            <>
                <div>
                    <h1>{this.state.waterName}</h1>
                    <h3>{this.state.date}</h3>
                    {/* <img>{this.state.imageUrl}</img> */}
                </div>
                <aside>
                    <section>Water Access: {this.state.waterAccess}</section>
                    <section>Gear: {this.state.gear}</section>
                    <section>Fish: {this.state.fish}</section>
                    <section>Season: {this.state.season}</section>
                    <button>Edit Trip Details</button>
                    <button>Edit Location Details</button>
                </aside>


            </>
        )
    }

}

export default TripDetail