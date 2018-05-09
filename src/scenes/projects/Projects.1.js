import React, { Component } from 'react';
import { Layout } from 'antd';

import MainHeader from '../../components/main/MainHeader';

const { Header } = Layout;

class Projects extends Component {
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

export default Projects;