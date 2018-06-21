import React from 'react';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import Select from 'antd/es/select';
import Spin from 'antd/es/spin';
import Layout from 'antd/es/layout';
import { connect } from "react-redux";
import injectSheet from "react-jss";
import PropsType from 'prop-types';

import BaseFilter from "../../filters/BaseFilter";

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
    return results.map(item => <Option key={get(item, optionKeyName)}>{get(item, optionValueName)}</Option>)
  }

  select(options) {
    const { placeholder, classes } = this.props;
    return (
      <Select showSearch
              placeholder={placeholder}
              className={classes.filter}
              mode="multiple"
              onChange={(values) => this.handleChange(values)}
      >
        {options}
      </Select>
    )
  }

  render() {
    const { reducer } = this.props;
    const results = get(reducer, 'data.results');
    const options = !isEmpty(results) ? this.options(results) : null;
    return (
      <Spin spinning={reducer.request}>
        <Content>
          {options ? this.select(options) : null}
        </Content>
      </Spin>
    )
  }
}

Filter.propTypes = {
  reducer: PropsType.object,
  placeholder: PropsType.string,
  optionKeyName: PropsType.string,
  optionValueName: PropsType.string,
  groupBy: PropsType.string,
  actionRequest: PropsType.func,
};

const styles = {
  filter: {
    width: '100%',
    '& .ant-select-selection': {
      height: 44,
    },
    '& .ant-select-selection__rendered': {
      marginTop: 6,
    }
  },
};

const mapStateToProps = (state, props) => {
  const { reducerName } = props;
  return {
    reducer: get(state, reducerName)
  }
};

export default injectSheet(styles)(connect(mapStateToProps)(Filter));