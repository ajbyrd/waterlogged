import React, { Component } from 'react'
import APIManager from '../module/APIManager'

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
            <main className="pa4 black-80">
            <form className="measure center" onSubmit={this.handleRegistration}>
                <fieldset className="ba b--transparent ph0 mh0">
                    <legend className="f4 fw6 ph0 mh0">Registration</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="inputUsername">Username</label>
                        <input
                            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                            onChange={this.handleFieldChange}
                            type="username"
                            id="username"
                            required="" autoFocus="" />
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="inputEmail" >Email Address</label>
                        <input
                            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                            onChange={this.handleFieldChange}
                            type="email"
                            id="email"
                            required="" autoFocus="" />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="inputPassword">Password</label>
                        <input
                            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                            onChange={this.handleFieldChange}
                            type="password"
                            id="password"                        
                            required="" />
                    </div>
                </fieldset>
                <div className="">
                    <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register"></input>
                </div>
      </form>
      </main>
        )
    }
}

export default RegistrationForm 