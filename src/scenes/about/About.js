import React from 'react';
import Layout from 'antd/es/layout';

import MainHeader from '../../components/main/MainHeader';
import MainFooter from '../../components/main/MainFooter';
import AboutBreadcrumb from './components/AboutBreadcrumb';
import AboutContent from './components/AboutContent';

const { Header, Content, Footer } = Layout;

const About = () => {
  return (
    <Layout className='About'>
      <Header className="Header">
        <MainHeader/>
      </Header>
      <Content className="Content">
        <AboutBreadcrumb/>
      </Content>
      <AboutContent/>
      <Footer className="MainFooter">
        <MainFooter/>
      </Footer>
    </Layout>
  );
};

export default About;