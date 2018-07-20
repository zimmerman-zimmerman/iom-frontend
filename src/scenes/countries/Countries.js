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

class Countries extends BaseFilter {
  componentDidMount() {
    const { dispatch } = this.props;
    const { params } = this.state;
    this.setState({showSummary: true});
    if (dispatch) {
      if (params) {
        this.actionRequest(params, 'recipient_country', actions.countriesRequest);
      } else {
        dispatch(actions.countriesInitial());
      }
    }
  }

  onHideSummary() {
    this.setState({showSummary: !this.state.showSummary});
  }

  render() {
    const { countries, classes } = this.props;
    const { showSummary } = this.state;
    const data = get(countries, 'data');
    const showMap = get(data, 'results[0].recipient_country.code');
    const breadcrumbItems = [
      {url: '/', text: <Trans id='main.menu.home' text='Home' />},
      {url: null, text: <Trans id='countries.breadcrumb.countries' text='Countries' />},
      {url: null, text: <Trans id='countries.breadcrumb.funding' text='Funding by countries' />},
    ];
    const ShowSummary = () => {
      return (
        <div className={classes.boxShadow}>
          <GeoMap data={data} zoom={3.2} country='nl' height={450} tooltipName="Activities:"
                  tabName="activities"
          />
        </div>
      )
    };
    return (
      <Spin spinning={countries.request}>
        <Page breadcrumbItems={breadcrumbItems}>
          <Grid fluid>
            <Row>
              <Col xs={12} md={4} lg={3}>
                <Filters rootComponent={this} countResults={get(data, 'results.length', 0)}
                         pluralMessage={<Trans id="countries.filters.countries" defaultMessage="Countries"/>}
                         singularMessage={ <Trans id="countries.filters.country" defaultMessage="Country"/>}

                />
              </Col>
              <Col xs={12} md={8} lg={9} className={classes.map}>
                <Row>
                  <Col xs={12} className={classes.gapBottom}>
                    <h2 className="Title">
                      <Trans id="countries.title" defaultMessage="Countries"/>
                    </h2>
                    <Trans id="countries.description" defaultMessage="Description"/>
                  </Col>
                </Row>
                <Row>
                  <MediaQuery maxWidth={screenSize.tablet.maxWidth}>
                    <Col xs={12}>
                      { showMap ?
                        <div className={classes.boxShadow}>
                          <GeoMap data={data} zoom={3.2} country='nl' height={450} tooltipName="Activities:"
                                  tabName="activities"
                          />
                        </div> : null
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
                        <div className={classes.boxShadow}>
                          <Summary data={showMap ? get(data, 'results') : null}
                                   onHideSummary={this.onHideSummary.bind(this)}
                                   fieldValue="value"
                                   fieldCount="activity_count"
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
                      data={showMap ? get(data, 'results') : null} />
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
};

const mapStateToProps = (state, ) => {
  return {
    countries: state.countries
  }
};

const styles = {
  map: {
    marginTop: 15,
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
  }
};

export default injectSheet(styles)(connect(mapStateToProps)(Countries));