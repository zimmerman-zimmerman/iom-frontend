import React, { Component } from 'react';
import Layout from 'antd/es/layout';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import Menu from 'antd/es/menu';
import Icon from 'antd/es/icon';
import { FormattedMessage } from "react-intl";
import get from "lodash/get";
import {format} from "d3-format";

const { Content } = Layout;

class ServiceBanner extends Component {
  render() {
    const { data } = this.props;
    return (
      <Layout className="Banner">
        <Row>
          <Col span={12} className="Left">
            <Content>
              <Content>
                <h2 className='Title'>{data.sector.name}</h2>
              </Content>
              <Content>
                <Menu className="Menu" selectedKeys={['overview']} mode="horizontal">
                  <Menu.Item key="overview">
                    <Icon type="appstore"/>
                    <FormattedMessage id="service.banner.left.menu.overview" defaultMessage="Overview"/>
                  </Menu.Item>
                  <Menu.Item key="related">
                    <Icon type="book"/>
                    <FormattedMessage id="service.banner.left.menu.detail" defaultMessage="detail report"/>
                  </Menu.Item>
                </Menu>
                <Row className="Description">
                  <Col span={24}>
                    <FormattedMessage id="service.banner.left.description"
                                      defaultMessage="General description provided by IOM."/>
                  </Col>
                </Row>
              </Content>
            </Content>
          </Col>
          <Col span={12} className="Right">
            <Content>
              <Row>
                <Col span={24}>
                  <h2>
                    <FormattedMessage id="service.banner.right.title" defaultMessage="Financial overview"/>
                  </h2>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Row>
                    <Col span={24}>
                      <Row>
                        <Col span={24}>
                          <FormattedMessage id="service.banner.right.budget"
                                            defaultMessage="Total project budget"/>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24}>
                          {format(',')(get(data, 'value', 0))}
                        </Col>
                      </Row>
                      <Row className="Field">
                        <Col span={24}>
                          <FormattedMessage id="service.banner.right.incoming"
                                            defaultMessage="Total incoming funds"
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24}>
                          {format(',')(get(data, 'incoming_fund', 0))}
                        </Col>
                      </Row>
                      <Row className="Field">
                        <Col span={24}>
                          <FormattedMessage id="service.banner.right.projects"
                                            defaultMessage="Project count"
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24}>
                          {get(data, 'activity_count', 0)}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
                <Col span={12}>
                  <Row>
                    <Col span={24}>
                      <FormattedMessage id="service.banner.right.disbursements"
                                        defaultMessage="Total disbursements"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      {get(data, 'disbursement', 0)}
                    </Col>
                  </Row>
                  <Row className="Field">
                    <Col span={24}>
                      <FormattedMessage id="service.banner.right.expenditure"
                                        defaultMessage="Total expenditure"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      {get(data, 'expenditure', 0)}
                    </Col>
                  </Row>
                  <Row className="Field">
                    <Col span={24}>
                      <FormattedMessage id="service.banner.right.source.title"
                                        defaultMessage="Data source"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <FormattedMessage id="service.banner.right.source"
                                        defaultMessage="IATI Registry"
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Content>
          </Col>
        </Row>
      </Layout>
    )
  }
}

export default ServiceBanner;