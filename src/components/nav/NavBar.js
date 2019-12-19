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
            <nav class="pa3 pa4-ns">
                    <a class="black b f1 f-headline-ns tc db mb3 mb4-ns">
                        Waterlogged
                    </a>
                <div class="tc pb3">
                    <a class="link dim gray f6 f5-ns dib mr3"><Link to='/home'>Home</Link></a>
                    <a class="link dim gray f6 f5-ns dib mr3">
                        <Link to='/pasttrips'>Past Trips</Link>
                    </a>
                    <a class="link dim gray f6 f5-ns dib mr3">
                        <Link to='/futuretrips'>Future Trips</Link>
                    </a>
                    <a class="link dim gray f6 f5-ns dib mr3">
                        <Link to='/locations'>Locations</Link>
                    </a>

                        {
                            !this.props.authenticated() ?
                                <>
                                    <a class="link dim gray f6 f5-ns dib mr3">
                                        <Link to="/login">Login</Link>
                                    </a>

                                    <a class="link dim gray f6 f5-ns dib mr3">
                                        <Link to="/register">Register</Link>
                                    </a>
                                </>
                                :
                                <a class="link dim gray f6 f5-ns dib mr3">
                                    <Link onClick={this.handleLogout}>Logout</Link>
                                </a>
                        }

                    
                </div>

            </nav>

        )
    }

}

export default withRouter(NavBar)
