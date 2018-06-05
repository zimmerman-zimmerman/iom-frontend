import React from 'react';
import Layout from 'antd/es/layout';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import Spin from 'antd/es/spin';
import { FormattedMessage } from "react-intl";
import { connect } from 'react-redux';
import get from 'lodash/get';

import BaseFilter from '../../components/filters/BaseFilter';
import MainHeader from '../../components/main/MainHeader';
import MainFooter from '../../components/main/MainFooter';
import DonorsBreadcrumb from '../donors/components/DonorsBreadcrumb';
import Filters from './components/Filters';

import ServicesCharts from './components/ServicesCharts';
import * as actions from "../../services/actions";
import ServicesTable from "./components/ServicesTable";

const { Header, Content, Footer } = Layout;

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
    return (
      <Spin spinning={services.request}>
        <Layout>
          <Header className="Header">
            <MainHeader/>
          </Header>
          <Content className="Content">
            <DonorsBreadcrumb/>
            <Row style={{marginTop: 15}} className="Search">
              <Col span={5}>
                <Filters data={get(services, 'data')} rootComponent={this}/>
              </Col>
              <Col span={19}>
                <Row>
                  <Col span={24}>
                    <h2 className="Title">
                      <FormattedMessage id="services.title"
                                        defaultMessage="Our services"
                      />
                    </h2>
                  </Col>
                </Row>
                <Row>
                  <Col span={24} className="Border Bottom">
                    <FormattedMessage id="services.descriptions"
                                      defaultMessage="Descriptions"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={24} className="Border Bottom">
                    {data ? <ServicesCharts data={data}/> : null}
                  </Col>
                </Row>
                <Row>
                  <Col span={24} className="Border Bottom">
                    {data ? <ServicesTable data={data}/> : null}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Content>
          <Footer className="MainFooter">
            <MainFooter/>
          </Footer>
        </Layout>
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