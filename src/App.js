import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import get from 'lodash/get';
import Spin from "antd/es/spin";

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
  componentDidMount() {
    const { dispatch, enLocaleSlug, countryMappingJsonSlug, sectorMappingSlug } = this.props;
    if (dispatch) {
      dispatch(actions.localeRequest(enLocaleSlug));
      dispatch(actions.countryMappingJsonRequest(countryMappingJsonSlug));
      dispatch(actions.sectorMappingRequest(sectorMappingSlug));
    } else {
      dispatch(actions.localeInitial());
      dispatch(actions.countryMappingJsonInitial());
      dispatch(actions.sectorMappingInitial());
    }
  }

  render() {
    const {locale, language, languageWithoutRegionCode, sectorMapping} = this.props;
    const messages = {en: enMessages};
    return (
      <Spin spinning={locale.request || sectorMapping.request}>
        {locale.success && sectorMapping.success &&
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
        }
      </Spin>
    );
  }
}

App.defaultProps = {
  languageWithoutRegionCode: 'en',
  language: 'en-US',
  enLocaleSlug: 'en-locale',
  countryMappingJsonSlug: 'country-mapping-json',
  sectorMappingSlug: 'sector-mapping'
};

const mapStateToProps = (state, ) => {
  return {
    locale: state.locale,
    countryMappingJson: state.countryMappingJson,
    sectorMapping: state.sectorMapping
  }
};

export default connect(mapStateToProps)(App);
