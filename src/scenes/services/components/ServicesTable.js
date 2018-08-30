import React from 'react';
import get from 'lodash/get';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Table from 'antd/es/table';
import { format } from "d3-format";
import SortBy from '../../../components/base/SortBy';
import BaseFilter from "../../../components/base/filters/BaseFilter";
import { tableHeader } from '../../../helpers/style';
import injectSheet from "react-jss";

import './Services.scss';

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
    const { intl, data, classes, rootComponent } = this.props;
    const { filters } = rootComponent.state;
    const usd = intl.formatMessage({id: 'currency.usd', defaultMessage: 'US$ '});
    const columns = [{
      title: <span style={tableHeader}>{intl.formatMessage({id: 'services.table.header.service', defaultMessage: 'Service Area'})}</span>,
      dataIndex: 'sector.name',
      key: 'sector',
      width: '55%',
      render: (name, record) =>
        <Link to={`/services/${record.sector.code}`}>{name}</Link>,
    },
      {
      title: <span style={tableHeader}>{intl.formatMessage({id: 'services.table.header.budget', defaultMessage: 'Budget'})}</span>,
      dataIndex: 'totalValue',
      key: 'value',
      render: value => <span className='services-budget-item'>{usd}{format(',.0f')(value)}</span>,
    }, {
      title: <span style={tableHeader}>{intl.formatMessage({id: 'services.table.header.projects', defaultMessage: 'Implementation Projects'})}</span>,
      dataIndex: 'activity_count',
      key: 'activity_count',
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
                   pagination={false} scroll={{ x: 900 }} className={classes.table}
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

const styles = {
  table: {
    '& tr': {
      '& td, th': {
        paddingLeft: '0px !important',
      }
    }
  }
}

export default injectSheet(styles)(connect(mapStateToProps)(injectIntl(ServicesTable)));