import React from 'react';
import { Layout } from 'antd';
import { FormattedMessage } from "react-intl";

const { Content } = Layout;

const ContactInfo = props => {
  const { pathname } = props;
  const website = pathname ? process.env.REACT_APP_HOSTNAME.concat(pathname) :
    <FormattedMessage id="contact.info.website" defaultMessage="https://www.iom.int"/>;
  return (
    <Content className="ContactInfo">
      <h4 className="Title"><FormattedMessage id="contact.info.title" defaultMessage="Contact info"/></h4>
      <div className="Email">
        <strong><FormattedMessage id="contact.info.email.label" defaultMessage="Email"/>: </strong>
        <FormattedMessage id="contact.info.email" defaultMessage="info@iom.int"/>
      </div>
      <div className="Website">
        <strong><FormattedMessage id="contact.info.website.label" defaultMessage="Website"/>: </strong>{ website }
      </div>
    </Content>
  )
};

export default ContactInfo;