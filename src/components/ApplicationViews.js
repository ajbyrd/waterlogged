import { Route } from 'react-router-dom'
import React, { Component } from 'react'
// import { Redirect } from 'react-router-dom'
import Login from './auth/Login'
import RegistrationForm from './auth/RegistrationForm'
import APIManager from './module/APIManager'
import Home from './home/Home'
import TripForm from './trips/TripForm'
import PastTripList from './trips/PastTripList'
import TripDetail from './trips/TripDetail'
import FutureTripList from './trips/FutureTripList'
import LocationForm from './trips/LocationForm'
import LocationEditForm from './trips/LocationEditForm'
import LocationList from './trips/LocationList'

class ApplicationViews extends Component {

    authenticated = () => localStorage.getItem('credentials') !== null

    getUserId = () => {
        if (this.authenticated()) {
            return JSON.parse(localStorage.getItem('credentials')).userId
        }
    }

    render() {
        return (
            <>
                <Route
                    exact path="/register" render={props => {
                        return <RegistrationForm setUser={this.props.setUser} {...props} />

                    }}
                />

                <Route
                    exact path="/login" render={props => {
                        return <Login setUser={this.props.setUser} authenticated={this.authenticated} {...props} />
                    }}
                />
                <Route
                    exact path="/" render={props => {
                        return !this.authenticated() ?
                            <Login setUser={this.props.setUser} authenticated={this.authenticated} {...props} />
                            : <Home {...props} />
                    }}
                />
                <Route
                    exact path="/home" render={props => {
                        return <Home setUser={this.props.setUser} authenticated={this.authenticated} {...props} />
                    }}
                />

                <Route
                    exact path="/trips/new" render={props => {
                        return <TripForm setUser={this.props.setUser} authenticated={this.authenticated} {...props} isNew={true} />
                    }}
                />
                <Route
                    exact path="/futuretrips" render={props => {
                        return <FutureTripList setUser={this.props.setUser} authenticated={this.authenticated} {...props} />
                    }}
                />
                <Route
                    exact path="/pasttrips" render={props => {
                        return <PastTripList setUser={this.props.setUser} authenticated={this.authenticated} {...props} />
                    }}
                />
                <Route exact path="/trips/:tripId(\d+)" render={(props) => {
                    return <TripDetail tripId={parseInt(props.match.params.tripId)} {...props}  />
                }} />
                <Route
                    path="/trips/:tripId(\d+)/edit" render={props => {
                        return <TripForm {...props} tripId={parseInt(props.match.params.tripId)} setUser={this.props.setUser} authenticated={this.authenticated}
                        isNew={false} />
                    }}
                />
                <Route
                    exact path="/locations" render={props => {
                        return <LocationList setUser={this.props.setUser} authenticated={this.authenticated} {...props} />
                    }}
                />
                <Route
                    exact path="/locations/new" render={props => {
                        return <LocationForm setUser={this.props.setUser} authenticated={this.authenticated} {...props} isNew={true} />
                    }}
                />
                <Route
                    path="/locations/:locationId(\d+)/edit" render={props => {
                        return <LocationEditForm {...props} locationId={parseInt(props.match.params.locationId)} setUser={this.props.setUser} authenticated={this.authenticated}
                        isNew={false} />
                    }}
                />
            </>
        )
    }

}

export default ApplicationViews