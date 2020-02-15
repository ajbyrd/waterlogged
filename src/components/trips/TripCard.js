import { Link } from 'react-router-dom'
import React, { Component } from 'react'

class TripCard extends Component {




    render() {
        return (
            <>
                <article id="cards" className="card mw5 grow center bg-white br3 pa3 pa4-ns mv3 ba b--black-10">
                    <div>
                        <div className="center tc">
                            <img src={this.props.trip.imageUrl || ""} className="br-100 h4 w4 dib pa2" title="card image"></img>
                            <h2><span>{this.props.trip.location.waterName || ""}</span></h2>
                            <h3>{this.props.trip.date || ""}</h3>
                        </div>
                        <div className="center tc">
                            <Link to={`/trips/${this.props.trip.id}`}><button className="b ph2 pv2 input-reset ba ml1 b--black bg-transparent grow pointer f6 dib">Trip Details</button></Link>
                            <button
                                className="b ph3 pv2 input-reset ba ml1 b--black bg-transparent grow pointer f6 dib"
                                onClick={() => this.props.deleteTrip(this.props.trip.id)}>Delete</button>
                        </div>
                    </div>
                </article>
            </>
        )
    }
}

export default TripCard