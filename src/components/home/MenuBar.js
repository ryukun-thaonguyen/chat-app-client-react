import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import cookie from 'react-cookies';
class MenuBar extends Component {
    constructor() {
        super()
        this.logout = this.logout.bind(this)
    }
    logout() {
        cookie.remove('user_id');
        cookie.remove('user_token');
        window.location.reload();
    }
    render() {
        return (
            <div className="navigation">
                <div className="container">
                    <div className="inside">
                        <div className="nav nav-tab menu">
                            <button className="btn">
                                <img className="avatar-xl" src="http://127.0.0.1:8000/storage/public/user_avartar/default.png" alt="avatar" />
                            </button>
                            <Link to="/contact" className="show">
                                <i className="material-icons">account_circle</i>
                            </Link>
                            <Link to="/discusstion" className="show">
                                <i className="material-icons active">chat_bubble_outline</i>
                            </Link>
                            <Link to="/notification" className=" f-grow1 show">
                                <i className="material-icons ">notifications_none</i>
                            </Link>
                            <button className="btn mode">
                                <i className="material-icons">brightness_2</i>
                            </button>
                            <Link to="/setting" className="show">
                                <i className="material-icons">settings</i>
                            </Link>
                            <button className="btn power" onClick={this.logout}>
                                <i className="material-icons">power_settings_new</i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default MenuBar;