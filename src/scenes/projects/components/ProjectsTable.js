import React, { Fragment } from 'react';
import get from 'lodash/get';
import Table from 'antd/es/table';
import Pagination from 'antd/es/pagination';
import { injectIntl, intlShape } from "react-intl";
import { Link } from 'react-router-dom';
import { format } from "d3-format";
import { connect } from "react-redux";
import injectSheet from 'react-jss';
import size from 'lodash/size';

import SortBy from '../../../components/base/SortBy';
import BaseFilter from "../../../components/base/filters/BaseFilter";
import { tableHeader } from '../../../helpers/style';

import './ProjectsTable.scss';

const sortByOptions = [
  { value: 'title', label: 'Name (a - z)' },
  { value: '-title', label: 'Name (z - a)' },
  { value: 'activity_budget_value', label: 'Total Budget (asc)' },
  { value: '-activity_budget_value', label: 'Total Budget (desc)' },
  { value: 'start_date', label: 'Start date (asc)' },
  { value: '-start_date', label: 'Start date (desc)' },
];

class ProjectsTable extends BaseFilter {
  handleChange(value, fieldName) {
    const { rootComponent } = this.props;
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
    const { intl, data, classes, rootComponent } = this.props;
    const { filters } = rootComponent.state;
    const count = get(data, 'count', 0);
    const usd = intl.formatMessage({id: 'currency.usd', defaultMessage: 'US$ '});
    const columns = [{
      title: <span style={tableHeader}>{intl.formatMessage({id: 'projects.table.project.title', defaultMessage: 'Project title'})}</span>,
      dataIndex: 'title',
      key: 'title',
      className: 'Title',
      width: '25%',
      render: (title, record) =>
        <Link to={`/projects/${record.id}`}>{title.narratives[0].text}</Link>,
    }, {
      title: <span style={tableHeader}>{intl.formatMessage({id: 'projects.table.start.date', defaultMessage: 'Start date'})}</span>,
      dataIndex: 'activity_dates',
      key: 'start_date',
      render: activity_dates => <span>{activity_dates[1].iso_date}</span>
    }, {
      title: <span style={tableHeader}>{intl.formatMessage({id: 'projects.table.end.date', defaultMessage: 'End date'})}</span>,
      dataIndex: 'activity_dates',
      key: 'end_date',
      render: activity_dates => <span>{activity_dates[2].iso_date}</span>
    },{
      title: <span style={tableHeader}>{intl.formatMessage({id: 'projects.table.budget', defaultMessage: 'Budget'})}</span>,
      dataIndex: 'budgets',
      key: 'budgets',
      className: 'Money',
      render: budgets => <span className='projects-budget-item'>{usd}{format(',.0f')(get(budgets, '[0].value.value'))}</span>,
    }, {
      title: <span style={tableHeader}>{intl.formatMessage({id: 'projects.table.sector', defaultMessage: 'Sector by IOM project type'})}</span>,
      dataIndex: 'sectors',
      key: 'sectors',
      width: '25%',
      render: sectors => 
        <Link to={`/services/${sectors[0].sector.code}`}>{get(sectors, '[0].sector.name')}</Link>,
    }, {
      title: <span style={tableHeader}>{intl.formatMessage({id: 'projects.table.country', defaultMessage: 'Country'})}</span>,
      dataIndex: 'recipient_countries',
      key: 'recipient_countries',
      width: '20%',
      render: recipient_countries => {
        if (size(recipient_countries) > 0) {
          return <Link to={`/countries/${recipient_countries[0].country.code}`}>{get(recipient_countries, '[0].country.name')}</Link>
        } else {
          return <span></span>
        }
      }
    },{
      title: 
        <SortBy
          options={sortByOptions}
          selectedKey={filters.values['ordering']}
          handleChange={e => this.handleChange(e, "ordering")}
        />,
      key: 'sort_by',
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
          {count > 10 &&
            <Pagination size="small"
                        className={classes.rowGap}
                        total={count} onChange={(page) => this.handleChange(page, "page")}
                        current={this.getCurrentPage()}
            />
          }
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
