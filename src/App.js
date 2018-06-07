import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './styles/App.less';
import './styles/App.scss';

import AsyncComponent from './components/AsyncComponent';

const AsyncHome = AsyncComponent(() => import('./scenes/home/Home'));
const AsyncDonors = AsyncComponent(() => import('./scenes/donors/Donors'));
const AsyncDonor = AsyncComponent(() => import('./scenes/donor/Donor'));
const AsyncCountries = AsyncComponent(() => import('./scenes/countries/Countries'));
const AsyncCountry = AsyncComponent(() => import('./scenes/country/Country'));
const AsyncServices = AsyncComponent(() => import('./scenes/services/Services'));
const AsyncService = AsyncComponent(() => import('./scenes/service/Service'));
const AsyncProjects = AsyncComponent(() => import('./scenes/projects/Projects'));
const AsyncProject = AsyncComponent(() => import('./scenes/project/Project'));
const AsyncAbout = AsyncComponent(() => import('./scenes/about/About'));

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={AsyncHome}/>
          <Route exact path="/donors" component={AsyncDonors}/>
          <Route exact path="/donors/:code" component={AsyncDonor}/>
          <Route exact path="/countries" component={AsyncCountries}/>
          <Route exact path="/countries/:code" component={AsyncCountry}/>
          <Route exact path="/services" component={AsyncServices}/>
          <Route exact path="/services/:id" component={AsyncService}/>
          <Route exact path="/projects" component={AsyncProjects}/>
          <Route exact path="/projects/:id" component={AsyncProject}/>
          <Route exact path="/about" component={AsyncAbout}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
