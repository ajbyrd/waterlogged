import React, { Component } from "react";
import NavBar from "./nav/NavBar";
import ApplicationViews from "./ApplicationViews";

class Waterlogged extends Component {

    state = {
        user: false
    }


    authenticated = () => localStorage.getItem('credentials') !== null

    setUser = (authObj) => {
        localStorage.setItem(
            'credentials',
            JSON.stringify(authObj)
        )
        this.setState({
            user: this.authenticated()
        })
    }

    clearUser = () => {
        localStorage.removeItem("credentials")
        this.setState({
            user: this.authenticated()
        });
    }

    componentDidMount() {
        this.setState({
            user: this.authenticated()
        })
    }

    render() {
        return (
            <>
                <NavBar user={this.state.user} clearUser={this.clearUser} authenticated={this.authenticated} />
                <ApplicationViews user={this.state.user} setUser={this.setUser} />
            </>
        )
    }

}

export default Waterlogged