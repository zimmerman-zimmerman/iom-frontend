import React from 'react';
import Breadcrumb from 'antd/es/breadcrumb';
import { Link } from 'react-router-dom';
import { FormattedMessage } from "react-intl";

const DonorsBreadcrumb = props => {
  return (
    <Breadcrumb className="Breadcrumb" separator=">">
      <Breadcrumb.Item>
        <Link to="/">
          <FormattedMessage id="donors.breadcrumb.home" defaultMessage="Home"/>
        </Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item className="Active">
        <FormattedMessage id="donors.breadcrumb.donors" defaultMessage="Donors"/>
      </Breadcrumb.Item>
    </Breadcrumb>
  )
};

export default DonorsBreadcrumb;