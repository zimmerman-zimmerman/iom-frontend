import React, { Component } from 'react';
import Breadcrumb from 'antd/es/breadcrumb';
import { Link } from 'react-router-dom';
import { FormattedMessage } from "react-intl";

class CountryBreadcrumb extends Component {
  render() {
    return (
      <Breadcrumb className="Breadcrumb" separator=">">
        <Breadcrumb.Item>
          <Link to="/">
            <FormattedMessage id="countries.breadcrumb.home" defaultMessage="Home"/>
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <FormattedMessage id="countries.breadcrumb.countries" defaultMessage="Countries"/>
        </Breadcrumb.Item>
        <Breadcrumb.Item className="Active">
          <FormattedMessage id="countries.breadcrumb.countries.detail" defaultMessage="Country detail page"/>
        </Breadcrumb.Item>
      </Breadcrumb>
    )
  }
}

export default CountryBreadcrumb;