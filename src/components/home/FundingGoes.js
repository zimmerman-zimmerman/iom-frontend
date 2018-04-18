import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Row, Col, Button } from 'antd';
import { FormattedMessage } from "react-intl";
import _ from "lodash";

import * as actions from '../../actions';
import PieChart from '../PieChart';

const { Content } = Layout;

class FundingGoes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {
        fields: 'id,iati_identifier,reporting_organisation,activity_dates,aggregations,sectors,title',
        ordering: '-start_date',
        hierarchy: 1,
        activity_status: '2,3,4',
        reporting_organisation_identifier: process.env.REACT_APP_REPORTING_ORGANISATION_IDENTIFIER
      }
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { params } = this.state;
    if (dispatch) {
      if (params) {
        dispatch(actions.activitiesRequest(params));
      } else {
        dispatch(actions.activitiesInitial());
      }
    }
  }

  render() {
    const { activities } = this.props;
    const data = [];
    _.forEach(_.get(activities, 'data.results'), function(item){
      const x = _.get(item, 'title.narratives[0].text');
      const y = _.get(item, 'aggregations.activity.budget_value');
      data.push({x: x, y: y})
    });
    return (
      <Layout>
        <Content className="Graphs">
          <Row>
            <Col span={24}>
              <PieChart
                title={
                  <FormattedMessage id="home.funding.goes.title"
                                    defaultMessage="Where the Funding Goes"
                  />
                }
                data={_.slice(data, 0, 5)} height={180}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24} className="Pad">
              <Button className="Button">
                <FormattedMessage id="home.funding.goes.button"
                                  defaultMessage="See All Publisher Services"
                />
              </Button>
            </Col>
          </Row>
        </Content>
      </Layout>
    )
  }
}

const mapStateToProps = (state, ) => {
  return {
    activities: state.activities
  }
};

export default connect(mapStateToProps)(FundingGoes);