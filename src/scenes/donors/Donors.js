import React from 'react';
import { Layout, Row, Col } from 'antd';
import {connect} from 'react-redux';
import _ from 'lodash';

import MainHeader from '../../components/main/MainHeader';
import DonorsBreadcrumb from './components/DonorsBreadcrumb';
import Filters from './components/filters/Filters';
import BaseFilter from './components/filters/BaseFilter';
import * as actions from "../../services/actions";
import DonorsTreeMap from './components/charts/DonorsTreeMap';
import DonorsTable from './components/DonorsTable';
import MainFooter from '../../components/main/MainFooter';

const { Header, Content, Footer } = Layout;

class Donors extends BaseFilter {
  componentDidMount() {
    const { dispatch } = this.props;
    const { params } = this.state;
    if (dispatch) {
      if (params) {
        this.actionRequest(params, 'participating_organisation', actions.donorsRequest);
      } else {
        dispatch(actions.donorsInitial());
      }
    }
  }

  render() {
    const { donors } = this.props;
    const data = _.get(donors, 'data');
    return (
      <Layout>
        <Header className="Header">
          <MainHeader/>
        </Header>
        <Content className="Content">
          <DonorsBreadcrumb/>
          <Row style={{marginTop: 15}} className="Search">
            <Col span={5}>
              <Filters data={data}
                       rootComponent={this}
                       rootGroupBy="participating_organisation"
                       filterRequest={actions.donorsRequest}
              />
            </Col>
            <Col span={19}>
              <Row>
                <Col span={24}>
                  <DonorsTreeMap data={_.get(data, 'results') ? data.results : []}/>
                </Col>
              </Row>
              <Row>
                <Col span={24} style={{marginTop: 20}}>
                  <DonorsTable data={data}/>
                </Col>
              </Row>
            </Col>
          </Row>
        </Content>
        <Footer className="MainFooter">
          <MainFooter/>
        </Footer>
      </Layout>
    );
  }
}

const mapStateToProps = (state, ) => {
  return {
    donors: state.donors
  }
};

export default connect(mapStateToProps)(Donors);