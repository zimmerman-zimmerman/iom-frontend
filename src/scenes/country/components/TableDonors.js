import React from 'react';
import Table from 'antd/es/table';
import { injectIntl, intlShape } from "react-intl";
import get from "lodash/get";
import { format } from "d3-format";
import { Link } from 'react-router-dom';
import SortHeader from "../../../components/SortHeader/SortHeader";

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
  const usd = intl.formatMessage({id: 'currency.usd', defaultMessage: 'US$ '});
  const columns = [{
    title:
      <SortHeader
          title={intl.formatMessage({id: 'country.table.donors.header.donors', defaultMessage: 'Donor'})}
          sortValue={props.sortBy}
          defSortValue={'participating_organisation'}
          onSort={handleDonorSortBy}
      />,
    key: 'participating_organisation',
    width: '60%',
    render: obj =>
      <Link to={`/donors/${obj.participating_organisation_ref}`}>{obj.participating_organisation}</Link>
  }, {
    title: <SortHeader
            title={intl.formatMessage({id: 'country.table.donors.header.total', defaultMessage: 'Total donor funding value'})}
            sortValue={props.sortBy}
            defSortValue={'value'}
            onSort={handleDonorSortBy}
            />,
    dataIndex: 'value',
    key: 'value',
    className: 'columnMoney',
    render: value => <span>{usd}{format(',.2f')(value)}</span>
  },];
  return (
    <Table dataSource={data ? addKey(data) : null} columns={columns} size="middle" pagination={data && props.itemAmount
    && data.length <= props.itemAmount ? false : {pageSize: 5}} />
  )
}

TableDonors.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(TableDonors);