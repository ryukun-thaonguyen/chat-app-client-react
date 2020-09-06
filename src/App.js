import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Sign from './components/auth/Sign';
import Resgister from './components/auth/Resgister';
import Home from './components/home/Home';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/sign-in" exact>
            <Sign/>
          </Route>
          <Route path="/sign-up">
            <Resgister/>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
     
      
    );
  }
}

export default App;