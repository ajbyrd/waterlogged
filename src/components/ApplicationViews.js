import { Route } from 'react-router-dom'
import React, { Component } from 'react'
// import { Redirect } from 'react-router-dom'
import Login from './auth/Login'
import RegistrationForm from './auth/RegistrationForm'
import APIManager from './module/APIManager'
import Home from './home/Home'
import TripForm from './trips/TripForm'
import TripList from './trips/TripList'
import TripDetail from './trips/TripDetail'

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
                    exact path="/tripform" render={props => {
                        return <TripForm setUser={this.props.setUser} authenticated={this.authenticated} {...props} />
                    }}
                />
                 <Route
                    exact path="/triplist" render={props => {
                        return <TripList setUser={this.props.setUser} authenticated={this.authenticated} {...props} />
                    }}
                />
                <Route exact path="/trips/:tripId(\d+)" render={(props) => {
                    return <TripDetail tripId={parseInt(props.match.params.tripId)} {...props} />
                }} />
            </>
        )
    }

}

export default ApplicationViews