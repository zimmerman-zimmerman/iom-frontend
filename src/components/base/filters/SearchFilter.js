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
    boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
    '& button': {
      height: 44,
      width: 50,
      backgroundColor: '#70bea5',
        borderColor: '#70bea5',
    },
    '& .ant-input-suffix': {
      zIndex: 1,
      boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
    },
      '& .ant-input::-webkit-input-placeholder': { /* Chrome/Opera/Safari */
          fontSize: 18,
      },
      '& .ant-input::-moz-placeholder': { /* Firefox 19+ */
          fontSize: 18,
      },
      '& .ant-input:-ms-input-placeholder': { /* IE 10+ */
          fontSize: 18,
      },
      '& .ant-input:-moz-placeholder': { /* Firefox 18- */
          fontSize: 18,
      },
      '& .ant-input::placeholder': {
          fontSize: 18,
      },
  },
};

const mapStateToProps = (state, props) => {
  return {}
};

export default injectSheet(styles)(connect(mapStateToProps)(SearchFilter));