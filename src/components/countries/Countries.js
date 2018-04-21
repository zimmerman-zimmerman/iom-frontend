import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Breadcrumb, Row, Col, Input, Collapse, Select, DatePicker, Badge, Spin } from 'antd';
import _ from 'lodash';
import { FormattedMessage } from "react-intl";
import { Link } from 'react-router-dom';

import MainHeader from '../main/MainHeader';
import GeoMap from './GeoMap';
import CountriesTable from './CountriesTable';
import * as actions from '../../actions';
import '../../styles/Countries.css';
import MainFooter from '../MainFooter';
import Summary from './Summary';
import Filters from "./Filters";

const { Header, Content, Footer } = Layout;
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
        order_by: '-activity_count',
        convert_to: 'usd',
        hierarchy: 1,
        reporting_organisation_identifier: process.env.REACT_APP_REPORTING_ORGANISATION_IDENTIFIER
      },
      update: false,
      filters: {values: {}, changed: false},
    };
  }

  requestAction(dispatch, params, group_by, request) {
    const lParams = params;
    lParams.group_by = group_by;
    dispatch(request(lParams))
  }

  addFilters(fieldName, values) {
    const { filters } = this.state;
    if (_.get(filters.values, fieldName)) {
      delete filters.values[fieldName];
    }
    if (!_.isEmpty(values)) {
      filters.values[fieldName] = Array.isArray(values) ? values.join() : values;
    }
    filters.changed = true;
    this.setState({filters: filters});
  }

  addStartEndDateFilters(values) {
    const { filters } = this.state;
    if (_.get(filters.values, 'start_date_gte') || _.get(filters.values, 'end_date_lte') ) {
      delete filters.values['start_date_gte'];
      delete filters.values['end_date_lte'];
    }
    if (!_.isEmpty(values)) {
      filters.values['start_date_gte'] = values[0].format('YYYY-MM-DD');
      filters.values['end_date_lte'] = values[1].format('YYYY-MM-DD');
    }
    filters.changed = true;
    this.setState({filters: filters});
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { filters } = this.state;
    if (filters.changed) {
      const { dispatch } = this.props;
      const { params } = this.state;
      this.requestAction(
        dispatch, _.extend({}, params, filters.values), 'recipient_country', actions.transactionsAggregationsRequest
      );
      filters.changed = false;
      this.setState({filters: filters})
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { params } = this.state;
    if (dispatch) {
      if (params) {
        this.requestAction(dispatch, params, 'recipient_country', actions.transactionsAggregationsRequest);
        this.requestAction(dispatch, params, 'recipient_region', actions.transactionsAggregationsRegionsRequest);
        this.requestAction(dispatch, params, 'recipient_country', actions.transactionsAggregationsCountriesRequest);
        this.requestAction(dispatch, params, 'activity_status', actions.transactionsAggregationsActivityStatusRequest);
        this.requestAction(dispatch, params, 'sector', actions.transactionsAggregationsSectorRequest);
        this.requestAction(dispatch, params, 'participating_organisation',
          actions.transactionsAggregationsParticipatingOrganisationRequest
        );
      } else {
        dispatch(actions.transactionsAggregationsInitial());
        dispatch(actions.transactionsAggregationsRegionsInitial());
        dispatch(actions.transactionsAggregationsCountriesInitial());
        dispatch(actions.transactionsAggregationsActivityStatusInitial());
        dispatch(actions.transactionsAggregationsSectorInitial());
      }
    }
  }

  render() {
    const {
      transactionsAggregations, transactionsAggregationsRegions, transactionsAggregationsCountries,
      transactionsAggregationsActivityStatus, transactionsAggregationsSector,
      transactionsAggregationsParticipatingOrganisation
    } = this.props;
    const data = _.get(transactionsAggregations, 'data');
    const showMap = _.get(data, 'results[0].recipient_country.code');
    const filterRegions = _.get(transactionsAggregationsRegions, 'data.results');
    const filterActivityStatus = _.get(transactionsAggregationsActivityStatus, 'data.results');
    const filterSector = _.get(transactionsAggregationsSector, 'data.results');
    const filterDonor = _.get(transactionsAggregationsParticipatingOrganisation, 'data.results');
    const regionOptions = !_.isEmpty(filterRegions) ? filterRegions.map(
      item => <Option key={item.recipient_region.code}>{item.recipient_region.name}</Option>) : null;
    const filterCountries = _.get(transactionsAggregationsCountries, 'data.results');
    const countryOptions = !_.isEmpty(filterCountries) ?
      filterCountries.map(item => <Option key={item.recipient_country.code}>
        {item.recipient_country.name}</Option>) : null;
    const activityStatusOptions = !_.isEmpty(filterActivityStatus) ? filterActivityStatus.map(
      item => <Option key={item.activity_status.code}> {item.activity_status.name}</Option>) : null;
    const sectorOptions = !_.isEmpty(filterSector) ? filterSector.map(
      item => <Option key={item.sector.code}> {item.sector.name}</Option>) : null;
    const donorOptions = !_.isEmpty(filterDonor) ? filterDonor.map(
      item => <Option key={item.participating_organisation_ref}>{item.participating_organisation}</Option>) : null;
    const loading = _.get(transactionsAggregations,'request')
      || _.get(transactionsAggregationsRegions,'request')
      || _.get(transactionsAggregationsCountries,'request')
      || _.get(transactionsAggregationsActivityStatus,'request')
      || _.get(transactionsAggregationsSector,'request')
      || _.get(transactionsAggregationsParticipatingOrganisation,'request');
    return (
      <Spin spinning={loading}>
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
                        <Search placeholder="Search"
                                onSearch={value => this.addFilters('q', value)}
                                enterButton
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col span={22} style={{ marginTop: 15 }}>
                    <h3>
                      { showMap ? data.results.length > 1 ? `${data.results.length} Countries` : `1 Country` : null}
                    </h3>
                  </Col>
                </Row>
                <Row>
                  <Col span={22} className="Border Bottom">
                    <Badge count={0} style={{ backgroundColor: '#f7c989' }}/> Filter(s)
                  </Col>
                </Row>
                <Row>
                  <Col span={22}>
                    <Collapse bordered={false}>
                      <Panel header="Geo-location" key="1">
                        { regionOptions ?
                          <Row>
                            <Col span={24}>
                              <Select showSearch style={{width: '100%'}}
                                      placeholder="Select a region">
                                {regionOptions}
                              </Select>
                            </Col>
                          </Row> : null
                        }
                        { countryOptions ?
                          <Row>
                            <Col span={24} style={{ marginTop: 10 }}>
                              <Select showSearch style={{ width: '100%' }}
                                      placeholder="Select a country"
                                      className="Select"
                                      mode="multiple"
                                      onChange={(values) => this.addFilters('recipient_country', values)}
                              >
                                {countryOptions}
                              </Select>
                            </Col>
                          </Row> : null
                        }
                        <Filters/>
                      </Panel>
                      <Panel header="Project types" key="2">
                        <Row>
                          <Col span={24}>
                            <Select showSearch style={{ width: '100%' }}
                                    placeholder="Select a project type"
                                    className="Select"
                                    mode="multiple"
                                    onChange={(values) => this.addFilters('sector', values)}
                            >
                              {sectorOptions}
                            </Select>
                          </Col>
                        </Row>
                      </Panel>
                      { activityStatusOptions ?
                        <Panel header="Project status" key="3">
                          <Row>
                            <Col span={24}>
                              <Select showSearch style={{width: '100%'}}
                                      placeholder="Select a status"
                                      className="Select"
                                      mode="multiple"
                                      onChange={(values) => this.addFilters('activity_status', values)}
                              >
                                {activityStatusOptions}
                              </Select>
                            </Col>
                          </Row>
                        </Panel> : null
                      }
                      <Panel header="Start - end date" key="4">
                        <Row>
                          <Col span={24}>
                            <RangePicker onChange={(values) => this.addStartEndDateFilters(values)}/>
                          </Col>
                        </Row>
                      </Panel>
                      { donorOptions ?
                        <Panel header="Donors" key="5">
                          <Row>
                            <Col span={24}>
                              <Select showSearch style={{width: '100%'}}
                                      placeholder="Select a donor"
                                      className="Select"
                                      mode="multiple"
                                      onChange={(values) => this.addFilters('participating_organisation_ref', values)}
                              >
                                {donorOptions}
                              </Select>
                            </Col>
                          </Row>
                        </Panel> : null
                      }
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
                    <Summary data={showMap ? _.get(data, 'results') : null}/>
                  </Col>
                </Row>
                <Row>
                  <Col span={24} style={{marginTop: 20}}>
                    <CountriesTable data={showMap ? _.get(data, 'results') : null}/>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Content>
          <Footer className="MainFooter">
            <MainFooter/>
          </Footer>
        </Layout>
      </Spin>
    );
  }
}


const mapStateToProps = (state, ) => {
  return {
    transactionsAggregations: state.transactionsAggregations,
    transactionsAggregationsRegions: state.transactionsAggregationsRegions,
    transactionsAggregationsCountries: state.transactionsAggregationsCountries,
    transactionsAggregationsActivityStatus: state.transactionsAggregationsActivityStatus,
    transactionsAggregationsSector: state.transactionsAggregationsSector,
    transactionsAggregationsParticipatingOrganisation: state.transactionsAggregationsParticipatingOrganisation
  }
};

export default connect(mapStateToProps)(Countries);