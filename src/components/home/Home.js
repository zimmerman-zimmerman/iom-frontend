import React, { Component } from 'react';
import { Layout, Row, Col } from 'antd';

import MainHeader from '../main/MainHeader';
import Banner from './Banner';
import BannerText from './BannerText';
import MainFooter from '../main/MainFooter';
import FundingCome from './FundingCome';
import FundingGoes from './FundingGoes';
import Classified from './Classified';
import '../../styles/home/Home.scss';

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