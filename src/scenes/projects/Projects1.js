import React from 'react';
import Layout from 'antd/es/layout';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import {connect} from "react-redux";
import get from "lodash/get";
import extend from "lodash/extend";
import { FormattedMessage } from "react-intl";
import Spin from 'antd/es/spin';

import MainHeader from '../../components/main/MainHeader';
import BaseFilter from "../../components/filters/BaseFilter";
import Filters from "./components/Filters";
import * as actions from "../../services/actions";
import ProjectsBreadcrumb from './components/ProjectsBreadcrumb';
import ProjectsTable from './components/ProjectsTable';
import GeoMap from '../../components/maps/GeoMap';
import Summary from '../countries/components/Summary';
import MainFooter from '../../components/main/MainFooter';

const { Header, Content, Footer } = Layout;

class Projects extends BaseFilter {
  constructor(props) {
    super(props);
    this.state = {
      params: {
        fields: 'id,iati_identifier,title,activity_dates,budgets,recipient_countries,sectors',
        order_by: '-id',
        reporting_organisation_identifier: process.env.REACT_APP_REPORTING_ORGANISATION_IDENTIFIER
      },
      update: false,
      filters: {values: {}, changed: false},
    };
  }

  countriesRequest() {
    const { filters } = this.state;
    const params = {
      aggregations: 'activity_count,incoming_fund,disbursement,value',
      group_by: '',
      order_by: '-value',
      convert_to: 'usd',
      hierarchy: 1,
      reporting_organisation_identifier: process.env.REACT_APP_REPORTING_ORGANISATION_IDENTIFIER
    };
    this.actionRequest(extend({}, params, filters.values), 'recipient_country', actions.countriesRequest);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState !== this.state) {
      this.countriesRequest();
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { params } = this.state;
    if (dispatch) {
      if (params) {
        this.actionRequest(params, null, actions.projectsRequest);
        this.countriesRequest();
      } else {
        dispatch(actions.projectsInitial());
        dispatch(actions.countriesInitial());
      }
    }
  }

  render() {
    const { projects, countries } = this.props;
    const dataProjects = get(projects, 'data');
    const existProjects = get(dataProjects, 'results[0].id');
    const dataCountries = get(countries, 'data');
    const showMap = get(dataCountries, 'results[0].recipient_country.code');
    return (
      <Spin spinning={projects.request}>
        <Layout className="Projects">
          <Header className="Header">
            <MainHeader/>
          </Header>
          <Content className="Content">
            <ProjectsBreadcrumb/>
            <Row style={{marginTop: 15}} className="Search">
              <Col span={5}>
                <Filters data={dataProjects} rootComponent={this}/>
              </Col>
              <Col span={19}>
                <Row>
                  <Col span={24}>
                    <h2 className="Title">
                      <FormattedMessage id="projects.title" defaultMessage="IOM Projects overview"/>
                    </h2>
                  </Col>
                </Row>
                <Row>
                  <Col span={19}>
                    <div className="ShadowBox" style={{height: 450}}>
                      { showMap ?
                        <GeoMap data={dataCountries} zoom={3.2} country='nl' height={450} tooltipName="Activities:"
                                tabName="activities"
                        /> : null
                      }
                    </div>
                  </Col>
                  <Col span={5}>
                    <Summary data={showMap ? get(dataCountries, 'results') : null}/>
                  </Col>
                </Row>
                <Row>
                  <Col span={24} style={{marginTop: 20}}>
                    <ProjectsTable data={existProjects ? dataProjects : null}
                                   fieldName="page"
                                   rootComponent={this}
                    />
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

Projects.defaultProps = {
  groupBy: null,
  filterRequest: actions.projectsRequest,
};


const mapStateToProps = (state, ) => {
  return {
    projects: state.projects,
    countries: state.countries
  }
};

export default connect(mapStateToProps)(Projects);