import React, { Component } from 'react';
import { Row, Col, Button, Layout } from 'antd';

import '../../styles/main/MainShare.scss';

const { Content } = Layout;

class MainShare extends Component {
  render() {
    return (
      <Row className="MainShare">
        <Col span={24}>
          <Content className="ShareContent">
            <Button shape="circle" icon="twitter"/>
            <Button shape="circle" icon="facebook"/>
            <Button shape="circle" icon="wifi" style={{transform: "rotate(50deg)"}}/>
            <Button shape="circle" icon="share-alt"/>
          </Content>
        </Col>
      </Row>
    )
  }
}

export default MainShare;