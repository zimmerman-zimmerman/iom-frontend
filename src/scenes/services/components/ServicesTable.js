import React, { Component } from 'react';
import get from 'lodash/get';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Table from 'antd/es/table';
import { format } from "d3-format";

class ServicesTable extends Component {
  addKey(dataSource) {
    let data = [];
    dataSource.forEach(function (item) {
      item.key = get(item, 'sector.code');
      data.push(item);
    });
    return data;
  }

  render() {
    const { intl, data } = this.props;
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