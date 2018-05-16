import React, { Component } from 'react';
import Layout from 'antd/es/layout';

import MainHeader from '../../components/main/MainHeader';

const { Header } = Layout;

class Services extends Component {
  render() {
    return (
      <Layout>
        <Header className="Header">
          <MainHeader/>
        </Header>
      </Layout>
    );
  }
}

export default Services;