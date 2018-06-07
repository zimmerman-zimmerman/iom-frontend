import React, { Component } from 'react';
import Layout from 'antd/es/layout';
import Table from 'antd/es/table';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import * as actions from '../../../services/actions';
import { connect } from 'react-redux';
import { format } from 'd3-format';
import get from 'lodash/get';

const { Content } = Layout;

class ServiceProjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {
        fields: 'id,iati_identifier,reporting_organisation,activity_dates,aggregations,sectors,title,humanitarian',
        ordering: '-aggregations.activity.budget_value',
        convert_to: 'usd',
        hierarchy: 1,
        activity_status: '2,3,4',
        sector: get(props, 'sectorId'),
        page_size: 5,
        reporting_organisation_identifier: process.env.REACT_APP_REPORTING_ORGANISATION_IDENTIFIER,
      }
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { params } = this.state;
    if (dispatch) {
      if (params) {
        dispatch(actions.serviceProjectsRequest(params));
      } else {
        dispatch(actions.serviceProjectsInitial());
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
    const { intl, serviceProjects } = this.props;
    const data = get(serviceProjects, 'data.results');
    const columns = [{
      title: intl.formatMessage({id: 'service.projects.header.project', defaultMessage: 'Donor'}),
      dataIndex: 'title.narratives[0].text',
      key: 'title.narratives[0].text',
      width: '45%',
      render: name => <span>{name}</span>
    }, {
      title: intl.formatMessage({id: 'service.projects.header.value', defaultMessage: 'Total donor funding value'}),
      dataIndex: 'aggregations.activity.budget_value',
      key: 'aggregations.activity.budget_value',
      className: 'columnMoney',
      render: value => <span>{format(',.2f')(value)}</span>
    }, {
      title: intl.formatMessage({id: 'service.projects.header.humanitarian', defaultMessage: 'Humanitarian'}),
      dataIndex: 'humanitarian',
      key: 'humanitarian',
      render: value =>
        <span>{value ? intl.formatMessage({id: 'service.projects.yes', defaultMessage: 'Yes'}) :
          intl.formatMessage({id: 'service.projects.no', defaultMessage: 'No'})}
        </span>
    }];
    return(
      <Content className="Content">
        <h3 className="Title">
          <FormattedMessage id="service.projects.title" defaultMessage="Where the funds go"/>
        </h3>
        <Table dataSource={data ? this.addKey(data) : null}
               columns={columns}
               loading={serviceProjects.request}
               pagination={false}
        />
      </Content>
    )
  }
}

ServiceProjects.propTypes = {
  intl: intlShape.isRequired
};

const mapStateToProps = (state, ) => {
  return {
    serviceProjects: state.serviceProjects,
  }
};

export default connect(mapStateToProps)(injectIntl(ServiceProjects));