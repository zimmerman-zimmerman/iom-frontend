import React, { Component } from 'react';
import { Table } from 'antd';
import _ from 'lodash';
import d3 from "d3/d3";

class CountriesTable extends Component {
  addKey(dataSource) {
    let data = [];
    dataSource.forEach(function(item) {
      item.key = _.get(item, 'recipient_country.code');
      data.push(item);
    });
    return data;
  }
  render() {
    const { data } = this.props;
    const columns = [{
      title: 'Country name',
      dataIndex: 'recipient_country',
      key: 'recipient_country',
      render: recipient_country => <span>{recipient_country.name}</span>,
    }, {
      title: 'Budget',
      dataIndex: 'value',
      key: 'value',
      render: value => <span>{d3.format(".2s")(value).replace(/G/, "B")}</span>
    }, {
      title: 'Projects count',
      dataIndex: 'activity_count',
      key: 'count',
    },{
      title: 'Region',
      dataIndex: 'recipient_country',
      key: 'region',
      render: recipient_country => <span>{recipient_country.region.name}</span>,
    }];
    return (
      <Table className="CountriesTable" dataSource={data ? this.addKey(data) : null} columns={columns} size="middle"/>
    )
  }
}

export default CountriesTable;