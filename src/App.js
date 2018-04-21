import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './styles/App.less';

import Home from './components/home/Home';
import Donors from './components/Donors';
import Countries from './components/countries/Countries';
import Services from "./components/Services";
import Projects from "./components/Projects";
import About from "./components/About";

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
