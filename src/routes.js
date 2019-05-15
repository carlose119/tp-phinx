// Dependencies
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Components
import App from './components/App';
import About from './components/About';
import Cars from './components/Cars';
import Home from './components/Home';
import Page404 from './components/Page404';

const AppRoutes = () =>
  <App>
    <Switch>
      <Route exact path="/about" component={About} />
      <Route exact path="/cars" component={Cars} />
      <Route exact path="/" component={Home} />
      <Route component={Page404} />
    </Switch>
  </App>;

export default AppRoutes;
