import React from 'react';
import Spin from 'antd/es/spin';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { Grid, Row, Col } from 'react-flexbox-grid';

import BaseFilter from '../../components/filters/BaseFilter';
import * as actions from "../../services/actions";
import Page from '../../components/base/Page';
import Trans from '../../locales/Trans';
import Filters from '../../components/base/filters/Filters';
import ServicesCharts from './components/ServicesCharts';
import ServicesTable from "./components/ServicesTable";

class Services extends BaseFilter {
  componentDidMount() {
    const { dispatch } = this.props;
    const { params } = this.state;
    if (dispatch) {
      if (params) {
        this.actionRequest(params, 'sector', actions.servicesRequest);
      } else {
        dispatch(actions.servicesInitial());
      }
    }
  }

  render() {
    const { services } = this.props;
    const data = get(services, 'data.results', null);
    const breadcrumbItems = [
      {url: '/', text: <Trans id='main.menu.home' text='Home' />},
      {url: null, text: <Trans id='main.menu.services' text='Our Service' />},
    ];
    return (
      <Spin spinning={services.request}>
        <Page breadcrumbItems={breadcrumbItems}>
          <Grid fluid>
            <Row>
              <Col xs={12} md={4} lg={3}>
                <Filters rootComponent={this} countResults={get(services, 'data.count', 0)}
                         pluralMessage={<Trans id="services.filters.services" defaultMessage="Services" />}
                         singularMessage={<Trans id="services.filters.service" defaultMessage="Service" />}

                />
              </Col>
              <Col xs={12} md={8} lg={9}>
                <Row>
                  <Col xs={12}>
                    <h2 className="Title"><Trans id="services.title" defaultMessage="Our services" /></h2>
                    <h3><Trans id="services.descriptions" defaultMessage="Descriptions" /></h3>
                    {data ? <ServicesCharts data={data}/> : null}
                  </Col>
                  <Col xs={12}>
                    {data ? <ServicesTable data={data}/> : null}
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
};

const mapStateToProps = (state, ) => {
  return {
    services: state.services
  }
};

export default connect(mapStateToProps)(Services);