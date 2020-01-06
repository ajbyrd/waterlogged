import React, { Component } from 'react'



class LocationCard extends Component {




    render() {
        return (
            <>
                <article id="cards" className="mw5 card center bg-white br3 pa3 pa4-ns mv3 ba b--black-10">
                    <div className="center tc">
                        <h2><span>{this.props.water.waterName}</span></h2>
                        <h3>{this.props.water.waterAccess}</h3>
                        <h3>{this.props.water.fish}</h3>
                        <div className="tc">
                            <button
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                onClick={() => this.props.deleteLocation(this.props.water.id)}>Delete</button>
                            <button
                                className="b ph3 pv2 input-reset ba ml3 b--black bg-transparent grow pointer f6 dib"
                                onClick={() => { this.props.history.push(`/locations/${this.props.water.id}/edit`) }}>Edit</button>
                        </div>
                    </div>
                </article>
            </>
        )
    }
}

export default LocationCard