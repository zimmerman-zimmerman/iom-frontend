import React, { Component } from 'react';
import { Layout, Row, Col } from 'antd';
import { FormattedMessage } from "react-intl";

import '../styles/BannerText.scss';

const { Content } = Layout;

class BannerText extends Component {
  render() {
    return (
      <Content className="BannerText">
        <Content className="Content">
          <Row type="flex" justify="center">
            <Col span={14}>
              <FormattedMessage id="banner.text.text"
                                defaultMessage="In 2016 IOM spent US$ 1,602,307,417 in over 100 countries around
                                the world in seven different service areas."
              />
            </Col>
          </Row>
        </Content>
      </Content>
    )
  }
}

export default BannerText;