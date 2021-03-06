import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Spin from 'antd/es/spin';
import get from 'lodash/get';
import injectSheet from 'react-jss';
import MediaQuery from 'react-responsive';

import GeoMap from '../../components/maps/GeoMap';
import CountriesTable from './components/CountriesTable';
import * as actions from '../../services/actions/index';
import Summary from '../../components/base/filters/Summary';
import Filters from "../../components/base/filters/Filters";
import BaseFilter from '../../components/base/filters/BaseFilter';
import Trans from '../../locales/Trans';
import Page from '../../components/base/Page';
import {size as screenSize} from "../../helpers/screen";
import { pageContainer } from '../../helpers/style';
import extend from "lodash/extend";

class Countries extends BaseFilter {
  componentDidMount() {
    const { dispatch, countryM49RegionMappingSlug, m49RegionSlug } = this.props;
    const { params } = this.state;
    this.setState({showSummary: true});
    if (dispatch) {
      if (params) {
        this.actionRequest({ fields: 'count', format: 'json' }, '', actions.projectsRequest);
        this.actionRequest(params, 'recipient_country', actions.countriesRequest);
        this.actionRequest(params, 'participating_organisation', actions.countryDonorsRequest);
      } else {
        dispatch(actions.countriesInitial());
        dispatch(actions.countryDonorsInitial());
      }
      dispatch(actions.m49RegionRequest(m49RegionSlug));
      dispatch(actions.countryM49MappingRequest(countryM49RegionMappingSlug));
    } else {
      dispatch(actions.m49RegionInitial());
      dispatch(actions.countryM49MappingInitial());
    }
  }

  countriesRequest() {
    const { filters } = this.state;
    const params = {
      aggregations: 'activity_count,incoming_fund,disbursement,value',
      group_by: '',
      order_by: '-value',
      reporting_organisation_identifier: process.env.REACT_APP_REPORTING_ORGANISATION_IDENTIFIER
    };
    let values = {};
    if(filters.values.participating_organisation) {
      const target = filters.values;
      for (let key in target){
        if (target.hasOwnProperty(key)) {
          if(key === 'participating_organisation') {
            values['participating_organisation_ref'] = target[key]
          } else {
            values[key] = target[key]
          }
        }
      }
    } else {
      values = filters.values;
    }
    this.actionRequest(
      extend({}, params, values), 'recipient_country', actions.countriesRequest
    );
    this.actionRequest(
      extend({}, params, values), 'participating_organisation', actions.countryDonorsRequest
    );
  }

  componentDidUpdate(prevProps, prevState) {
    // TODO: this really complicated, please make this more simple from chips module.
    const { params, filters } = this.state;
    if (get(filters, 'chips.participating_organisation_ref.values.length', 0) === 0) {
      delete filters.values['participating_organisation'];
    }
    let participatingOrganisationFilter = get(filters.values, 'participating_organisation_ref');
    if (participatingOrganisationFilter) {
      delete filters.values['participating_organisation_ref'];
      filters.values['participating_organisation'] = participatingOrganisationFilter;
    }
    if (prevState !== this.state) {
      this.countriesRequest();
      if (prevState.dataRange !== this.state.dataRange) {
        delete filters.values['page'];
        const filterValues = filters.values;
        filterValues.total_budget_gte = this.state.dataRange[0];
        filterValues.total_budget_lte = this.state.dataRange[1];
        this.actionRequest(
          extend({}, params, filters.values),
          null,
          actions.projectsRequest
        );
      } else {
        this.actionRequest(
          extend({}, params, filters.values),
          null,
          actions.projectsRequest
        );
      }
    }
  }

  onToggleSummary() {
    this.setState({showSummary: !this.state.showSummary});
  }

