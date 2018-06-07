import React, { Component } from 'react';
import Breadcrumb from 'antd/es/breadcrumb';
import { Link } from 'react-router-dom';
import { FormattedMessage } from "react-intl";

class CountriesBreadcrumb extends Component {
  render() {
    return (
      <Breadcrumb className="Breadcrumb" separator=">">
        <Breadcrumb.Item>
          <Link to="/">
            <FormattedMessage id="breadcrumb.home" defaultMessage="Home"/>
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <FormattedMessage id="countries.breadcrumb.countries" defaultMessage="Countries"/>
        </Breadcrumb.Item>
        <Breadcrumb.Item className="Active">
          <FormattedMessage id="countries.breadcrumb.funding" defaultMessage="Funding by countries"/>
        </Breadcrumb.Item>
      </Breadcrumb>
    )
  }
}

export default CountriesBreadcrumb;