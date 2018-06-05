import React, { Component } from 'react';
import Breadcrumb from 'antd/es/breadcrumb';
import { Link } from 'react-router-dom';
import { FormattedMessage } from "react-intl";

class ServiceBreadcrumb extends Component {
  render() {
    return (
      <Breadcrumb className="Breadcrumb" separator=">">
        <Breadcrumb.Item>
          <Link to="/">
            <FormattedMessage id="service.breadcrumb.home" defaultMessage="Home"/>
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <FormattedMessage id="service.breadcrumb.service" defaultMessage="Countries"/>
        </Breadcrumb.Item>
        <Breadcrumb.Item className="Active">
          <FormattedMessage id="service.breadcrumb.service.detail" defaultMessage="Country detail page"/>
        </Breadcrumb.Item>
      </Breadcrumb>
    )
  }
}

export default ServiceBreadcrumb;