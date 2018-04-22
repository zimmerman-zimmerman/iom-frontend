import React, { Component } from 'react';
import { Layout } from 'antd';

import MainHeader from './main/MainHeader';

const { Header } = Layout;

class About extends Component {
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

export default About;