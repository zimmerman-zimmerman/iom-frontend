import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';

import MainMenu from './MainMenu';
import logo from '../assets/logo.svg';

class MainHeader extends Component {
  render() {
    return (
      <Row>
        <Col span={9}>
          <img src={logo} alt="logo" className="Logo"/>
        </Col>
        <Col span={12}>
          <Row type="flex" justify="end">
            <Col span={23}>
              <MainMenu/>
            </Col>
          </Row>
        </Col>
        <Col span={3}>
          <Row>
            <Col span={24} className="Share">
              <Button shape="circle" icon="twitter"/>
              <Button shape="circle" icon="facebook"/>
              <Button shape="circle" icon="wifi" style={{transform: "rotate(50deg)"}}/>
              <Button shape="circle" icon="share-alt"/>
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}

export default MainHeader;