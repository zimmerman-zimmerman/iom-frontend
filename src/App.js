import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import get from 'lodash/get';

import './styles/App.less';
import './styles/App.scss';

import AsyncComponent from './components/AsyncComponent';
import enMessages from "./locales/en";
import {IntlProvider} from "react-intl";
import connect from "react-redux/es/connect/connect";
import * as actions from './services/actions/index';


const AsyncHome = AsyncComponent(() => import('./scenes/home/Home'));
const AsyncDonors = AsyncComponent(() => import('./scenes/donors/Donors'));
const AsyncDonorGroup = AsyncComponent(() => import('./scenes/donorgroup/DonorGroup'));
const AsyncDonor = AsyncComponent(() => import('./scenes/donor/Donor'));
const AsyncCountries = AsyncComponent(() => import('./scenes/countries/Countries'));
const AsyncCountry = AsyncComponent(() => import('./scenes/country/Country'));
const AsyncServices = AsyncComponent(() => import('./scenes/services/Services'));
const AsyncService = AsyncComponent(() => import('./scenes/service/Service'));
const AsyncProjects = AsyncComponent(() => import('./scenes/projects/Projects'));
const AsyncProject = AsyncComponent(() => import('./scenes/project/Project'));
const AsyncAbout = AsyncComponent(() => import('./scenes/about/About'));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      localeRequest: true,
    }
  }

  componentDidMount() {
    const { dispatch, enLocaleSlug, donorGroupJson } = this.props;
    const { localeRequest } = this.state;
    if (dispatch && localeRequest ) {
      dispatch(actions.localeRequest(enLocaleSlug));
      if (donorGroupJson.data === null) {
        dispatch(actions.donorGroupJsonRequest('donor-group-json'));
      }
    } else {
      dispatch(actions.localeInitial());
    }
  }

  render() {
    const { locale, language, languageWithoutRegionCode } = this.props;
    const messages = {en: enMessages};
    return (
      <IntlProvider
        locale={language}
        messages={locale.success ? get(locale.data, 'content') : messages[languageWithoutRegionCode]}
      >
        <Router>
          <Switch>
            <Route exact path="/" component={AsyncHome}/>
            <Route exact path="/donors" component={AsyncDonors}/>
            <Route exact path="/donors/:group" component={AsyncDonorGroup}/>
            <Route exact path="/donors/:group/:code" component={AsyncDonor}/>
            <Route exact path="/countries" component={AsyncCountries}/>
            <Route exact path="/countries/:code" component={AsyncCountry}/>
            <Route exact path="/services" component={AsyncServices}/>
            <Route exact path="/services/:id" component={AsyncService}/>
            <Route exact path="/projects" component={AsyncProjects}/>
            <Route exact path="/projects/:id" component={AsyncProject}/>
            <Route exact path="/about" component={AsyncAbout}/>
          </Switch>
        </Router>
      </IntlProvider>
    );
  }
}

App.defaultProps = {
  enLocaleSlug: 'en-locale',
  languageWithoutRegionCode: 'en',
  language: 'en-US'
};

const mapStateToProps = (state, ) => {
  return {
    locale: state.locale,
    donorGroupJson: state.donorGroupJson,
  }
};

export default connect(mapStateToProps)(App);
