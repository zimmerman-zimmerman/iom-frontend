import React, { Component } from 'react';
import { Layout, Table } from 'antd';
import { FormattedMessage, injectIntl, intlShape } from "react-intl";
import _ from "lodash";
import d3 from "d3/d3";

const { Content } = Layout;

class TableDonors extends Component {
  addKey(dataSource) {
    let data = [];
    dataSource.forEach(function(item) {
      item.key = _.get(item, 'participating_organisation_ref');
      data.push(item);
    });
    return data;
  }

  render() {
    const { intl, data } = this.props;
    const columns = [{
      title: intl.formatMessage({id: 'country.table.donors.header.donors', defaultMessage: 'Donor'}),
      dataIndex: 'participating_organisation',
      key: 'participating_organisation',
      render: name => <span>{name}</span>
    }, {
      title: intl.formatMessage({id: 'country.table.donors.header.total', defaultMessage: 'Total donor funding value'}),
      dataIndex: 'value',
      key: 'value',
      className: 'columnMoney',
      render: value => <span>{d3.format(',.2f')(value)}</span>
    }];
    return (
      <Content className="TablesDonors">
        <h3 className="Title">
          <FormattedMessage id="country.table.donors.title" defaultMessage="Where the funds come from"/>
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

TableDonors.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(TableDonors);