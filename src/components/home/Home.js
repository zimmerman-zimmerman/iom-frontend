import React, { Component } from 'react';
import { Layout, Row, Col, Button } from 'antd';
import { connect } from 'react-redux';
import _ from 'lodash';
import { FormattedMessage } from "react-intl";

import '../../styles/Home.css';

import * as actions from '../../actions';
import MainHeader from '../MainHeader';
import Banner from '../Banner';
import BannerText from '../BannerText';
import PieChart from '../PieChart';
import MainFooter from '../MainFooter';
import FundingGoes from './FundingGoes';
import Classified from './Classified';

const { Header, Content, Footer } = Layout;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reportingOrganisationIdentifier: process.env.REACT_APP_REPORTING_ORGANISATION_IDENTIFIER
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { reportingOrganisationIdentifier } = this.state;
    if (dispatch) {
      if (reportingOrganisationIdentifier) {
        dispatch(actions.transactionAggregationByParticipatingOrganisationRequest(reportingOrganisationIdentifier));
      } else {
        dispatch(actions.transactionAggregationByParticipatingOrganisationInitial());
      }
    }
  }

  render() {
    const { transactionAggregationByParticipatingOrganisation } = this.props;
    const dataFundingComeFrom = [];
    _.forEach(_.get(transactionAggregationByParticipatingOrganisation, 'data.results'), function(item){
      dataFundingComeFrom.push({x: item.participating_organisation, y: item.value})
    });
    return (
      <Layout className="Home">
        <Header className="Path-38381">
          <MainHeader/>
        </Header>
        <Content>
          <Banner/>
          <BannerText/>
        </Content>
        <Content className="Graphs">
          <Row type="flex" align="center">
            <Col span={6}>
              <Row>
                <Col span={24}>
                  <PieChart
                    title={
                      <FormattedMessage id="home.funding.come.title"
                                        defaultMessage="Where the Funding Come From"
                      />
                    }
                    data={_.slice(dataFundingComeFrom, 0, 5)} height={180}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={24} className="Pad">
                  <Button className="Button">
                    <FormattedMessage id="home.funding.come.button"
                                      defaultMessage="See All Publisher Donors"
                    />
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col span={6}>
              <FundingGoes/>
            </Col>
            <Col span={6}>
              <Classified/>
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
    transactionAggregationByParticipatingOrganisation: state.transactionAggregationByParticipatingOrganisation
  }
};

export default connect(mapStateToProps)(Home);