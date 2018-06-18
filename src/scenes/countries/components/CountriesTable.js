import React, { Component } from 'react';
import Table from 'antd/es/table';
import get from 'lodash/get';
import { format } from "d3-format";
import { injectIntl, intlShape } from "react-intl";
import { Link } from 'react-router-dom';

class CountriesTable extends Component {
  addKey(dataSource) {
    let data = [];
    dataSource.forEach(function(item) {
      item.key = get(item, 'recipient_country.code');
      data.push(item);
    });
    return data;
  }

  render() {
    const { intl, data } = this.props;
    const usd = intl.formatMessage({id: 'currency.usd.symbol', defaultMessage: '$'});
    const columns = [{
      title: intl.formatMessage({id: 'countries.table.country', defaultMessage: 'Country name'}),
      dataIndex: 'recipient_country',
      key: 'recipient_country',
      render: recipient_country =>
        <Link to={`/countries/${recipient_country.code.toLowerCase()}`}>{recipient_country.name}</Link>,
    }, {
      title: intl.formatMessage({id: 'countries.table.budget', defaultMessage: 'Budget'}),
      dataIndex: 'value',
      key: 'value',
      className: 'Money',
      render: value => <span>{usd}{format(",.2f")(value)}</span>
    }, {
      title: intl.formatMessage({id: 'countries.table.count', defaultMessage: 'Project count'}),
      dataIndex: 'activity_count',
      className: 'Money',
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