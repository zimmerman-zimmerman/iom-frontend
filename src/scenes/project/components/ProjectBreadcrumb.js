import React, { Component } from 'react';
import Breadcrumb from 'antd/es/breadcrumb';
import { Link } from 'react-router-dom';
import { FormattedMessage } from "react-intl";

class ProjectBreadcrumb extends Component {
  render() {
    return (
      <Breadcrumb className="Breadcrumb" separator=">">
        <Breadcrumb.Item>
          <Link to="/">
            <FormattedMessage id="project.breadcrumb.home" defaultMessage="Home"/>
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <FormattedMessage id="project.breadcrumb.projects" defaultMessage="Projects"/>
        </Breadcrumb.Item>
        <Breadcrumb.Item className="Active">
          <FormattedMessage id="project.breadcrumb.overview" defaultMessage="Project overview page"/>
        </Breadcrumb.Item>
      </Breadcrumb>
    )
  }
}

export default ProjectBreadcrumb;