import React, { lazy, Suspense,Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import get from 'lodash/get';
import Spin from "antd/es/spin";

import './styles/App.less';
import './styles/App.scss';

// import AsyncComponent from './components/AsyncComponent';
import enMessages from "./locales/en";
import {IntlProvider} from "react-intl";
import connect from "react-redux/es/connect/connect";
import * as actions from './services/actions/index';

// const AsyncHome = AsyncComponent(() => import('./scenes/home/Home'));

const Home = lazy(() =>
    import('./scenes/home/Home')
);

// const AsyncDonors = AsyncComponent(() => import('./scenes/donors/Donors'));

const Donors = lazy(() =>
    import('./scenes/donors/Donors')
);


const AsyncDonorGroup = lazy(() => import('./scenes/donorgroup/DonorGroup'));



const AsyncDonor = lazy(() => import('./scenes/donor/Donor'));
const AsyncCountries = lazy(() => import('./scenes/countries/Countries'));
const AsyncCountry = lazy(() => import('./scenes/country/Country'));
const AsyncServices = lazy(() => import('./scenes/services/Services'));
const AsyncService = lazy(() => import('./scenes/service/Service'));
const AsyncProjects = lazy(() => import('./scenes/projects/Projects'));
const AsyncProject = lazy(() => import('./scenes/project/Project'));
const AsyncAbout = lazy(() => import('./scenes/about/About'));

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
                <Suspense fallback={<div>loading</div>}>
                  <Switch>
                    <Route exact path="/" render={() => (<Home/>)}/>
                    <Route exact path="/donors" render={() => (<Donors/>)}/>
                    <Route exact path="/donors/:group" render={() => (<AsyncDonorGroup/>)}/>
                    <Route exact path="/donors/:group/:code" render={() => (<AsyncDonor/>)}/>
                    <Route exact path="/countries" render={() => (<AsyncCountries/>)}/>
                    <Route exact path="/countries/:code" render={() => (<AsyncCountry/>)}/>
                    <Route exact path="/services" render={() => (<AsyncServices/>)}/>
                    <Route exact path="/services/:id" render={() => (<AsyncService/>)}/>
                      <Route exact path="/services/project-type/:id" render={() => (<AsyncService/>)}/>
                    <Route exact path="/projects" render={() => (<AsyncProjects/>)}/>
                    <Route exact path="/projects/:id" render={() => (<AsyncProject/>)}/>
                    <Route exact path="/about" render={() => (<AsyncAbout/>)}/>
                  </Switch>
                </Suspense>
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
