import React from 'react';
import { Input } from 'antd';

import BaseFilter from "./BaseFilter";
import {connect} from "react-redux";

const Search = Input.Search;

class SearchFilter extends BaseFilter {
  render() {
    const { placeholder } = this.props;
    return (
      <Search placeholder={placeholder}
              onSearch={(value) => this.handleChange(value)}
              enterButton
      />
    )
  }
}

const mapStateToProps = (state, props) => {
  return {}
};

export default connect(mapStateToProps)(SearchFilter);