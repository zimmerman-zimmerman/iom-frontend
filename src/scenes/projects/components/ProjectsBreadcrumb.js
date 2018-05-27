import React from 'react';
import Breadcrumb from 'antd/es/breadcrumb';
import { Link } from 'react-router-dom';
import { FormattedMessage } from "react-intl";

const ProjectsBreadcrumb = props => {
  return (
    <Breadcrumb className="Breadcrumb" separator=">">
      <Breadcrumb.Item>
        <Link to="/">
          <FormattedMessage id="projects.breadcrumb.home" defaultMessage="Home"/>
        </Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item className="Active">
        <FormattedMessage id="projects.breadcrumb.projects" defaultMessage="Donors"/>
      </Breadcrumb.Item>
    </Breadcrumb>
  )
};

export default ProjectsBreadcrumb;