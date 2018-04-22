import React from 'react';
import { Input } from 'antd';

import BaseFilter from "./BaseFilter";


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

export default SearchFilter;