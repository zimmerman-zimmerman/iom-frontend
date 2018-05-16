import React from 'react';
import DatePicker from 'antd/es/date-picker';
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import {connect} from "react-redux";

import BaseFilter from "./BaseFilter";

const { RangePicker } = DatePicker;

class StartEndDateFilter extends BaseFilter {
  handleChange(values) {
    const { rootComponent } = this.props;
    const { filters } = rootComponent.state;
    if (get(filters.values, 'start_date_gte') || get(filters.values, 'end_date_lte') ) {
      delete filters.values['start_date_gte'];
      delete filters.values['end_date_lte'];
    }
    if (!isEmpty(values)) {
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

const mapStateToProps = (state, props) => {
  return {}
};

export default connect(mapStateToProps)(StartEndDateFilter);