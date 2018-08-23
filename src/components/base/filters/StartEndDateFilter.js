import React from 'react';
import DatePicker from 'antd/es/date-picker';
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import { connect } from "react-redux";
import injectSheet from 'react-jss';

import BaseFilter from "./BaseFilter";
import PropsType from "prop-types";

const { RangePicker } = DatePicker;

class StartEndDateFilter extends BaseFilter {
  handleChange(values) {
    const { rootComponent } = this.props;
    const { filters } = rootComponent.state;
    if (get(filters.values, 'start_date_gte') || get(filters.values, 'end_date_lte') ) {
      delete filters.values['start_date_gte'];
      delete filters.values['end_date_lte'];
      delete filters.chips['date'];
    }
    if (!isEmpty(values)) {
      const start_date = values[0].format('YYYY-MM-DD');
      const end_date = values[1].format('YYYY-MM-DD');
        filters.chips['date'] = {
            labels: [('From: ').concat(start_date).concat(' to: ').concat(end_date)],
            type: 'Date',
        };
        filters.values['start_date_gte'] = start_date;
      filters.values['end_date_lte'] = end_date;
    }
    filters.changed = true;
    this.setState({filters: filters});
  }

  render() {
    const { classes } = this.props;
    return (
      <RangePicker onChange={(values) => this.handleChange(values)} className={classes.startEndDateFilter} />
    )
  }
}

StartEndDateFilter.propTypes = {
  rootComponent: PropsType.object,
};

const styles = {
  startEndDateFilter: {
    '& .ant-input': {
      height: 44,
    },
    '& .ant-calendar-range-picker-separator': {
      marginTop: 5,
    }
  },
};

const mapStateToProps = (state, ) => {
  return {}
};

export default injectSheet(styles)(connect(mapStateToProps)(StartEndDateFilter));