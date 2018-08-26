import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import Welcome from './Welcome';
import Login from './Login';
import Signup from './Signup';

const Landing = () => (
  <div>
    <Route
      exact
      path="/"
      component={Welcome}
    />
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
    </Switch>
  </div>
);

export default Landing;
