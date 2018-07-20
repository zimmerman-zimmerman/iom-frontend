import React from 'react';
import Table from 'antd/es/table';
import { injectIntl, intlShape } from "react-intl";
import get from "lodash/get";
import { format } from "d3-format";
import { Link } from 'react-router-dom';
import SortBy from '../../../components/base/SortBy';

const sortByOptions = [
  { value: 'participating_organisation', label: 'Donor (a - z)' },
  { value: '-participating_organisation', label: 'Donor (z - a)' },
  { value: 'value', label: 'Total Budget (asc)' },
  { value: '-value', label: 'Total Budget (desc)' },
];

const TableDonors = (props) => {
  function addKey(dataSource) {
    let data = [];
    dataSource.forEach(function(item) {
      item.key = get(item, 'participating_organisation_ref');
      data.push(item);
    });
    return data;
  }

  const { intl, data, handleDonorSortBy } = props;
  const usd = intl.formatMessage({id: 'currency.usd.symbol', defaultMessage: '$'});
  const columns = [{
    title: intl.formatMessage({id: 'country.table.donors.header.donors', defaultMessage: 'Donor'}),
    width: '60%',
    render: obj => 
      <Link to={`/donors/${obj.participating_organisation_ref}`}>{obj.participating_organisation}</Link>
  }, {
    title: intl.formatMessage({id: 'country.table.donors.header.total', defaultMessage: 'Total donor funding value'}),
    dataIndex: 'value',
    key: 'value',
    className: 'columnMoney',
    render: value => <span>{usd}{format(',.2f')(value)}</span>
  },{
    title: 
      <SortBy
        options={sortByOptions}
        selectedKey={props.sortBy}
        handleChange={e => handleDonorSortBy(e)}
      />,
    key: 'sort_by',
  }];
  return (
    <Table dataSource={data ? addKey(data) : null} columns={columns} size="middle" pagination={{pageSize: 5}} />
  )
}

TableDonors.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(TableDonors);