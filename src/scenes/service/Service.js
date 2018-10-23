import React from 'react';
import Spin from 'antd/es/spin';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import get from 'lodash/get';
import extend from 'lodash/extend';
import { Grid, Row, Col } from 'react-flexbox-grid';

import BaseFilter from '../../components/base/filters/BaseFilter';
import * as actions from "../../services/actions";
import Page from '../../components/base/Page';
import Trans from '../../locales/Trans';
import ServiceBanner from './components/ServiceBanner';
import ServiceDonors from './components/ServiceDonors';
import ServiceProjects from './components/ServiceProjects';
import ServiceCountries from './components/ServiceCountries';
import ServicesJSON from '../../services/data/services';
import find from "lodash/find";

class Service extends BaseFilter {
  componentDidMount() {
    const { dispatch } = this.props;
    const { params } = this.state;
    const id = get(this.props, 'match.params.id');
    if (dispatch && id) {
      this.actionRequest(extend({}, params, {sector: id}), 'sector', actions.serviceRequest);
    } else {
      actions.serviceInitial();
    }
  }

  render() {
    const { service, serviceProjects, classes } = this.props;
    const sectorId = get(this.props, 'match.params.id');
    const data = get(service, 'data.results[0]');
    const breadcrumbItems = [
      {url: '/', text: <Trans id='main.menu.home' text='Home' />},
      {url: '/countries', text: <Trans id='main.menu.services' text='Our Service' />},
      {url: null, text: <Trans id='main.menu.detail' text='Detail' />},
    ];
    const code = get(this.props, 'match.params.id');
    const serviceJSON = find(ServicesJSON, {'code': code.toUpperCase()});
    return (
      <Spin spinning={service.request || serviceProjects.request}>
        <Page breadcrumbItems={breadcrumbItems}>
          {data ? <ServiceBanner description={serviceJSON['description']} data={get(service, 'data.results[0]')}/> : null}
          <Grid className={classes.service} fluid>
            <Row xs={12} lg={6}>
              <Col xs={12} lg={6} className={classes.listsContainer}>
                <ServiceDonors sectorId={sectorId} />
                <ServiceProjects sectorId={sectorId} />
              </Col>
            </Row>
            <Row className="map-row">
              <Col xs={12}>
                <ServiceCountries sectorId={sectorId} />
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
    service: state.service,
    serviceProjects: state.serviceProjects,
  }
};

const styles = {
  listsContainer: {
    marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: 'unset !important',
      flexBasis: 'unset !important',
      width: '100%',
  },
  service: {
    marginTop: 60,
    '& .map-row': {
      marginTop: 30,
      marginBottom: 40,
    }
  }
};

export default injectSheet(styles)(connect(mapStateToProps)(Service));