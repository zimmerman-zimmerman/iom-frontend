import React from 'react';
import Input from 'antd/es/input';
import { connect } from 'react-redux';

import BaseFilter from "./BaseFilter";

const Search = Input.Search;

class SearchFilter extends BaseFilter {
  render() {
    const { placeholder } = this.props;
    return (
      <Search placeholder={placeholder}
              onSearch={(value) => this.handleChange(value)}
              enterButton
              className="SearchFilter"
      />
    )
  }
}

const mapStateToProps = (state, props) => {
  return {}
};

export default connect(mapStateToProps)(SearchFilter);