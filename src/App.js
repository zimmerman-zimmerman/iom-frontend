import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './styles/App.less';

import Home from './scenes/home/Home';
import Donors from './scenes/donors/Donors';
import Countries from './scenes/countries/Countries';
import Services from "./scenes/services/Services";
import Projects from "./scenes/projects/Projects";
import About from "./scenes/about/About";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home}/>
          <Route exact path="/donors" component={Donors}/>
          <Route exact path="/countries" component={Countries}/>
          <Route exact path="/services" component={Services}/>
          <Route exact path="/projects" component={Projects}/>
          <Route exact path="/about" component={About}/>
        </div>
      </Router>
    );
  }
}

export default App;
