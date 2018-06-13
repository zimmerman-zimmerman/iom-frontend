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
    forEach(get(homeSectors, 'data.results'), function(item){
      data.push({name: get(item, 'sector.name'), value: get(item, 'value')})
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
                  data={slice(data, 0, 5)} height={180}
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