import React, { Component } from 'react'



class LocationCard extends Component {




    render() {
        return (
            <>
                <div>
                    <h2><span>{this.props.location.waterName}</span></h2>
                    <h3>{this.props.location.waterAccess}</h3>
                    <h3>{this.props.location.fish}</h3>
                    <button
                    onClick={() => this.props.deleteLocation(this.props.location.id)}>Delete Location</button>
                    <button
                    onClick={() => {this.props.history.push(`/locations/${this.props.location.id}/edit`)}}>Edit Location</button>
                </div>
            </>
        )
    }
}

export default LocationCard