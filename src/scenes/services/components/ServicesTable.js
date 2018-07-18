import React, { Component } from 'react';
import get from 'lodash/get';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Table from 'antd/es/table';
import { format } from "d3-format";
import { tableHeader } from '../../../helpers/style';
import injectSheet from "react-jss";

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
    const { intl, data, classes } = this.props;
    const usd = intl.formatMessage({id: 'currency.usd.symbol', defaultMessage: '$'});
    const columns = [{
      title: <span style={tableHeader}>{intl.formatMessage({id: 'services.table.header.service', defaultMessage: 'Service Area'})}</span>,
      dataIndex: 'sector.name',
      key: 'sector',
      className: 'Title',
      width: '55%',
      render: (name, record) =>
        <Link to={`/services/${record.sector.code}`}>{name}</Link>,
    }, {
      title: <span style={tableHeader}>{intl.formatMessage({id: 'services.table.header.code', defaultMessage: 'Code'})}</span>,
      dataIndex: 'sector.code',
      key: 'code',
    }, {
      title: <span style={tableHeader}>{intl.formatMessage({id: 'services.table.header.budget', defaultMessage: 'Budget'})}</span>,
      dataIndex: 'value',
      key: 'value',
      className: 'number',
      render: value => <span>{usd}{format(',.0f')(value)}</span>,
    }, {
      title: <span style={tableHeader}>{intl.formatMessage({id: 'services.table.header.projects', defaultMessage: 'Implementation Projects'})}</span>,
      dataIndex: 'activity_count',
      key: 'activity_count',
      className: 'number',
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