import React from 'react';
import { connect } from 'react-redux';
import Layout from 'antd/es/layout';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import Spin from 'antd/es/spin';
import get from 'lodash/get';
import { FormattedMessage } from "react-intl";

import MainHeader from '../../components/main/MainHeader';
import GeoMap from '../../components/maps/GeoMap';
import CountriesTable from './components/CountriesTable';
import * as actions from '../../services/actions/index';
import MainFooter from '../../components/main/MainFooter';
import Summary from './components/Summary';
import Filters from "./components/Filters";
import BaseFilter from '../../components/filters/BaseFilter';
import CountriesBreadcrumb from "./components/CountriesBreadcrumb";
import './styles/Countries.scss';

const { Header, Content, Footer } = Layout;

class Countries extends BaseFilter {
  componentDidMount() {
    const { dispatch } = this.props;
    const { params } = this.state;
    if (dispatch) {
      if (params) {
        this.actionRequest(params, 'recipient_country', actions.countriesRequest);
      } else {
        dispatch(actions.countriesInitial());
      }
    }
  }

  render() {
    const { countries } = this.props;
    const data = get(countries, 'data');
    const showMap = get(data, 'results[0].recipient_country.code');
    return (
      <Spin spinning={countries.request}>
        <Layout className='Countries'>
          <Header className="Header">
            <MainHeader/>
          </Header>
          <Content className="Content">
            <CountriesBreadcrumb/>
            <Row style={{marginTop: 15}} className="Search">
              <Col span={5}>
                <Filters data={data} rootComponent={this}/>
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
                    <div className="ShadowBox" style={{height: 450}}>
                      { showMap ?
                        <GeoMap data={data} zoom={3.2} country='nl' height={450} tooltipName="Activities:"
                                tabName="activities"
                        /> : null
                      }
                    </div>
                  </Col>
                  <Col span={5}>
                    <Summary data={showMap ? get(data, 'results') : null}/>
                  </Col>
                </Row>
                <Row>
                  <Col span={24} style={{marginTop: 20}}>
                    <CountriesTable data={showMap ? get(data, 'results') : null}/>
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

Countries.defaultProps = {
  groupBy: 'recipient_country',
  filterRequest: actions.countriesRequest,
};

const mapStateToProps = (state, ) => {
  return {
    countries: state.countries
  }
};

export default connect(mapStateToProps)(Countries);