import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Row, Col, Button } from 'antd';
import { FormattedMessage } from "react-intl";
import _ from "lodash";

import * as actions from '../../actions';
import PieChart from '../PieChart';

const { Content } = Layout;

class FundingCome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {
        aggregations: 'value',
        group_by: 'participating_organisation',
        order_by: '-value',
        convert_to: 'usd',
        activity_status: '2,3,4',
        reporting_organisation_identifier: process.env.REACT_APP_REPORTING_ORGANISATION_IDENTIFIER
      }
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { params } = this.state;
    if (dispatch) {
      if (params) {
        dispatch(actions.transactionsAggregationsParticipatingOrganisationRequest(params));
      } else {
        dispatch(actions.transactionsAggregationsParticipatingOrganisationInitial());
      }
    }
  }

  render() {
    const { transactionsAggregationsParticipatingOrganisation } = this.props;
    const data = [];
    _.forEach(_.get(transactionsAggregationsParticipatingOrganisation, 'data.results'), function(item){
      const x = _.get(item, 'participating_organisation');
      const y = _.get(item, 'value');
      data.push({x: x, y: y})
    });
    return (
      <Layout>
        <Content className="Graphs">
          <Row>
            <Col span={24}>
              <PieChart
                title={
                  <FormattedMessage id="home.funding.come.title"
                                    defaultMessage="Where the Funding Come From"
                  />
                }
                data={_.slice(data, 0, 5)} height={180}
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
        </Content>
      </Layout>
    )
  }
}

const mapStateToProps = (state, ) => {
  return {
    transactionsAggregationsParticipatingOrganisation: state.transactionsAggregationsParticipatingOrganisation
  }
};

export default connect(mapStateToProps)(FundingCome);