

import React, { Component } from 'react'
import APIManager from '../module/APIManager'

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
            <main className="pa4 black-80">
                <form className="measure center" onSubmit={this.handleLogin}>
                    <fieldset className="ba b--transparent ph0 mh0">
                        <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="inputEmail" >Email Address</label>
                            <input
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
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
                        <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"></input>
                    </div>
          </form>
          </main>
                )
            }
        
        
        }
        
export default Login