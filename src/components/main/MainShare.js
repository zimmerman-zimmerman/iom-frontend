import React, { Component } from 'react';
import Layout from 'antd/es/layout';
import Button from 'antd/es/button';

import './styles/MainShare.scss';

const { Content } = Layout;

class MainShare extends Component {
  render() {
    return (
      <Content className="MainShare">
          <Content className="ShareContent">
            <Button shape="circle" icon="twitter"/>
            <Button shape="circle" icon="facebook"/>
            <Button shape="circle" icon="wifi" style={{transform: "rotate(50deg)"}}/>
            <Button shape="circle" icon="share-alt"/>
          </Content>
      </Content>
    )
  }
}

export default MainShare;