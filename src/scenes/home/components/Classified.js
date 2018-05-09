import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Row, Col, Button, Spin } from 'antd';
import { FormattedMessage } from "react-intl";
import _ from "lodash";

import * as actions from '../../../services/actions/index';
import PieReCharts from './PieReCharts';

const { Content } = Layout;

class Classified extends Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {
        aggregations: 'activity_count,incoming_fund,disbursement,value',
        group_by: 'sector',
        order_by: '-value',
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
        dispatch(actions.homeSectorsRequest(params));
      } else {
        dispatch(actions.homeSectorsInitial());
      }
    }
  }

  render() {
    const { homeSectors } = this.props;
    const data = [];
    _.forEach(_.get(homeSectors, 'data.results'), function(item){
      data.push({name: _.get(item, 'sector.name'), value: _.get(item, 'value')})
    });
    return (
      <Spin spinning={homeSectors.request}>
        <Layout>
          <Content className="Graphs">
            <Row style={{minHeight: 389}}>
              <Col span={24}>
                <PieReCharts
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
    homeSectors: state.homeSectors
  }
};

export default connect(mapStateToProps)(Classified);