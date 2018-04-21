import React from 'react';
import _ from 'lodash';
import { Select } from 'antd';
import { connect } from "react-redux";

import BaseFilter from "./BaseFilter";

const Option = Select.Option;

class Filter extends BaseFilter {
  componentDidMount() {
    console.log(this.props);
    const { dispatch, actionRequest, groupBy } = this.props;
    const { params } = this.state;
    if (dispatch) {
      this.actionRequest(params, groupBy, actionRequest);
    }
  }

  options(results, optionKeyName, optionValueName) {
    return results.map(item => <Option key={_.get(item, optionKeyName)}>{_.get(item, optionValueName)}</Option>)
  }

  select(placeholder, options) {
    return (
      <Select showSearch
              style={{ width: '100%' }}
              placeholder={placeholder}
              className="Select"
              mode="multiple"
              onChange={(values) => this.handleChange(values)}>
        {options}
      </Select>
    )
  }

  render() {
    const { placeholder, state, optionKeyName, optionValueName } = this.props;
    const results = _.get(state, 'data.results');
    const options = !_.isEmpty(results) ? this.options(results, optionKeyName, optionValueName) : null;
    return options ? this.select(placeholder, options) : null;
  }
}

const mapStateToProps = (state, props) => {
  return {
    state: _.get(state, _.get(props, 'reducerName'))
  }
};

export default connect(mapStateToProps)(Filter);