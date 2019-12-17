import React, { Component } from 'react'



class LocationCard extends Component {




    render() {
        return (
            <>
                <div>
                    <h2><span>{this.props.water.waterName}</span></h2>
                    <h3>{this.props.water.waterAccess}</h3>
                    <h3>{this.props.water.fish}</h3>
                    <button
                    onClick={() => this.props.deleteLocation(this.props.water.id)}>Delete Location</button>
                    <button
                    onClick={() => {this.props.history.push(`/locations/${this.props.water.id}/edit`)}}>Edit Location</button>
                </div>
            </>
        )
    }
}

export default LocationCard