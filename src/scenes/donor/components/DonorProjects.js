import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Table from 'antd/es/table';
import Spin from 'antd/es/spin';
import { injectIntl, intlShape } from "react-intl";
import get from 'lodash/get';
import { FormattedMessage } from "react-intl";
import { format } from "d3-format";
import injectSheet from 'react-jss';
import { format as dateFormat } from 'date-fns';

import * as actions from '../../../services/actions/index';
import SortHeader from '../../../components/SortHeader/SortHeader';
import Pagination from '../../../components/Pagination/Pagination';
import { addFilterValues } from "../../../helpers/generic";

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
        ordering: '-end_date',
          page: 1,
      }
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
      this.getProjects();
  }

  getProjects() {
    const { dispatch } = this.props;
    const { params } = this.state;
    if(this.props.filterValues){
        //NOTE! this fucntion actually changes the states variable WITHOUT calling this.setState()
        // params works as a reference when passed in this function
        addFilterValues(this.props.filterValues, params);
    }
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
    const total = get(donorProjects, 'data.count');
    const usd = <FormattedMessage id="currency.usd" defaultMessage="US$ " />;
    const columns = [{
      title: <SortHeader
              title={intl.formatMessage({id: 'donor.table.projects.header.title', defaultMessage: 'Project title'})}
              sortValue={this.state.params.ordering}
              defSortValue={'title'}
              onSort={this.handleChange}
              />,
      width: '40%',
      key: 'donors',
      render: project =>
        <Link to={`/projects/${project.id}`}>{project.title.narratives[0].text}</Link>
    },
        {
            title: <SortHeader
                    title={intl.formatMessage({id: 'projects.table.start.date', defaultMessage: 'Start date'})}
                    sortValue={this.state.params.ordering}
                    defSortValue={'start_date'}
                    onSort={this.handleChange}
                    />,
            dataIndex: 'activity_dates[2].iso_date', //THe index 2 array element here is the ACTUAL START date
            className: 'date',
            key: 'start_date',
            render: (value) => <span>{dateFormat(value, 'DD-MM-YYYY')}</span>
        },
        {
            title: <SortHeader
                    title={intl.formatMessage({id: 'projects.table.end.date', defaultMessage: 'End date'})}
                    sortValue={this.state.params.ordering}
                    defSortValue={'end_date'}
                    onSort={this.handleChange}
                    />,
            dataIndex: 'activity_dates[0].iso_date', //THe index 0 array element here is the ACTUAL END date
            className: 'date',
            key: 'end_date',
            render: (value) => <span>{dateFormat(value, 'DD-MM-YYYY')}</span>
        },
        {
      title: <SortHeader
              title={intl.formatMessage({id: 'donor.table.projects.header.budget', defaultMessage: 'Budget'})}
              sortValue={this.state.params.ordering}
              defSortValue={'activity_budget_value'}
              onSort={this.handleChange}
             />,
      dataIndex: 'aggregations.activity.budget_value',
      className: 'number',
      key: 'budget',
      render: (value) => <span>{usd}{format(",.0f")(value)}</span>
    },{
      title: <SortHeader
              title={intl.formatMessage({id: 'donor.table.projects.header.status', defaultMessage: 'Project status'})}
              sortValue={this.state.params.ordering}
              // defSortValue={'activity_status_name'}
              onSort={() => console.log('backend functionality needs to be implemented')}
              />,
      dataIndex: 'activity_status.name',
      className: 'Status',
      key: 'status'
    },{
      title: <SortHeader
              title={intl.formatMessage({id: 'donor.table.projects.header.sector', defaultMessage: 'Project type'})}
              sortValue={this.state.params.ordering}
              defSortValue={'sector'}
              onSort={this.handleChange}
              />,
      className: 'Sector',
      key: 'sector',
      render: project =>
        <Link to={`/services/${project.sectors[0].sector.code}`}>{project.sectors[0].sector.name}</Link>
    },];
    return (
      <Spin spinning={donorProjects.request}>
          <Table dataSource={data ? this.addKey(data) : null}
                 className={classes.table}
                 columns={columns} size="middle"
                 pagination={false}
                 scroll={{ x: 1200 }}
                 rowClassName={classes.donorsRow}
          />
          {total > 10 &&
              <Pagination pageCount={Math.ceil(total/10)}
                          onPageChange={(value) => this.onPageChange(value.selected+1)}
                          forcePage={this.state.params.page-1}
              />
          }
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
    table: {
        marginTop: 10,
    },
    donorsRow: {
        fontSize: 16,
        lineHeight: '22px',
        color: '#0033a1',
        '& td': {
            '& a': {
                color: '#0033a1',
                '&:hover': {
                    color: '#418fde',
                },
            },
        },
    },
  pagination: {
    marginTop: 10
  },
  fixedTH: {
    right: 0,
    position: 'sticky',
    backgroundColor: '#fff !important',
  },
};

export default injectSheet(styles)(connect(mapStateToProps)(injectIntl(DonorProjects)));
