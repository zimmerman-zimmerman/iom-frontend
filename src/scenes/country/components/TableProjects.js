import React, {Component, Fragment} from 'react';
import Table from 'antd/es/table';
import injectSheet from 'react-jss';
import { injectIntl, intlShape } from "react-intl";
import {connect} from "react-redux";
import get from 'lodash/get';
import { format } from 'd3-format';
import { Link } from 'react-router-dom';

import * as actions from "../../../services/actions/index";
import SortHeader from "../../../components/SortHeader/SortHeader";
import Pagination from "../../../components/Pagination/Pagination";
import {paginate} from "../../../helpers/tableHelpers";

class TableProjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {
        fields: 'id,title,iati_identifier,activity_dates,activity_status,sectors,' +
        'participating_organisations,aggregations',
        convert_to: 'usd',
        recipient_country: props.countryCode.toUpperCase(),
        page_size: 50,
        reporting_organisation_identifier: process.env.REACT_APP_REPORTING_ORGANISATION_IDENTIFIER,
        ordering: '-activity_budget_value',
      },
      page: 1,
        pageSize: 7,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getProjects();
  }

  getProjects() {
    const { dispatch } = this.props;
    const { params } = this.state;
    if (dispatch) {
      if (params) {
        dispatch(actions.countryActivitiesRequest(params));
      } else {
        dispatch(actions.countryActivitiesInitial());
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

  render() {
    const { intl, countryActivities, classes } = this.props;
    const usd = intl.formatMessage({id: 'currency.usd', defaultMessage: 'US$ '});
    const columns = [{
      title: <SortHeader
              title={intl.formatMessage({id: 'country.table.projects.header.donors', defaultMessage: 'Donors'})}
              sortValue={this.state.params.ordering}
              // defSortValue={'title'}
              onSort={() => console.log('we need backend functionality for this')}
            />,
      key: 'donors',
      width: '20%',
      render: obj =>
        <Link to={`/donors/${obj.participating_organisations[0].ref}`}>{obj.participating_organisations[0].narratives[0].text}</Link>
    },{
      title: <SortHeader
              title={intl.formatMessage({id: 'country.table.projects.header.title', defaultMessage: 'Project Title'})}
              sortValue={this.state.params.ordering}
              // defSortValue={'title'}
              onSort={() => console.log('we need backend functionality for this')}
              />,
      key: 'title',
      width: '30%',
      render: obj =>
        <Link to={`/projects/${obj.id}`}>{obj.title.narratives[0].text}</Link>
    },{
      title: <SortHeader
              title={intl.formatMessage({id: 'country.table.projects.header.budget', defaultMessage: 'Budget'})}
              sortValue={this.state.params.ordering}
              defSortValue={'activity_budget_value'}
              onSort={this.handleChange}
              />,
      dataIndex: 'aggregations.activity.budget_value',
      className: 'number',
      key: 'budget',
      render: value => <span>{usd}{format(',.0f')(value)}</span>
    },{
      title: <SortHeader
              title={intl.formatMessage({id: 'country.table.projects.header.status', defaultMessage: 'Project status'})}
              sortValue={this.state.params.ordering}
              // defSortValue={'status'}
              onSort={() => console.log('we need backend functionality for this')}
              />,
      dataIndex: 'activity_status.name',
      key: 'status'
    },{
      title: <SortHeader
          title={intl.formatMessage({
              id: 'country.table.projects.header.type', defaultMessage: 'Sector by IOM project type'
          })}
          sortValue={this.state.params.ordering}
          // defSortValue={'type'}
          onSort={() => console.log('we need backend functionality for this')}
      />,
      key: 'type',
      render: obj =>
        <Link to={`/services/${obj.sectors[0].sector.code}`}>{obj.sectors[0].sector.name}</Link>
    },{
      title: <SortHeader
              title={intl.formatMessage({
                  id: 'country.table.projects.header.start', defaultMessage: 'Start date'
              })}
              sortValue={this.state.params.ordering}
              defSortValue={'start_date'}
              onSort={this.handleChange}
              />,
      dataIndex: 'activity_dates[1].iso_date',
      key: 'start'
    },{
      title: <SortHeader
              title={intl.formatMessage({
                  id: 'country.table.projects.header.end', defaultMessage: 'End date'
              })}
              sortValue={this.state.params.ordering}
              // defSortValue={'type'}
              onSort={() => console.log('we need backend functionality for this')}
              />,
      dataIndex: 'activity_dates[0].iso_date',
      key: 'end'
    },];
      const allData = get(countryActivities, 'data.results');
      const data = paginate(this.state.page, this.state.pageSize, allData);
    return(
        <Fragment>
            <Table dataSource={data ? this.addKey(data) : null} columns={columns} size="middle"
                   pagination={false}
                   scroll={{ x: 1800 }}
                   loading={countryActivities.request}
                   rowClassName={classes.row}
            />
            {allData && allData.length > this.state.pageSize &&
            <Pagination pageCount={Math.ceil(allData.length/this.state.pageSize)}
                        onPageChange={(value) => this.setState({ page: value.selected+1 })}
                        forcePage={this.state.page-1}
            />
            }
        </Fragment>
    )
  }
}

const mapStateToProps = (state, ) => {
  return {
    countryActivities: state.countryActivities
  }
};

const styles = {
  row: {
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
  fixedTH: {
    right: 0,
    position: 'sticky',
    backgroundColor: '#fff !important',
  }
};

TableProjects.propTypes = {
  intl: intlShape.isRequired,
};

export default injectSheet(styles)(connect(mapStateToProps)(injectIntl(TableProjects)));
