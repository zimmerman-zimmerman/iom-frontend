import React from 'react';
import get from 'lodash/get';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Table from 'antd/es/table';
import { format } from "d3-format";
import BaseFilter from "../../../components/base/filters/BaseFilter";
import injectSheet from "react-jss";

import './Services.scss';
import SortHeader from "../../../components/SortHeader/SortHeader";

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
      title: <SortHeader
              title={intl.formatMessage({id: 'services.table.header.service', defaultMessage: 'Service Area'})}
              sortValue={filters.values.order_by}
              defSortValue={'sector'}
              onSort={this.handleChange}
              />,
      dataIndex: 'sector.name',
      key: 'sector',
      width: '55%',
      render: (name, record) =>
        <Link to={{
            pathname: `/services/${record.sector.code}`,
            state: { filterValues: filters.values }
        }}>
            {name}
        </Link>
    },
      {
      title: <SortHeader
              title={intl.formatMessage({id: 'services.table.header.budget', defaultMessage: 'Budget'})}
              sortValue={filters.values.order_by}
              defSortValue={'value'}
              onSort={this.handleChange}
              />,
      dataIndex: 'totalValue',
      key: 'value',
      render: value => <span className='services-budget-item'>{usd}{format(',.0f')(value)}</span>,
    }, {
      title: <SortHeader
              title={intl.formatMessage({id: 'services.table.header.projects', defaultMessage: 'Implementation Projects'})}
              sortValue={filters.values.order_by}
              defSortValue={'activity_count'}
              onSort={this.handleChange}
              />,
      dataIndex: 'activity_count',
      key: 'activity_count',
    },];
    return (
      <Table dataSource={this.addKey(data)} columns={columns} size="middle"
                   pagination={false} scroll={{ x: 900 }} className={classes.table}
             rowClassName={classes.row}
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
  row: {
    fontSize: 16,
      lineHeight: '22px',
      color: '#0033a1',
      '& td': {
          '& a': {
              color: '#0033a1',
              '&:hover': {
                  color: '#418fde',
              },
          },
      },
  },
  table: {
    marginTop: 8,
    '& tr': {
      '& td, th': {
        paddingLeft: '0px !important',
      },
    },
  },
  fixedTH: {
    right: 0,
    position: 'sticky',
    backgroundColor: '#fff !important',
  },
}

export default injectSheet(styles)(connect(mapStateToProps)(injectIntl(ServicesTable)));