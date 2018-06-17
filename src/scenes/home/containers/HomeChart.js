import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spin from 'antd/es/spin';
import forEach from 'lodash/forEach';
import get from 'lodash/get';
import MediaQuery from 'react-responsive';
import { injectIntl, intlShape } from "react-intl";
import { Row, Col } from 'react-flexbox-grid';


import * as actions from '../../../services/actions/index';
import {size as screenSize} from '../../../helpers/screen';
import ResponsivePieRadialChart from '../../../containers/ResponsivePieRadialChart';

class HomeChart extends Component {
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

  resize = () => this.forceUpdate();

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize)
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize)
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
    const { homeDonors, localeTitle, intl } = this.props;
    const data = [];
    forEach(get(homeDonors, 'data.results'), function(item){
      data.push({
        name: get(item, 'participating_organisation'),
        value: get(item, 'value'),
      });
    });
    const colors = ['#0033a1', '#f29d70', '#fac878', '#f27f6d', '#54c8c3'];
    const fillColor = '#8884d8';
    const prefixLegend = intl.formatMessage({id: 'currency.usd', defaultMessage: 'USD'});
    const title = intl.formatMessage(localeTitle);
    const LocalResponsivePieRadialChart = (props) => {
      const {widthDivider } = props;
      const height = window.innerWidth / widthDivider;
      return (
        <ResponsivePieRadialChart height={height} data={data} prefixLegend={prefixLegend} fillColor={fillColor}
                                  innerRadius={height / 3.7} colors={colors}
        />
      )
    };
    return (
      <Spin spinning={homeDonors.request}>
        <Row middle="xs" start="xs" center="xs">
          <Col xs={12}>
            {title}
          </Col>
        </Row>
        <Row middle="xs" start="xs" center="xs">
          <Col xs={12}>
            <MediaQuery maxWidth={screenSize.mobile.maxWidth}>
              <LocalResponsivePieRadialChart widthDivider={1.5} />
            </MediaQuery>
            <MediaQuery minWidth={screenSize.tablet.minWidth} >
              <LocalResponsivePieRadialChart widthDivider={3} />
            </MediaQuery>
          </Col>
        </Row>
      </Spin>
    )
  }
}

HomeChart.propTypes = {
  intl: intlShape.isRequired
};

const mapStateToProps = (state, ) => {
  return {
    homeDonors: state.homeDonors
  }
};

export default connect(mapStateToProps)(injectIntl(HomeChart));