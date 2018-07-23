import React from 'react';
import Table from 'antd/es/table';
import { injectIntl, intlShape } from "react-intl";
import get from "lodash/get";
import { format } from "d3-format";
import { tableHeader } from '../../../helpers/style';
import { Link } from 'react-router-dom';

const TableDonors = (props) => {
  function addKey(dataSource) {
    let data = [];
    dataSource.forEach(function(item) {
      item.key = get(item, 'participating_organisation_ref');
      data.push(item);
    });
    return data;
  }

  const { intl, data } = props;
  const usd = intl.formatMessage({id: 'currency.usd.symbol', defaultMessage: '$'});
  const columns = [{
    title: <span style={tableHeader}>{intl.formatMessage({id: 'country.table.donors.header.donors', defaultMessage: 'Donor'})}</span>,
    key: 'participating_organisation',
    width: '60%',
    render: obj => 
      <Link to={`/donors/${obj.participating_organisation_ref}`}>{obj.participating_organisation}</Link>
  }, {
    title: <span style={tableHeader}>{intl.formatMessage({id: 'country.table.donors.header.total', defaultMessage: 'Total donor funding value'})}</span>,
    dataIndex: 'value',
    key: 'value',
    className: 'columnMoney',
    render: value => <span>{usd}{format(',.0f')(value)}</span>
  }];
  return (
    <Table dataSource={data ? addKey(data) : null} columns={columns} size="middle" pagination={{pageSize: 5}} />
  )
}

TableDonors.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(TableDonors);