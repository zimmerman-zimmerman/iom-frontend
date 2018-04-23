import React, { Component } from 'react';
import { Row, Col } from 'antd';

import MainMenu from './MainMenu';
import MainShare from './MainShare';
import logo from '../../assets/logo.svg';
import './styles/MainHeader.scss';

class MainHeader extends Component {
  render() {
    return (
      <Row className="MainHeader">
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
          <MainShare/>
        </Col>
      </Row>
    )
  }
}

export default MainHeader;