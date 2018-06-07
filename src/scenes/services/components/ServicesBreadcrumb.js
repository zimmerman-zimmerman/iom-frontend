import React from 'react';
import Breadcrumb from 'antd/es/breadcrumb';
import { Link } from 'react-router-dom';
import { FormattedMessage } from "react-intl";

const ServicesBreadcrumb = props => {
    return (
        <Breadcrumb className="Breadcrumb" separator=">">
            <Breadcrumb.Item>
                <Link to="/">
                    <FormattedMessage id="services.breadcrumb.home" defaultMessage="Home"/>
                </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item className="Active">
                <FormattedMessage id="services.breadcrumb.services" defaultMessage="Our services"/>
            </Breadcrumb.Item>
        </Breadcrumb>
    )
};

export default ServicesBreadcrumb;