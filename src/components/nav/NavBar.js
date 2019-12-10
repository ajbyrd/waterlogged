import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom"


class NavBar extends Component {

    handleLogout = () => {
        this.props.clearUser();
        this.props.history.push('/home');
      }

    render() {
        return (
            <nav>
                <ul>
                    <li>
                       <Link to='/PastTrips'>Past Trips</Link>
                    </li>
                    <li>
                        <Link to='/FutureTrips'>Future Trips</Link>
                    </li>
                </ul>
                <span>
                    <ul>
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
                </span>

            </nav>

        )
    }

}

export default withRouter(NavBar)
