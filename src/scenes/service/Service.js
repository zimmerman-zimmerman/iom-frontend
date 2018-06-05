import React from 'react';
import Spin from 'antd/es/spin';
import Layout from 'antd/es/layout';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import { connect } from 'react-redux';
import get from 'lodash/get';
import extend from 'lodash/extend';

import BaseFilter from '../../components/filters/BaseFilter';
import MainHeader from '../../components/main/MainHeader';
import MainFooter from '../../components/main/MainFooter';
import ServiceBreadcrumb from './components/ServiceBreadcrumb';
import ServiceBanner from './components/ServiceBanner';
import ServiceDonors from './components/ServiceDonors';

import './styles/Service.scss';
import * as actions from "../../services/actions";

const { Header, Content, Footer } = Layout;

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
    const { service } = this.props;
    return (
      <Spin spinning={service.request}>
        <Layout className="Service">
          <Header className="Header">
            <MainHeader/>
          </Header>
          <Content className="Content">
            <ServiceBreadcrumb/>
          </Content>
          {service.success ?
            <Layout>
              <Content>
                <ServiceBanner data={get(service, 'data.results[0]')}/>
                <Row>
                  <Col span={12}>
                    <ServiceDonors sectorId={get(this.props, 'match.params.id')}/>
                  </Col>
                </Row>
                <Footer className="MainFooter">
                  <MainFooter/>
                </Footer>
              </Content>
            </Layout> : null}
        </Layout>
      </Spin>
    )
  }
}

const mapStateToProps = (state, ) => {
  return {
    service: state.service,
  }
};

export default connect(mapStateToProps)(Service);