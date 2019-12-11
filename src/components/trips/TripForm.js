import React, { Component } from 'react'
import APIManager from '../../module/APIManager'


class TripForm extends Component {

    state = {
        userId: '',
        locationId: '',
        commentId: '',
        seasonId: '',
        date: '',
        gear: '',
        isFuture: false,
        isPast: false,
        isPrivate: '',
        waterName: '',
        waterAccess: '',
        fish: '',
        season: ''
    }


    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange)
    }

    createTrip = evt => {
        evt.preventDefault()
        
    }

    // handleInputChange = evt => {
    //     const target = evt.target;
    //     const value = target.type === 'checkbox' ? target.checked : target.value;
    //     const isFuture = target.isFuture;

    //     this.setState({ isFuture: value })

    // }


    render() {
        return (
            <form>
                <label>
                    Future Trip?
                        <input
                        name="isFuture"
                        type="checkbox"
                        checked={this.state.isFuture}
                        onChange={this.handleFieldChange}
                    />
                </label>
                <label>
                    Past Trip?
                        <input
                        name="isPast"
                        type="checkbox"
                        checked={this.state.isFuture}
                        onChange={this.handleFieldChange}
                    />
                </label>
                <label>
                    Would you like to make these trip details private?
                        <input
                        name="isPrivate"
                        type="checkbox"
                        checked={this.state.isFuture}
                        onChange={this.handleFieldChange}
                    />
                </label>
                <label>
                    Water Name
                            <input
                        name="waterName"
                        type="text"
                        onChange={this.handleFieldChange}
                        required
                    />
                </label>
                {/* <label>
                    Date
                    <input 
                        name="date"
                        type="date"
                        onChange={this.handleFieldChange}
                        required
                    />    
                </label> */}
                <label>
                    Water Access
                            <input
                        name="waterAccess"
                        type="text"
                        onChange={this.handleFieldChange}
                        required
                    />
                </label>
                <label>
                    Gear
                            <textarea
                        name="gear"
                        type="text"
                        onChange={this.handleFieldChange}
                        required
                    />
                </label>
            </form>
        )
    }


}

export default TripForm