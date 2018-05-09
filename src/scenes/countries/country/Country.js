import React from 'react';
import { Layout, Spin, Row, Col } from 'antd';
import _ from 'lodash';

import MainHeader from '../../../components/main/MainHeader';
import MainFooter from '../../../components/main/MainFooter';
import CountryBreadcrumb from './CountryBreadcrumb';
import BannerCountry from './components/BannerCountry';
import './styles/Country.scss';
import {connect} from "react-redux";
import BaseFilter from "../../../components/filters/BaseFilter";
import * as actions from "../../../services/actions";
import TableDonors from "./components/TableDonors";
import CountryMap from "./components/CountryMap";
import TableProjects from "./components/TableProjects";
import ContactInfo from './components/ContactInfo';

const { Header, Content, Footer } = Layout;

class Country extends BaseFilter {
  componentDidMount() {
    const { dispatch } = this.props;
    const { params } = this.state;
    const code = _.get(this.props, 'match.params.code');
    if (dispatch && code) {
      if (params) {
        this.actionRequest(
          _.extend({}, params, {recipient_country: code.toUpperCase()}),
          'recipient_country',
          actions.countryRequest
        );
        this.actionRequest(
          _.extend({}, params, {recipient_country: code.toUpperCase()}),
          'participating_organisation',
          actions.countryDonorsRequest
        );
      } else {
        dispatch(actions.countryInitial());
        dispatch(actions.countryDonorsInitial());
      }
    }
  }

  render() {
    const pathname = _.get(this.props, 'location.pathname');
    const country = _.get(this.props, 'country.data.results[0]');
    const donors = _.get(this.props, 'countryDonors.data.results');
    return (
      <Spin spinning={false}>
        <Layout className='Country'>
          <Header className='Header'>
            <MainHeader/>
          </Header>
          <Content className="Content">
            <CountryBreadcrumb/>
          </Content>
          <Content>
            <BannerCountry data={country}/>
          </Content>
          <Content className="Content" style={{marginBottom: 30}}>
            <Row>
              <Col span={12}>
                <TableDonors data={donors}/>
              </Col>
              <Col span={12}>
                <CountryMap data={country}/>
              </Col>
            </Row>
          </Content>
          <Content className="Content">
            <TableProjects countryCode={ _.get(this.props, 'match.params.code')}/>
          </Content>
          <Content className="Content">
            <ContactInfo pathname={pathname}/>
          </Content>
          <Footer className="MainFooter">
            <MainFooter/>
          </Footer>
        </Layout>
      </Spin>
    )
  }
}

const mapStateToProps = (state, ) => {
  return {
    country: state.country,
    countryDonors: state.countryDonors
  }
};

export default connect(mapStateToProps)(Country);