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
import { genericSort } from '../../helpers/tableHelpers';

class Services extends BaseFilter {
  componentDidMount() {
    const { dispatch, sectorMapping } = this.props;
    let params = this.state.params;
    params.humanitarian = 1;

    const values = get(sectorMapping.data, 'content.serviceAreaFilter.allCodes');

    const filters = this.state.filters;
    filters.chips['sector type'] = {
        labels: [
            <Trans id="filters.select.sectors.service.area" defaultMessage="Service Area" />,
        ],
        type: 'Sector type',
        values:[[values]]
      };
    filters.values['sector type'] = values;
    this.setState({
      filters,
    });

    if (dispatch) {
      this.actionRequest({
          ...params,
          sector: values,
      }, 'sector', actions.servicesRequest);
      params.humanitarian = 0;
      this.actionRequest({
          ...params,
          sector: values,
      }, 'sector', actions.nonHumanServicesRequest);
      this.setState({params: params});
    } else {
      dispatch(actions.servicesInitial());
      dispatch(actions.nonHumanServicesInitial());
    }
  }

  render() {
    const { servicesTableSortBy } = this.state;
    const { humanServices, classes, nonHumanServices } = this.props;
    const humanData = get(humanServices, 'data.results', []);
    const nonHumanData = get(nonHumanServices, 'data.results', []);

    let data = this.filter({ results: combineData(humanData, nonHumanData) }, 'totalValue');
    data = genericSort(data, servicesTableSortBy);
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
                         services
                />
              </Col>
              <Col xs={12} md={8} lg={9}>
                <Row>
                  <Col xs={12}>
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
                  <hr className="divider" style={{ marginTop: calcDividerMargTop(data.length)+10 }} />
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
  nonHumanFilterRequest: actions.nonHumanServicesRequest
};

const mapStateToProps = (state, ) => {
  return {
    humanServices: state.services,
    nonHumanServices: state.nonHumanServices,
    sectorMapping: state.sectorMapping,
  }
};

const styles = {
  services: {
    '& .description': {
      '@media (max-width: 767px)': {
        fontSize: 18,
      }
    },
    '& .title': {
      marginTop: 15,
      fontWeight: 300,
      '@media (max-width: 767px)': {
        fontSize: 22,
      }
    },
    '& .chart-header': {
      color: '#1f4283',
      marginTop: 11,
        // marginLeft: '6px',
        fontSize: '22px',
        fontWeight: 600,
    },
    '& .service-table': {
      paddingBottom: 80,
      paddingLeft: 0,
    },
    '& .divider': {
      border: 'solid 2px #173d8e',
      opacity: 0.3,
      marginBottom: 15,
      width: '100%',
    },
  },
};

export default injectSheet(styles)(connect(mapStateToProps)(Services));
