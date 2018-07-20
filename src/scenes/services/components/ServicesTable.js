import React from 'react';
import get from 'lodash/get';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Table from 'antd/es/table';
import { format } from "d3-format";
import SortBy from '../../../components/base/SortBy';
import BaseFilter from "../../../components/base/filters/BaseFilter";

const sortByOptions = [
  { value: 'sector', label: 'Name (a - z)' },
  { value: '-sector', label: 'Name (z - a)' },
  { value: 'value', label: 'Total Budget (asc)' },
  { value: '-value', label: 'Total Budget (desc)' },
  { value: 'activity_count', label: 'Projects count (asc)' },
  { value: '-activity_count', label: 'Projects count (desc)' },
];
class ServicesTable extends BaseFilter {
  addKey(dataSource) {
    let data = [];
    dataSource.forEach(function (item) {
      item.key = get(item, 'sector.code');
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
    const usd = intl.formatMessage({id: 'currency.usd.symbol', defaultMessage: '$'});
    const columns = [{
      title: intl.formatMessage({id: 'services.table.header.service', defaultMessage: 'Service Area'}),
      dataIndex: 'sector.name',
      key: 'sector',
      className: 'Title',
      width: '55%',
      render: (name, record) =>
        <Link to={`/services/${record.sector.code}`}>{name}</Link>,
    }, {
      title: intl.formatMessage({id: 'services.table.header.code', defaultMessage: 'Code'}),
      dataIndex: 'sector.code',
      key: 'code',
    }, {
      title: intl.formatMessage({id: 'services.table.header.budget', defaultMessage: 'Budget'}),
      dataIndex: 'value',
      key: 'value',
      className: 'number',
      render: value => <span>{usd}{format(',')(value)}</span>,
    }, {
      title: intl.formatMessage({id: 'services.table.header.projects', defaultMessage: 'Implementation Projects'}),
      dataIndex: 'activity_count',
      key: 'activity_count',
      className: 'number',
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
      <Table dataSource={this.addKey(data)} columns={columns} size="middle"
                   pagination={false} scroll={{ x: 900 }}
      />
    )
  }
}

ServicesTable.propTypes = {
  intl: intlShape.isRequired
};

const mapStateToProps = (state, ) => {
  return {}
};

export default connect(mapStateToProps)(injectIntl(ServicesTable));