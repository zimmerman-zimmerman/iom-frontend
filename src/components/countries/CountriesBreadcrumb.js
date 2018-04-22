import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

class CountriesBreadcrumb extends Component {
  render() {
    return (
      <Breadcrumb className="Breadcrumb" separator=">">
        <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
        <Breadcrumb.Item>Countries</Breadcrumb.Item>
        <Breadcrumb.Item className="Active">Funding by countries</Breadcrumb.Item>
      </Breadcrumb>
    )
  }
}

export default CountriesBreadcrumb;