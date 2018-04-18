import React, { Component } from 'react';
import { Layout } from 'antd';

import MainHeader from '../MainHeader';

const { Header, Content } = Layout;

class Countries extends Component {
  render() {
    return (
      <Layout>
        <Header className="Path-38381">
          <MainHeader/>
        </Header>
        <Content>
        </Content>
      </Layout>
    );
  }
}

export default Countries;