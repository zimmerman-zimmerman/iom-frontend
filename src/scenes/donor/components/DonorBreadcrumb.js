import React from 'react';
import Breadcrumb from 'antd/es/breadcrumb';
import { Link } from 'react-router-dom';
import { FormattedMessage } from "react-intl";
import get from 'lodash/get';

const DonorBreadcrumbs = props => {
  const data = get(props, 'donor');
  return (
    <Breadcrumb className="Breadcrumb" separator=">">
      <Breadcrumb.Item>
        <Link to="/">
          <FormattedMessage id="donor.breadcrumb.home" defaultMessage="Home"/>
        </Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <FormattedMessage id="donor.breadcrumb.donors" defaultMessage="Donors"/>
      </Breadcrumb.Item>
      <Breadcrumb.Item className="Active">
        { data ? data.participating_organisation
          : <FormattedMessage id="donor.breadcrumb.donors.detail" defaultMessage="Donor detail page"/>
        }
      </Breadcrumb.Item>
    </Breadcrumb>
  )
};

export default DonorBreadcrumbs;