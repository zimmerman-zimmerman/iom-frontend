import React from 'react';
import { connect } from "react-redux";
import Table from 'antd/es/table';
import { format } from "d3-format";
import get from 'lodash/get';
import injectSheet from 'react-jss';
import { injectIntl, intlShape } from "react-intl";
import { Link } from 'react-router-dom';
import SortBy from '../../../components/base/SortBy';
import BaseFilter from "../../../components/base/filters/BaseFilter";
import { tableHeader } from '../../../helpers/style';

const sortByOptions = [
  { value: 'participating_organisation', label: 'Name (a - z)' },
  { value: '-participating_organisation', label: 'Name (z - a)' },
  { value: 'value', label: 'Total Budget (asc)' },
  { value: '-value', label: 'Total Budget (desc)' },
  { value: 'activity_count', label: 'Projects count (asc)' },
  { value: '-activity_count', label: 'Projects count (desc)' },
];

class DonorsTable extends BaseFilter {
  addKey(dataSource) {
    let data = [];
    dataSource.forEach(function(item) {
      item.key = get(item, 'participating_organisation_ref');
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
    const { classes, intl, data, rootComponent, donorGroup } = this.props;
    const { filters } = rootComponent.state;
    const usd = intl.formatMessage({id: 'currency.usd', defaultMessage: 'US$ '});
    const columns = [{
      title: <span style={tableHeader}>{intl.formatMessage({id: 'donors.table.donors.header.donor', defaultMessage: 'Donor'})}</span>,
      dataIndex: 'participating_organisation',
      key: 'participating_organisation',
      width: '55%',
      render: (participating_organisation, row, index) => {
        return (
          <Link to={`/donors/${donorGroup.code.toLowerCase()}/${row.participating_organisation_ref}`}>
            {participating_organisation}
          </Link>
        );
      },
    }, {
      title: <span style={tableHeader}>{intl.formatMessage({id: 'donors.table.donors.header.budget', defaultMessage: 'Budget'})}</span>,
      dataIndex: 'value',
      key: 'value',
      className: 'number',
      render: value => <span>{usd}{format(",.0f")(value)}</span>
    }, {
      title: <span style={tableHeader}>{intl.formatMessage({
        id: 'donors.table.donors.header.projects.count',
        defaultMessage: 'Implementation projects'
      })}</span>,
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
      onHeaderCell: c => {
        return {
          className: classes.fixedTH
        }
      },
    }];
    return (
      <Table className="DonorsTable" dataSource={data !== null ? this.addKey(data) : null} columns={columns} size="middle"
             scroll={{ x: 900 }}
      />
    )
  }
}

DonorsTable.propTypes = {
  intl: intlShape.isRequired
};

const styles = {
  fixedTH: {
    right: 0,
    position: 'sticky',
    backgroundColor: '#fff !important',
  }
};

const mapStateToProps = (state, ) => {
  return {}
};

export default injectSheet(styles)(injectIntl(connect(mapStateToProps)(DonorsTable)));