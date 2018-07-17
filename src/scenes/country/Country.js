import React from 'react';
import Spin from 'antd/es/spin';
import get from 'lodash/get';
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
    const { country, countryDonors, countryActivities, classes, project } = this.props;
    const countryResult = get(this.props, 'country.data.results[0]');
    const donors = get(this.props, 'countryDonors.data.results');
    const firstProject = get(countryActivities, 'data.results[0]');
    const breadcrumbItems = [
      {url: '/', text: <Trans id='main.menu.home' text='Home' />},
      {url: '/countries', text: <Trans id='main.menu.countries' text='Countries' />},
      {url: null, text: <Trans id='main.menu.detail' text='Detail' />},
    ];
    return (
      <Spin spinning={country.request || countryDonors.request || countryActivities.request || project.request}>
        <Page breadcrumbItems={breadcrumbItems}>
          <BannerCountry data={countryResult} />
          <Grid fluid className={classes.country}>
            <Row middle="xs" className="gap">
              <Col xs={12} md={6} lg={6}>
                <h2 className="title">
                  <Trans id="country.table.donors.title" defaultMessage="Where the funds come from"/>
                </h2>
                <TableDonors data={donors}/>
              </Col>
              <Col xs={12} md={6} lg={6}>
                <CountryMap data={get(countryResult, 'recipient_country')}/>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <h2 className="title">
                  <Trans id="country.table.projects.title" defaultMessage="Related projects"/>
                </h2>
                <TableProjects countryCode={ get(this.props, 'match.params.code')}  />
              </Col>
            </Row>
            {firstProject ? <ContactProject id={firstProject.id} /> : null}
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
    project: state.project
  }
};

const styles = {
  country: {
    '& .gap': {
      padding: '20px 0'
    },
    '& .no-padding': {
      padding: 0,
    },
    '& .title': {
      color: '#1f4283',
      fontSize: 26,
    }
  }
};

export default injectSheet(styles)(connect(mapStateToProps)(Country));