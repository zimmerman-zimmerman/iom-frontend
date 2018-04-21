import React, { Component } from 'react';
import _ from "lodash";

import * as actions from "../../actions";

class BaseFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {
        aggregations: 'activity_count,incoming_fund,disbursement,value',
        group_by: '',
        order_by: '-activity_count',
        convert_to: 'usd',
        hierarchy: 1,
        reporting_organisation_identifier: process.env.REACT_APP_REPORTING_ORGANISATION_IDENTIFIER
      },
      update: false,
      filters: {values: {}, changed: false},
    };
  }

  actionRequest(params, groupBy, request) {
    const { dispatch } = this.props;
    const lParams = params;
    lParams.group_by = groupBy;
    dispatch(request(lParams))
  }

  handleChange(values) {
    const { fieldName } = this.props;
    const { filters } = this.state;
    if (_.get(filters.values, fieldName)) {
      delete filters.values[fieldName];
    }
    if (!_.isEmpty(values)) {
      filters.values[fieldName] = Array.isArray(values) ? values.join() : values;
    }
    filters.changed = true;
    this.setState({filters: filters});
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { filters } = this.state;
    if (filters.changed) {
      const { params } = this.state;
      this.actionRequest(
        _.extend({}, params, filters.values), 'recipient_country', actions.transactionsAggregationsRequest
      );
      filters.changed = false;
      this.setState({filters: filters})
    }
  }
}

export default BaseFilter;