import React, { Component } from 'react';
import Table from 'antd/es/table';
import { injectIntl, intlShape } from "react-intl";
import {connect} from "react-redux";
import get from 'lodash/get';
import { format } from 'd3-format';
import { Link } from 'react-router-dom';
import { tableHeader } from '../../../helpers/style';

import * as actions from "../../../services/actions/index";

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
        reporting_organisation_identifier: process.env.REACT_APP_REPORTING_ORGANISATION_IDENTIFIER
      }
    };
  }

  componentDidMount() {
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
      dataIndex: 'participating_organisations[0].narratives[0].text',
      key: 'donors',
      width: '20%',
    },{
      title: <span style={tableHeader}>{intl.formatMessage({id: 'country.table.projects.header.title', defaultMessage: 'Project Title'})}</span>,
      dataIndex: 'title.narratives[0].text',
      key: 'title',
      width: '30%',
      render: (title, record) => <Link to={`/projects/${record.id}`}>{title}</Link>
    },{
      title: <span style={tableHeader}>{intl.formatMessage({id: 'country.table.projects.header.budget', defaultMessage: 'Budget'})}</span>,
      dataIndex: 'aggregations.activity.budget_value',
      className: 'number',
      key: 'budget',
      render: value => <span>{usd}{format(',.2f')(value)}</span>
    },{
      title: <span style={tableHeader}>{intl.formatMessage({id: 'country.table.projects.header.status', defaultMessage: 'Project status'})}</span>,
      dataIndex: 'activity_status.name',
      key: 'status'
    },{
      title: <span style={tableHeader}>{intl.formatMessage({
        id: 'country.table.projects.header.type', defaultMessage: 'Sector by IOM project type'
      })}</span>,
      dataIndex: 'sectors[0].sector.name',
      key: 'type'
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
    }];
    return(
      <Table dataSource={data ? this.addKey(data) : null} columns={columns} size="middle"
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
  intl: intlShape.isRequired
};

export default connect(mapStateToProps)(injectIntl(TableProjects));