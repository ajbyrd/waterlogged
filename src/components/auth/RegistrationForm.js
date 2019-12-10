import React, { Component } from 'react'
import APIManager from '../../modules/APIManager'

class RegistrationForm extends Component {
    state = {
        username: "",
        email: "",
        password: "",
        loadingStatus: false,
    }

    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    handleRegistration = (entry) => {
        entry.preventDefault()
        if (this.state.username === "" || this.state.email === "" || this.state.password === "") {
            window.alert("Please complete all fields")
        } else {
            this.setState({ loadingStatus: true })
            const registrationInfo = {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
            }
            APIManager.post("users", registrationInfo)
                .then(() =>
                    APIManager.getAll(`users?email=${this.state.email}`)
                        .then((newUser) => {
                            this.props.setUser({
                                email: this.state.email,
                                password: this.state.password,
                                userId: newUser[0].id,
                                name: newUser[0].username
                            })
                            this.props.history.push("/home")
                        })

                )
        }
    }

    render() {
        return (
            <form onSubmit={this.handleRegistration}>
                <h3>Register an Account</h3>
                <fieldset>
                    <label htmlFor="username">Username</label>
                    <input
                        onChange={this.handleFieldChange}
                        type="username"
                        id="username"
                        placeholder="Full Name"
                        required="" autoFocus="" />
                </fieldset>
                <fieldset>
                    <label htmlFor="email">Email Address</label>
                    <input
                        onChange={this.handleFieldChange}
                        type="email"
                        id="email"
                        placeholder="Email Address"
                        required="" autoFocus="" />
                </fieldset>
                <fieldset>
                    <label htmlFor="password">Password</label>
                    <input
                        onChange={this.handleFieldChange}
                        type="password"
                        id="password"
                        placeholder="Password"
                        required="" autoFocus="" />
                </fieldset>
                <button
                    type="submit">
                    Register
                </button>
            </form>
        )
    }
}

export default RegistrationForm 