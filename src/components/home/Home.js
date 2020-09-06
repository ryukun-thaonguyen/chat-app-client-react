import React, { Component } from 'react';
import MenuBar from './MenuBar';
import SideBar from './SideBar';
import cookie from 'react-cookies';
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom';
import Chat from './Chat';
import API from '../../ApiHref';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_token: '',
            user_id: '',
            isLoading: false
        }

        this.postAPI = this.postAPI.bind(this);
        this.setCookie = this.setCookie.bind(this);
    }
    componentWillMount() {
        this.setState({ isLoading: true });
        try {
            var user_token = cookie.load('user_token');
            if (user_token) {
                this.setState({ user_token })
                this.postAPI(API.API_USER, {}, user_token)
                    .then(data => this.setCookie(data.id));
            }
        } catch (e) {
            return (
                <Redirect to="/sign-in" />
            )
        }
    }
    setCookie(id) {
        cookie.save('user_id', id, { path: '/' });
        this.setState({ user_id: id, isLoading: false });
    }
    async postAPI(url = '', data = {}, token = "") {
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token

            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        });
        return response.json();
    }
    render() {
        if (this.state.user_token == '') {
            return (<Redirect to="/sign-in" />)
        } else {
            if (this.state.user_id == '') {

                // cookie.remove('user_token');
                // return (
                //     <Redirect to="/sign-in" />
                // )
            }

            return (
                <main>
                    <div className="layout">
                        <BrowserRouter>
                            <MenuBar />
                            <SideBar />
                            <Switch>
                                <Route path="/:id" component={Chat} exact />
                            </Switch>
                        </BrowserRouter>
                    </div>
                </main>
            );
        }
    }
}
export default Home;