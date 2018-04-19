import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Breadcrumb, Row, Col, Card, Input, Collapse, Select, DatePicker, Badge, Divider } from 'antd'
import _ from 'lodash';
import { FormattedMessage } from "react-intl";
import { Link } from 'react-router-dom'

import MainHeader from '../MainHeader';
import GeoMap from './GeoMap';
import * as actions from '../../actions';
import '../../styles/Countries.css';

const { Header, Content } = Layout;
const Search = Input.Search;
const Panel = Collapse.Panel;
const Option = Select.Option;
const { RangePicker } = DatePicker;

class Countries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {
        aggregations: 'activity_count,incoming_fund,disbursement,value',
        group_by: 'recipient_country',
        order_by: 'activity_count',
        convert_to: 'usd',
        hierarchy: 1,
        activity_status: '2,3,4',
        reporting_organisation_identifier: process.env.REACT_APP_REPORTING_ORGANISATION_IDENTIFIER
      },
      update: false,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { params } = this.state;
    if (dispatch) {
      if (params) {
        dispatch(actions.transactionsAggregationsRequest(params));
      } else {
        dispatch(actions.transactionsAggregationsInitial());
      }
    }
  }

  render() {
    const { transactionsAggregations } = this.props;
    const data = _.get(transactionsAggregations, 'data');
    const showMap = _.get(data, 'results[0].recipient_country.code');
    console.log(data);
    return (
      <Layout className='Countries'>
        <Header className="Path-38381">
          <MainHeader/>
        </Header>
        <Content className="Content">
          <Breadcrumb className="Breadcrumb" separator=">">
            <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
            <Breadcrumb.Item>Countries</Breadcrumb.Item>
            <Breadcrumb.Item className="Active">Funding by countries</Breadcrumb.Item>
          </Breadcrumb>
          <Row style={{marginTop: 15}} className="Search">
            <Col span={5}>
              <Row>
                <Col span={24}>
                  <Row>
                    <Col span={22}>
                      <Search placeholder="Search" enterButton/>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col span={22} style={{ marginTop: 15 }}>
                  <h3>35 Countries</h3>
                </Col>
              </Row>
              <Row>
                <Col span={22} className="Border Bottom">
                  <Badge count={20} style={{ backgroundColor: '#f7c989' }}/> Filters
                </Col>
              </Row>
              <Row>
                <Col span={22}>
                  <Collapse bordered={false}>
                    <Panel header="Geo-location" key="1">
                      <Row>
                        <Col span={24}>
                          <Select showSearch style={{ width: '100%' }} placeholder="Select a region">
                            <Option value="as">Asia</Option>
                            <Option value="af">Africa</Option>
                            <Option value="al">America Latin</Option>
                          </Select>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24} style={{ marginTop: 10 }}>
                          <Select showSearch style={{ width: '100%' }}
                                  placeholder="Select a country"
                                  className="Select">
                            <Option value="ss">Sudan South</Option>
                            <Option value="km">Kamerun</Option>
                            <Option value="ng">Nigeria</Option>
                          </Select>
                        </Col>
                      </Row>
                    </Panel>
                    <Panel header="Project types" key="2">
                      <Row>
                        <Col span={24}>
                          <Select showSearch style={{ width: '100%' }}
                                  placeholder="Select a project type"
                                  className="Select">
                            <Option value="ed">Education</Option>
                            <Option value="ag">Agriculture</Option>
                          </Select>
                        </Col>
                      </Row>
                    </Panel>
                    <Panel header="Project status" key="3">
                      <Row>
                        <Col span={24}>
                          <Select showSearch style={{ width: '100%' }}
                                  placeholder="Select a status"
                                  className="Select"
                                  mode="multiple"
                          >
                            <Option value="2">Completion</Option>
                            <Option value="3">Implementation</Option>
                            <Option value="4">Post Completion </Option>
                          </Select>
                        </Col>
                      </Row>
                    </Panel>
                    <Panel header="Start - end date" key="4">
                      <Row>
                        <Col span={24}>
                          <RangePicker/>
                        </Col>
                      </Row>
                    </Panel>
                    <Panel header="Donors" key="5">
                    </Panel>
                    <Panel header="Funding amount" key="6">
                    </Panel>
                  </Collapse>
                </Col>
              </Row>
            </Col>
            <Col span={19}>
              <Row>
                <Col span={24}>
                  <h2 className="Title">
                    <FormattedMessage id="countries.title"
                                      defaultMessage="Countries"
                    />
                  </h2>
                </Col>
              </Row>
              <Row>
                <Col span={17} className="Description">
                  <FormattedMessage id="countries.description"
                                    defaultMessage="Description"
                  />
                </Col>
              </Row>
              <Row>
                <Col span={19}>
                  <div className="ShadowBox">
                    { showMap ?
                      <GeoMap data={data} zoom={3.2} country='nl' height={450} tooltipName="Activities:"
                              tabName="activities"
                      /> : null
                    }
                  </div>
                </Col>
                <Col span={5}>
                  <Card className="ShadowBox" style={{height: 450}}/>
                </Col>
              </Row>
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }
}


const mapStateToProps = (state, ) => {
  return {
    transactionsAggregations: state.transactionsAggregations
  }
};

export default connect(mapStateToProps)(Countries);