import React from 'react';
import _ from 'lodash';
import { Select, Spin, Layout } from 'antd';
import { connect } from "react-redux";

import BaseFilter from "./BaseFilter";

const Option = Select.Option;
const { Content } = Layout;

class Filter extends BaseFilter {
  componentDidMount() {
    const { dispatch, actionRequest, groupBy } = this.props;
    const { params } = this.state;
    if (dispatch) {
      this.actionRequest(params, groupBy, actionRequest);
    }
  }

  options(results) {
    const { optionKeyName, optionValueName } = this.props;
    return results.map(item => <Option key={_.get(item, optionKeyName)}>{_.get(item, optionValueName)}</Option>)
  }

  select(options) {
    const { placeholder, style } = this.props;
    return (
      <Select showSearch
              style={style}
              placeholder={placeholder}
              className="Select"
              mode="multiple"
              onChange={(values) => this.handleChange(values)}>
        {options}
      </Select>
    )
  }

  render() {
    const { reducer, style } = this.props;
    const results = _.get(reducer, 'data.results');
    const options = !_.isEmpty(results) ? this.options(results) : null;
    return (
      <Spin spinning={reducer.request}>
        <Content style={style}>
          {options ? this.select(options) : null}
        </Content>
      </Spin>
    )
  }
}

const mapStateToProps = (state, props) => {
  const { reducerName } = props;
  return {
    reducer: _.get(state, reducerName)
  }
};

export default connect(mapStateToProps)(Filter);