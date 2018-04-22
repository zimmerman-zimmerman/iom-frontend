import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Row, Col, Button, Spin } from 'antd';
import { FormattedMessage } from "react-intl";
import _ from "lodash";

import * as actions from '../../actions';
import PieChart from './PieChart';

const { Content } = Layout;

class Classified extends Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {
        aggregations: 'activity_count,incoming_fund,disbursement',
        group_by: 'sector',
        order_by: 'activity_count',
        convert_to: 'usd',
        hierarchy: 1,
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
        dispatch(actions.transactionsAggregationsRequest(params));
      } else {
        dispatch(actions.transactionsAggregationsInitial());
      }
    }
  }

  render() {
    const { transactionsAggregations } = this.props;
    const data = [];
    _.forEach(_.get(transactionsAggregations, 'data.results'), function(item){
      const x = _.get(item, 'sector.name');
      const y = _.get(item, 'activity_count');
      data.push({x: x, y: y})
    });
    return (
      <Spin spinning={transactionsAggregations.request}>
        <Layout>
          <Content className="Graphs">
            <Row style={{minHeight: 389}}>
              <Col span={24}>
                <PieChart
                  title={
                    <FormattedMessage id="home.classified.title"
                                      defaultMessage="How the expenditures are classified"
                    />
                  }
                  data={_.slice(data, 0, 5)} height={180}
                />
              </Col>
            </Row>
            <Row>
              <Col span={24} className="Pad">
                <Button className="Button">
                  <FormattedMessage id="home.classified.button"
                                    defaultMessage="See All Published Projects"
                  />
                </Button>
              </Col>
            </Row>
          </Content>
        </Layout>
      </Spin>
    )
  }
}

const mapStateToProps = (state, ) => {
  return {
    transactionsAggregations: state.transactionsAggregations
  }
};

export default connect(mapStateToProps)(Classified);