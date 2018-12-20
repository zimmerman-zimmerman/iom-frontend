import React, { Fragment } from 'react';
import get from 'lodash/get';
import Table from 'antd/es/table';
import Pagination from '../../../components/Pagination/Pagination';
import { injectIntl, intlShape } from "react-intl";
import { Link } from 'react-router-dom';
import { format } from "d3-format";
import { connect } from "react-redux";
import injectSheet from 'react-jss';
import size from 'lodash/size';

import BaseFilter from "../../../components/base/filters/BaseFilter";

import './ProjectsTable.scss';
import SortHeader from "../../../components/SortHeader/SortHeader";
import {getDate} from "../../../helpers/tableHelpers";

class ProjectsTable extends BaseFilter {
  handleChange(value, fieldName='ordering') {
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

  render() {
    const { intl, data, classes, rootComponent } = this.props;
    const { filters } = rootComponent.state;
    const count = get(data, 'count', 0);
    const usd = intl.formatMessage({id: 'currency.usd', defaultMessage: 'US$ '});
    const columns = [{
      title: <SortHeader
              title={intl.formatMessage({id: 'projects.table.project.title', defaultMessage: 'Project title'})}
              sortValue={filters.values.ordering}
              defSortValue={'title'}
              onSort={this.handleChange}
              />,
      dataIndex: 'title',
      key: 'title',
      className: 'Title',
      width: '25%',
      render: (title, record) =>
        <Link to={`/projects/${record.id}`}>{title.narratives[0].text}</Link>,
    }, {
      title: <SortHeader
              title={intl.formatMessage({id: 'projects.table.start.date', defaultMessage: 'Start date'})}
              sortValue={filters.values.ordering}
              defSortValue={'start_date'}
              onSort={this.handleChange}
              />,
      dataIndex: 'activity_dates',
      key: 'start_date',
      render: activity_dates => <span>{getDate(activity_dates, 'start')}</span>
    }, {
      title: <SortHeader
              title={intl.formatMessage({id: 'projects.table.end.date', defaultMessage: 'End date'})}
              sortValue={filters.values.ordering}
              defSortValue={'end_date'}
              onSort={this.handleChange}
              />,
      dataIndex: 'activity_dates',
      key: 'end_date',
      render: activity_dates => <span>{getDate(activity_dates, 'end')}</span>
    },{
      title: <SortHeader
              title={intl.formatMessage({id: 'projects.table.budget', defaultMessage: 'Budget'})}
              sortValue={filters.values.ordering}
              defSortValue={'activity_budget_value'}
              onSort={this.handleChange}
              />,
      dataIndex: 'budgets',
      key: 'activity_budget_value',
      className: 'Money',
      render: budgets => <span className='projects-budget-item'>{usd}{format(',.0f')(get(budgets, '[0].value.value'))}</span>,
    }, {
      title: <SortHeader
              title={intl.formatMessage({id: 'projects.table.sector', defaultMessage: 'Sector by IOM project type'})}
              sortValue={filters.values.ordering}
              defSortValue={'projecttype__sector__name'}
              onSort={this.handleChange}
              />,
      dataIndex: 'projecttype',
      key: 'projecttype',
      width: '25%',
      render: projecttype =>
        <Link to={`/services/project-type/${get(projecttype, 'code', '')}`}>{get(projecttype, 'name', '')}</Link>,
    }, {
      title: <SortHeader
              title={intl.formatMessage({id: 'projects.table.country', defaultMessage: 'Country'})}
              sortValue={filters.values.ordering}
              defSortValue={'recipient_country'}
              onSort={this.handleChange}
              />,
      dataIndex: 'recipient_countries',
      key: 'recipient_country',
      width: '20%',
      render: recipient_countries => {
        if (size(recipient_countries) > 0) {
          return <Link to={`/countries/${recipient_countries[0].country.code}`}>{get(recipient_countries, '[0].country.name')}</Link>
        } else {
          return <span></span>
        }
      }
    },];
    return (
      <Fragment>
        <Table dataSource={data ? this.addKey(data.results) : null}
               columns={columns}
               size="middle"
               pagination={false}
               scroll={{ x: 1200 }}
               className={classes.rowGap}
               rowClassName={classes.row}
        />
          {count > 10 &&
            <Pagination pageCount={Math.ceil(count/10)}
                        onPageChange={(value) => this.handleChange(value.selected+1, "page")}
                        forcePage={get(this.props.rootComponent.state.filters.values, 'page', 1)-1}
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
  rowGap: {
    marginTop: 20
  },
  fixedTH: {
    right: 0,
    position: 'sticky',
    backgroundColor: '#fff !important',
  }
};

export default injectSheet(styles)(connect(mapStateToProps)(injectIntl(ProjectsTable)));
