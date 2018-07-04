import React from 'react';
import Input from 'antd/es/input';
import { connect } from 'react-redux';
import injectSheet from "react-jss";

import BaseFilter from "./BaseFilter";

const Search = Input.Search;

class SearchFilter extends BaseFilter {
  render() {
    const { placeholder, classes } = this.props;
    return (
      <Search placeholder={placeholder}
              onSearch={(value) => this.handleChange(value)}
              enterButton
              className={classes.search}
      />
    )
  }
}

const styles = {
  search: {
    height: 44,
    boxShadow: '0 1px 6px 0 rgba(0, 0, 0, 0.16)',
    '& button': {
      height: 44,
      width: 50,
      backgroundColor: '#418fde',
    },
    '& .ant-input-suffix': {
      boxShadow: '0 1px 6px 0 rgba(0, 0, 0, 0.20)',
    }
  },
};

const mapStateToProps = (state, props) => {
  return {}
};

export default injectSheet(styles)(connect(mapStateToProps)(SearchFilter));