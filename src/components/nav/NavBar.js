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
            <nav className="pa3 pa4-ns">
                    <div id="logo-head" className="black b f1 f-headline-ns tc db mb3 mb4-ns">
                        Waterlogged
                    </div>
                <div className="tc pb3">
                    <div className="link dim gray f6 f4-ns dib mr3"><Link to='/home'>Home</Link></div>
                    <div className="link dim gray f6 f4-ns dib mr3">
                        <Link to='/pasttrips'>Past Trips</Link>
                    </div>
                    <div className="link dim gray f6 f4-ns dib mr3">
                        <Link to='/futuretrips'>Future Trips</Link>
                    </div>
                    <div className="link dim gray f6 f4-ns dib mr3">
                        <Link to='/locations'>Locations</Link>
                    </div>

                        {
                            !this.props.authenticated() ?
                                <>
                                    <div className="link dim gray f6 f4-ns dib mr3">
                                        <Link to="/login">Login</Link>
                                    </div>

                                    <div className="link dim gray f6 f4-ns dib mr3">
                                        <Link to="/register">Register</Link>
                                    </div>
                                </>
                                :
                                <div className="link dim gray f6 f4-ns dib mr3">
                                    <Link to="/home" onClick={this.handleLogout}>Logout</Link>
                                </div>
                        }

                    
                </div>

            </nav>

        )
    }

}

export default withRouter(NavBar)
