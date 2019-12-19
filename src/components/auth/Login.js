

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
            <main class="pa4 black-80">
                <form class="measure center" onSubmit={this.handleLogin}>
                    <fieldset class="ba b--transparent ph0 mh0">
                        <legend class="f4 fw6 ph0 mh0">Sign In</legend>
                        <div class="mt3">
                            <label class="db fw6 lh-copy f6" htmlFor="inputEmail" >Email Address</label>
                            <input
                                class="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                onChange={this.handleFieldChange}
                                type="email"
                                id="email"
                                required="" autoFocus="" />
                        </div>
                        <div class="mv3">
                            <label class="db fw6 lh-copy f6" htmlFor="inputPassword">Password</label>
                            <input
                                class="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                onChange={this.handleFieldChange}
                                type="password"
                                id="password"                        
                                required="" />
                        </div>
                    </fieldset>
                    <div class="">
                        <input class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"></input>
                    </div>
          </form>
          </main>
                )
            }
        
        
        }
        
export default Login