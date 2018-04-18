import React, { Component } from 'react';
import { Layout } from 'antd';

import MainHeader from './MainHeader';

const { Header } = Layout;

class About extends Component {
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

export default About;