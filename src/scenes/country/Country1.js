import React from 'react';
import Layout from 'antd/es/layout';
import Spin from 'antd/es/spin';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import get from 'lodash/get';
import extend from 'lodash/extend';

import MainHeader from '../../components/main/MainHeader';
import MainFooter from '../../components/main/MainFooter';
import CountryBreadcrumb from './components/CountryBreadcrumb';
import BannerCountry from './components/BannerCountry';
import './styles/Country.scss';
import {connect} from "react-redux";
import BaseFilter from "../../components/filters/BaseFilter";
import * as actions from "../../services/actions";
import TableDonors from "./components/TableDonors";
import CountryMap from "../../components/maps/CountryMap";
import TableProjects from "./components/TableProjects";
import ContactInfo from './components/ContactInfo';

const { Header, Content, Footer } = Layout;

class Country extends BaseFilter {
  componentDidMount() {
    const { dispatch } = this.props;
    const { params } = this.state;
    const code = get(this.props, 'match.params.code');
    if (dispatch && code) {
      if (params) {
        this.actionRequest(
          extend({}, params, {recipient_country: code.toUpperCase()}),
          'recipient_country',
          actions.countryRequest
        );
        this.actionRequest(
          extend({}, params, {recipient_country: code.toUpperCase()}, {page_size: 30}),
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
    const pathname = get(this.props, 'location.pathname');
    const country = get(this.props, 'country.data.results[0]');
    const donors = get(this.props, 'countryDonors.data.results');
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
                <CountryMap data={get(country, 'recipient_country')}/>
              </Col>
            </Row>
          </Content>
          <Content className="Content">
            <TableProjects countryCode={ get(this.props, 'match.params.code')}/>
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