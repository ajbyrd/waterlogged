import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom"
import './NavBar.css'

class NavBar extends Component {

    handleLogout = () => {
        this.props.clearUser();
        this.props.history.push('/home');
    }

    render() {
        return (
            <nav>
                <ul className="container">
                    <li>
                        <Link to='/home'>Home</Link>
                    </li>
                    <li>
                        <Link to='/pasttrips'>Past Trips</Link>
                    </li>
                    <li>
                        <Link to='/futuretrips'>Future Trips</Link>
                    </li>
                    

                        {
                            !this.props.authenticated() ?
                                <>
                                    <li>
                                        <Link to="/login">Login</Link>
                                    </li>

                                    <li>
                                        <Link to="/register">Register</Link>
                                    </li>
                                </>
                                :
                                <li>
                                    <button onClick={this.handleLogout}>Logout</button>
                                </li>
                        }

                    
                </ul>

            </nav>

        )
    }

}

export default withRouter(NavBar)
