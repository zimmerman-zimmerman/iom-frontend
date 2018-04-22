import React from 'react';
import { DatePicker } from 'antd';

import BaseFilter from "./BaseFilter";
import _ from "lodash";

const { RangePicker } = DatePicker;

class StartEndDateFilter extends BaseFilter {
  handleChange(values) {
    const { filters } = this.state;
    if (_.get(filters.values, 'start_date_gte') || _.get(filters.values, 'end_date_lte') ) {
      delete filters.values['start_date_gte'];
      delete filters.values['end_date_lte'];
    }
    if (!_.isEmpty(values)) {
      filters.values['start_date_gte'] = values[0].format('YYYY-MM-DD');
      filters.values['end_date_lte'] = values[1].format('YYYY-MM-DD');
    }
    filters.changed = true;
    this.setState({filters: filters});
  }

  render() {
    return (
      <RangePicker onChange={(values) => this.handleChange(values)}/>
    )
  }

}

export default StartEndDateFilter;