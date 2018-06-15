import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spin from 'antd/es/spin';
import forEach from "lodash/forEach";
import get from 'lodash/get';
import { Grid, Row, Col } from 'react-flexbox-grid';
import MediaQuery from 'react-responsive';

import * as actions from '../../../services/actions/index';
import PieRadialChart from '../../../components/PieRadialChart';
import {size as screenSize} from '../../../helpers/screen';
import ContainerPieRadialChart from '../containers/ContainerPieRadialChart';


class FundingCome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {
        aggregations: 'value',
        group_by: 'participating_organisation',
        order_by: '-value',
        convert_to: 'usd',
        page_size: 5,
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
    const colors = ['#0033a1', '#f29d70', '#fac878', '#f27f6d', '#54c8c3'];
    return (
      <Spin spinning={homeDonors.request}>
        <Grid fluid>
          <Row middle="xs">
            <Col xs={12}>
              <ContainerPieRadialChart height={400} data={data} prefix="USD" fillColor="#8884d8"
                                       innerRadius={0} colors={colors}
              />
            </Col>
          </Row>
        </Grid>
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