  render() {
    const { countries, donors, classes, projects } = this.props;
    const { showSummary } = this.state;
    const data = this.filter(get(countries, 'data'));
    const projectsCount = get(projects, 'data.count', 0);
    const donorsCount = get(donors, 'data.count');
    const dataDonors = get(donors, 'data.results', []);
    const showMap = get(data, '[0].recipient_country.code');
    const breadcrumbItems = [
      {url: '/', text: <Trans id='main.menu.home' text='Home' />},
      {url: null, text: <Trans id='countries.breadcrumb.countries' text='Countries' />},
      {url: null, text: <Trans id='countries.breadcrumb.funding' text='Funding by countries' />},
    ];
    const geomapHeight = window.innerWidth > 2000 ? 650 : 450;
    const ShowSummary = () => {
      return (
        <div className={classes.boxShadow}>
          <GeoMap data={data} country='nl' height={geomapHeight} tooltipName="Activities:"
                  tabName="activities"
                  onShowSummary={this.onToggleSummary.bind(this)}
                  showSummary={showSummary}
          />
        </div>
      )
    };
    return (
      <Spin spinning={countries.request}>
        <Page breadcrumbItems={breadcrumbItems}>
          <Grid style={pageContainer} fluid>
            <Row>
              <Col xs={12} md={4} lg={3}>
                <Filters rootComponent={this} countResults={get(data, 'length', 0)}
                         pluralMessage={<Trans id="countries.filters.countries" defaultMessage="Countries"/>}
                         singularMessage={ <Trans id="countries.filters.country" defaultMessage="Country"/>}

                />
              </Col>
              <Col xs={12} md={8} lg={9} className={classes.map}>
                <Row>
                  <MediaQuery maxWidth={screenSize.tablet.maxWidth}>
                    <Col xs={12}>
                      { showMap ?
                        <div>
                          <GeoMap data={data} country='nl' height={geomapHeight} tooltipName="Activities:"
                                  tabName="activities"
                                  onShowSummary={this.onToggleSummary.bind(this)}
                                  showSummary={showSummary}
                          />
                        </div> : null
                      }
                      {showSummary ?
                        <Col lg={3} className={showSummary ? classes.noPaddingLeftAndRight : null}>
                          <div>
                            <Summary data={showMap ? dataDonors : null}
                                     onHideSummary={this.onToggleSummary.bind(this)}
                                     fieldValue="value"
                                     fieldCount="activity_count"
                                     donorsCount={donorsCount}
                                     height={geomapHeight}
                                     projectsCount={projectsCount}
                            />
                          </div>
                        </Col> : null
                      }
                    </Col>
                  </MediaQuery>
                  <MediaQuery minWidth={screenSize.desktop.minWidth}>
                    <Col lg={showSummary ? 9 : 12}
                         className={showSummary ? classes.noPaddingRight : null}
                    >
                      {showMap ? showSummary ? <ShowSummary/> : <ShowSummary/> : null}
                    </Col>
                    {showSummary ?
                      <Col lg={3} className={showSummary ? classes.noPaddingLeft : null}>
                        <div>
                          <Summary data={showMap ? dataDonors : null}
                                   onHideSummary={this.onToggleSummary.bind(this)}
                                   fieldValue="value"
                                   fieldCount="activity_count"
                                   donorsCount={donorsCount}
                                   height={geomapHeight}
                                   projectsCount={projectsCount}
                          />
                        </div>
                      </Col> : null
                    }
                  </MediaQuery>
                </Row>
                <Row>
                  <Col xs={12}>
                    <CountriesTable
                      rootComponent={this}
                      data={showMap ? data : null} />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Grid>
        </Page>
      </Spin>
    );
  }
}

Countries.defaultProps = {
  groupBy: 'recipient_country',
  filterRequest: actions.countriesRequest,
  secondFilterRequest: actions.countryDonorsRequest,
  m49RegionSlug: 'm49-region',
  countryM49RegionMappingSlug: 'country-m49-region-mapping'
};

const mapStateToProps = (state, ) => {
  return {
    projects: state.projects,
    countries: state.countries,
    donors: state.countryDonors,
  }
};

const styles = {
  description: {
    '@media (max-width: 767px)': {
      fontSize: '18px',
    },
  },
  title: {
    fontWeight: 300,
    '@media (max-width: 767px)': {
      fontSize: '22px',
    },
  },
  map: {
    marginTop: 18,
    '& .leaflet-control-attribution.leaflet-control': {
      display: 'none',
    },
  },
  gapBottom: {
    marginBottom: 20,
  },
  noPaddingLeft: {
    paddingLeft: 0,
  },
  noPaddingRight: {
    paddingRight: 0,
  },
  boxShadow: {
    boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
  },
  noPaddingLeftAndRight: {
    paddingLeft: 0,
    paddingRight: 0,
  },
};

export default injectSheet(styles)(connect(mapStateToProps)(Countries));
