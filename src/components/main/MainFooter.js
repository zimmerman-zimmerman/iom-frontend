import React, { Component } from 'react';
import { Layout, Row, Col, Button, Divider } from 'antd';
import { FormattedMessage } from "react-intl";

import './styles/MainFooter.css';

class MainFooter extends Component {
  render() {
    return (
      <Layout className="MainFooter">
        <Row>
          <Col span={4}>
            <h4 className="Title">
              <FormattedMessage id="footer.contact" defaultMessage="Contact us"/>
            </h4>
            <Row>
              <Col span={24}>
                <FormattedMessage id="footer.address" defaultMessage="17 Route des Morillos"/>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormattedMessage id="footer.city" defaultMessage="1218 Grand-Saconnex"/>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormattedMessage id="footer.country" defaultMessage="Switzerland"/>
              </Col>
            </Row>
          </Col>
          <Col span={4}>
            <h4 className="Title">
              <FormattedMessage id="footer.follow" defaultMessage="Follow us"/>
            </h4>
            <Button shape="circle" icon="twitter"/>
            <Button style={{marginLeft: 10}} shape="circle" icon="facebook"/>
          </Col>
          <Col span={4}>
            <h4 className="Title">
              <FormattedMessage id="footer.website" defaultMessage="IOM website"/>
            </h4>
            <Row>
              <Col span={24}>
                <FormattedMessage id="footer.website.url" defaultMessage="www.iom.int"/>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row style={{marginTop: 20}}>
          <Col span={12}>
            <FormattedMessage id="footer.phone" defaultMessage="Tel. +41.22.717.9111"/>
          </Col>
          <Col span={12}>
            <Row type="flex" align="end">
              <Col span={16} style={{textAlign: "right"}}>
                <FormattedMessage id="footer.copyright" defaultMessage="© 2018 Migration data portal"/>
                <Divider type="vertical"/>
                <FormattedMessage id="footer.term" defaultMessage="Term of use"/>
                <Divider type="vertical"/>
                <FormattedMessage id="footer.disclaimer" defaultMessage="Disclaimer"/>
              </Col>
            </Row>
          </Col>
        </Row>
      </Layout>
    )
  }
}

export default MainFooter;