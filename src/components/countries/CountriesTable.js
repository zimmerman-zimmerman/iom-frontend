import React, { Component } from 'react';
import { Table } from 'antd';
import _ from 'lodash';
import d3 from "d3/d3";
import { injectIntl, intlShape } from "react-intl";

class CountriesTable extends Component {
  addKey(dataSource) {
    let data = [];
    dataSource.forEach(function(item) {
      item.key = _.get(item, 'recipient_country.code');
      data.push(item);
    });
    return data;
  }
  render() {
    const { intl, data } = this.props;
    const columns = [{
      title: intl.formatMessage({id: 'countries.table.country', defaultMessage: 'Country name'}),
      dataIndex: 'recipient_country',
      key: 'recipient_country',
      render: recipient_country => <span>{recipient_country.name}</span>,
    }, {
      title: intl.formatMessage({id: 'countries.table.budget', defaultMessage: 'Budget'}),
      dataIndex: 'value',
      key: 'value',
      render: value => <span>{d3.format(".2s")(value).replace(/G/, "B")}</span>
    }, {
      title: intl.formatMessage({id: 'countries.table.count', defaultMessage: 'Project count'}),
      dataIndex: 'activity_count',
      key: 'count',
    },{
      title: intl.formatMessage({id: 'countries.table.region', defaultMessage: 'Region'}),
      dataIndex: 'recipient_country',
      key: 'region',
      render: recipient_country => <span>{recipient_country.region.name}</span>,
    }];
    return (
      <Table className="CountriesTable" dataSource={data ? this.addKey(data) : null} columns={columns} size="middle"/>
    )
  }
}

CountriesTable.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(CountriesTable);