import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Table from 'antd/es/table';
import Pagination from 'antd/es/pagination';
import Spin from 'antd/es/spin';
import { injectIntl, intlShape } from "react-intl";
import get from 'lodash/get';
import { FormattedMessage } from "react-intl";
import { format } from "d3-format";
import injectSheet from 'react-jss';

import SortBy from '../../../components/base/SortBy';

import * as actions from '../../../services/actions/index';

const sortByOptions = [
  { value: 'title', label: 'Name (a - z)' },
  { value: '-title', label: 'Name (z - a)' },
  { value: 'activity_budget_value', label: 'Total Budget (asc)' },
  { value: '-activity_budget_value', label: 'Total Budget (desc)' },
  { value: 'start_date', label: 'Start date (asc)' },
  { value: '-start_date', label: 'Start date (desc)' },
];

class DonorProjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {
        fields: 'id,title,iati_identifier,activity_dates,activity_status,sectors,' +
        'participating_organisations,aggregations',
        convert_to: 'usd',
        participating_organisation: props.code.toUpperCase(),
        reporting_organisation_identifier: process.env.REACT_APP_REPORTING_ORGANISATION_IDENTIFIER,
        ordering: 'title',
      }
    };
  }

  componentDidMount() {
    this.getProjects();
  }

  getProjects() {
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

  handleChange(value) {
    const newParams = this.state.params;
    newParams.ordering = value;
    this.setState({params: newParams}, () => {
      this.getProjects();
    });
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
    const { intl, donorProjects, classes } = this.props;
    const data = get(donorProjects, 'data.results');
    console.log(data);
    const total = get(donorProjects, 'data.count');
    const usd = <FormattedMessage id="currency.usd.symbol" defaultMessage="$" />;
    const columns = [{
      title: intl.formatMessage({id: 'donor.table.projects.header.title', defaultMessage: 'Project title'}),
      width: '40%',
      key: 'donors',
      render: project => 
        <Link to={`/projects/${project.id}`}>{project.title.narratives[0].text}</Link>
    },{
      title: intl.formatMessage({id: 'donor.table.projects.header.start', defaultMessage: 'Start date'}),
      dataIndex: 'activity_dates[1].iso_date',
      className: 'StartDate',
      key: 'start'
    },{
      title: intl.formatMessage({id: 'donor.table.projects.header.end', defaultMessage: 'End date'}),
      dataIndex: 'activity_dates[2].iso_date',
      className: 'EndDate',
      key: 'end'
    },{
      title: intl.formatMessage({id: 'donor.table.projects.header.budget', defaultMessage: 'Budget'}),
      dataIndex: 'aggregations.activity.budget_value',
      className: 'number',
      key: 'budget',
      render: (value) => <span>{usd}{format(",.2f")(value)}</span>
    },{
      title: intl.formatMessage({id: 'donor.table.projects.header.status', defaultMessage: 'Project status'}),
      dataIndex: 'activity_status.name',
      className: 'Status',
      key: 'status'
    },{
      title: intl.formatMessage({id: 'donor.table.projects.header.sector', defaultMessage: 'DAC sector'}),
      className: 'Sector',
      key: 'sector',
      render: project => 
        <Link to={`/services/${project.sectors[0].sector.code}`}>{project.sectors[0].sector.name}</Link>
    },{
      title: 
        <SortBy
          options={sortByOptions}
          selectedKey={this.state.params.ordering}
          handleChange={e => this.handleChange(e)}
        />,
      key: 'sort_by',
    }];
    return (
      <Spin spinning={donorProjects.request}>
          <Table className="DonorsTable"
                 dataSource={data ? this.addKey(data) : null}
                 columns={columns} size="middle"
                 pagination={false}
                 scroll={{ x: 1200 }}
          />
          <Pagination size="small" total={total} className={classes.pagination} onChange={this.onPageChange}/>
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

const styles = {
  pagination: {
    marginTop: 10
  },
};

export default injectSheet(styles)(connect(mapStateToProps)(injectIntl(DonorProjects)));