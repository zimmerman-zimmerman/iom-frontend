import React, { Component } from 'react';
import Table from 'antd/es/table';
import get from 'lodash/get';
import { format } from "d3-format";
import { injectIntl, intlShape } from "react-intl";
import { Link } from 'react-router-dom';
import { tableHeader } from '../../../helpers/style';

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
      title: <span style={tableHeader}>{intl.formatMessage({id: 'countries.table.country', defaultMessage: 'Country name'})}</span>,
      dataIndex: 'recipient_country',
      key: 'recipient_country',
      render: recipient_country =>
        <Link to={`/countries/${recipient_country.code.toLowerCase()}`}>{recipient_country.name}</Link>,
    }, {
      title: <span style={tableHeader}>{intl.formatMessage({id: 'countries.table.budget', defaultMessage: 'Budget'})}</span>,
      dataIndex: 'value',
      key: 'value',
      className: 'number',
      render: value => <span>{usd}{format(",.0f")(value)}</span>
    }, {
      title: <span style={tableHeader}>{intl.formatMessage({id: 'countries.table.count', defaultMessage: 'Project count'})}</span>,
      dataIndex: 'activity_count',
      className: 'number',
      key: 'count',
    },{
      title: <span style={tableHeader}>{intl.formatMessage({id: 'countries.table.region', defaultMessage: 'Region'})}</span>,
      dataIndex: 'recipient_country',
      key: 'region',
      render: recipient_country => <span>{recipient_country.region.name}</span>,
    }];
    return (
      <Table className="CountriesTable" dataSource={data ? this.addKey(data) : null} columns={columns}
             scroll={{ x: 900 }}
             size="middle"
      />
    )
  }
}

CountriesTable.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(CountriesTable);