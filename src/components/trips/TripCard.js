import { Link } from 'react-router-dom'
import React, { Compont } from 'react'


class TripCard extends Component {

    render() {
        return (
            <>
                <div>
                    <h2><span>{this.props.trip.location.waterName}></span></h2>
                    <h3>{this.props.trip.date}</h3>
                    <Link to={`/trips/${this.props.trip.id}`}><button>Trip Details</button></Link>
                </div>
            </>
        )
    }
}

export default TripCard