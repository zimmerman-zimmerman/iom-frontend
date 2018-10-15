import React, { Fragment } from 'react';
import MediaQuery from 'react-responsive';
import Spin from 'antd/es/spin';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { Grid, Row, Col } from 'react-flexbox-grid';

import BaseFilter from '../../components/base/filters/BaseFilter';
import * as actions from "../../services/actions";
import Page from '../../components/base/Page';
import Trans from '../../locales/Trans';
import Filters from '../../components/base/filters/Filters';
import ServicesCharts from './components/ServicesCharts';
import ServicesTable from "./components/ServicesTable";
import injectSheet from "react-jss";

import { combineData } from './ServicesHelper';
import {size as screenSize} from "../../helpers/screen";

import { calcDividerMargTop } from './ServicesHelper';

class Services extends BaseFilter {
  componentDidMount() {
    const { dispatch } = this.props;
    let params = this.state.params;
    params.humanitarian = 1;
    if (dispatch) {
      if (params) {
        this.actionRequest(params, 'sector', actions.servicesRequest);
        params.humanitarian = 0;
        this.actionRequest(params, 'sector', actions.nonHumanServicesRequest);
      } else {
        dispatch(actions.servicesInitial());
          dispatch(actions.nonHumanServicesInitial());
      }
    }
  }

  render() {
    const { humanServices, classes, nonHumanServices } = this.props;
    const humanData = this.filter(get(humanServices, 'data'));
    const nonHumanData = this.filter(get(nonHumanServices, 'data'));
    const data = combineData(humanData, nonHumanData);
    const breadcrumbItems = [
      {url: '/', text: <Trans id='main.menu.home' text='Home' />},
      {url: null, text: <Trans id='main.menu.services' text='Our Service' />},
    ];
    return (
      <Spin spinning={humanServices.request}>
        <Page breadcrumbItems={breadcrumbItems}>
          <Grid fluid className={classes.services}>
            <Row>
              <Col xs={12} md={4} lg={3}>
                <Filters rootComponent={this} countResults={get(data, 'length', 0)}
                         pluralMessage={<Trans id="services.filters.services" defaultMessage="Services" />}
                         singularMessage={<Trans id="services.filters.service" defaultMessage="Service" />}
                />
              </Col>
              <Col xs={12} md={8} lg={9}>
                <Row>
                  <Col xs={12}>
                    <h1 className="title"><Trans id="services.title" defaultMessage="Our services" /></h1>
                    <h2 className="description"><Trans id="services.descriptions" defaultMessage="Descriptions" /></h2>
                    <MediaQuery minWidth={screenSize.desktop.minWidth}>
                      <hr className="divider" />
                    </MediaQuery>
                    {data ?
                      <MediaQuery minWidth={screenSize.desktop.minWidth}>
                        <Fragment>
                          <h2 className="chart-header">
                            <Trans id="services.chart.header" defaultMessage="Budget per service area" />
                          </h2>
                          <ServicesCharts data={data} />
                        </Fragment>
                      </MediaQuery> : null
                    }
                  </Col>
                  <hr className="divider" style={{ marginTop: calcDividerMargTop(data.length) }} />
                  <Col xs={12} className="service-table">
                    {data ? <ServicesTable rootComponent={this} data={data}/> : null}
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

Services.defaultProps = {
  groupBy: 'sector',
  filterRequest: actions.servicesRequest,
    nonHumanFilterRequest: actions.nonHumanServicesRequest,
};

const mapStateToProps = (state, ) => {
  return {
    humanServices: state.services,
      nonHumanServices: state.nonHumanServices,
  }
};

const styles = {
  services: {
    '& .description': {
      '@media (maxWidth: 767px)': {
        fontSize: 18,
      }
    },
    '& .title': {
      marginTop: 15,
      fontWeight: 300,
      '@media (maxWidth: 767px)': {
        fontSize: 22,
      }
    },
    '& .chart-header': {
      color: '#1f4283',
      marginTop: 10,
        marginLeft: '6px',
        fontSize: '22px',
        fontWeight: 600,
    },
    '& .service-table': {
      paddingBottom: 80,
      paddingLeft: 0,
    },
    '& .divider': {
      border: 'solid 3px #173d8e',
      opacity: 0.3,
      marginBottom: 15,
      width: '100%',
    },
  }
};

export default injectSheet(styles)(connect(mapStateToProps)(Services));