

import React, { Component } from 'react'
import APIManager from '../../modules/APIManager'

class Login extends Component {

    state = {
        email: "",
        password: ""
    }


    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    componentDidMount() {
        if (this.props.authenticated()) {
            this.props.history.push("/home")
        }
    }

    handleLogin = (evt) => {
        evt.preventDefault()
        APIManager.getAll(`users?email=${this.state.email}`)
            .then((userInfo) => {
                if (userInfo.length !== 0) {
                    if (this.state.password === userInfo[0].password) {
                        const authObj = {
                            email: this.state.email,
                            password: this.state.password,
                            userId: userInfo[0].id,
                            name: userInfo[0].username
                        }
                        this.props.setUser(authObj)
                        this.props.history.push("/home")
                    } else {
                        window.alert("Please enter the correct password")
                    }
                } else {
                    window.alert("Please enter the correct email address")
                }
            })
    }

    render() {
        return (
            <form  onSubmit={this.handleLogin}>
            <h3>Please enter login info</h3>
              <fieldset>
                <label htmlFor="inputEmail" >Email Address</label>
                <input
                  onChange={this.handleFieldChange} 
                  type="email"
                  id="email"
                  placeholder="Email address"
                  required="" autoFocus="" />
              </fieldset>
              <fieldset>
                <label htmlFor="inputPassword">Password</label>
                <input
                  onChange={this.handleFieldChange} 
                  type="password"
                  id="password"
                  placeholder="Password"
                  required="" />
              </fieldset>
            <button 
              type="submit">
                Log in
            </button>
          </form>
        )
    }


}

export default Login