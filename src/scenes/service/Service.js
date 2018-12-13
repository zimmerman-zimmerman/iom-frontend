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
import ServiceProjectTypes from './components/ServiceProjectTypes';
import ServiceCountries from './components/ServiceCountries';
import find from 'lodash/find';
import { addFilterValues } from '../../helpers/generic';

class Service extends BaseFilter {

  componentDidMount() {
    const { dispatch, donorGroupJson, donorGroupJsonSlug, sectorsDescSlug, sectorsDesc } = this.props;
    const { params } = this.state;
    const id = get(this.props, 'match.params.id');
    if (dispatch && id) {
      if(this.props.location.state){
        //NOTE! this fucntion actually changes the states variable WITHOUT calling this.setState()
        // params works as a reference when passed in this function
        addFilterValues(this.props.location.state.filterValues, params);
      }
      this.actionRequest(extend({}, params, {sector: id}), 'sector', actions.serviceRequest);
      if(!donorGroupJson.data) {
        dispatch(actions.donorGroupJsonRequest(donorGroupJsonSlug));
      }
        if(!donorGroupJson.data) {
            dispatch(actions.donorGroupJsonRequest(donorGroupJsonSlug));
        }
        if(!sectorsDesc.data){
            dispatch(actions.sectorsDescJsonRequest(sectorsDescSlug));
        }
    } else {
      actions.serviceInitial();
    }
  }

  componentDidUpdate(prevProps) {
    const { dispatch, donorGroupJson, donorGroupJsonSlug } = this.props;
    const { params } = this.state;
    const id = get(this.props, 'match.params.id');
    const prevId = get(prevProps, 'match.params.id');
    if (prevId !== id) {
      if (dispatch && id) {
        if(this.props.location.state){
          //NOTE! this fucntion actually changes the states variable WITHOUT calling this.setState()
          // params works as a reference when passed in this function
          // addFilterValues(this.props.location.state.filterValues, params);
        }
        this.actionRequest(extend({}, params, {sector: id}), 'sector', actions.serviceRequest);
        if(!donorGroupJson.data) {
          dispatch(actions.donorGroupJsonRequest(donorGroupJsonSlug));
        }
      } else {
        actions.serviceInitial();
      }
    }
  }

  render() {
    const { service, serviceProjects, classes, donorGroupJson, match, sectorsDesc } = this.props;
    const sectorId = get(this.props, 'match.params.id');
    const data = get(service, 'data.results[0]');
    const currentBreadTxt = this.props.match.url.indexOf('project-type') !== -1 ?
        <Trans id='services.breadcrumb.project.detail' text='Project type detail page' /> :
        <Trans id='services.breadcrumb.service.detail' text='Service area detail page' />;
    const breadcrumbItems = [
      {url: '/', text: <Trans id='main.menu.home' text='Home' />},
      {url: '/services', text: <Trans id='main.menu.services' text='Our Service' />},
      {url: null, text: currentBreadTxt},
    ];
    const code = get(this.props, 'match.params.id');
    const sectorsDescz = get(sectorsDesc, 'data.content', []);
    const serviceJSON = find(sectorsDescz, {'code': code.toUpperCase()});
    const prevFilters = this.props.location.state ? this.props.location.state.filterValues : false;
    return (
      <Spin spinning={service.request || serviceProjects.request}>
        <Page breadcrumbItems={breadcrumbItems}>
          {data ? <ServiceBanner projectType={this.props.match.url.indexOf('project-type') !== -1}
                                 description={get(serviceJSON, 'description', null)}
                                 data={get(service, 'data.results[0]')}/> : null}
          <Grid className={classes.service} fluid>
            <Row xs={12} lg={6}>
              <Col xs={12} lg={6} className={classes.listsContainer}>
                  {match.url.indexOf('project-type') !== -1 ?
                      //This is the projects table which is shown only in the project detail page.
                      <ServiceProjects sectorId={sectorId} filterValues={prevFilters}/> :
                  <div className={classes.twoLists}>
                    <ServiceDonors sectorId={sectorId} filterValues={prevFilters} donorGroupJson={get(donorGroupJson, 'data.content', {})} />
                    <ServiceProjectTypes serviceId={sectorId} filterValues={prevFilters} />
                  </div>
                  }
              </Col>
            </Row>
            <Row className="map-row">
              <Col xs={12}>
                <ServiceCountries sectorId={sectorId} filterValues={prevFilters}/>
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
    donorGroupJson: state.donorGroupJson,
    serviceProjects: state.serviceProjects,
      sectorsDesc: state.sectorsDesc,
  }
};

Service.defaultProps = {
    donorGroupJsonSlug: 'donor-group-json',
    sectorsDescSlug: 'sectors-descriptions',
};


const styles = {
  listsContainer: {
    marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: 'unset !important',
      flexBasis: 'unset !important',
      width: '100%',
  },
    twoLists: {
      display: 'flex',
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