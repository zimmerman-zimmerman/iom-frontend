import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spin from 'antd/es/spin';
import forEach from 'lodash/forEach';
import get from 'lodash/get';
import { injectIntl, intlShape } from "react-intl";

import * as actions from '../../../services/actions/index';
import HomeChart from './HomeChart';

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
    window.removeEventListener('resize', this.resize);
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
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
    const title = intl.formatMessage({id: 'home.donors.title', defaultMessage: 'Where the Funding Come From'});
    return (
      <Spin spinning={homeDonors.request}>
        <HomeChart title={title} data={data}/>
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