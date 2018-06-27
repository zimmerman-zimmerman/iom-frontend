import React from 'react';
import Spin from 'antd/es/spin';
import get from 'lodash/get';
import extend from 'lodash/extend';
import { Grid, Row, Col } from 'react-flexbox-grid';

import Page from '../../components/base/Page';
import BannerCountry from './components/BannerCountry';
import './styles/Country.scss';
import {connect} from "react-redux";
import BaseFilter from "../../components/filters/BaseFilter";
import * as actions from "../../services/actions";
import TableDonors from "./components/TableDonors";
import CountryMap from "../../components/maps/CountryMap";
import TableProjects from "./components/TableProjects";
import ContactInfo from './components/ContactInfo';
import Trans from '../../locales/Trans';

class Country extends BaseFilter {
  componentDidMount() {
    const { dispatch } = this.props;
    const { params } = this.state;
    const code = get(this.props, 'match.params.code');
    if (dispatch && code) {
      if (params) {
        this.actionRequest(
          extend({}, params, {recipient_country: code.toUpperCase()}),
          'recipient_country',
          actions.countryRequest
        );
        this.actionRequest(
          extend({}, params, {recipient_country: code.toUpperCase()}, {page_size: 30}),
          'participating_organisation',
          actions.countryDonorsRequest
        );
      } else {
        dispatch(actions.countryInitial());
        dispatch(actions.countryDonorsInitial());
      }
    }
  }

  render() {
    const { country, countryDonors } = this.props;
    const pathname = get(this.props, 'location.pathname');
    const countryResult = get(this.props, 'country.data.results[0]');
    const donors = get(this.props, 'countryDonors.data.results');
    const breadcrumbItems = [
      {url: '/', text: <Trans id='main.menu.home' text='Home' />},
      {url: '/donors', text: <Trans id='main.menu.countries' text='Countries' />},
      {url: null, text: <Trans id='main.menu.detail' text='Detail' />},
    ];
    return (
      <Spin spinning={country.request || countryDonors.request}>
        <Page breadcrumbItems={breadcrumbItems}>
          <Grid fluid>
            <Row>
              <Col>
              </Col>
            </Row>
          </Grid>
        </Page>
      </Spin>
    )
  }
}

const mapStateToProps = (state, ) => {
  return {
    country: state.country,
    countryDonors: state.countryDonors
  }
};

export default connect(mapStateToProps)(Country);