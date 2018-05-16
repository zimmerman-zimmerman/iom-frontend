import React, { Component } from 'react';
import Layout from 'antd/es/layout';

import MainHeader from '../../components/main/MainHeader';

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