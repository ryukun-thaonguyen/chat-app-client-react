import React, { Component } from 'react';
import Discusstion from './path/Discusstion';
import Setting from './path/Setting';
import { Route, Switch } from 'react-router-dom';
import Chat from './Chat';

class SideBar extends Component {
    render() {
        return (
            <div className="sidebar" id="sidebar">
                <div className="container">
                    <div className="col-md-12">
                        <div className="tab-content">
                            <Switch>
                                <Route path="/discusstion" exact>
                                    <Discusstion />
                                </Route>
                                <Route path="/" >
                                    <Discusstion />
                                </Route>
                                <Route path="/:id" >
                                    <Discusstion />
                                </Route>
                                <Route path="/setting" >
                                    <Setting />
                                </Route>
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SideBar;