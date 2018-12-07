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
    const filters = {
      ...rootComponent.state.filters,
      changed: true,
    };
    rootComponent.setState({servicesTableSortBy: value});
    this.updateComponent(filters);
  }

  render() {
    const { data, intl, classes, rootComponent, sectorMapping } = this.props;
    const { filters, servicesTableSortBy } = rootComponent.state;
    const usd = intl.formatMessage({id: 'currency.usd', defaultMessage: 'US$ '});
    const columns = [{
      title: <SortHeader
              title={intl.formatMessage({id: 'services.table.header.service', defaultMessage: 'Service Area'})}
              sortValue={servicesTableSortBy}
              defSortValue={'name'}
              onSort={this.handleChange}
              />,
      dataIndex: 'sector.name',
      key: 'sector',
      width: '55%',
      render: (name, record) => {
                const projectTypeCodes = get(sectorMapping, 'data.content.projectTypeFilter', '');
                const url = projectTypeCodes.indexOf(record.sector.code) !== -1 ?
                    `/services/project-type/${record.sector.code}` : `/services/${record.sector.code}`;
          return <Link to={{
              pathname: url,
              state: { filterValues: filters.values }
          }}>
              {name}
          </Link>;
      }
    },
      {
      title: <SortHeader
              title={intl.formatMessage({id: 'services.table.header.budget', defaultMessage: 'Budget'})}
              sortValue={servicesTableSortBy}
              defSortValue={'totalValue'}
              onSort={this.handleChange}
              />,
      dataIndex: 'totalValue',
      key: 'value',
      render: value => <span className='services-budget-item'>{usd}{format(',.0f')(value)}</span>,
    }, {
      title: <SortHeader
              title={intl.formatMessage({id: 'services.table.header.projects', defaultMessage: 'Implementation Projects'})}
              sortValue={servicesTableSortBy}
              defSortValue={'totalActivityCount'}
              onSort={this.handleChange}
              />,
      dataIndex: 'totalActivityCount',
      key: 'totalActivityCount',
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
  return {
      sectorMapping: state.sectorMapping,
  }
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