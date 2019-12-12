import React, { Component } from 'react'
// import APIManager from '../../module/APIManager'


class TripForm extends Component {

    state = {
        locationId: '',
        commentId: '',
        seasonId: '',
        date: '',
        gear: '',
        isFuture: false,
        isPast: false,
        isPrivate: false,
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
        if (this.state.waterName === "" || this.state.waterAccess === "" || this.state.fish === "" || this.state.gear === "" ||this.state.date === "") {
            window.alert("Please complete all fields")
        } else {
            this.setState({ loadingStatus: true })
            const userId = JSON.parse(localStorage.getItem("credentials")).userId
            
        }

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
                    Make private?
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
                    Fish Species
                            <input
                        name="fish"
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
                <button
                    type="button"
                    disabled={this.state.loadingStatus}
                    onClick={this.createTrip}
                >Log Trip
                </button>
            </form>
        )
    }


}

export default TripForm