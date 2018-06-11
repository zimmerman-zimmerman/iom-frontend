import React from 'react';
import Layout from 'antd/es/layout';
import Row from 'antd/es/row';
import Col from 'antd/es/col';

import MainHeader from '../../components/MainHeader';
import MainFooter from '../../components/main/MainFooter';
import DonorBreadcrumbs from "./components/DonorBreadcrumb";
import BaseFilter from '../../components/filters/BaseFilter';
import _ from "lodash";
import * as actions from "../../services/actions/index";
import {connect} from "react-redux";
import DonorProjects from "./components/DonorProjects";
import './styles/Donor.scss';


const { Header, Content, Footer } = Layout;

class Donor extends BaseFilter {
  componentDidMount() {
    const { dispatch } = this.props;
    const { params } = this.state;
    const code = _.get(this.props, 'match.params.code');
    if (dispatch && code) {
      this.actionRequest(
        _.extend({}, params, {participating_organisation_ref: code.toUpperCase()}),
        'participating_organisation',
        actions.donorRequest
      );
    } else {
      actions.donorInitial();
    }
  }

  render() {
    const code = _.get(this.props, 'match.params.code');
    const data = _.get(this.props, 'donor.data.results[0]');
    return (
      <Layout className="Donor">
        <Header className="Header">
          <MainHeader/>
        </Header>
        <Content className="Content">
          <DonorBreadcrumbs donor={data}/>
        </Content>
        <Content className="Content">
          <Row>
            <Col span={24} className="Title">
              <h2 style={{marginTop: 5, marginBottom: 5}}>{data ? data.participating_organisation : null}</h2>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DonorProjects code={code}/>
            </Col>
          </Row>
        </Content>
        <Footer className="Footer">
          <MainFooter/>
        </Footer>
      </Layout>
    )
  }
}

const mapStateToProps = (state, ) => {
  return {
    donor: state.donor,
  }
};

export default connect(mapStateToProps)(Donor);