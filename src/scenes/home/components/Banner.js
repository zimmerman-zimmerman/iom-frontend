import React, { Component } from 'react';
import { Layout, Row, Col, Card } from 'antd';
import { FormattedMessage } from "react-intl";

import '../styles/Banner.scss';

const { Content } = Layout;

class Banner extends Component {
  render() {
    return (
      <Content className="Banner">
        <Content className="Content">
          <Card className="Card">
            <Row>
              <Col span={24}>
                <h1 className="Title">
                  <FormattedMessage id="banner.title" defaultMessage="IOM Transparency Portal"/>
                </h1>
              </Col>
            </Row>
            <Row>
              <Col span={24} className="Description">
                <FormattedMessage id="banner.description"
                                  defaultMessage="[SAMPLE TEXT] Find data about IOM activities around the world.
                                  Thanks to IATI standard we share information about our daily work with migrants. "
                />
              </Col>
            </Row>
            <Row>
              <Col span={24} className="Detail">
                <FormattedMessage id="banner.detail"
                                  defaultMessage="Track money flow from donation to employment.
                                  Understanding our mission is the first step to give value to
                                  our projects and keep them alive."
                />
              </Col>
            </Row>
          </Card>
        </Content>
      </Content>
    )
  }
}

export default Banner;