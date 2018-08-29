import React from 'react';
import { connect } from "react-redux";
import Table from 'antd/es/table';
import get from 'lodash/get';
import { format } from "d3-format";
import { injectIntl, intlShape } from "react-intl";
import { Link } from 'react-router-dom';
import SortBy from '../../../components/base/SortBy';
import BaseFilter from "../../../components/base/filters/BaseFilter";
import { tableHeader } from '../../../helpers/style';

const sortByOptions = [
  { value: 'recipient_country', label: 'Name (a - z)' },
  { value: '-recipient_country', label: 'Name (z - a)' },
  { value: 'value', label: 'Total Budget (asc)' },
  { value: '-value', label: 'Total Budget (desc)' },
  { value: 'activity_count', label: 'Projects count (asc)' },
  { value: '-activity_count', label: 'Projects count (desc)' },
];

class CountriesTable extends BaseFilter {
  addKey(dataSource) {
    let data = [];
    dataSource.forEach(function(item) {
      item.key = get(item, 'recipient_country.code');
      data.push(item);
    });
    return data;
  }

  handleChange(value) {
    const { rootComponent } = this.props;
    const { filters } = rootComponent.state;
    if (get(filters.values, 'order_by')) {
      delete filters.values['order_by'];
    }
    filters.values['order_by'] = value;
    filters.changed = true;
    this.setState({filters: filters});
  }

  render() {
    const { intl, data, rootComponent } = this.props;
    const { filters } = rootComponent.state;
    const usd = intl.formatMessage({id: 'currency.usd', defaultMessage: 'US$ '});
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
      render: value => <span>{usd}{format(",.0f")(value)}</span>
    }, {
      title: <span style={tableHeader}>{intl.formatMessage({id: 'countries.table.count', defaultMessage: 'Project count'})}</span>,
      dataIndex: 'activity_count',
      key: 'count',
    },{
      title: <span style={tableHeader}>{intl.formatMessage({id: 'countries.table.region', defaultMessage: 'Region'})}</span>,
      dataIndex: 'recipient_country',
      key: 'region',
      render: recipient_country => <span>{recipient_country.region.name}</span>,
    },{
      title: 
        <SortBy
          options={sortByOptions}
          selectedKey={filters.values['order_by']}
          handleChange={e => this.handleChange(e)}
        />,
      key: 'sort_by',
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

const mapStateToProps = (state, ) => {
  return {}
};

export default injectIntl(connect(mapStateToProps)(CountriesTable));