import React from 'react';
import Layout from 'antd/es/layout';
import Table from 'antd/es/table';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import BaseFilter from '../../../components/filters/BaseFilter';
import * as actions from '../../../services/actions';
import extend from 'lodash/extend';
import { connect } from 'react-redux';
import { format } from 'd3-format';
import get from 'lodash/get';

const { Content } = Layout;

class ServiceDonors extends BaseFilter {
  addKey(dataSource) {
    let data = [];
    dataSource.forEach(function(item) {
      item.key = get(item, 'participating_organisation_ref');
      data.push(item);
    });
    return data;
  }

  componentDidMount() {
    const { dispatch, sectorId } = this.props;
    const { params } = this.state;
    if (dispatch && sectorId) {
      this.actionRequest(
        extend({}, params, {sector: sectorId}), 'participating_organisation', actions.serviceDonorsRequest
      );
    } else {
      actions.serviceDonorsInitial();
    }
  }

  render() {
    const { intl, serviceDonors } = this.props;
    const data = get(serviceDonors, 'data.results');
    const columns = [{
      title: intl.formatMessage({id: 'service.table.header.donor', defaultMessage: 'Donor'}),
      dataIndex: 'participating_organisation',
      key: 'participating_organisation',
      width: '60%',
      render: name => <span>{name}</span>
    }, {
      title: intl.formatMessage({id: 'service.table.header.total', defaultMessage: 'Total donor funding value'}),
      dataIndex: 'value',
      key: 'value',
      className: 'columnMoney',
      render: value => <span>{format(',.2f')(value)}</span>
    }];
    return(
      <Content className="Content">
        <h3 className="Title">
          <FormattedMessage id="service.table.donors.title" defaultMessage="Where the funds come from"/>
        </h3>
        <Table dataSource={data ? this.addKey(data) : null}
               columns={columns}
               loading={serviceDonors.request}
               pagination={{hideOnSinglePage: true}}
        />
      </Content>
    )
  }
}

ServiceDonors.propTypes = {
  intl: intlShape.isRequired
};

const mapStateToProps = (state, ) => {
  return {
    serviceDonors: state.serviceDonors,
  }
};

export default connect(mapStateToProps)(injectIntl(ServiceDonors));