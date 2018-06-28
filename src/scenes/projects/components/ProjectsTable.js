import React, { Fragment } from 'react';
import get from 'lodash/get';
import Table from 'antd/es/table';
import Pagination from 'antd/es/pagination';
import { injectIntl, intlShape } from "react-intl";
import { Link } from 'react-router-dom';
import { format } from "d3-format";
import { connect } from "react-redux";
import injectSheet from 'react-jss';

import BaseFilter from "../../../components/filters/BaseFilter";

class ProjectsTable extends BaseFilter {
  handleChange(value) {
    const { fieldName, rootComponent } = this.props;
    const { filters } = rootComponent.state;
    if (get(filters.values, fieldName)) {
      delete filters.values[fieldName];
    }
    filters.values[fieldName] = value;
    filters.changed = true;
    this.setState({filters: filters});
  }

  addKey(dataSource) {
    let data = [];
    dataSource.forEach(function (item) {
      item.key = get(item, 'id');
      data.push(item);
    });
    return data;
  }

  getCurrentPage() {
    const { filters } = this.props.rootComponent.state;
    if (get(filters.values, 'page')) {
       return filters.values['page'];
    }
    return 1
  }

  render() {
    const { intl, data, classes } = this.props;
    const count = get(data, 'count', 0);
    const usd = intl.formatMessage({id: 'currency.usd.symbol', defaultMessage: '$'});
    const columns = [{
      title: intl.formatMessage({id: 'projects.table.project.title', defaultMessage: 'Project title'}),
      dataIndex: 'title',
      key: 'title',
      className: 'Title',
      width: '25%',
      render: (title, record) =>
        <Link to={`/projects/${record.id}`}>{title.narratives[0].text}</Link>,
    }, {
      title: intl.formatMessage({id: 'projects.table.start.date', defaultMessage: 'Start date'}),
      dataIndex: 'activity_dates',
      key: 'start_date',
      render: activity_dates => <span>{activity_dates[1].iso_date}</span>
    }, {
      title: intl.formatMessage({id: 'projects.table.end.date', defaultMessage: 'End date'}),
      dataIndex: 'activity_dates',
      key: 'end_date',
      render: activity_dates => <span>{activity_dates[2].iso_date}</span>
    },{
      title: intl.formatMessage({id: 'projects.table.budget', defaultMessage: 'Budget'}),
      dataIndex: 'budgets',
      key: 'budgets',
      className: 'Money',
      render: budgets => <span>{usd}{format(',')(get(budgets, '[0].value.value'))}</span>,
    }, {
      title: intl.formatMessage({id: 'projects.table.sector', defaultMessage: 'Sector by IOM project type'}),
      dataIndex: 'sectors',
      key: 'sectors',
      width: '25%',
      render: sectors => <span>{get(sectors, '[0].sector.name')}</span>,
    }, {
      title: intl.formatMessage({id: 'projects.table.country', defaultMessage: 'Country'}),
      dataIndex: 'recipient_countries',
      key: 'recipient_countries',
      width: '20%',
      render: recipient_countries => <span>{get(recipient_countries, '[0].country.name')}</span>,
    }];
    return (
      <Fragment>
        <Table dataSource={data ? this.addKey(data.results) : null}
               columns={columns}
               size="middle"
               pagination={false}
               scroll={{ x: 1200 }}
               className={classes.rowGap}
        />
        <Pagination size="small"
                    className={classes.rowGap}
                    total={count} onChange={(page) => this.handleChange(page)}
                    current={this.getCurrentPage()}
        />
      </Fragment>
    )
  }
}

ProjectsTable.propTypes = {
  intl: intlShape.isRequired
};

const mapStateToProps = (state, ) => {
  return {}
};

const styles = {
  rowGap: {
    marginTop: 20
  },
};

export default injectSheet(styles)(connect(mapStateToProps)(injectIntl(ProjectsTable)));
