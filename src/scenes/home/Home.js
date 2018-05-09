import React, { Component } from 'react';
import { Layout, Row, Col } from 'antd';

import MainHeader from '../../components/main/MainHeader';
import Banner from './components/Banner';
import BannerText from './components/BannerText';
import MainFooter from '../../components/main/MainFooter';
import FundingCome from './components/FundingCome';
import FundingGoes from './components/FundingGoes';
import Classified from './components/Classified';

import './styles/Home.scss';

const { Header, Content, Footer } = Layout;

class Home extends Component {
  render() {
    return (
      <Layout className="Home">
        <Header className="Header">
          <MainHeader/>
        </Header>
        <Content>
          <Banner/>
          <BannerText/>
        </Content>
        <Content className="Graphs">
          <Row type="flex" align="center">
            <Col span={6}>
              <FundingCome/>
            </Col>
            <Col span={6}>
              <FundingGoes/>
            </Col>
            <Col span={6}>
              <Classified/>
            </Col>
          </Row>
        </Content>
        <Footer className="MainFooter">
          <MainFooter/>
        </Footer>
      </Layout>
    );
  }
}

export default Home;