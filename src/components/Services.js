import React, { Component } from 'react';
import { Layout } from 'antd';

import MainHeader from './main/MainHeader';

const { Header } = Layout;

class Services extends Component {
  render() {
    return (
      <Layout>
        <Header className="Path-38381">
          <MainHeader/>
        </Header>
      </Layout>
    );
  }
}

export default Services;