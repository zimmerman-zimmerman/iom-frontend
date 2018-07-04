import React from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import extend from 'lodash/extend';
import Spin from 'antd/es/spin';
import { Grid, Row, Col } from 'react-flexbox-grid';
import injectSheet from 'react-jss';
import MediaQuery from 'react-responsive';

import BaseFilter from '../../components/base/filters/BaseFilter';
import Filters from '../../components/base/filters/Filters';
import * as actions from '../../services/actions';
import ProjectsTable from './components/ProjectsTable';
import GeoMap from '../../components/maps/GeoMap';
import Page from '../../components/base/Page';
import Trans from '../../locales/Trans';
import {size as screenSize} from '../../helpers/screen';
import Summary from '../../components/base/filters/Summary';


class Projects extends BaseFilter {
  constructor(props) {
    super(props);
    this.state = {
      params: {
        fields: 'id,iati_identifier,title,activity_dates,budgets,recipient_countries,sectors',
        order_by: '-id',
        reporting_organisation_identifier: process.env.REACT_APP_REPORTING_ORGANISATION_IDENTIFIER,
      },
      update: false,
      filters: {values: {}, changed: false},
    };
  }

  countriesRequest() {
    const { filters } = this.state;
    const params = {
      aggregations: 'activity_count,incoming_fund,disbursement,value',
      group_by: '',
      order_by: '-value',
      convert_to: 'usd',
      reporting_organisation_identifier: process.env.REACT_APP_REPORTING_ORGANISATION_IDENTIFIER
    };
    this.actionRequest(extend({}, params, filters.values), 'recipient_country', actions.countriesRequest);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState !== this.state) {
      this.countriesRequest();
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { params } = this.state;
    this.setState({showSummary: true});
    if (dispatch) {
      if (params) {
        this.actionRequest(params, null, actions.projectsRequest);
        this.countriesRequest();
      } else {
        dispatch(actions.projectsInitial());
        dispatch(actions.countriesInitial());
      }
    }
  }

  onHideSummary() {
    this.setState({showSummary: !this.state.showSummary});
  }

  render() {
    const { projects, countries, classes } = this.props;
    const { showSummary } = this.state;
    const dataProjects = get(projects, 'data');
    const existProjects = get(dataProjects, 'results[0].id');
    const dataCountries = get(countries, 'data');
    const showMap = get(dataCountries, 'results[0].recipient_country.code');
    const breadcrumbItems = [
      {url: '/', text: <Trans id='main.menu.home' text='Home' />},
      {url: null, text: <Trans id='main.menu.projects' text='Projects' />},
    ];
    const ShowSummary = () => {
      return (
        <div className={classes.boxShadow}>
          <GeoMap data={dataCountries} zoom={3.2} country='nl' height={450} tooltipName="Activities:"
                  tabName="activities"
          />
        </div>
      )
    };
    return (
      <Spin spinning={projects.request}>
        <Page breadcrumbItems={breadcrumbItems}>
          <Grid fluid>
            <Row>
              <Col xs={12} md={4} lg={3}>
                <Filters rootComponent={this} countResults={get(dataProjects, 'count', 0)}
                         pluralMessage={<Trans id="projects.filters.projects" defaultMessage="Projects" />}
                         singularMessage={<Trans id="projects.filters.project" defaultMessage="Project" />}

                />
              </Col>
              <Col xs={12} md={8} lg={9} className={classes.map}>
                <h2 className={classes.title}><Trans id="projects.title" defaultMessage="IOM Projects overview" /></h2>
                <MediaQuery maxWidth={screenSize.tablet.maxWidth}>
                  <div className={classes.boxShadow}>
                    { showMap ?
                      <GeoMap data={dataCountries} zoom={3.2} country='nl' height={450} tooltipName="Activities:"
                              tabName="activities"
                      /> : null
                    }
                  </div>
                </MediaQuery>
                <MediaQuery minWidth={screenSize.desktop.minWidth}>
                  <Row>
                    <Col lg={showSummary ? 9 : 12}
                         className={showSummary ? classes.noPaddingRight : null}
                    >
                      {showMap ? showSummary ? <ShowSummary/> : <ShowSummary/> : null}
                    </Col>
                    {showSummary ?
                      <Col lg={3} className={showSummary ? classes.noPaddingLeft : null}>
                        <div className={classes.boxShadow}>
                          <Summary data={showMap ? get(dataCountries, 'results') : null}
                                   onHideSummary={this.onHideSummary.bind(this)}
                                   fieldValue="value"
                                   fieldCount="activity_count"
                          />
                        </div>
                      </Col> : null
                    }
                  </Row>
                </MediaQuery>
                <Row>
                  <Col xs={12}>
                    <ProjectsTable data={existProjects ? dataProjects : null}
                                   fieldName="page"
                                   rootComponent={this}
                    />
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

Projects.defaultProps = {
  groupBy: null,
  filterRequest: actions.projectsRequest,
};


const mapStateToProps = (state, ) => {
  return {
    projects: state.projects,
    countries: state.countries
  }
};

const styles = {
  title: {
    marginTop: 12
  },
  map: {
    '& .leaflet-control-attribution.leaflet-control': {
      display: 'none',
    },
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
};

export default injectSheet(styles)(connect(mapStateToProps)(Projects));