import React, { Component } from 'react';
import { Layout, Table } from 'antd';
import * as actions from "../../../services/actions/index";
import { FormattedMessage, injectIntl, intlShape } from "react-intl";
import {connect} from "react-redux";
import _ from "lodash";
import { format } from "d3-format";

const { Content } = Layout;

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
      item.key = _.get(item, 'id');
      data.push(item);
    });
    return data;
  }

  render() {
    const { intl, countryActivities } = this.props;
    const data = _.get(countryActivities, 'data.results');
    const usd = intl.formatMessage({id: 'currency.usd.symbol', defaultMessage: '$'});
    const columns = [{
      title: intl.formatMessage({id: 'country.table.projects.header.donors', defaultMessage: 'Donors'}),
      dataIndex: 'participating_organisations[0].narratives[0].text',
      className: 'Donors',
      key: 'donors'
    },{
      title: intl.formatMessage({id: 'country.table.projects.header.title', defaultMessage: 'Project Title'}),
      dataIndex: 'title.narratives[0].text',
      className: 'Title',
      key: 'title'
    },{
      title: intl.formatMessage({id: 'country.table.projects.header.budget', defaultMessage: 'Budget'}),
      dataIndex: 'aggregations.activity.budget_value',
      className: 'Budget',
      key: 'budget',
      render: value => <span>{usd}{format(',.2f')(value)}</span>
    },{
      title: intl.formatMessage({id: 'country.table.projects.header.status', defaultMessage: 'Project status'}),
      dataIndex: 'activity_status.name',
      key: 'status'
    },{
      title: intl.formatMessage({
        id: 'country.table.projects.header.type', defaultMessage: 'Sector by IOM project type'
      }),
      dataIndex: 'sectors[0].sector.name',
      key: 'type'
    },{
      title: intl.formatMessage({
        id: 'country.table.projects.header.start', defaultMessage: 'Start date'
      }),
      dataIndex: 'activity_dates[1].iso_date',
      key: 'start'
    },{
      title: intl.formatMessage({
        id: 'country.table.projects.header.end', defaultMessage: 'End date'
      }),
      dataIndex: 'activity_dates[0].iso_date',
      key: 'end'
    }];
    return(
      <Content className="TableProjects">
        <h3 className="Title">
          <FormattedMessage id="country.table.projects.title" defaultMessage="Related projects"/>
        </h3>
        <Table className="Table"
               dataSource={data ? this.addKey(data) : null}
               columns={columns} size="middle"
               pagination={{hideOnSinglePage: true}}
        />
      </Content>
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