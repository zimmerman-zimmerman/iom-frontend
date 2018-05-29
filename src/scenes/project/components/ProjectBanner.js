import React, { Component } from 'react';
import Layout from 'antd/es/layout';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import get from 'lodash/get';
import Menu from 'antd/es/menu';
import Icon from 'antd/es/icon';
import { FormattedMessage } from "react-intl";
import {format} from "d3-format";

const { Content } = Layout;

class ProjectBanner extends Component {
  render() {
    const { data } = this.props;
    return (
      <Layout className="Banner">
        <Row>
          <Col span={12} className="Left">
            { data ?
              <Content>
                <Content>
                  <h2 className='Title'>{get(data, 'title.narratives[0].text', 'Title')}</h2>
                </Content>
                <Content>
                  <Menu className="Menu" selectedKeys={['overview']} mode="horizontal">
                    <Menu.Item key="overview">
                      <Icon type="appstore"/>
                      <FormattedMessage id="project.banner.left.menu.overview" defaultMessage="Overview"/>
                    </Menu.Item>
                    <Menu.Item key="related">
                      <Icon type="book"/>
                      <FormattedMessage id="project.banner.left.menu.detail" defaultMessage="Detail report"/>
                    </Menu.Item>
                  </Menu>
                  <Row className="Description">
                    <Col span={24}>
                      {get(data, 'descriptions[0].narratives[0].text', 'Descriptions')}
                    </Col>
                  </Row>
                </Content>
              </Content> : null
            }
          </Col>
          <Col span={12} className="Right">
            <Row>
              <Col span={24}>
                <h2 className='Title'>
                  <FormattedMessage id="project.banner.right.title" defaultMessage="Financial overview"/>
                </h2>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Row>
                  <Col span={24}>
                    <Row>
                      <Col span={24}>
                        <FormattedMessage id="project.banner.right.budget"
                                          defaultMessage="Total activity budget"/>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        {format(',')(get(data, 'aggregations.activity.budget_value', 0))}
                      </Col>
                    </Row>
                    <Row style={{marginTop: 20}}>
                      <Col span={24}>
                        <FormattedMessage id="project.banner.right.incoming"
                                          defaultMessage="Total incoming funds"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        {format(',')(get(data, 'aggregations.activity.incoming_commitment_value', 0))}
                      </Col>
                    </Row>
                    <Row style={{marginTop: 20}}>
                      <Col span={24}>
                        <FormattedMessage id="project.banner.right.start"
                                          defaultMessage="Start date"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        {get(data, 'activity_dates[1].iso_date', '-')}
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
                <Row>
                  <Col span={24}>
                    <Row>
                      <Col span={24}>
                        <FormattedMessage id="project.banner.right.disbursement"
                                          defaultMessage="Total Disbursements to Implementing"/>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        {format(',')(get(data, 'aggregations.activity.disbursement_value', 0))}
                      </Col>
                    </Row>
                    <Row style={{marginTop: 20}}>
                      <Col span={24}>
                        <FormattedMessage id="project.banner.right.expenditures"
                                          defaultMessage="Total Expenditures by IOM"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        {format(',')(get(data, 'aggregations.activity.expenditure_value', 0))}
                      </Col>
                    </Row>
                    <Row style={{marginTop: 20}}>
                      <Col span={24}>
                        <FormattedMessage id="project.banner.right.end"
                                          defaultMessage="End date"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        {get(data, 'activity_dates[2].iso_date', '-')}
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Layout>
    )
  }
}

export default ProjectBanner;