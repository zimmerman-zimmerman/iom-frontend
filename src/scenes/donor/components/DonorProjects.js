import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from 'antd/es/layout';
import Table from 'antd/es/table';
import Pagination from 'antd/es/pagination';
import Spin from 'antd/es/spin';
import { injectIntl, intlShape } from "react-intl";
import get from 'lodash/get';

import * as actions from '../../../services/actions/index';

const { Content } = Layout;

class DonorProjects extends Component {
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
        dispatch(actions.donorProjectsRequest(params));
      } else {
        dispatch(actions.donorProjectsInitial());
      }
    }
  }

  addKey(dataSource) {
    let data = [];
    dataSource.forEach(function(item) {
      item.key = get(item, 'id');
      data.push(item);
    });
    return data;
  }

  onPageChange = (page) => {
    const { dispatch } = this.props;
    const { params } = this.state;
    params.page = page;
    dispatch(actions.donorProjectsRequest(params));
  };

  render() {
    const { intl, donorProjects } = this.props;
    const data = get(donorProjects, 'data.results');
    const total = get(donorProjects, 'data.count');
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
      <Spin spinning={donorProjects.request}>
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
    donorProjects: state.donorProjects
  }
};

DonorProjects.propTypes = {
  intl: intlShape.isRequired
};

export default connect(mapStateToProps)(injectIntl(DonorProjects));