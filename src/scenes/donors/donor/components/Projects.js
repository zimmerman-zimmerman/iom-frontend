import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Table, Pagination, Spin } from 'antd';
import { injectIntl, intlShape } from "react-intl";

import * as actions from '../../../../services/actions';
import _ from "lodash";

const { Content } = Layout;

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {
        fields: 'id,title,iati_identifier,activity_dates,activity_status,sectors,' +
        'participating_organisations,aggregations',
        convert_to: 'usd',
        participating_organisation: props.code.toUpperCase(),
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

  addKey(dataSource) {
    let data = [];
    dataSource.forEach(function(item) {
      item.key = _.get(item, 'id');
      data.push(item);
    });
    return data;
  }

  onPageChange = (page) => {
    const { dispatch } = this.props;
    const { params } = this.state;
    params.page = page;
    dispatch(actions.activitiesRequest(params));
  };

  render() {
    //console.log(this.props);
    const { intl, activities } = this.props;
    const data = _.get(activities, 'data.results');
    const total = _.get(activities, 'data.count');
    const columns = [{
      title: intl.formatMessage({id: 'donor.table.projects.header.title', defaultMessage: 'Project title'}),
      dataIndex: 'title.narratives[0].text',
      className: 'Donors',
      width: '50%',
      key: 'donors'
    },{
      title: intl.formatMessage({id: 'donor.table.projects.header.start', defaultMessage: 'Start date'}),
      dataIndex: 'activity_dates[1].iso_date',
      className: 'StartDate',
      key: 'start'
    },{
      title: intl.formatMessage({id: 'donor.table.projects.header.end', defaultMessage: 'End date'}),
      dataIndex: 'activity_dates[3].iso_date',
      className: 'EndDate',
      key: 'end'
    },{
      title: intl.formatMessage({id: 'donor.table.projects.header.status', defaultMessage: 'Project status'}),
      dataIndex: 'activity_status.name',
      className: 'Status',
      key: 'status'
    },{
      title: intl.formatMessage({id: 'donor.table.projects.header.sector', defaultMessage: 'DAC sector'}),
      dataIndex: 'sectors[0].sector.name',
      className: 'Sector',
      key: 'sector'
    }];
    return (
      <Spin spinning={activities.request}>
        <Content className="Projects">
          <Table className="Table"
                 dataSource={data ? this.addKey(data) : null}
                 columns={columns} size="middle"
                 pagination={false}
          />
          <Pagination size="small" total={total} className="Pagination" onChange={this.onPageChange}/>
        </Content>
      </Spin>
    )
  }
}

const mapStateToProps = (state, ) => {
  return {
    activities: state.activities
  }
};

Projects.propTypes = {
  intl: intlShape.isRequired
};

export default connect(mapStateToProps)(injectIntl(Projects));