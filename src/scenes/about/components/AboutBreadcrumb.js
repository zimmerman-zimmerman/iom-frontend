import React from 'react';
import Breadcrumb from 'antd/es/breadcrumb';
import { Link } from 'react-router-dom';
import { FormattedMessage } from "react-intl";

const AboutBreadcrumb = () => {
  return (
    <Breadcrumb className="Breadcrumb" separator=">">
      <Breadcrumb.Item>
        <Link to="/">
          <FormattedMessage id="about.breadcrumb.home" defaultMessage="Home"/>
        </Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item className="Active">
        <FormattedMessage id="about.breadcrumb.about" defaultMessage="About"/>
      </Breadcrumb.Item>
    </Breadcrumb>
  )
};

export default AboutBreadcrumb;