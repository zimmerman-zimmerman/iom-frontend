import React from 'react';
import Layout from 'antd/es/layout';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import {connect} from 'react-redux';
import get from 'lodash/get';
import { FormattedMessage } from "react-intl";

import MainHeader from '../../components/main/MainHeader';
import DonorsBreadcrumb from './components/DonorsBreadcrumb';
import Filters from './components/Filters';
import BaseFilter from '../../components/filters/BaseFilter';
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
    const data = get(donors, 'data');
    return (
      <Layout>
        <Header className="Header">
          <MainHeader/>
        </Header>
        <Content className="Content">
          <DonorsBreadcrumb/>
          <Row style={{marginTop: 15}} className="Search">
            <Col span={5}>
              <Filters data={data} rootComponent={this}/>
            </Col>
            <Col span={19}>
              <Row>
                <Col span={24}>
                  <h1><FormattedMessage id="donors.title" defaultMessage="Donors"/></h1>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <h2>
                    <FormattedMessage id="donors.description"
                                      defaultMessage="Introduction text about this page and
                                      what the treemap is showing, text provided by IOM"
                    />
                  </h2>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <DonorsTreeMap data={get(data, 'results') ? data.results : []}/>
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

Donors.defaultProps = {
  groupBy: 'participating_organisation',
  filterRequest: actions.donorsRequest,
};

const mapStateToProps = (state, ) => {
  return {
    donors: state.donors
  }
};

export default connect(mapStateToProps)(Donors);