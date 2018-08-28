import React, { Component } from 'react';
import Table from 'antd/es/table';
import { injectIntl, intlShape } from "react-intl";
import {connect} from "react-redux";
import get from 'lodash/get';
import { format } from 'd3-format';
import { Link } from 'react-router-dom';
import SortBy from '../../../components/base/SortBy';
import { tableHeader } from '../../../helpers/style';

import * as actions from "../../../services/actions/index";

const sortByOptions = [
  { value: 'title', label: 'Name (a - z)' },
  { value: '-title', label: 'Name (z - a)' },
  { value: 'activity_budget_value', label: 'Total Budget (asc)' },
  { value: '-activity_budget_value', label: 'Total Budget (desc)' },
  { value: 'start_date', label: 'Start date (asc)' },
  { value: '-start_date', label: 'Start date (desc)' },
];

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
    const { intl, countryActivities } = this.props;
    const data = get(countryActivities, 'data.results');
    const usd = intl.formatMessage({id: 'currency.usd.symbol', defaultMessage: '$'});
    const columns = [{
      title: <span style={tableHeader}>{intl.formatMessage({id: 'country.table.projects.header.donors', defaultMessage: 'Donors'})}</span>,
      key: 'donors',
      width: '20%',
      render: obj => 
        <Link to={`/donors/${obj.participating_organisations[0].ref}`}>{obj.participating_organisations[0].narratives[0].text}</Link>
    },{
      title: <span style={tableHeader}>{intl.formatMessage({id: 'country.table.projects.header.title', defaultMessage: 'Project Title'})}</span>,
      key: 'title',
      width: '30%',
      render: obj => 
        <Link to={`/projects/${obj.id}`}>{obj.title.narratives[0].text}</Link>
    },{
      title: <span style={tableHeader}>{intl.formatMessage({id: 'country.table.projects.header.budget', defaultMessage: 'Budget'})}</span>,
      dataIndex: 'aggregations.activity.budget_value',
      className: 'number',
      key: 'budget',
      render: value => <span>{usd}{format(',.0f')(value)}</span>
    },{
      title: <span style={tableHeader}>{intl.formatMessage({id: 'country.table.projects.header.status', defaultMessage: 'Project status'})}</span>,
      dataIndex: 'activity_status.name',
      key: 'status'
    },{
      title: <span style={tableHeader}>{intl.formatMessage({
        id: 'country.table.projects.header.type', defaultMessage: 'Sector by IOM project type'
      })}</span>,
      key: 'type',
      render: obj => 
        <Link to={`/services/${obj.sectors[0].sector.code}`}>{obj.sectors[0].sector.name}</Link>
    },{
      title: <span style={tableHeader}>{intl.formatMessage({
        id: 'country.table.projects.header.start', defaultMessage: 'Start date'
      })}</span>,
      dataIndex: 'activity_dates[1].iso_date',
      key: 'start'
    },{
      title: <span style={tableHeader}>{intl.formatMessage({
        id: 'country.table.projects.header.end', defaultMessage: 'End date'
      })}</span>,
      dataIndex: 'activity_dates[0].iso_date',
      key: 'end'
    },{
      title: 
        <SortBy
          options={sortByOptions}
          selectedKey={this.state.params.ordering}
          handleChange={e => this.handleChange(e)}
        />,
      key: 'sort_by',
    }];
    return(
      <Table dataSource={data ? this.addKey(data) : null} columns={columns} size="middle"
             pagination={data && this.props.itemAmount
             && data.length <= this.props.itemAmount ? false : ''}
             scroll={{ x: 1800 }}
             loading={countryActivities.request}
      />
    )
  }
}

const mapStateToProps = (state, ) => {
  return {
    countryActivities: state.countryActivities
  }
};

TableProjects.propTypes = {
  intl: intlShape.isRequired,
};

export default connect(mapStateToProps)(injectIntl(TableProjects));