import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Breadcrumb, Row, Col, Card } from 'antd'
import _ from 'lodash';
import { FormattedMessage } from "react-intl";
import { Link } from 'react-router-dom'

import MainHeader from '../MainHeader';
import GeoMap from './GeoMap';
import * as actions from '../../actions';
import '../../styles/Countries.css';

const { Header, Content } = Layout;

class Countries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {
        aggregations: 'activity_count,incoming_fund,disbursement,value',
        group_by: 'recipient_country',
        order_by: 'activity_count',
        convert_to: 'usd',
        hierarchy: 1,
        activity_status: '2,3,4',
        reporting_organisation_identifier: process.env.REACT_APP_REPORTING_ORGANISATION_IDENTIFIER
      },
      update: false,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { params } = this.state;
    if (dispatch) {
      if (params) {
        dispatch(actions.transactionsAggregationsRequest(params));
      } else {
        dispatch(actions.transactionsAggregationsInitial());
      }
    }
  }

  render() {
    const { transactionsAggregations } = this.props;
    const data = _.get(transactionsAggregations, 'data');
    const showMap = _.get(data, 'results[0].recipient_country.code');
    console.log(data);
    return (
      <Layout className='Countries'>
        <Header className="Path-38381">
          <MainHeader/>
        </Header>
        <Content className="Content">
          <Breadcrumb className="Breadcrumb" separator=">">
            <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
            <Breadcrumb.Item>Countries</Breadcrumb.Item>
            <Breadcrumb.Item className="Active">Funding by countries</Breadcrumb.Item>
          </Breadcrumb>
          <Row>
            <Col span={5}>
            </Col>
            <Col span={19}>
              <Row>
                <Col span={24}>
                  <h2 className="Title">
                    <FormattedMessage id="countries.title"
                                      defaultMessage="Countries"
                    />
                  </h2>
                </Col>
              </Row>
              <Row>
                <Col span={17} className="Description">
                  <FormattedMessage id="countries.description"
                                    defaultMessage="Description"
                  />
                </Col>
              </Row>
              <Row>
                <Col span={19}>
                  <div className="ShadowBox">
                    { showMap ?
                      <GeoMap data={data} zoom={3.2} country='nl' height={450} tooltipName="Activities:"
                              tabName="activities"
                      /> : null
                    }
                  </div>
                </Col>
                <Col span={5}>
                  <Card className="ShadowBox" style={{height: 450}}/>
                </Col>
              </Row>
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }
}


const mapStateToProps = (state, ) => {
  return {
    transactionsAggregations: state.transactionsAggregations
  }
};

export default connect(mapStateToProps)(Countries);