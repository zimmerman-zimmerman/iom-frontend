import React from 'react';
import Spin from 'antd/es/spin';
import get from 'lodash/get';
import find from 'lodash/find';
import extend from 'lodash/extend';
import { Grid, Row, Col } from 'react-flexbox-grid';
import injectSheet from 'react-jss';
import { connect } from "react-redux";

import Page from '../../components/base/Page';
import BannerCountry from './components/BannerCountry';
import BaseFilter from "../../components/base/filters/BaseFilter";
import * as actions from "../../services/actions";
import TableDonors from "./components/TableDonors";
import CountryMap from "../../components/maps/CountryMap";
import TableProjects from "./components/TableProjects";
import Trans from '../../locales/Trans';
import ContactProject from './components/ContactProject';
import SectorsMap from './components/SectorsMap';
import { pageContainer } from '../../helpers/style';
import CountriesJSON from '../../services/data/countries.json';

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
          'sector',
          actions.countrySectorsRequest
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

  handleDonorSortBy(value) {
    const { dispatch } = this.props;
    const { params } = this.state;
    const code = get(this.props, 'match.params.code');
    this.setState({ donorTableSortBy: value });
    if (dispatch && code) {
      if (params) {
        this.actionRequest(
          extend({}, { ...params, order_by: value }, {recipient_country: code.toUpperCase()}, {page_size: 30}),
          'participating_organisation',
          actions.countryDonorsRequest
        );
      } else {
        dispatch(actions.countryDonorsInitial());
      }
    }
  }

  render() {
    const { country, countryDonors, countryActivities, countrySectors, classes, project } = this.props;
    const countryResult = get(this.props, 'country.data.results[0]');
    const donors = get(this.props, 'countryDonors.data.results');
    const sectors = get(this.props, 'countrySectors.data.results', []);
    const firstProject = get(countryActivities, 'data.results[0]');
    const code = get(this.props, 'match.params.code');
    const countryJSON = find(CountriesJSON, {'code': code.toUpperCase()});
    if (countryResult) {
      countryResult.recipient_country['description'] = countryJSON ? countryJSON['description'] : 'No fount on site';
    }
    const breadcrumbItems = [
      {url: '/', text: <Trans id='main.menu.home' text='Home' />},
      {url: '/countries', text: <Trans id='main.menu.countries' text='Countries' />},
      {url: null, text: countryJSON ? countryJSON['name'] : <Trans id='main.menu.detail' text='Detail' />},
    ];
    return (
      <Spin spinning={country.request || countryDonors.request || countryActivities.request || countrySectors.request || project.request}>
        <Page breadcrumbItems={breadcrumbItems}>
          <BannerCountry data={countryResult} />
          <Grid className={classes.country} style={pageContainer} fluid>
            <Row middle="xs" className="gap">
              <Col xs={12} md={6} lg={6}>
                <h2 className="title">
                  <Trans id="country.table.donors.title" defaultMessage="Where the funds come from"/>
                </h2>
                <TableDonors
                  data={donors}
                  sortBy={this.state.donorTableSortBy}
                  handleDonorSortBy={e => this.handleDonorSortBy(e)}
                  itemAmount={5}
                />
              </Col>
              <Col xs={12} md={6} lg={6}>
                <CountryMap data={get(countryResult, 'recipient_country')}/>
              </Col>
            </Row>
            <Row className="gap">
              <Col xs={12}>
                <h2 className="title">
                  <Trans id="country.sectors.map.title" defaultMessage="Explore what sectors the funds go to"/>
                </h2>
                <SectorsMap data={sectors} />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <h2 className="title">
                  <Trans id="country.table.projects.title" defaultMessage="Related projects"/>
                </h2>
                <TableProjects countryCode={ get(this.props, 'match.params.code')} itemAmount={7} />
              </Col>
            </Row>
            {firstProject ? <ContactProject id={firstProject.id} code={get(this.props, 'match.params.code')} /> : null}
          </Grid>
        </Page>
      </Spin>
    )
  }
}

const mapStateToProps = (state, ) => {
  return {
    country: state.country,
    countryDonors: state.countryDonors,
    countryActivities: state.countryActivities,
    countrySectors: state.countrySectors,
    project: state.project
  }
};

const styles = {
  country: {
    padding: '0 137px !important',
    '@media (maxWidth: 767px)': {
      padding: '0px 25px !important',
    },
    '& .gap': {
      padding: '30px 0'
    },
    '& .no-padding': {
      padding: 0,
    },
    '& .title': {
      color: '#1f4283',
      fontSize: 26,
      '@media (maxWidth: 767px)': {
        fontSize: '22px',
      },
    }
  }
};

export default injectSheet(styles)(connect(mapStateToProps)(Country));