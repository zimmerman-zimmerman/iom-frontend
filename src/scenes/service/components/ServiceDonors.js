import React, { Component } from 'react';
import Layout from 'antd/es/layout';
import { FormattedMessage } from "react-intl";

const { Content } = Layout;

class ServiceDonors extends Component {
  render() {
    return(
      <Content className="Content">
        <h3 className="Title">
          <FormattedMessage id="service.table.donors.title" defaultMessage="Where the funds come from"/>
        </h3>
      </Content>
    )
  }
}

export default ServiceDonors;