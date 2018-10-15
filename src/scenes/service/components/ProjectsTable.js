import React from 'react';
import Table from 'antd/es/table';
import Pagination from 'antd/es/pagination';
import { format } from "d3-format";
import get from "lodash/get";
import BaseFilter from "../../../components/base/filters/BaseFilter";
import {connect} from "react-redux";
import {injectIntl, intlShape} from "react-intl";
import injectSheet from 'react-jss';
import { Link } from 'react-router-dom';
import SortBy from '../../../components/base/SortBy';

import Trans from '../../../locales/Trans';
import { tableHeader } from '../../../helpers/style';

const sortByOptions = [
  { value: 'title', label: 'Name (a - z)' },
  { value: '-title', label: 'Name (z - a)' },
  { value: 'activity_budget_value', label: 'Total Budget (asc)' },
  { value: '-activity_budget_value', label: 'Total Budget (desc)' },
];

class ProjectsTable extends BaseFilter {
  addKey(dataSource) {
    let data = [];
    dataSource.forEach(function(item) {
      item.key = get(item, 'id');
      data.push(item);
    });
    return data;
  }

  render() {
    const { intl, data, classes, selectedSortBy, handleSortBy } = this.props;
    const usd = intl.formatMessage({id: 'currency.usd', defaultMessage: 'US$ '});
    const total = get(data, 'count', 0);
    const columns = [{
      title: <span className={tableHeader}>{intl.formatMessage({id: 'service.projects.header.project', defaultMessage: 'Donor'})}</span>,
      key: 'title.narratives[0].text',
      width: '45%',
      render: obj =>
        <Link to={`/projects/${obj.id}`}>{obj.title.narratives[0].text}</Link>
    }, {
      title: <span className={tableHeader}>{intl.formatMessage({id: 'service.projects.header.value', defaultMessage: 'Total donor funding value'})}</span>,
      dataIndex: 'aggregations.activity.budget_value',
      key: 'aggregations.activity.budget_value',
      className: 'number',
      render: value => <span>{usd}{format(',.0f')(value)}</span>
    }, {
      title: <span className={tableHeader}>{intl.formatMessage({id: 'service.projects.header.humanitarian', defaultMessage: 'Humanitarian'})}</span>,
      dataIndex: 'humanitarian',
      key: 'humanitarian',
      render: value =>
        <span>{value ? intl.formatMessage({id: 'service.projects.yes', defaultMessage: 'Yes'}) :
          intl.formatMessage({id: 'service.projects.no', defaultMessage: 'No'})}
        </span>
    },{
      title:
        <SortBy
          options={sortByOptions}
          selectedKey={selectedSortBy}
          handleChange={e => handleSortBy(e)}
        />,
      key: 'sort_by',
    }];
    return(
      <div className={classes.projectsTable}>
        <h2 className="title">
          <Trans id="service.projects.title" defaultMessage="Where the funds go"/>
        </h2>
        <Table dataSource={data ? this.addKey(data.results) : null}
               columns={columns}
               pagination={false}
               scroll={{ x: 650 }}
               className={classes.table}
        />
          {total > 10 &&
              <Pagination className="pagination"
                          size="small"
                          total={total}
                          onChange={(page) => this.handleChange(page)}
              />
          }

      </div>
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
  projectsTable: {
    paddingTop: 20,
    '& .title': {
      color: '#0033a1',
      fontWeight: 600,
      '@media (maxWidth: 767px)': {
        fontSize: '22px',
      },
    },
    '& .pagination': {
      padding: '20px 0',
    }
  },
  table: {
    '& tr': {
      '& td, th': {
        paddingLeft: '0px !important',
        paddingTop: 12,
        paddingBottom: 12,
      }
    }
  }
};

export default injectSheet(styles)(connect(mapStateToProps)(injectIntl(ProjectsTable)));