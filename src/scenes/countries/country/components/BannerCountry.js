import React, { Component } from 'react';
import { Layout, Row, Col, Menu, Icon } from 'antd';
import ReactCountryFlag from "react-country-flag";
import { FormattedMessage } from "react-intl";
import { Link } from 'react-router-dom';
import d3 from "d3/d3";

const { Content } = Layout;

class BannerCountry extends Component {
  render() {
    const { data } = this.props;
    return (
      <Layout className="BannerCountry">
        <Row>
          <Col span={12} className="Left">
              { data ?
                <Content>
                  <Content className="Name">
                    <span className="inline-block" style={{fontSize: "30px"}}>
                    <ReactCountryFlag code={data.recipient_country.code} svg/>
                    <span style={{margin: '3px 10px', position: 'absolute'}}>{data.recipient_country.name}</span>
                    </span>
                  </Content>
                  <Content>
                    <Menu className="Menu" selectedKeys={['overview']} mode="horizontal">
                      <Menu.Item key="overview">
                        <Icon type="appstore"/>
                        <FormattedMessage id="country.banner.overview" defaultMessage="Overview"/>
                      </Menu.Item>
                      <Menu.Item key="related">
                        <Icon type="book"/>
                        <FormattedMessage id="country.banner.related" defaultMessage="Related projects"/>
                      </Menu.Item>
                    </Menu>
                    <Row className="Description">
                      <Col span={24}>
                        <FormattedMessage id="country.banner.overview.description" defaultMessage="Description"/>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24} style={{marginTop: 30}}>
                        <Link to={`/countries/${data.recipient_country.code.toLowerCase()}`}>
                          https://www.iom.int/countries/{data.recipient_country.code.toLowerCase()}
                        </Link>
                      </Col>
                    </Row>
                  </Content>
                </Content> : null
              }
          </Col>
          <Col span={12} className="Right">
            {data ?
              <Content>
                <Row>
                  <Col span={24}>
                    <h2>
                      <FormattedMessage id="country.banner.right.overview" defaultMessage="Financial Overview"/>
                    </h2>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <Row>
                      <Col span={24}>
                        <Row>
                          <Col span={24}>
                            <FormattedMessage id="country.banner.right.total.budget"
                                              defaultMessage="Total project budget"/>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={24}>
                            {d3.format(',')(data.value)}
                          </Col>
                        </Row>
                        <Row style={{marginTop: 20}}>
                          <Col span={24}>
                            <FormattedMessage id="country.banner.right.total.incoming"
                                              defaultMessage="Total incoming funds"
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col span={24}>
                            {d3.format(',')(data.incoming_fund)}
                          </Col>
                        </Row>
                        <Row style={{marginTop: 20}}>
                          <Col span={24}>
                            <FormattedMessage id="country.banner.right.activity.count"
                                              defaultMessage="Activity count"
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col span={24}>
                            {d3.format(',')(data.activity_count)}
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={12}>
                    <Row>
                      <Col span={24}>
                        <FormattedMessage id="country.banner.right.total.disbursements"
                                          defaultMessage="Total disbursements"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        {d3.format(',')(data.disbursement)}
                      </Col>
                    </Row>
                    <Row style={{marginTop: 20}}>
                      <Col span={24}>
                        <FormattedMessage id="country.banner.right.data.source"
                                          defaultMessage="Data source"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <FormattedMessage id="country.banner.right.data.source.iati.registry"
                                          defaultMessage="IATI Registry"
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Content> : null
            }
          </Col>
        </Row>
      </Layout>
    )
  }
}

export default BannerCountry;