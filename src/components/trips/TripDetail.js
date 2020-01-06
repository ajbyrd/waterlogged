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
        locationId: '',
        loadingStatus: true,
        imageUrl: ''
    }

    componentDidMount() {
        APIManager.get("trips", `${this.props.tripId}?_expand=location&_expand=season`)
            .then((trip) => {
                this.setState({
                    waterName: trip.location.waterName,
                    date: trip.date,
                    gear: trip.gear,
                    waterAccess: trip.location.waterAccess,
                    fish: trip.location.fish,
                    season: trip.season.season,
                    locationId: Number(trip.locationId),
                    loadingStatus: false,
                    imageUrl: trip.imageUrl

                });
            });
    }

    render() {
        return (
            <>
                <div className="mb4 add-button">
                    <button
                        className="b ph3 pv2 input-reset ba ml3 b--black bg-transparent grow pointer f6 dib"
                        type="button" onClick={() => { this.props.history.push(`/trips/${this.props.tripId}/edit`) }}>Edit Trip Details</button>
                </div>
                <div id="outer-div" className="cf pa1 pa1-m pa1-l mw8 mb4 center ba bw2 b--dark-green br3">
                    <div id="info-div" className="">
                        <h1 className="f2 f1-l lh-title mt0 mb4 mb1-ns" >{this.state.waterName}</h1>
                        <h2 className="dn db-ns">{this.state.date}</h2>

                        <div>Water Access: {this.state.waterAccess}</div>


                        <div>Gear: {this.state.gear}</div>


                        <div>Fish: {this.state.fish}</div>


                        <div>Season: {this.state.season}</div>

                    </div>
                    <div id="img-div" className="center" >
                        {(this.state.imageUrl !== "")
                            ? <><img className="db mt4 mr2 measure center" src={this.state.imageUrl} alt={this.state.waterName} /><br /></>
                            : null}
                    </div>
                </div>
            </>
        )
    }

}

export default TripDetail