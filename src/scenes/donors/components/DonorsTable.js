import React, { Component } from 'react';
import { Table } from 'antd';
import d3 from "d3/d3";
import _ from "lodash";
import { injectIntl, intlShape } from "react-intl";
import { Link } from 'react-router-dom';

class DonorsTable extends Component {
  addKey(dataSource) {
    let data = [];
    dataSource.results.forEach(function(item) {
      item.key = _.get(item, 'participating_organisation_ref');
      data.push(item);
    });
    return data;
  }

  render() {
    const { intl, data } = this.props;
    const columns = [{
      title: intl.formatMessage({id: 'donors.table.donors.header.donor', defaultMessage: 'Donor'}),
      dataIndex: 'participating_organisation',
      key: 'participating_organisation',
      render: (participating_organisation, row, index) => {
        //console.log(row);
        return (
          <Link to={`/donors/${row.participating_organisation_ref.toLowerCase()}`}>
            {participating_organisation}
          </Link>
        );
      },
    }, {
      title: intl.formatMessage({id: 'donors.table.donors.header.budget', defaultMessage: 'Budget'}),
      dataIndex: 'value',
      key: 'value',
      render: value => <span>{d3.format(".2s")(value).replace(/G/, "B")}</span>
    }, {
      title: intl.formatMessage({
        id: 'donors.table.donors.header.projects.count',
        defaultMessage: 'Implementation projects'
      }),
      dataIndex: 'activity_count',
      key: 'activity_count',
    }];
    return (
      <Table className="DonorsTable" dataSource={data ? this.addKey(data) : null} columns={columns} size="middle"/>
    )
  }
}

DonorsTable.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(DonorsTable);