import React, { Component } from 'react';
import Layout from 'antd/es/layout';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import Spin from 'antd/es/spin';
import ReactCountryFlag from "react-country-flag";
import get from 'lodash/get';
import { FormattedMessage } from "react-intl";
import * as actions from "../../../services/actions";
import {connect} from "react-redux";
import CountryMap from "../../../components/maps/CountryMap";

const { Content } = Layout;

class ProjectLocation extends Component {
  componentDidMount() {
    const { dispatch, data } = this.props;
    const code = get(data, 'recipient_countries[0].country.code', null);
    if (dispatch && code) {
      dispatch(actions.projectLocationRequest(code));
    } else {
      dispatch(actions.projectLocationInitial());
    }
  }

  render() {
    const { data, projectLocation } = this.props;
    const country = get(projectLocation, 'data', null);
    return (
      <Layout className="ProjectLocation">
        <Content className="Content">
          <Row>
            <Col span={12}>
              <Row>
                <Col span={24}>
                  <h4 className="Title">
                    <FormattedMessage id="project.location.title" defaultMessage="Project Location"/>
                  </h4>
                </Col>
              </Row>
              <Row type="flex" justify="space-around" align="bottom">
                <Col span={2}>
                  <span style={{fontSize: 30}}>
                    <ReactCountryFlag code={get(data, 'recipient_countries[0].country.code','')} svg/>
                  </span>
                </Col>
                <Col span={22}>
                  <h4 className="Title">{get(data, 'recipient_countries[0].country.name','')}</h4>
                </Col>
              </Row>
              <Row style={{marginTop: 15}}>
                <Col span={24}>
                  <strong>
                    <FormattedMessage id="project.location.fields.iati.reference" defaultMessage="IATI reference:"/>
                  </strong>
                  <span style={{marginLeft: 5}}>{get(data, 'iati_identifier','-')}</span>
                </Col>
              </Row>
              <Row style={{marginTop: 10}}>
                <Col span={24}>
                  <strong>
                    <FormattedMessage id="project.location.fields.funding" defaultMessage="Funding donor:"/>
                  </strong>
                  <span style={{marginLeft: 5}}>
                    {get(data, 'participating_organisations[0].narratives[0].text','-')}
                  </span>
                </Col>
              </Row>
              <Row style={{marginTop: 10}}>
                <Col span={24}>
                  <strong>
                    <FormattedMessage id="project.location.fields.donor.type" defaultMessage="Donor type:"/>
                  </strong>
                  <span style={{marginLeft: 5}}>
                    {get(data, 'participating_organisations[0].type.name','-')}
                  </span>
                </Col>
              </Row>
              <Row style={{marginTop: 10}}>
                <Col span={24}>
                  <strong>
                    <FormattedMessage id="project.location.fields.donor.reference"
                                      defaultMessage="Funding donor IATI reference:"
                    />
                  </strong>
                  <span style={{marginLeft: 5}}>
                    {get(data, 'participating_organisations[0].ref','-')}
                  </span>
                </Col>
              </Row>
              <Row style={{marginTop: 10}}>
                <Col span={24}>
                  <strong>
                    <FormattedMessage id="project.location.fields.status"
                                      defaultMessage="Activity status:"
                    />
                  </strong>
                  <span style={{marginLeft: 5}}>
                    {get(data, 'activity_status.name','-')}
                  </span>
                </Col>
              </Row>
              <Row style={{marginTop: 10}}>
                <Col span={24}>
                  <strong>
                    <FormattedMessage id="project.location.fields.dac"
                                      defaultMessage="DAC 5 sector:"
                    />
                  </strong>
                  <span style={{marginLeft: 5}}>
                    {get(data, 'sectors[0].sector.code','')} {get(data, 'sectors[0].sector.name','')}
                  </span>
                </Col>
              </Row>
              <Row style={{marginTop: 30}}>
                <Col span={24}>
                  <h4 className="Title">
                    <FormattedMessage id="project.location.contact.title" defaultMessage="Contact info"/>
                  </h4>
                </Col>
              </Row>
              <Row style={{marginTop: 10}}>
                <Col span={24}>
                  <strong>
                    <FormattedMessage id="project.location.contact.organisation"
                                      defaultMessage="Organisation:"
                    />
                  </strong>
                  <span style={{marginLeft: 5}}>
                    {get(data, 'contact_info[0].organisation.narratives[0].text','-')}
                  </span>
                </Col>
              </Row>
              <Row style={{marginTop: 10}}>
                <Col span={24}>
                  <strong>
                    <FormattedMessage id="project.location.contact.phone"
                                      defaultMessage="Phone number:"
                    />
                  </strong>
                  <span style={{marginLeft: 5}}>
                    {get(data, 'contact_info[0].telephone','-')}
                  </span>
                </Col>
              </Row>
              <Row style={{marginTop: 10}}>
                <Col span={24}>
                  <strong>
                    <FormattedMessage id="project.location.contact.email"
                                      defaultMessage="Email:"
                    />
                  </strong>
                  <span style={{marginLeft: 5}}>
                    {get(data, 'contact_info[0].email','-')}
                  </span>
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Spin spinning={projectLocation.request}>
                <CountryMap data={country}/>
              </Spin>
            </Col>
          </Row>
        </Content>
      </Layout>
    )
  }
}

const mapStateToProps = (state, ) => {
  return {
    projectLocation: state.projectLocation,
  }
};

export default connect(mapStateToProps)(ProjectLocation);