import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './styles/App.less';
import './styles/App.scss';

import Home from './scenes/home/Home';
import Donors from './scenes/donors/Donors';
import Donor from './scenes/donors/donor/Donor';
import Countries from './scenes/countries/Countries';
import Country from './scenes/countries/country/Country';
import Services from "./scenes/services/Services";
import Projects from "./scenes/projects/Projects";
import About from "./scenes/about/About";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/donors" component={Donors}/>
          <Route exact path="/donors/:code" component={Donor}/>
          <Route exact path="/countries" component={Countries}/>
          <Route exact path="/countries/:code" component={Country}/>
          <Route exact path="/services" component={Services}/>
          <Route exact path="/projects" component={Projects}/>
          <Route exact path="/about" component={About}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
