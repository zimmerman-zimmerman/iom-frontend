import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spin from 'antd/es/spin';
import forEach from 'lodash/forEach';
import get from 'lodash/get';
import MediaQuery from 'react-responsive';
import { injectIntl, intlShape } from "react-intl";


import * as actions from '../../../services/actions/index';
import {size as screenSize} from '../../../helpers/screen';
import PieRadialChart from '../../../components/PieRadialChart';

class HomeDonors extends Component {
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
    const { homeDonors, intl } = this.props;
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
    const ResponsivePieRadialChart = (props) => {
      const { data, prefixLegend, fillColor, widthDivider, colors } = props;
      const height = window.innerWidth / widthDivider;
      return (
        <div style={{height: height}}>
          <PieRadialChart data={data} prefixLegend={prefixLegend} fillColor={fillColor} innerRadius={height / 3.7}
                          colors={colors}
          />
        </div>
      )
    };
    return (
      <Spin spinning={homeDonors.request}>
        <MediaQuery maxWidth={screenSize.mobile.maxWidth}>
          <ResponsivePieRadialChart widthDivider={1.5} fillColor={fillColor} prefixLegen={prefixLegend}
                                    data={data} colors={colors}
          />
        </MediaQuery>
        <MediaQuery minWidth={screenSize.tablet.minWidth} >
          <ResponsivePieRadialChart widthDivider={3} fillColor={fillColor} prefixLegen={prefixLegend}
                                    data={data} colors={colors}
          />
        </MediaQuery>
      </Spin>
    )
  }
}

HomeDonors.propTypes = {
  intl: intlShape.isRequired
};

const mapStateToProps = (state, ) => {
  return {
    homeDonors: state.homeDonors
  }
};

export default connect(mapStateToProps)(injectIntl(HomeDonors));