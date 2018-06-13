import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from 'antd/es/layout';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import Button from 'antd/es/button';
import Spin from 'antd/es/spin';
import { FormattedMessage } from "react-intl";
import forEach from "lodash/forEach";
import get from 'lodash/get';
import slice from 'lodash/slice';


import * as actions from '../../../services/actions/index';
import PieReCharts from './PieReCharts';

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
        reporting_organisation_identifier: process.env.REACT_APP_REPORTING_ORGANISATION_IDENTIFIER
      }
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { params } = this.state;
    if (dispatch) {
      if (params) {
        dispatch(actions.homeDonorsRequest(params));
      } else {
        dispatch(actions.homeDonorsInitial());
      }
    }
  }

  render() {
    const { homeDonors } = this.props;
    const data = [];
    forEach(get(homeDonors, 'data.results'), function(item){
      data.push({
        name: get(item, 'participating_organisation'),
        value: get(item, 'value'),
      });
    });
    return (
      <Spin spinning={homeDonors.request}>
        <Layout>
          <Content className="Graphs">
            <Row>
              <Col span={24}>
                <PieReCharts
                  title={
                    <FormattedMessage id="home.funding.come.title"
                                      defaultMessage="Where the Funding Come From"
                    />
                  }
                  data={slice(data, 0, 5)}
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
      </Spin>
    )
  }
}

const mapStateToProps = (state, ) => {
  return {
    homeDonors: state.homeDonors
  }
};

export default connect(mapStateToProps)(FundingCome);