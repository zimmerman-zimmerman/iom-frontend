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
import { pageContainer } from '../../helpers/style';


class Projects extends BaseFilter {
  constructor(props) {
    super(props);
    this.state = {
      params: {
        fields: 'id,iati_identifier,title,activity_dates,budgets,recipient_regions,recipient_countries,sectors,projecttype',
        order_by: '-id',
        reporting_organisation_identifier: process.env.REACT_APP_REPORTING_ORGANISATION_IDENTIFIER,
          ordering: '-activity_budget_value',
      },
      update: false,
      filters: {values: { ordering: '-activity_budget_value' }, changed: false, chips: {}},
    };
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
    if(filters.values.participating_organisation)
    {
        //And this kids, is how we avoid references in dictionaries... That javascript man
        const target = filters.values;
        for (let key in target){
            if (target.hasOwnProperty(key)) {
                if(key === 'participating_organisation')
                {
                    values['participating_organisation_ref'] = target[key]
                }else
                {
                    values[key] = target[key]
                }
            }
        }
    }
    else
    {
      values = filters.values;
    }

    this.actionRequest(
      extend({}, params, values), 'recipient_country', actions.countriesRequest
    );
    this.actionRequest(
      extend({}, params, values), 'participating_organisation', actions.countryDonorsRequest
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState !== this.state) {
      this.countriesRequest();
      if (prevState.dataRange !== this.state.dataRange) {
        const { params, filters } = this.state;
        delete filters.values['page'];

        const filterValues = filters.values;
        filterValues.total_budget_gte = this.state.dataRange[0];
          filterValues.total_budget_lte = this.state.dataRange[1];

        this.actionRequest(
          extend({}, params, filters.values),
          null,
          actions.projectsRequest
        );
      }
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
          this.actionRequest(params, 'recipient_country', actions.countriesRequest);
      } else {
        dispatch(actions.projectsInitial());
        dispatch(actions.countriesInitial());
        dispatch(actions.countryDonorsInitial());
      }
    }
  }

  onToggleSummary() {
    this.setState({showSummary: !this.state.showSummary});
  }

  render() {
    const { projects, countries, donors, classes } = this.props;
    const { showSummary } = this.state;
    const dataProjects = get(projects, 'data');
    const donorsCount = get(donors, 'data.count');
    const existProjects = get(dataProjects, 'results[0].id');
    const dataCountries = get(countries, 'data.results', []);
    const projectsCount = get(dataProjects, 'count', 0);
    const showMap = get(dataCountries, '[0].recipient_country.code');
    const breadcrumbItems = [
      {url: '/', text: <Trans id='main.menu.home' text='Home' />},
      {url: null, text: <Trans id='main.menu.projects' text='Projects' />},
    ];
    const geomapHeight = window.innerWidth > 2000 ? 650 : 450;
    const ShowSummary = () => {
      return (
        <div className={classes.boxShadow}>
          <GeoMap data={dataCountries} country='nl' height={geomapHeight} tooltipName="Activities:"
                  tabName="activities"
                  onShowSummary={this.onToggleSummary.bind(this)}
                  showSummary={showSummary}
          />
        </div>
      )
    };

    return (
      <Spin spinning={projects.request}>
        <Page breadcrumbItems={breadcrumbItems}>
          <Grid style={pageContainer} fluid>
            <Row>
              <Col xs={12} md={4} lg={3} >
                <Filters rootComponent={this} countResults={get(dataProjects, 'count', 0)}
                         pluralMessage={<Trans id="projects.filters.projects" defaultMessage="Projects" />}
                         singularMessage={<Trans id="projects.filters.project" defaultMessage="Project" />}
                          projects
                />
              </Col>
              <Col xs={12} md={8} lg={9} className={classes.map}>
                <MediaQuery maxWidth={screenSize.tablet.maxWidth}>
                    { showMap ?
                        <div className={classes.boxShadow}>
                          <GeoMap data={dataCountries} country='nl' height={geomapHeight} tooltipName="Activities:"
                                  tabName="activities"
                                  onShowSummary={this.onToggleSummary.bind(this)}
                                  showSummary={showSummary}
                          />
                        </div>: null
                    }
                    {showSummary ?
                      <Col lg={3} className={showSummary ? classes.noPaddingLeftAndRight : null}>
                        <div >
                          <Summary data={showMap ? dataCountries : null}
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
                <MediaQuery minWidth={screenSize.desktop.minWidth}>
                  <Row>
                    <Col lg={showSummary ? 9 : 12}
                         className={showSummary ? classes.noPaddingRight : null}
                    >
                      {showMap ? showSummary ? <ShowSummary/> : <ShowSummary/> : null}
                    </Col>
                    {showSummary ?
                      <Col lg={3} className={showSummary ? classes.noPaddingLeft : null}>
                        <div >
                          <Summary data={showMap ? dataCountries : null}
                                   onHideSummary={this.onToggleSummary.bind(this)}
                                   fieldValue="value"
                                   fieldCount="activity_count"
                                   donorsCount={donorsCount}
                                   onShowSummary={this.onToggleSummary.bind(this)}
                                   showSummary={showSummary}
                                   height={geomapHeight}
                                   projectsCount={projectsCount}
                          />
                        </div>
                      </Col> : null
                    }
                  </Row>
                </MediaQuery>
                <Row>
                  <Col xs={12}>
                    <ProjectsTable data={existProjects ? dataProjects : null} rootComponent={this}/>
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
  secondFilterRequest: actions.countryDonorsRequest,
};


const mapStateToProps = (state, ) => {
  return {
    projects: state.projects,
    countries: state.countries,
    donors: state.countryDonors,
  }
};

const styles = {
  title: {
    marginTop: 12,
    fontSize: 36,
    fontWeight: 300,
    '@media (max-width: 767px)': {
      fontSize: 22,
    },
  },
  map: {
    '& .leaflet-control-attribution.leaflet-control': {
      display: 'none',
    },
    marginTop: 18,
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

export default injectSheet(styles)(connect(mapStateToProps)(Projects));
